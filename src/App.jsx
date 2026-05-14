import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Settings2, ShieldCheck, Activity, BookOpen, LayoutDashboard, X, Info, MessageSquare, User } from 'lucide-react';
import FileUpload from './components/FileUpload';
import DashboardStats from './components/DashboardStats';
import DataTable from './components/DataTable';
import CustomDropdown from './components/CustomDropdown';
import GuidePage from './components/GuidePage';
import InfoPage from './components/InfoPage';
import FeedbackPage from './components/FeedbackPage';
import DeveloperPage from './components/DeveloperPage';
import { parseFile, processMatching } from './utils/dataProcessor';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // State for Main Data
  const [mainFile, setMainFile] = useState(null);
  const [mainData, setMainData] = useState([]);
  const [mainColumns, setMainColumns] = useState([]);
  const [mainKey, setMainKey] = useState('');
  const [isParsingMain, setIsParsingMain] = useState(false);

  // State for Comparative Data
  const [compFiles, setCompFiles] = useState([]); // [{ file, fileName, data, columns, selectedKey: '' }]
  const [isParsingComp, setIsParsingComp] = useState(false);
  
  // State for Metadata
  const [metadataFile, setMetadataFile] = useState(null);
  const [metadataRules, setMetadataRules] = useState([]);
  const [metadataColumns, setMetadataColumns] = useState([]);
  const [isParsingMeta, setIsParsingMeta] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  // State for Processed Data
  const [processedResult, setProcessedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMode, setProcessingMode] = useState('elimination'); // 'elimination' or 'integration'
  
  // App Error State
  const [appError, setAppError] = useState(null);

  // Handlers for Main Data
  const handleMainUpload = async (files) => {
    try {
      setAppError(null);
      setIsParsingMain(true);
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
      setAppError("Gagal membaca file utama: " + error.message);
    } finally {
      setIsParsingMain(false);
    }
  };

  const handleRemoveMain = () => {
    setMainFile(null);
    setMainData([]);
    setMainColumns([]);
    setMainKey('');
    setProcessedResult(null);
    setAppError(null);
  };

  // Handlers for Comparative Data
  const handleCompUpload = async (files) => {
    try {
      setAppError(null);
      setIsParsingComp(true);
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
      setAppError("Gagal membaca file pembanding: " + error.message);
    } finally {
      setIsParsingComp(false);
    }
  };

  const handleRemoveComp = (index) => {
    setCompFiles(prev => prev.filter((_, i) => i !== index));
    setProcessedResult(null);
    setAppError(null);
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
      setAppError(null);
      setIsParsingMeta(true);
      const file = files[0];
      const parsed = await parseFile(file);
      setMetadataFile(file);
      setMetadataRules(parsed.data);
      setMetadataColumns(parsed.columns);
      setProcessedResult(null);
    } catch (error) {
      setAppError("Gagal membaca file metadata: " + error.message);
    } finally {
      setIsParsingMeta(false);
    }
  };

  const handleRemoveMetadata = () => {
    setMetadataFile(null);
    setMetadataRules([]);
    setMetadataColumns([]);
    setProcessedResult(null);
    setAppError(null);
  };

  // Process Data
  const handleProcess = () => {
    if (!mainData.length) return;
    if (!mainKey) {
      setAppError("Validasi Gagal: Silakan pilih kolom acuan (Faktor Pengurang) untuk Data Utama.");
      return;
    }
    
    setAppError(null);
    setIsProcessing(true);
    
    try {
      const compKeysMap = {};
      compFiles.forEach(cf => {
        compKeysMap[cf.fileName] = cf.selectedKey;
      });

      // Initialize Web Worker for background processing
      const worker = new Worker(new URL('./utils/matchingWorker.js', import.meta.url), { type: 'module' });
      
      worker.onmessage = (e) => {
        if (e.data.error) {
          setAppError("Gagal memproses pencocokan data: " + e.data.error);
        } else {
          setProcessedResult({
            stats: {
              totalInitial: mainData.length,
              totalEliminated: e.data.eliminatedCount,
              totalValid: e.data.validData.length
            },
            eliminationDetails: e.data.eliminationDetails,
            validData: e.data.validData,
            logicErrors: e.data.logicErrors,
            resultColumns: e.data.resultColumns
          });
        }
        setIsProcessing(false);
        worker.terminate();
      };

      worker.onerror = (err) => {
        setAppError("Terjadi kesalahan sistem yang fatal saat memproses data besar.");
        setIsProcessing(false);
        worker.terminate();
      };

      worker.postMessage({
        mainData,
        comparativeDatasets: compFiles,
        metadataRules: showMetadata ? metadataRules : [],
        mainKey,
        compKeys: compKeysMap,
        processingMode
      });
    } catch (err) {
      setAppError("Gagal memulai proses: " + err.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <ShieldCheck size={28} color="var(--primary)" /> 
          <span>DataMatch</span>
        </div>
        
        <nav className="sidebar-menu">
          <NavLink 
            to="/"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Halaman Utama</span>
          </NavLink>
          
          <NavLink 
            to="/panduan"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={20} />
            <span>Panduan & Format</span>
          </NavLink>

          <NavLink 
            to="/informasi"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <Info size={20} />
            <span>Informasi Sistem</span>
          </NavLink>

          <NavLink 
            to="/saran"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <MessageSquare size={20} />
            <span>Saran & Kritik</span>
          </NavLink>

          <NavLink 
            to="/developer"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <User size={20} />
            <span>Profil Developer</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="app-container">
          {/* Header */}
          <header className="header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '0.5rem' }}>
            <div>
              <h1>
                {location.pathname === '/' ? 'Dashboard Pemadanan Data' : 
                 location.pathname === '/panduan' ? 'Panduan Penggunaan Sistem' : 
                 location.pathname === '/saran' ? 'Saran & Kritik' :
                 location.pathname === '/developer' ? 'Profil Pengembang Sistem' :
                 'Tentang Sistem Pemadanan Data'}
              </h1>
              <p>
                {location.pathname === '/' 
                  ? 'Aplikasi validasi dan penyaringan data berdasarkan ID Unik (Faktor Pengurang).' 
                  : location.pathname === '/panduan' 
                  ? 'Pelajari cara menggunakan sistem dan format file yang didukung.'
                  : location.pathname === '/saran'
                  ? 'Kirimkan masukan atau laporan bug langsung ke tim pengembang.'
                  : location.pathname === '/developer'
                  ? 'Kenali lebih dekat pengembang di balik sistem pemadanan data ini.'
                  : 'Pelajari latar belakang, visi, misi, dan berbagai skenario penggunaan sistem.'}
              </p>
            </div>
          </header>

      {/* Main Content */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {appError && (
          <div className="card fade-in" style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#DC2626' }}>
              <Activity size={20} />
              <strong>Error:</strong> {appError}
            </div>
            <button onClick={() => setAppError(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#DC2626' }}>
              <X size={18} />
            </button>
          </div>
        )}

        <Routes>
          <Route path="/informasi" element={<InfoPage />} />
          <Route path="/panduan" element={<GuidePage />} />
          <Route path="/saran" element={<FeedbackPage />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="/" element={
            <>
            {/* Processing Mode Selection - Moved to Top */}
            <section className="card fade-in" style={{ borderColor: 'var(--primary)', borderTop: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexDirection: 'column' }}>
                <h3 className="card-title" style={{ margin: 0 }}>
                  <Settings2 size={20} />
                  Pilih Mode Pemrosesan Sistem
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, marginBottom: '1rem' }}>
                  Silakan pilih bagaimana sistem harus menangani data utama jika ditemukan kecocokan dengan data pembanding.
                </p>

                <div className="radio-card-container">
                  <label className={`radio-card ${processingMode === 'elimination' ? 'active-elimination' : ''}`}>
                    <input 
                      type="radio" 
                      name="processingModeTop" 
                      value="elimination" 
                      checked={processingMode === 'elimination'} 
                      onChange={(e) => { setProcessingMode(e.target.value); setProcessedResult(null); }}
                    />
                    <div className="radio-indicator"></div>
                    <div className="radio-content">
                      <span className="radio-title">Mode Validasi (Eliminasi)</span>
                      <span className="radio-description">
                        Data utama yang terdeteksi ada di data pembanding akan <strong>dihapus/dieliminasi</strong> dari hasil akhir.
                      </span>
                    </div>
                  </label>
                  
                  <label className={`radio-card ${processingMode === 'integration' ? 'active-integration' : ''}`}>
                    <input 
                      type="radio" 
                      name="processingModeTop" 
                      value="integration" 
                      checked={processingMode === 'integration'} 
                      onChange={(e) => { setProcessingMode(e.target.value); setProcessedResult(null); }}
                    />
                    <div className="radio-indicator"></div>
                    <div className="radio-content">
                      <span className="radio-title">Mode Pemadanan (Integrasi)</span>
                      <span className="radio-description">
                        Semua data dipertahankan. Baris yang cocok akan diberi status khusus (<code style={{background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '4px', fontSize: '0.8rem'}}>is_integrated</code>).
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Upload Section */}
            <section className="grid-2">
              {/* Main Data Upload */}
              <FileUpload 
                title="Data Sumber Utama" 
                onUpload={handleMainUpload} 
                files={mainFile ? [mainFile] : []}
                columns={mainColumns}
                isParsing={isParsingMain}
                onRemove={handleRemoveMain}
                onError={setAppError}
                onGoToGuide={() => navigate('/panduan')}
              />

              {/* Comparative Data Upload */}
              <FileUpload 
                title="Data Pembanding (Faktor Pengurang)" 
                multiple={true}
                onUpload={handleCompUpload} 
                files={compFiles}
                isParsing={isParsingComp}
                onRemove={handleRemoveComp}
                onError={setAppError}
                onGoToGuide={() => navigate('/panduan')}
              />

              {/* Metadata Toggle & Upload */}
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 500, color: 'var(--text-main)', margin: 0 }}>
                  <div style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                    <input 
                      type="checkbox" 
                      checked={showMetadata}
                      onChange={(e) => setShowMetadata(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} 
                    />
                    <span style={{
                      position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: showMetadata ? 'var(--success)' : '#CBD5E1',
                      transition: '.4s', borderRadius: '24px'
                    }}>
                      <span style={{
                        position: 'absolute', content: '""', height: '18px', width: '18px',
                        left: showMetadata ? '19px' : '3px', bottom: '3px',
                        backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                      }}></span>
                    </span>
                  </div>
                  Aktifkan Validasi Metadata (Opsional)
                </label>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>- Tambahkan file kamus data untuk audit kualitas otomatis.</span>
              </div>

              {showMetadata && (
                <div style={{ gridColumn: '1 / -1' }} className="fade-in-down">
                  <FileUpload 
                    title="Lampiran Metadata (Aturan & Validasi) - Opsional" 
                    onUpload={handleMetadataUpload} 
                    files={metadataFile ? [metadataFile] : []}
                    columns={metadataColumns}
                    isParsing={isParsingMeta}
                    onRemove={handleRemoveMetadata}
                    onError={setAppError}
                  />
                </div>
              )}
            </section>

            {/* Configuration Section */}
            {(mainFile || compFiles.length > 0) && (
              <section className="card fade-in">
                <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                  <Settings2 size={20} />
                  Konfigurasi Filter Pencocokan
                </h3>

            <div className="grid-2">
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

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', gap: '1.5rem' }}>

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
              processingMode={processingMode}
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
              columns={processedResult.resultColumns || mainColumns} 
              primaryKey={mainKey}
            />
          </section>
        )}
          </>
          } />
        </Routes>
        </main>
        </div>
      </div>
    </div>
  );
}

export default App;
