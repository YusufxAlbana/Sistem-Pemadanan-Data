import React, { useState } from 'react';
import { Settings2, ShieldCheck, Activity, BookOpen, LayoutDashboard } from 'lucide-react';
import FileUpload from './components/FileUpload';
import DashboardStats from './components/DashboardStats';
import DataTable from './components/DataTable';
import CustomDropdown from './components/CustomDropdown';
import GuidePage from './components/GuidePage';
import { parseFile, processMatching } from './utils/dataProcessor';

function App() {
  const [activeTab, setActiveTab] = useState('app'); // 'app' or 'guide'

  // State for Main Data
  const [mainFile, setMainFile] = useState(null);
  const [mainData, setMainData] = useState([]);
  const [mainColumns, setMainColumns] = useState([]);
  const [mainKey, setMainKey] = useState('');

  // State for Comparative Data
  const [compFiles, setCompFiles] = useState([]); // [{ file, fileName, data, columns, selectedKey: '' }]
  
  // State for Metadata
  const [metadataFile, setMetadataFile] = useState(null);
  const [metadataRules, setMetadataRules] = useState([]);

  // State for Processed Data
  const [processedResult, setProcessedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handlers for Main Data
  const handleMainUpload = async (files) => {
    try {
      const file = files[0];
      const parsed = await parseFile(file);
      setMainFile(file);
      setMainData(parsed.data);
      setMainColumns(parsed.columns);
      // Auto-select first column or 'nik/kk' if exists
      const defaultKey = parsed.columns.find(c => c.toLowerCase() === 'nik' || c.toLowerCase().includes('id') || c.toLowerCase().includes('nomor_kartu_keluarga')) || parsed.columns[0];
      setMainKey(defaultKey || '');
      setProcessedResult(null); // Reset result
    } catch (error) {
      alert("Gagal membaca file utama: " + error.message);
    }
  };

  const handleRemoveMain = () => {
    setMainFile(null);
    setMainData([]);
    setMainColumns([]);
    setMainKey('');
    setProcessedResult(null);
  };

  // Handlers for Comparative Data
  const handleCompUpload = async (files) => {
    try {
      const newCompDataPromises = files.map(async (file) => {
        const parsed = await parseFile(file);
        // Auto map based on current mainKey
        let defaultKey = '';
        if (mainKey && parsed.columns.includes(mainKey)) {
          defaultKey = mainKey;
        } else {
          defaultKey = parsed.columns.find(c => c.toLowerCase().includes('nik') || c.toLowerCase().includes('kk')) || parsed.columns[0];
        }
        
        return {
          file,
          fileName: file.name,
          data: parsed.data,
          columns: parsed.columns,
          selectedKey: defaultKey || ''
        };
      });

      const newCompData = await Promise.all(newCompDataPromises);
      setCompFiles(prev => [...prev, ...newCompData]);
      setProcessedResult(null); // Reset result
    } catch (error) {
      alert("Gagal membaca file pembanding: " + error.message);
    }
  };

  const handleRemoveComp = (index) => {
    setCompFiles(prev => prev.filter((_, i) => i !== index));
    setProcessedResult(null);
  };

  const handleMainKeyChange = (newKey) => {
    setMainKey(newKey);
    
    // Auto-map comparative files based on new main key
    setCompFiles(prev => prev.map(cf => {
      return {
        ...cf,
        selectedKey: cf.columns.includes(newKey) ? newKey : cf.selectedKey
      };
    }));
    
    setProcessedResult(null);
  };

  const handleCompKeyChange = (index, newKey) => {
    setCompFiles(prev => {
      const newArr = [...prev];
      newArr[index].selectedKey = newKey;
      return newArr;
    });
    setProcessedResult(null);
  };

  // Handlers for Metadata
  const handleMetadataUpload = async (files) => {
    try {
      const file = files[0];
      const parsed = await parseFile(file);
      setMetadataFile(file);
      setMetadataRules(parsed.data);
      setProcessedResult(null);
    } catch (error) {
      alert("Gagal membaca file metadata: " + error.message);
    }
  };

  const handleRemoveMetadata = () => {
    setMetadataFile(null);
    setMetadataRules([]);
    setProcessedResult(null);
  };

  // Process Data
  const handleProcess = () => {
    if (!mainData.length) return;
    if (!mainKey) {
      alert("Pilih kolom acuan untuk Data Utama.");
      return;
    }
    
    setIsProcessing(true);
    
    // Use timeout to allow UI to update to "processing" state before heavy computation
    setTimeout(() => {
      // Create mapping of comp keys
      const compKeysMap = {};
      compFiles.forEach(cf => {
        compKeysMap[cf.fileName] = cf.selectedKey;
      });

      const result = processMatching(mainData, compFiles, metadataRules, mainKey, compKeysMap);
      
      setProcessedResult({
        stats: {
          totalInitial: mainData.length,
          totalEliminated: result.eliminatedCount,
          totalValid: result.validData.length
        },
        eliminationDetails: result.eliminationDetails,
        validData: result.validData,
        logicErrors: result.logicErrors
      });
      
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h1 style={{ justifyContent: 'center' }}>
            <ShieldCheck size={32} color="var(--primary)" /> Sistem Pemadanan Data
          </h1>
          <p>Aplikasi validasi dan penyaringan data berdasarkan ID Unik (Faktor Pengurang).</p>
        </div>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', width: '100%' }}>
          <button 
            onClick={() => setActiveTab('app')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', 
              background: activeTab === 'app' ? '#EFF6FF' : 'transparent', 
              color: activeTab === 'app' ? 'var(--primary)' : 'var(--text-muted)',
              border: activeTab === 'app' ? '1px solid var(--primary-light)' : '1px solid transparent',
              borderRadius: '20px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s'
            }}>
            <LayoutDashboard size={18} /> Dashboard Aplikasi
          </button>
          <button 
            onClick={() => setActiveTab('guide')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', 
              background: activeTab === 'guide' ? '#EFF6FF' : 'transparent', 
              color: activeTab === 'guide' ? 'var(--primary)' : 'var(--text-muted)',
              border: activeTab === 'guide' ? '1px solid var(--primary-light)' : '1px solid transparent',
              borderRadius: '20px', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s'
            }}>
            <BookOpen size={18} /> Panduan & Contoh Format
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {activeTab === 'guide' ? (
          <GuidePage />
        ) : (
          <>
            {/* Upload Section */}
            <section className="grid-2">
              {/* Main Data Upload */}
              <FileUpload 
                title="Data Sumber Utama" 
                onUpload={handleMainUpload} 
                files={mainFile ? [mainFile] : []}
                onRemove={handleRemoveMain}
              />

              {/* Comparative Data Upload */}
              <FileUpload 
                title="Data Pembanding (Faktor Pengurang)" 
                multiple={true}
                onUpload={handleCompUpload} 
                files={compFiles}
            onRemove={handleRemoveComp}
          />

          {/* Metadata Upload */}
          <div style={{ gridColumn: '1 / -1' }}>
            <FileUpload 
              title="Lampiran Metadata (Aturan & Validasi)" 
              onUpload={handleMetadataUpload} 
              files={metadataFile ? [metadataFile] : []}
              onRemove={handleRemoveMetadata}
            />
          </div>
        </section>

        {/* Configuration Section */}
        {(mainFile || compFiles.length > 0) && (
          <section className="card fade-in">
            <h3 className="card-title">
              <Settings2 size={20} />
              Konfigurasi Filter Pencocokan
            </h3>
            
            <div className="grid-2" style={{ marginTop: '1.5rem' }}>
              {/* Main Data Config */}
              {mainFile && (
                <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <CustomDropdown 
                      label={`Kolom Acuan (Primary Key) - ${mainFile.name}`}
                      options={mainColumns}
                      value={mainKey}
                      onChange={handleMainKeyChange}
                    />
                  </div>
                </div>
              )}

              {/* Comparative Data Config */}
              {compFiles.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {compFiles.map((cf, idx) => (
                    <div key={idx} style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <CustomDropdown 
                          label={`Kolom Acuan - ${cf.fileName}`}
                          options={cf.columns}
                          value={cf.selectedKey}
                          onChange={(val) => handleCompKeyChange(idx, val)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={handleProcess}
                disabled={!mainFile || !mainKey || isProcessing}
                style={{ minWidth: '200px' }}
              >
                {isProcessing ? (
                  <>Memproses Data...</>
                ) : (
                  <>
                    <Activity size={18} />
                    Mulai Pemadanan
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* Results Section */}
        {processedResult && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <DashboardStats 
              stats={processedResult.stats} 
              eliminationDetails={processedResult.eliminationDetails} 
            />
            
            {processedResult.logicErrors && processedResult.logicErrors.length > 0 && (
              <div className="card fade-in" style={{ borderColor: 'var(--danger)', borderLeft: '4px solid var(--danger)' }}>
                <h3 className="card-title" style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>
                  <Activity size={20} /> Hasil Audit Validitas Data ({processedResult.logicErrors.length} Catatan)
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', marginBottom: '1rem' }}>
                  Sistem menemukan beberapa catatan terkait kualitas data Anda berdasarkan aturan Metadata dan logika kependudukan:
                </p>
                <ul style={{ paddingLeft: '1.5rem', color: '#ff4d4f', fontSize: '0.9rem', maxHeight: '200px', overflowY: 'auto' }}>
                  {processedResult.logicErrors.map((err, i) => (
                    <li key={i} style={{ marginBottom: '0.8rem', lineHeight: '1.4' }}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <DataTable 
              data={processedResult.validData} 
              columns={mainColumns} 
            />
          </section>
        )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
