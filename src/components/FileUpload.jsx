import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Loader2 } from 'lucide-react';

const FileUpload = ({ title, multiple = false, onUpload, files, columns = [], isParsing = false, onRemove, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    e.target.value = null;
  };

  const handleFiles = (fileList) => {
    const validFiles = [];
    const invalidFiles = [];

    Array.from(fileList).forEach(f => {
      const ext = f.name.split('.').pop().toLowerCase();
      if (ext === 'csv' || ext === 'xlsx') {
        validFiles.push(f);
      } else {
        invalidFiles.push(f.name);
      }
    });

    if (invalidFiles.length > 0) {
      if (onError) {
        onError(`Data format invalid: File types not supported (${invalidFiles.join(', ')}). Please upload ONLY .csv or .xlsx formats.`);
      } else {
        alert(`Data format invalid: File types not supported (${invalidFiles.join(', ')}). Please upload ONLY .csv or .xlsx formats.`);
      }
      return; // Reject the entire upload if there are invalid files
    }

    if (validFiles.length > 0) {
      onUpload(multiple ? validFiles : [validFiles[0]]);
    }
  };

  return (
    <div className="card fade-in">
      <h3 className="card-title">
        <Upload size={20} />
        {title}
      </h3>
      
      <div 
        className={`upload-zone ${isDragging ? 'drag-active' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ opacity: isParsing ? 0.6 : 1, pointerEvents: isParsing ? 'none' : 'auto' }}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="file-input"
          accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
          multiple={multiple}
          disabled={isParsing}
        />
        
        {isParsing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
            <Loader2 className="animate-spin" size={32} />
            <p className="upload-text">Sedang Membaca File...</p>
            <p className="upload-subtext" style={{ color: 'var(--warning)' }}>Mohon tunggu, memproses file besar memakan waktu.</p>
          </div>
        ) : (
          <>
            <Upload size={32} className="upload-icon" />
            <p className="upload-text">Klik atau seret file (CSV/XLSX) ke sini</p>
            <p className="upload-subtext">
              {multiple ? "Bisa memilih banyak file sekaligus" : "Hanya 1 file (CSV/XLSX)"}
            </p>
          </>
        )}
      </div>

      {files && files.length > 0 && (
        <div className="file-list">
          {files.map((fileObj, idx) => {
            const file = fileObj.file || fileObj;
            return (
              <div key={idx} className="file-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                  <FileText size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="file-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name}
                    </div>
                    {/* Render Columns Preview if available */}
                    {columns && columns.length > 0 && !multiple && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>Kolom Terdeteksi: </span>
                        {columns.map((col, i) => (
                          <span key={i} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#334155' }}>
                            {col}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Render Columns Preview for multiple files (comparative datasets) */}
                    {multiple && fileObj.columns && fileObj.columns.length > 0 && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>Kolom Terdeteksi: </span>
                        {fileObj.columns.map((col, i) => (
                          <span key={i} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', backgroundColor: '#E2E8F0', borderRadius: '12px', color: '#334155' }}>
                            {col}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => onRemove(idx)}
                  title="Hapus File"
                  style={{ flexShrink: 0 }}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
