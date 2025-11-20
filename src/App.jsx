// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroPlain from './components/HeroPlain';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Trilha from './pages/Trilha'; // <- certifica que o arquivo existe aqui
import Perfil from './pages/Perfil'; // 1. Importa o componente Perfil
import Checkin from './pages/Checkin';

// ErrorBoundary opcional (vem abaixo caso queira usar)
function ErrorFallback({ error }) {
  return (
    <div style={{ padding: 40 }}>
      <h2>Ocorreu um erro</h2>
      <pre style={{ whiteSpace: 'pre-wrap', color: '#a00' }}>{String(error)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HeroPlain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} /> {/* 2. Nova Rota para o Perfil */}
        <Route path="/trilha/:id" element={<Trilha />} /> {/* <-- rota da trilha */}
        <Route path="/checkin" element={<Checkin />} />
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '80px' }}>Página não encontrada 😢</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
