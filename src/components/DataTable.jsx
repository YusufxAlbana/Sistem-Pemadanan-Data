import React, { useState, useMemo } from 'react';
import { Download, FileDown, ChevronLeft, ChevronRight, Settings, X, Database, FileText } from 'lucide-react';
import { exportToExcel, exportToPDF, exportToCSV, exportToSQL } from '../utils/dataProcessor';

const DataTable = ({ data, columns, primaryKey }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);
  const rowsPerPage = 10;

  // Reorder columns so primaryKey is always the first column
  const displayColumns = useMemo(() => {
    if (!primaryKey || !columns.includes(primaryKey)) return columns;
    const filtered = columns.filter(c => c !== primaryKey);
    return [primaryKey, ...filtered];
  }, [columns, primaryKey]);

  // State for selected columns in Export Modal
  const [selectedCols, setSelectedCols] = useState(
    displayColumns.reduce((acc, col) => ({ ...acc, [col]: true }), {})
  );

  // Update selectedCols when columns change
  React.useEffect(() => {
    setSelectedCols(displayColumns.reduce((acc, col) => ({ ...acc, [col]: true }), {}));
  }, [displayColumns]);

  if (!data || data.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
        Belum ada data untuk ditampilkan. Silakan unggah dan proses data terlebih dahulu.
      </div>
    );
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleColumnSelection = (col) => {
    setSelectedCols(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const selectAllCols = (selectAll) => {
    const newVal = {};
    displayColumns.forEach(col => newVal[col] = selectAll);
    setSelectedCols(newVal);
  };

  const getFilteredData = () => {
    const colsToExport = Object.keys(selectedCols).filter(col => selectedCols[col]);
    return data.map(row => {
      const newRow = {};
      colsToExport.forEach(col => {
        newRow[col] = row[col];
      });
      return newRow;
    });
  };

  const handleExport = (type) => {
    const filteredData = getFilteredData();
    const colsToExport = Object.keys(selectedCols).filter(col => selectedCols[col]);
    
    if (colsToExport.length === 0) {
      alert("Pilih minimal 1 kolom untuk diunduh!");
      return;
    }

    switch(type) {
      case 'excel':
        exportToExcel(filteredData);
        break;
      case 'csv':
        exportToCSV(filteredData);
        break;
      case 'pdf':
        exportToPDF(filteredData, colsToExport);
        break;
      case 'sql':
        exportToSQL(filteredData);
        break;
      default:
        break;
    }
    setShowExportModal(false);
  };

  return (
    <div className="card fade-in" style={{ position: 'relative' }}>
      <div className="header" style={{ marginBottom: '1.5rem', borderBottom: 'none', paddingBottom: 0 }}>
        <h3 className="card-title" style={{ marginBottom: 0 }}>Tabel Data Hasil</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowExportModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Settings size={16} /> Opsi Unduhan (Download)
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {displayColumns.map((col, index) => (
                <th key={index}>{col.replace(/_/g, ' ').toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody key={currentPage} className="page-transition">
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {displayColumns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Menampilkan {indexOfFirstRow + 1} hingga {Math.min(indexOfLastRow, data.length)} dari {data.length} data
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-outline" 
              style={{ padding: '0.5rem' }}
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem', fontSize: '0.875rem' }}>
              Halaman {currentPage} dari {totalPages}
            </span>
            <button 
              className="btn btn-outline" 
              style={{ padding: '0.5rem' }}
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="card fade-in" style={{ width: '90%', maxWidth: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Opsi Ekspor Data</h3>
              <button onClick={() => setShowExportModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="var(--text-muted)" />
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pilih Kolom yang Ingin Diunduh:</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button onClick={() => selectAllCols(true)} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Pilih Semua</button>
                <button onClick={() => selectAllCols(false)} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Hapus Semua</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                {displayColumns.map(col => (
                  <label key={col} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!selectedCols[col]} 
                      onChange={() => toggleColumnSelection(col)} 
                    />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={col}>{col}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pilih Format Ekspor:</h4>
              <div className="grid-2">
                <button className="btn btn-outline" onClick={() => handleExport('excel')} style={{ justifyContent: 'flex-start' }}>
                  <FileDown size={18} color="var(--success)" /> Excel (.xlsx)
                </button>
                <button className="btn btn-outline" onClick={() => handleExport('csv')} style={{ justifyContent: 'flex-start' }}>
                  <FileText size={18} color="#0EA5E9" /> CSV (.csv)
                </button>
                <button className="btn btn-outline" onClick={() => handleExport('pdf')} style={{ justifyContent: 'flex-start' }}>
                  <Download size={18} color="var(--danger)" /> PDF (.pdf)
                </button>
                <button className="btn btn-outline" onClick={() => handleExport('sql')} style={{ justifyContent: 'flex-start' }}>
                  <Database size={18} color="#8B5CF6" /> SQL (.sql)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
