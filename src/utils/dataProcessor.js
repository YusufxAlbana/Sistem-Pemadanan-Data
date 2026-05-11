import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Parse File (CSV or XLSX) to JSON using Web Workers
export const parseFile = async (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  
  if (extension === 'csv') {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true, // Enable Web Worker to prevent UI freeze
        complete: (results) => {
          resolve({
            data: results.data,
            columns: results.meta.fields || []
          });
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } else if (extension === 'xlsx') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const worker = new Worker(new URL('./xlsxWorker.js', import.meta.url), { type: 'module' });
          worker.onmessage = (msgEvent) => {
            if (msgEvent.data.error) {
              reject(new Error(msgEvent.data.error));
            } else {
              resolve({
                data: msgEvent.data.data,
                columns: msgEvent.data.columns
              });
            }
            worker.terminate(); // Clean up worker
          };
          worker.onerror = (err) => {
            reject(err);
            worker.terminate();
          };
          worker.postMessage(e.target.result); // Send ArrayBuffer to worker
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  } else {
    throw new Error("Tipe file tidak didukung. Harap gunakan CSV atau XLSX.");
  }
};

// Main Processing Logic (Faktor Pengurang & Logic Validation)
export const processMatching = (mainData, comparativeDatasets, metadataRules, mainKey, compKeys) => {
  if (!mainData || mainData.length === 0) return { validData: [], eliminatedCount: 0, eliminationDetails: [], logicErrors: [] };

  let validData = [...mainData];
  let eliminatedCount = 0;
  const logicErrors = []; // Array of { rowIndex, message }
  
  // Logika Perbandingan / Pengurangan (Faktor Pengurang)
  const eliminationDetails = comparativeDatasets.map(ds => ({
    fileName: ds.fileName,
    eliminated: 0
  }));

  comparativeDatasets.forEach((dataset, index) => {
    const compKeyForThisDataset = compKeys[dataset.fileName];
    if (!compKeyForThisDataset) return; // Skip if no key selected for this dataset

    // Simpan semua value yang relevan di Set
    const compValuesSet = new Set(dataset.data.map(row => String(row[compKeyForThisDataset]).trim().toLowerCase()));

    const newValidData = [];
    
    validData.forEach(mainRow => {
      const mainVal = String(mainRow[mainKey]).trim().toLowerCase();
      
      if (compValuesSet.has(mainVal)) {
        // Matched, so it's eliminated
        eliminatedCount++;
        eliminationDetails[index].eliminated++;
      } else {
        // Not matched, keep it
        newValidData.push(mainRow);
      }
    });

    validData = newValidData;
  });
  
  // Validasi Tipe Data berdasarkan Metadata
  if (metadataRules && metadataRules.length > 0) {
    // Membaca kamus tipe data dari file metadata
    const typeMapping = {};
    metadataRules.forEach(rule => {
      // Format standar (Lampiran Metadata)
      const colName = rule['Nama variabel'] || rule['nama_variabel'] || rule['Nama_Variabel'] || rule['nama variabel'] || rule['nama_kolom'];
      const dataType = rule['Datatype'] || rule['datatype'] || rule['tipe_data'];
      if (colName && dataType) {
        typeMapping[colName.toLowerCase()] = dataType.toLowerCase();
      }
    });

    validData.forEach((row, idx) => {
      Object.keys(row).forEach(col => {
        const expectedTypeStr = typeMapping[col.toLowerCase()];
        if (expectedTypeStr) {
          const val = row[col];
          // Cek jika tipe angka
          if ((expectedTypeStr.includes('int') || expectedTypeStr.includes('numeric')) && val !== '') {
            if (isNaN(Number(val))) {
              logicErrors.push(`Terdapat salah ketik (typo) pada Baris ke-${idx+1}. Kolom "${col}" seharusnya diisi dengan Angka, namun kami menemukan isian berupa teks yaitu "${val}".`);
            }
          }
        }
      });
    });
  }

  // Validasi Logika Bisnis (Kepala Keluarga per KK)
  if (validData.length > 0 && ('status_hubungan_keluarga' in validData[0]) && ('nomor_kartu_keluarga' in validData[0])) {
    const kkMap = {};
    validData.forEach((row, idx) => {
      const kk = row['nomor_kartu_keluarga'];
      const status = String(row['status_hubungan_keluarga']).trim(); // 1 = Kepala Keluarga
      if (!kkMap[kk]) {
        kkMap[kk] = { kepalaKeluargaCount: 0, rows: [] };
      }
      if (status === '1') {
        kkMap[kk].kepalaKeluargaCount += 1;
      }
      kkMap[kk].rows.push(idx + 1);
    });

    let anomalyCount = 0;
    Object.keys(kkMap).forEach(kk => {
      if (anomalyCount >= 50) return; // Batasi agar pesan error tidak membuat UI lag
      const info = kkMap[kk];
      if (info.kepalaKeluargaCount > 1) {
        logicErrors.push(`Terdapat keanehan pada Kartu Keluarga (KK) bernomor ${kk}. Di dalam Tabel Individu, kami menemukan ada ${info.kepalaKeluargaCount} orang yang berstatus sebagai Kepala Keluarga secara bersamaan. Padahal normalnya hanya boleh ada 1 Kepala Keluarga per KK.`);
        anomalyCount++;
      } else if (info.kepalaKeluargaCount === 0) {
        logicErrors.push(`Terdapat keanehan pada Kartu Keluarga (KK) bernomor ${kk}. Di Tabel Individu, kami sama sekali tidak menemukan anggota keluarga yang berstatus sebagai Kepala Keluarga.`);
        anomalyCount++;
      }
    });
  }

  return {
    validData,
    eliminatedCount,
    eliminationDetails,
    logicErrors
  };
};

// Export to Excel
export const exportToExcel = (data, filename = 'Data_Valid.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Valid");
  XLSX.writeFile(workbook, filename);
};

// Export to PDF
export const exportToPDF = (data, columns, filename = 'Data_Valid.pdf') => {
  const doc = new jsPDF('landscape');
  
  doc.text("Laporan Data Valid", 14, 15);
  
  const tableColumn = columns.map(col => col.replace(/_/g, ' ').toUpperCase());
  const tableRows = [];

  data.forEach(row => {
    const rowData = columns.map(col => row[col] || '');
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 58, 138] } // primary color
  });

  doc.save(filename);
};

// Export to CSV
export const exportToCSV = (data, filename = 'Data_Valid.csv') => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to SQL
export const exportToSQL = (data, tableName = 'data_valid', filename = 'Data_Valid.sql') => {
  if (!data || data.length === 0) return;
  const columns = Object.keys(data[0]);
  let sqlString = '';

  data.forEach(row => {
    const values = columns.map(col => {
      let val = row[col];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'string') {
        // Escape single quotes
        val = val.replace(/'/g, "''");
        return `'${val}'`;
      }
      return val;
    });
    sqlString += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
  });

  const blob = new Blob([sqlString], { type: 'text/sql;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
