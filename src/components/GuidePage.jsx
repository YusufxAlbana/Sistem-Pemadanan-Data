import React from 'react';
import { BookOpen, Table, FileSpreadsheet, ListChecks, CheckCircle2, Info } from 'lucide-react';

const GuidePage = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Pengantar */}
      <section className="card">
        <h2 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          <BookOpen size={24} /> Panduan Penggunaan Sistem
        </h2>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '1rem' }}>
          Sistem Pemadanan Data ini dirancang untuk mencocokkan data penduduk berdasarkan Nomor Identitas (seperti NIK atau Nomor KK). Aplikasi ini memiliki dua fungsi utama: <strong>Validasi (Eliminasi)</strong> untuk menyaring/menghapus data yang cocok, dan <strong>Pemadanan (Integrasi)</strong> untuk mempertahankan data namun memberi tanda khusus jika cocok.
        </p>
        <div style={{ backgroundColor: '#EFF6FF', borderLeft: '4px solid var(--primary-light)', padding: '1rem', borderRadius: '4px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <Info size={20} color="var(--primary-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ margin: 0, marginBottom: '0.25rem', color: 'var(--primary-light)' }}>Privasi & Keamanan Data Terjamin</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Seluruh proses pemadanan data dilakukan sepenuhnya di dalam <em>browser</em> Anda tanpa dikirim ke server luar. Contoh data yang ditampilkan di halaman ini hanyalah <strong>data buatan (dummy)</strong> yang tidak merepresentasikan penduduk asli.</p>
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

      {/* Contoh Format Data */}
      <section>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Contoh Format Data (Data Fiktif)
        </h3>

        {/* Tabel Utama */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <Table size={18} /> 1. Data Sumber Utama (Contoh: Tabel Individu)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Data mentah penduduk yang ingin dibersihkan atau disaring. Berisi rincian lengkap anggota keluarga.</p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nomor_induk_kependudukan</th>
                  <th>nomor_kartu_keluarga</th>
                  <th>nama</th>
                  <th>jenis_kelamin</th>
                  <th>status_keluarga</th>
                  <th>pekerjaan</th>
                  <th>pendidikan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3171011122223333</td>
                  <td>3171999988887777</td>
                  <td>Budi Santoso</td>
                  <td>Laki-laki</td>
                  <td>1 (Kepala Keluarga)</td>
                  <td>Wiraswasta</td>
                  <td>S1</td>
                </tr>
                <tr>
                  <td>3171011122224444</td>
                  <td>3171999988887777</td>
                  <td>Siti Aminah</td>
                  <td>Perempuan</td>
                  <td>2 (Istri)</td>
                  <td>Mengurus Rumah Tangga</td>
                  <td>SMA</td>
                </tr>
                <tr>
                  <td>3171011122225555</td>
                  <td>3171999988887777</td>
                  <td>Andi Santoso</td>
                  <td>Laki-laki</td>
                  <td>3 (Anak)</td>
                  <td>Pelajar</td>
                  <td>SD</td>
                </tr>
                <tr>
                  <td>3171022233334444</td>
                  <td>3171999911112222</td>
                  <td>Hendra Gunawan</td>
                  <td>Laki-laki</td>
                  <td>1 (Kepala Keluarga)</td>
                  <td>Pegawai Swasta</td>
                  <td>S1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Pembanding */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <FileSpreadsheet size={18} /> 2. Data Pembanding (Contoh: Tabel Keluarga / BPJS)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Data yang digunakan sebagai acuan pengurang. Jika data utama ditemukan di tabel ini, maka akan dicoret/dieliminasi.</p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nomor_kartu_keluarga</th>
                  <th>jumlah_anggota</th>
                  <th>alamat_lengkap</th>
                  <th>kode_pos</th>
                  <th>status_aktif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3171999988887777</td>
                  <td>3</td>
                  <td>Jl. Kebon Jeruk No. 12, Jakarta</td>
                  <td>11530</td>
                  <td>Aktif</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Metadata */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem' }}>
            <ListChecks size={18} /> 3. Lampiran Metadata (Kamus Data)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Opsional: Digunakan oleh sistem sebagai pedoman untuk mengecek apakah ada kesalahan pengetikan (Typo) pada isian data utama.</p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama variabel</th>
                  <th>Datatype</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>nomor_induk_kependudukan</td>
                  <td>character varying</td>
                  <td>16 Digit angka identitas</td>
                </tr>
                <tr>
                  <td>jumlah_anggota_keluarga</td>
                  <td>integer</td>
                  <td>Harus berupa angka bulat</td>
                </tr>
                <tr>
                  <td>tanggal_lahir</td>
                  <td>date</td>
                  <td>Format YYYY-MM-DD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contoh Output */}
        <div className="card" style={{ borderColor: 'var(--success)', borderLeft: '4px solid var(--success)', marginBottom: '1.5rem' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem', color: 'var(--success)' }}>
            <CheckCircle2 size={18} /> Contoh Hasil Akhir - Mode Validasi (Eliminasi)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Jika kolom acuan yang dipilih adalah <strong>nomor_kartu_keluarga</strong>, maka keluarga Budi Santoso akan dieliminasi karena nomor KK-nya terdaftar di Data Pembanding. Hasil yang tersisa dan dianggap valid hanyalah:
          </p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nomor_induk_kependudukan</th>
                  <th>nomor_kartu_keluarga</th>
                  <th>nama</th>
                  <th>pekerjaan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3171022233334444</td>
                  <td>3171999911112222</td>
                  <td>Hendra Gunawan</td>
                  <td>Pegawai Swasta</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
             <div style={{ background: '#FEE2E2', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', color: '#B91C1C' }}>
               <strong>Dieliminasi:</strong> 3 Data (Keluarga Budi Santoso)
             </div>
             <div style={{ background: '#DCFCE7', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', color: '#15803D' }}>
               <strong>Sisa Valid:</strong> 1 Data (Hendra Gunawan)
             </div>
          </div>
        </div>

        {/* Contoh Output Integrasi */}
        <div className="card" style={{ borderColor: '#0EA5E9', borderLeft: '4px solid #0EA5E9' }}>
          <h4 className="card-title" style={{ fontSize: '1.1rem', color: '#0EA5E9' }}>
            <CheckCircle2 size={18} /> Contoh Hasil Akhir - Mode Pemadanan (Integrasi)
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Pada mode ini, tidak ada data yang dihapus. Sistem mempertahankan semua data, dan menambahkan kolom <code style={{background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px'}}>is_integrated</code>. Baris yang ditandai warna <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '4px' }}>Hijau Terang</span> adalah data yang cocok dengan Acuan.
          </p>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>is_integrated</th>
                  <th>nomor_induk_kependudukan</th>
                  <th>nomor_kartu_keluarga</th>
                  <th>nama</th>
                  <th>pekerjaan</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#DCFCE7' }}>
                  <td><span style={{ background: '#22C55E', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>1 (Terintegrasi)</span></td>
                  <td>3171011122223333</td>
                  <td>3171999988887777</td>
                  <td>Budi Santoso</td>
                  <td>Wiraswasta</td>
                </tr>
                <tr style={{ backgroundColor: '#DCFCE7' }}>
                  <td><span style={{ background: '#22C55E', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>1 (Terintegrasi)</span></td>
                  <td>3171011122224444</td>
                  <td>3171999988887777</td>
                  <td>Siti Aminah</td>
                  <td>Mengurus Rumah Tangga</td>
                </tr>
                <tr style={{ backgroundColor: '#DCFCE7' }}>
                  <td><span style={{ background: '#22C55E', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>1 (Terintegrasi)</span></td>
                  <td>3171011122225555</td>
                  <td>3171999988887777</td>
                  <td>Andi Santoso</td>
                  <td>Pelajar</td>
                </tr>
                <tr>
                  <td><span style={{ background: '#94A3B8', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>0 (Belum)</span></td>
                  <td>3171022233334444</td>
                  <td>3171999911112222</td>
                  <td>Hendra Gunawan</td>
                  <td>Pegawai Swasta</td>
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
