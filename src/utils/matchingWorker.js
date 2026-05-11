// src/utils/matchingWorker.js

self.onmessage = (e) => {
  try {
    const { mainData, comparativeDatasets, metadataRules, mainKey, compKeys } = e.data;
    
    if (!mainData || mainData.length === 0) {
      self.postMessage({ validData: [], eliminatedCount: 0, eliminationDetails: [], logicErrors: [], resultColumns: [] });
      return;
    }

    let validData = [...mainData];
    let eliminatedCount = 0;
    const logicErrors = [];
    let resultColumns = Object.keys(mainData[0] || {});
    
    const eliminationDetails = comparativeDatasets.map(ds => ({
      fileName: ds.fileName,
      eliminated: 0
    }));

    // Logika Eliminasi
    comparativeDatasets.forEach((dataset, index) => {
      const compKeyForThisDataset = compKeys[dataset.fileName];
      if (!compKeyForThisDataset) return; // Skip if no key selected for this dataset

      // Simpan semua value yang relevan di Set dengan trim dan toLowerCase untuk keakuratan 100%
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
      const typeMapping = {};
      metadataRules.forEach(rule => {
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
      });

      Object.keys(kkMap).forEach(kk => {
        if (kkMap[kk].kepalaKeluargaCount > 1) {
          logicErrors.push(`Anomali Data: Kartu Keluarga dengan nomor ${kk} memiliki lebih dari 1 Kepala Keluarga. Data ini tetap dipertahankan namun perlu diperiksa ulang di lapangan.`);
        }
      });
    }

    self.postMessage({
      validData,
      eliminatedCount,
      eliminationDetails,
      logicErrors,
      resultColumns
    });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
