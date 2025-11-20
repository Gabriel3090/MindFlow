// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [diasOfensiva, setDiasOfensiva] = useState(0);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isHome = location.pathname === "/home";
  const isPerfil = location.pathname === "/perfil";
  const isCheckin = location.pathname === "/checkin" || location.pathname.startsWith("/checkin/");
  const isTrilha = location.pathname.startsWith("/trilha"); // detecta /trilha/:id
  const isInternalApp = isHome || isPerfil || isTrilha || isCheckin;; // considera Trilha como rota interna
  // normaliza o path removendo uma barra final (evita problemas com "/login/" etc)
const cleanPath = location.pathname.replace(/\/$/, '');

// rotas onde NÃO queremos o menu lateral
const noSidebarRoutes = ['/', '/login', '/cadastro'].map(p => p.replace(/\/$/, ''));

// mostrar o botão / sidebar apenas se não estivermos nessas rotas
const showSidebar = !noSidebarRoutes.includes(cleanPath);


  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Carrega dias de ofensiva do localStorage (fallback 0)
    const streak = parseInt(localStorage.getItem("mf_dias_ofensiva") || "0", 10);
    setDiasOfensiva(Number.isNaN(streak) ? 0 : streak);
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  }

  function handleProfileClick() {
    navigate("/perfil");
  }

  const defaultBg = '#3f3f3f';
  const defaultColor = 'white';
  const homeBg = defaultBg;
  const homeColor = defaultColor;

  return (
    <nav
      className="site-nav"
      role="navigation"
      aria-label="Main Navigation"
      style={{
        background: isInternalApp ? homeBg : defaultBg,
        color: isInternalApp ? homeColor : defaultColor,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          { showSidebar && (
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
              style={{
                background: 'transparent',
                border: 'none',
                padding: 6,
                marginRight: 6,
                cursor: 'pointer'
              }}
            >
              <img src="/icone_menu.png" alt="Menu" style={{ width: 45, height: 45 }} />
            </button>
          ) }

          
          <img
            src="/logo_mindflow.png"
            alt="MindFlow"
            style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover',  }}
          />
          <Link
            
            style={{
              color: defaultColor,
              fontFamily: 'Poppins, Inter, sans-serif',
              fontSize: 20,
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            MindFlow
          </Link>

          {!isInternalApp && (
            <div style={{ marginLeft: 20, display: 'flex', gap: 18 }}>
              <Link to="/" className="inicio-header" >Início</Link>
              <a href="#sobre" className="sobre-header" >Sobre</a>
              <a href="#assinatura" className="assinatura-header" >Assinatura</a>
              <a href="#contato" className="contato-header">Contato</a>
            </div>
          )}
        </div>

        {isInternalApp ? (
          isPerfil ? (
            <Link
              to="/home"
              style={{
                background: 'white',
                color: '#3f3f3f',
                padding: '8px 12px',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Voltar
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

                <img
                  src="/chama_icon.png"
                  alt="Dias de ofensiva"
                  style={{ width: 40, height: 40 }}
                />
                <span style={{ fontWeight: 700, color: '#ffffffff', fontSize: 26, marginRight: 15 }}>
                  {diasOfensiva}
                </span>
              </div>

              <div
                onClick={handleProfileClick}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: '#3cffa1',
                  color: defaultBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 0 10px rgba(60, 255, 161, 0.5)',
                  transition: 'transform 0.1s',
                }}
                title="Clique para acessar o Perfil"
              >
                {user && user.email ? user.email.charAt(0).toUpperCase() : '🧑'}
              </div>
            </div>
          )
        ) : (
          
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link
              to="/login"
              className="btn btn-ghost btn-ghost-dark"
              style={{ textDecoration: 'none', width: 70, height: 45 }}
            >
              Login
            </Link>
            <Link
              to="/cadastro"
              className="btn btn-primary btn-large"
              style={{ textDecoration: 'none' }}
            >
              Cadastro
            </Link>
          </div>
        )}
      </div>
      {/* renderiza o Sidebar (adicione logo dentro do JSX do Header) */}
      { showSidebar && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} navigate={navigate} />
      ) }


    </nav>
  );
}
