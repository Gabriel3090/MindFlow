// src/pages/Cadastro.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    
    try {
      
      const res = await fetch('/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        
        const err = await res.json().catch(() => ({ detail: 'Falha no cadastro' }));
        throw new Error(err.detail || 'Falha no cadastro');
      }

      
      navigate('/login', { replace: true });
    } catch (err) {
      
      alert(err.message || 'Erro ao conectar com o servidor');
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 520, padding: 28, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', background: '#fff' }}>
        <h2 style={{ margin: 0, marginBottom: 8, color: '#3f3f3f', fontFamily: 'Poppins, Inter, sans-serif' }}>Crie sua conta</h2>
        <p style={{ marginTop: 0, marginBottom: 18, color: '#6b7280' }}>Informe seu nome, e-mail e senha para começar.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#374151' }}>Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              {...register('name', { required: 'Nome obrigatório', minLength: { value: 2, message: 'Nome muito curto' } })}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e6e9ee' }}
            />
            {errors.name && <div style={{ color: '#dc2626', marginTop: 6, fontSize: 13 }}>{errors.name.message}</div>}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#374151' }}>E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              {...register('email', { required: 'E-mail obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Formato inválido' } })}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e6e9ee' }}
            />
            {errors.email && <div style={{ color: '#dc2626', marginTop: 6, fontSize: 13 }}>{errors.email.message}</div>}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#374151' }}>Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register('password', { required: 'Senha obrigatória', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e6e9ee' }}
            />
            {errors.password && <div style={{ color: '#dc2626', marginTop: 6, fontSize: 13 }}>{errors.password.message}</div>}
          </div>

          <button
            className="btn-criarconta-cadastro"
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%', padding: 12, borderRadius: 12,
              fontWeight: 700, border: 'none', cursor: 'pointer'
            }}
            aria-label="Criar conta"
          >
            {isSubmitting ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div style={{ marginTop: 16, fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
          <span>Já tem conta? </span>
          <Link to="/login" style={{ color: '#3cffa1', textDecoration: 'none' }}>Entrar</Link>
        </div>
      </div>
    </div>
  );
}
