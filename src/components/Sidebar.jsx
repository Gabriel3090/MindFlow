// src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import { useNavigate as useNavHook } from 'react-router-dom';

export default function Sidebar({ open = false, onClose = () => {}, navigate: navigateProp = null }) {
  const navHook = useNavHook();
  const nav = navigateProp || navHook;

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function handleLogout() {
    try { localStorage.removeItem('usuario'); } catch(e){}
    onClose();
    // volta pra landing/public
    nav('/');
  }

  const items = [
    { id: 'checkin', label: 'Check-in Diário', icon: '/icone_checkin.png', onClick: () => { onClose(); nav('/checkin'); } },
    { id: 'trilhas', label: 'Minhas Trilhas', icon: '/icone_trilhas.png', onClick: () => { onClose(); nav('/home'); } },
    { id: 'downloads', label: 'Downloads', icon: '/icone_download.png', onClick: () => { onClose(); nav('/downloads'); } },
    { id: 'feedback', label: 'Feedback', icon: '/icone_feedback.png', onClick: () => { onClose(); nav('/feedback'); } },
    { id: 'sobre', label: 'Sobre', icon: '/icone_sobre.png', onClick: () => { onClose(); nav('/'); } },
    { id: 'sair', label: 'Sair', icon: '/icone_sair.png', onClick: handleLogout },
  ];

  return (
    <>
      {/* overlay */}
      <div
        aria-hidden={!open}
        className={`sidebar-overlay ${open ? 'open' : ''}`}
        onClick={() => onClose()}
        style={{
          position: 'fixed',
          inset: 0,
          background: open ? 'rgba(0,0,0,0.35)' : 'transparent',
          transition: 'background .22s',
          pointerEvents: open ? 'auto' : 'none',
          zIndex: 1200
        }}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`sidebar-panel ${open ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 300,
          maxWidth: '85vw',
          transform: open ? 'translateX(0)' : 'translateX(-104%)',
          transition: 'transform .28s cubic-bezier(.2,.9,.2,1)',
          background: '#3f3f3f',
          color: 'white',
          zIndex: 1250,
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          padding: '18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo_mindflow.png" alt="MindFlow" style={{ width: 44, height: 44, borderRadius: 8 }} />
            <div style={{ fontWeight: 500 }}>MindFlow</div>
          </div>

          <button
            aria-label="Fechar menu"
            onClick={() => onClose()}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: 22,
              cursor: 'pointer',
              padding: 6,
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        <nav aria-label="Navegação principal" style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          {items.map(it => (
            <button
              key={it.id}
              onClick={it.onClick}
              className="sidebar-item"
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                padding: '12px 10px',
                borderRadius: 10,
                background: 'transparent',
                color: 'white',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background .14s, transform .08s'
              }}
            >
              <img src={it.icon} alt="" style={{ width: 28, height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontWeight: 700 }}>{it.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          <div style={{ marginBottom: 8 }}>MVP  • MindFlow</div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </aside>
    </>
  );
}
