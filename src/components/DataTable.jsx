import React, { useState } from 'react';
import { Download, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../utils/dataProcessor';

const DataTable = ({ data, columns, primaryKey }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Reorder columns so primaryKey is always the first column
  const displayColumns = React.useMemo(() => {
    if (!primaryKey || !columns.includes(primaryKey)) return columns;
    const filtered = columns.filter(c => c !== primaryKey);
    return [primaryKey, ...filtered];
  }, [columns, primaryKey]);

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

  return (
    <div className="card fade-in">
      <div className="header" style={{ marginBottom: '1.5rem', borderBottom: 'none', paddingBottom: 0 }}>
        <h3 className="card-title" style={{ marginBottom: 0 }}>Tabel Data Valid</h3>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => exportToExcel(data)}
            title="Export Excel"
          >
            <FileDown size={16} color="var(--success)" /> Excel
          </button>
          <button 
            className="btn btn-outline" 
            onClick={() => exportToPDF(data, displayColumns)}
            title="Export PDF"
          >
            <Download size={16} color="var(--danger)" /> PDF
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
    </div>
  );
};

export default DataTable;
