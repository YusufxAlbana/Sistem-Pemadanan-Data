import React, { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';

const FileUpload = ({ title, multiple = false, onUpload, files, onRemove }) => {
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
    // Reset input so the same file can be selected again if removed
    e.target.value = null;
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).filter(f => {
      const ext = f.name.split('.').pop().toLowerCase();
      return f.type === 'text/csv' || ext === 'csv' || ext === 'xlsx' || f.type.includes('spreadsheetml');
    });

    if (newFiles.length > 0) {
      onUpload(multiple ? newFiles : [newFiles[0]]);
    } else {
      alert("Hanya file CSV atau XLSX yang diperbolehkan!");
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
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload size={40} className="upload-icon" />
        <div className="upload-text">Klik atau seret file (CSV/XLSX) ke sini</div>
        <div className="upload-subtext">
          {multiple ? 'Bisa memilih banyak file sekaligus' : 'Hanya 1 file (CSV/XLSX)'}
        </div>
        <input 
          type="file" 
          ref={fileInputRef}
          className="file-input" 
          accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>

      {files && files.length > 0 && (
        <div className="file-list">
          {files.map((f, i) => (
            <div key={i} className="file-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="var(--primary-light)" />
                <span className="file-name">{f.name || f.fileName}</span>
              </div>
              <button 
                className="remove-btn" 
                onClick={() => onRemove(multiple ? i : -1)}
                title="Hapus file"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
