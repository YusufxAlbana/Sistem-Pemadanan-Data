import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Square, CheckSquare } from 'lucide-react';

const CustomDropdown = ({ options, value, onChange, label, multiple = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      let newValues;
      if (currentValues.includes(option)) {
        newValues = currentValues.filter(v => v !== option);
      } else {
        newValues = [...currentValues, option];
      }
      onChange(newValues);
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleSelectAll = (e) => {
    e.stopPropagation();
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.length === options.length) {
      onChange([]); // Deselect all
    } else {
      onChange([...options]); // Select all
    }
  };

  const getDisplayText = () => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.length === 0) return 'Pilih Kolom';
      if (currentValues.length === options.length) return 'Semua Terpilih';
      if (currentValues.length === 1) return currentValues[0];
      return `${currentValues.length} Kolom Terpilih`;
    }
    return value || 'Pilih Kolom';
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {label && <label className="form-label">{label}</label>}
      <div 
        className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getDisplayText()}</span>
        <ChevronDown 
          size={18} 
          className="dropdown-icon" 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', 
            transition: 'transform 0.3s ease' 
          }} 
        />
      </div>
      
      {isOpen && (
        <ul className="dropdown-menu fade-in-down">
          {multiple && options.length > 0 && (
            <li 
              className="dropdown-item"
              onClick={handleSelectAll}
              style={{ borderBottom: '1px solid var(--border-color)', fontWeight: 'bold' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {Array.isArray(value) && value.length === options.length ? (
                  <CheckSquare size={16} className="check-icon" />
                ) : (
                  <Square size={16} color="#aaa" />
                )}
                <span>Pilih Semua</span>
              </div>
            </li>
          )}
          {options.map((option, idx) => {
            const isSelected = multiple 
              ? (Array.isArray(value) && value.includes(option))
              : value === option;

            return (
              <li 
                key={idx} 
                className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {multiple && (
                    isSelected ? <CheckSquare size={16} className="check-icon" /> : <Square size={16} color="#aaa" />
                  )}
                  <span className="dropdown-item-text">{option}</span>
                </div>
                {!multiple && isSelected && <Check size={16} className="check-icon" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
