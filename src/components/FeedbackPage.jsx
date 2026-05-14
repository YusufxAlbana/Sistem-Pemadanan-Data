import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    
    const phoneNumber = "6285727149998";
    const template = `Halo Admin Sistem Pemadanan Data,\n\nSaya ingin memberikan saran atau kritik sebagai berikut:\n\n"${feedbackText}"\n\nTerima kasih.`;
    const encodedMessage = encodeURIComponent(template);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setFeedbackText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section className="card fade-in" style={{ borderColor: '#E2E8F0', background: 'linear-gradient(to right bottom, #ffffff, #F8FAFC)' }}>
        <h3 className="card-title" style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
          <MessageSquare size={24} color="var(--primary)" /> Saran & Kritik
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Kami terus berupaya mengembangkan sistem ini menjadi lebih baik. Jika Anda menemukan bug, kendala, atau memiliki ide fitur baru, silakan kirimkan saran Anda langsung ke tim pengembang kami melalui WhatsApp.
        </p>
        
        <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <textarea 
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tuliskan saran, kritik, atau kendala yang Anda alami di sini..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                backgroundColor: 'transparent',
                color: '#0F172A',
                overflowY: 'auto',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-light)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Sistem akan otomatis menambahkan salam pembuka & penutup.
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-success"
            style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}
          >
            <Send size={18} /> Kirim via WhatsApp
          </button>
        </form>
      </section>
    </div>
  );
};

export default FeedbackPage;
