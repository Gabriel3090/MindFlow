import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      // Simulação de login local:
      if (data.email === "projeto@gmail.com" && data.password === "123456") {
        // Você poderia guardar um token no localStorage se quiser
        localStorage.setItem("usuario", JSON.stringify({ email: data.email }));
        navigate("/home", { replace: true }); // vai pra tela principal
      } else {
        throw new Error("E-mail ou senha incorretos");
      }
    } catch (err) {
      alert(err.message || "Erro ao autenticar");
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', padding: 28, background: '#fff' }}>
        <h2 style={{ margin: 0, marginBottom: 8, color: '#3f3f3f', fontFamily: 'Poppins, Inter, sans-serif' }}>Entrar</h2>
        <p style={{ marginTop: 0, marginBottom: 18, color: '#6b7280' }}>
          Use seu e-mail e senha para acessar a MindFlow.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#374151' }}>E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: "E-mail obrigatório",
                pattern: { value: /^\S+@\S+$/i, message: "Formato inválido" }
              })}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e6e9ee' }}
            />
            {errors.email && <div style={{ color: '#dc2626', marginTop: 6, fontSize: 13 }}>{errors.email.message}</div>}
          </div>

          <div style={{ marginBottom: 18 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#374151' }}>Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Senha"
              {...register("password", {
                required: "Senha obrigatória",
                minLength: { value: 6, message: "Mínimo 6 caracteres" }
              })}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e6e9ee' }}
            />
            {errors.password && <div style={{ color: '#dc2626', marginTop: 6, fontSize: 13 }}>{errors.password.message}</div>}
          </div>

          <button
            className="btn-continuar-login"
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%', padding: 12, borderRadius: 12,
              fontWeight: 700, border: 'none', cursor: 'pointer'
            }}
            aria-label="Continuar"
          >
            {isSubmitting ? 'Entrando...' : 'Continuar'}
          </button>
        </form>

        <div style={{ marginTop: 16, fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
          <span>Não tem conta? </span>
          <Link to="/cadastro" style={{ color: '#3cffa1', textDecoration: 'none' }}>Crie uma</Link>
        </div>
      </div>
    </div>
  );
}
