import React from 'react';
import { ShieldCheck, Target, Lightbulb, Users, Database, FileSpreadsheet, Cpu, Code2, Zap, Globe, Layout, BarChart3, FileJson, Layers } from 'lucide-react';

const InfoPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section className="card fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#EFF6FF', borderRadius: '12px', color: 'var(--primary)' }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>Tentang Sistem Pemadanan Data</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Solusi Integritas dan Validasi Data Terpusat</p>
          </div>
        </div>
        
        <div style={{ lineHeight: '1.8', color: 'var(--text-main)' }}>
          <p style={{ marginBottom: '1rem' }}>
            Sistem Pemadanan Data dibangun sebagai respons terhadap tantangan pengelolaan data berskala besar di lingkungan instansi dan organisasi modern. Dalam era digital, duplikasi data, ketidakkonsistenan informasi, dan sulitnya melacak record spesifik seringkali menjadi hambatan utama dalam pengambilan keputusan yang efektif dan pendistribusian layanan yang tepat sasaran.
          </p>
          <p>
            Website ini dirancang secara khusus untuk memfasilitasi proses <strong>Rekonsiliasi Data Otomatis</strong>, memungkinkan pengguna untuk membandingkan, menyaring, dan mengintegrasikan jutaan baris data dalam hitungan detik. Dengan memanfaatkan teknologi pemrosesan data berbasis browser (Client-Side Processing), aplikasi ini memastikan bahwa seluruh data yang bersifat sensitif dan rahasia tetap berada di perangkat pengguna tanpa pernah diunggah ke server pihak ketiga, menjamin tingkat keamanan dan privasi yang maksimal.
          </p>
        </div>
      </section>

      <div className="grid-2">
        <section className="card fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="card-title" style={{ color: 'var(--primary)' }}>
            <Target size={24} /> Visi
          </h3>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
            Menjadi platform validasi data terdepan yang mewujudkan tata kelola data (Data Governance) yang akurat, transparan, dan dapat diandalkan bagi seluruh instansi, demi mendukung terciptanya ekosistem informasi tunggal yang terbebas dari redundansi.
          </p>
        </section>

        <section className="card fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="card-title" style={{ color: 'var(--primary)' }}>
            <Lightbulb size={24} /> Misi
          </h3>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
            <li>Menyediakan alat pemadanan data yang cepat, intuitif, dan mudah digunakan oleh operator non-teknis.</li>
            <li>Mengeliminasi human-error dalam proses penyaringan data massal (bulk data filtering).</li>
            <li>Menjamin kerahasiaan data pengguna melalui pemrosesan lokal seutuhnya.</li>
            <li>Mendukung standarisasi format laporan dan metadata di berbagai sektor administrasi.</li>
          </ul>
        </section>
      </div>

      <section className="card fade-in" style={{ animationDelay: '0.25s' }}>
        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
          <Cpu size={24} color="var(--primary)" /> Teknologi yang Digunakan
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Aplikasi ini dibangun menggunakan tumpukan teknologi modern untuk memastikan performa maksimal, keamanan data lokal, dan pengalaman pengguna yang responsif.
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1.5rem',
          justifyContent: 'center'
        }}>
          {/* Tech Card 1 */}
          <div style={{ flex: '1 1 280px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ color: 'var(--primary)', flexShrink: 0 }}><Code2 size={24} /></div>
            <div>
              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>React 19 & Vite</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Framework UI terbaru dan build tool super cepat untuk performa optimal.</p>
            </div>
          </div>

          {/* Tech Card 2 */}
          <div style={{ flex: '1 1 280px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ color: '#F59E0B', flexShrink: 0 }}><Zap size={24} /></div>
            <div>
              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Web Workers</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pemrosesan data di latar belakang (Multi-threading) agar UI tetap lancar.</p>
            </div>
          </div>

          {/* Tech Card 3 */}
          <div style={{ flex: '1 1 280px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ color: '#0EA5E9', flexShrink: 0 }}><Globe size={24} /></div>
            <div>
              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Client-Side Processing</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Seluruh data diproses lokal di browser pengguna demi privasi 100%.</p>
            </div>
          </div>

          {/* Tech Card 4 */}
          <div style={{ flex: '1 1 280px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ color: '#8B5CF6', flexShrink: 0 }}><Layout size={24} /></div>
            <div>
              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>React Router 7</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sistem navigasi URL yang mulus dan mendukung deep-linking.</p>
            </div>
          </div>

          {/* Tech Card 5 */}
          <div style={{ flex: '1 1 280px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ color: '#10B981', flexShrink: 0 }}><BarChart3 size={24} /></div>
            <div>
              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Recharts & Lucide</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Visualisasi data interaktif dan ikonografi premium yang konsisten.</p>
            </div>
          </div>

          {/* Tech Card 6 */}
          <div style={{ flex: '1 1 280px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '12px' }}>
            <div style={{ color: '#64748B', flexShrink: 0 }}><FileJson size={24} /></div>
            <div>
              <h5 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>SheetJS & PapaParse</h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mesin pengolah file Excel (XLSX) dan CSV yang tangguh.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="card fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
          <Database size={24} /> Contoh Kebutuhan & Skenario Penggunaan
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
              <Users size={18} /> 1. Penyaluran Bantuan Sosial (Bansos) Tepat Sasaran
            </h4>
            <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--text-muted)' }}>
              <strong>Masalah:</strong> Pemerintah memiliki data utama calon penerima bantuan sebanyak ratusan ribu jiwa. Namun, perlu dipastikan bahwa calon penerima ini belum pernah menerima bantuan dari program lain (misalnya PKH atau BLT UMKM).<br/>
              <br/>
              <strong>Solusi:</strong> Operator mengunggah Data Utama (calon penerima baru) dan Data Pembanding (daftar penerima PKH dan BLT). Menggunakan <strong>Mode Validasi (Eliminasi)</strong>, sistem secara otomatis mencari NIK yang sama dan menghapus/mengeliminasi NIK tersebut dari Data Utama. Hasil akhirnya adalah daftar bersih masyarakat yang benar-benar belum pernah menerima bantuan apapun, mencegah terjadinya pendistribusian bantuan ganda.
            </p>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #0EA5E9' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
              <FileSpreadsheet size={18} /> 2. Konsolidasi Data Kepegawaian & Presensi
            </h4>
            <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--text-muted)' }}>
              <strong>Masalah:</strong> Divisi HRD memiliki database pegawai (Data Utama) dan menerima laporan absensi/kehadiran bulanan dari mesin sidik jari (Data Pembanding). HRD ingin melabeli siapa saja pegawai yang sudah melakukan absensi tanpa menghapus data pegawai yang tidak hadir.<br/>
              <br/>
              <strong>Solusi:</strong> Dengan menggunakan <strong>Mode Pemadanan (Integrasi)</strong>, operator menyandingkan NIP pada kedua data. Sistem tidak akan menghapus data apa pun, melainkan menambahkan kolom status baru (<code style={{fontSize: '0.8rem', background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '4px'}}>is_integrated</code>) pada Data Utama. Pegawai yang NIP-nya ditemukan di mesin absensi akan ditandai "Telah Terintegrasi/Hadir", sehingga HRD dapat dengan mudah memfilter atau merekapitulasi persentase kehadiran.
            </p>
          </div>

          <div style={{ padding: '1.25rem', backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
              <ShieldCheck size={18} /> 3. Pembersihan Data Pemilih Pemilu (DPT)
            </h4>
            <p style={{ margin: 0, lineHeight: '1.6', color: 'var(--text-muted)' }}>
              <strong>Masalah:</strong> KPU daerah harus membersihkan Daftar Pemilih Tetap (DPT) dari penduduk yang sudah pindah domisili atau meninggal dunia, berdasarkan laporan terbaru dari Dinas Dukcapil.<br/>
              <br/>
              <strong>Solusi:</strong> DPT dimasukkan sebagai Data Utama, dan laporan Dukcapil tentang penduduk meninggal/pindah dimasukkan sebagai Data Pembanding. Melalui pencocokan NIK atau Nomor KK, sistem mengeliminasi nama-nama yang tidak lagi memenuhi syarat, menghasilkan data DPT yang mutakhir dan valid tanpa memerlukan pengecekan manual satu per satu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;
