import React from 'react';
import { User, Code, Briefcase, ExternalLink, Camera, GitBranch, Mail, Globe } from 'lucide-react';

const DeveloperPage = () => {
  const socialLinks = [
    { icon: <Camera size={20} />, label: 'Instagram', url: 'https://instagram.com/yusufxalbana', color: '#E4405F' },
    { icon: <GitBranch size={20} />, label: 'GitHub', url: 'https://github.com/YusufxAlbana', color: '#333' },
    { icon: <Mail size={20} />, label: 'Email', url: 'mailto:yusufnawafalbana2009@gmail.com', color: '#EA4335' },
    { icon: <Globe size={20} />, label: 'Website', url: 'yusufna.vercel.app', color: '#0EA5E9' }
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section className="card" style={{ padding: '3rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', border: 'none' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          backgroundColor: 'white', 
          borderRadius: '50%', 
          margin: '0 auto 1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '4px solid white'
        }}>
          <User size={60} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>Yusuf Albana</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 500, margin: '0 0 1.5rem 0' }}>Fullstack Developer & Data Analyst</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {socialLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.6rem 1.2rem', 
                backgroundColor: 'white', 
                borderRadius: '50px',
                color: link.color,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="grid-2">
        {/* About Me */}
        <section className="card">
          <h3 className="card-title">
            <User size={24} color="var(--primary)" /> Tentang Saya
          </h3>
          <p style={{ lineHeight: '1.8', color: 'var(--text-main)', margin: 0 }}>
            Halo! Saya adalah seorang pengembang yang bersemangat dalam membangun solusi digital yang efisien dan bermanfaat. 
            Dengan latar belakang di bidang pengembangan web dan analisis data, saya fokus pada pembuatan aplikasi yang tidak hanya fungsional tetapi juga memiliki pengalaman pengguna yang luar biasa. 
            Proyek ini adalah salah satu dedikasi saya untuk membantu instansi dalam mengelola data dengan lebih aman dan cepat.
          </p>
        </section>

        {/* Skills */}
        <section className="card">
          <h3 className="card-title">
            <Code size={24} color="var(--primary)" /> Keahlian Teknis
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['React.js', 'Node.js', 'Data Matching', 'Tailwind CSS', 'Vite', 'PostgreSQL', 'Web Workers', 'UI/UX Design'].map((skill, idx) => (
              <span key={idx} style={{ 
                padding: '0.4rem 1rem', 
                backgroundColor: '#F1F5F9', 
                color: '#475569', 
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Experience / Projects */}
      <section className="card">
        <h3 className="card-title">
          <Briefcase size={24} color="var(--primary)" /> Pengalaman & Proyek
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { 
              title: 'Sistem Pemadanan Data Pemerintah', 
              desc: 'Membangun aplikasi pemadanan data berbasis client-side untuk menjamin keamanan data sensitif.', 
              year: '2024' 
            },
            { 
              title: 'Dashboard Analitik Real-time', 
              desc: 'Mengembangkan visualisasi data interaktif untuk monitoring kinerja instansi secara langsung.', 
              year: '2023' 
            }
          ].map((pro, idx) => (
            <div key={idx} style={{ 
              padding: '1.25rem', 
              border: '1px solid #E2E8F0', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>{pro.title}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{pro.desc}</p>
              </div>
              <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                {pro.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="card" style={{ textAlign: 'center', backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Tertarik Bekerja Sama?</h3>
        <p style={{ margin: '0 0 1.5rem 0', opacity: 0.9 }}>Saya terbuka untuk diskusi proyek baru atau kolaborasi teknis.</p>
        <a 
          href="https://instagram.com/yusufxalbana" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 2rem', 
            backgroundColor: 'white', 
            color: 'var(--primary)', 
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 700,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Hubungi Saya Sekarang <ExternalLink size={18} />
        </a>
      </section>
    </div>
  );
};

export default DeveloperPage;
