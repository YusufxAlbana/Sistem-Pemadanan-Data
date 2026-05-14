import React from 'react';
import { BookOpen, Table, FileSpreadsheet, ListChecks, CheckCircle2, Info, FileWarning } from 'lucide-react';

const GuidePage = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Pengantar */}
      <section className="card">
        <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          <BookOpen size={24} /> Panduan Penggunaan Sistem
        </h2>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1rem' }}>
          Sistem Pemadanan Data ini dirancang untuk mencocokkan data massal berdasarkan Kunci Utama (seperti NIK atau Nomor KK). Aplikasi ini memiliki dua fungsi utama: <strong>Validasi (Eliminasi)</strong> untuk menyaring/menghapus data yang bentrok, dan <strong>Pemadanan (Integrasi)</strong> untuk melabeli data tanpa menghapusnya.
        </p>
        <div style={{ backgroundColor: '#EFF6FF', borderLeft: '4px solid var(--primary-light)', padding: '1rem', borderRadius: '4px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Info size={20} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ margin: 0, marginBottom: '0.25rem', color: 'var(--primary-light)' }}>Privasi & Keamanan Data Terjamin</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Seluruh proses pemadanan data dilakukan sepenuhnya di dalam <em>browser</em> Anda tanpa dikirim ke server luar. Data NIK/KK yang ditampilkan di halaman panduan ini telah <strong>disensor</strong> (menggunakan tanda bintang ****) untuk alasan keamanan simulasi.</p>
          </div>
        </div>
      </section>

      {/* Rekomendasi Batas Ukuran File (RAM) */}
      <section id="ram-guide" className="card" style={{ borderColor: '#F59E0B', borderLeft: '4px solid #F59E0B' }}>
        <h3 className="card-title" style={{ color: '#D97706', fontSize: '1.2rem', marginBottom: '1rem' }}>
          <Info size={20} /> Rekomendasi Ukuran File Maksimal (Berdasarkan RAM)
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Karena aplikasi ini memproses data langsung di perangkat Anda tanpa menggunakan server (untuk menjamin keamanan data), kinerja sistem sangat bergantung pada <strong>Kapasitas RAM</strong> perangkat Anda. Berikut adalah rekomendasi ukuran maksimal agar browser tidak <em>crash</em> atau <em>hang</em>:
        </p>
        <div className="table-container">
          <table className="data-table" style={{ minWidth: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#FEF3C7' }}>
                <th style={{ color: '#92400E' }}>Kapasitas RAM</th>
                <th style={{ color: '#92400E' }}>Rekomendasi Beban Maksimal</th>
                <th style={{ color: '#92400E' }}>Catatan Performa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4 GB</strong></td>
                <td>~50 MB (atau ~100 ribu baris)</td>
                <td>Sangat disarankan untuk memecah file menjadi beberapa bagian kecil.</td>
              </tr>
              <tr>
                <td><strong>8 GB</strong></td>
                <td>~200 MB (atau ~500 ribu baris)</td>
                <td>Batas optimal. Tutup tab browser lain yang tidak terpakai untuk kelancaran.</td>
              </tr>
              <tr>
                <td><strong>16 GB</strong></td>
                <td>~500 MB (atau ~1 juta baris)</td>
                <td>Sangat lancar, namun proses baca file (parsing) mungkin butuh beberapa detik.</td>
              </tr>
              <tr>
                <td><strong>32 GB atau lebih</strong></td>
                <td>&gt; 1 GB (Lebih dari 2 juta baris)</td>
                <td>Mampu menangani data super besar. Tunggu hingga indikator loading selesai.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Studi Kasus & Alur Kerja */}
      <section>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Contoh Kasus: Penyaluran Bantuan Sosial (Bansos)
        </h3>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          <strong>Skenario:</strong> Dinas Sosial memiliki "Daftar Usulan Penerima Bansos Baru" (Data Utama). Namun, mereka harus memastikan bahwa orang-orang di daftar ini <strong>belum pernah menerima</strong> Bansos PKH sebelumnya (Data Pembanding). Mari kita lihat alur kerjanya.
        </p>

        {/* Tabel Utama */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <Table size={18} /> 1. Data Sumber Utama (Daftar Usulan Penerima Baru)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Ini adalah data mentah yang diunggah ke sistem. Terdiri dari warga yang diusulkan mendapat bantuan.</p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nik</th>
                  <th>nama_lengkap</th>
                  <th>alamat</th>
                  <th>status_pekerjaan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>320101112222****</td>
                  <td>Ahmad Fauzi</td>
                  <td>Jl. Merdeka No. 10</td>
                  <td>Buruh Harian</td>
                </tr>
                <tr>
                  <td>320101334444****</td>
                  <td>Siti Nurhaliza</td>
                  <td>Jl. Melati No. 5</td>
                  <td>Pedagang Kecil</td>
                </tr>
                <tr>
                  <td>320102556666****</td>
                  <td>Budi Santoso</td>
                  <td>Jl. Mawar No. 12</td>
                  <td>Tidak Bekerja</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Pembanding */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <FileSpreadsheet size={18} /> 2. Data Pembanding (Daftar Penerima Bansos Lama / PKH)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Data ini berfungsi sebagai "Faktor Pengurang". Siapapun yang ada di tabel ini, akan dicoret atau ditandai oleh sistem.</p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nik_penerima_pkh</th>
                  <th>periode_bantuan</th>
                  <th>jumlah_dana</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>320101112222****</td>
                  <td>Januari 2026</td>
                  <td>Rp 600.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '1rem', background: '#F8FAFC', padding: '0.75rem', borderRadius: '4px' }}>
            <strong>Catatan:</strong> Pada konfigurasi sistem nanti, Anda cukup memilih kolom <code>nik</code> pada Data Utama dan menyandingkannya dengan kolom <code>nik_penerima_pkh</code> pada Data Pembanding.
          </p>
        </div>

        {/* Penjelasan Validasi Metadata */}
        <div className="card" style={{ marginBottom: '1.5rem', borderColor: '#8B5CF6', borderLeft: '4px solid #8B5CF6' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem', color: '#8B5CF6' }}>
            <ListChecks size={18} /> 3. Fungsi "Aktifkan Validasi Metadata (Opsional)"
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong>Apa itu Metadata?</strong> Metadata adalah file Excel/CSV tambahan yang berisi "Kamus Aturan". Fitur ini sangat berguna sebagai <em>Quality Control</em> otomatis untuk mendeteksi salah ketik (typo) atau data anomali di lapangan.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: '#F5F3FF', padding: '1rem', borderRadius: '8px' }}>
              <h5 style={{ margin: '0 0 0.5rem 0', color: '#6D28D9' }}>Contoh File Kamus Aturan (Metadata):</h5>
              <div className="table-container">
                <table className="data-table" style={{ fontSize: '0.8rem' }}>
                  <thead>
                    <tr>
                      <th>Nama variabel</th>
                      <th>Datatype</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>nik</td>
                      <td>character varying</td>
                      <td>Harus berjumlah 16 Digit angka</td>
                    </tr>
                    <tr>
                      <td>status_pekerjaan</td>
                      <td>string</td>
                      <td>Tidak boleh kosong</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
              <strong>Bagaimana Sistem Bekerja?</strong><br/>
              Jika Anda mengunggah file Metadata di atas, sistem akan mengecek isi Data Utama Anda. Jika ditemukan NIK yang jumlahnya hanya 14 digit (karena petugas salah ketik), sistem <strong>tidak akan membatalkan pemadanan</strong>, melainkan akan memunculkan spanduk peringatan merah di akhir proses yang berbunyi: <em>"Peringatan: 1 baris memiliki NIK tidak standar (Kurang dari 16 digit)"</em>. Fitur ini sangat membantu auditor dalam membersihkan data kotor.
            </p>
          </div>
        </div>

        <h3 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Hasil Akhir Berdasarkan Mode yang Dipilih
        </h3>

        {/* Contoh Output Eliminasi */}
        <div className="card" style={{ borderColor: 'var(--danger)', borderLeft: '4px solid var(--danger)', marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem', color: 'var(--danger)' }}>
            <FileWarning size={18} /> Hasil Jika Menggunakan "Mode Validasi (Eliminasi)"
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
            Sistem akan secara agresif membuang data yang saling bentrok. Karena NIK <strong>Ahmad Fauzi</strong> ditemukan di Data Pembanding (artinya ia sudah pernah dapat PKH), maka datanya <strong>dihapus total</strong> dari daftar usulan. Hasil unduhan Anda nanti hanya menyisakan warga yang benar-benar bersih:
          </p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nik</th>
                  <th>nama_lengkap</th>
                  <th>alamat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>320101334444****</td>
                  <td>Siti Nurhaliza</td>
                  <td>Jl. Melati No. 5</td>
                </tr>
                <tr>
                  <td>320102556666****</td>
                  <td>Budi Santoso</td>
                  <td>Jl. Mawar No. 12</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
             <div style={{ background: '#FEE2E2', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', color: '#B91C1C' }}>
               <strong>Dieliminasi:</strong> 1 Data (Ahmad Fauzi terdeteksi ganda)
             </div>
             <div style={{ background: '#DCFCE7', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', color: '#15803D' }}>
               <strong>Sisa Valid:</strong> 2 Data Siap Diproses
             </div>
          </div>
        </div>

        {/* Contoh Output Integrasi */}
        <div className="card" style={{ borderColor: '#0EA5E9', borderLeft: '4px solid #0EA5E9' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem', color: '#0EA5E9' }}>
            <CheckCircle2 size={18} /> Hasil Jika Menggunakan "Mode Pemadanan (Integrasi)"
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
            Pada mode ini, <strong>tidak ada data yang dihapus</strong>. Sistem mempertahankan semua usulan data awal dari Dinas Sosial, namun menanamkan sebuah kolom indikator baru bernama <code style={{background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px'}}>is_integrated</code> di tabel hasil akhir. Mode ini cocok jika Anda hanya ingin melihat "siapa saja yang ganda" tanpa kehilangan data aslinya.
          </p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>is_integrated</th>
                  <th>nik</th>
                  <th>nama_lengkap</th>
                  <th>alamat</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#DCFCE7' }}>
                  <td><span style={{ background: '#22C55E', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>1 (Bantuan Ganda)</span></td>
                  <td>320101112222****</td>
                  <td>Ahmad Fauzi</td>
                  <td>Jl. Merdeka No. 10</td>
                </tr>
                <tr>
                  <td><span style={{ background: '#94A3B8', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>0 (Aman)</span></td>
                  <td>320101334444****</td>
                  <td>Siti Nurhaliza</td>
                  <td>Jl. Melati No. 5</td>
                </tr>
                <tr>
                  <td><span style={{ background: '#94A3B8', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>0 (Aman)</span></td>
                  <td>320102556666****</td>
                  <td>Budi Santoso</td>
                  <td>Jl. Mawar No. 12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

    </div>
  );
};

export default GuidePage;
