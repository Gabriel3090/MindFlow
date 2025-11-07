import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/home";

  function handleLogout() {
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
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
        background: isHome ? homeBg : defaultBg,
        color: isHome ? homeColor : defaultColor,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="/logo_mindflow.png"
            alt="MindFlow"
            style={{ width: 50, height: 50, borderRadius: 10, objectFit: 'cover' }}
          />
          <Link
            to="/"
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

          {!isHome && (
            <div style={{ marginLeft: 20, display: 'flex', gap: 18 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Início</Link>
              <Link to="/sobre" style={{ color: 'white', textDecoration: 'none' }}>Sobre</Link>
              <Link to="/contato" style={{ color: 'white', textDecoration: 'none' }}>Contato</Link>
              <Link to="/assinatura" style={{ color: 'white', textDecoration: 'none' }}>Assinatura</Link>
            </div>
          )}
        </div>

        {!isHome ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link
              to="/login"
              style={{
                background: 'white',
                color: '#3f3f3f',
                padding: '8px 12px',
                borderRadius: 10,
                textDecoration: 'none'
              }}
            >
              Login
            </Link>
            <Link
              to="/cadastro"
              style={{
                background: '#3cffa1',
                color: '#3f3f3f',
                padding: '9px 14px',
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              Cadastro
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* NOVO ELEMENTO DE PERFIL */}
            <div
              onClick={handleLogout} // Você pode querer mudar isso para navegar para /perfil
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#3cffa1',
                color: defaultBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(60, 255, 161, 0.5)'
              }}
              title="Clique para Sair"
            >
              🧑‍💻
            </div>
            {/* FIM DO NOVO ELEMENTO DE PERFIL */}
          </div>
        )}
      </div>
    </nav>
  );
}