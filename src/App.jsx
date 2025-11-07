// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroPlain from './components/HeroPlain';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<HeroPlain />} />

        {/* Páginas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Tela principal após login */}
        <Route path="/home" element={<Home />} />

        {/* Rota coringa (opcional) */}
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '80px' }}>Página não encontrada 😢</h2>} />
      </Routes>
    </BrowserRouter>
  );
}
