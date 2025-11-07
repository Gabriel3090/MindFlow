import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dados de exemplo para as Trilhas (MODIFICADO para Saúde Mental)
const mockTrilhas = [
  { id: 1, 
    title: "Trilha 1: Fundamentos do Autocuidado", 
    progress: 0, 
    // Cor azul claro, representando calma
    color: "#64b5f6" 
  },
  { id: 2, 
    title: "Trilha 2: Meditação e Atenção Plena (Mindfulness)", 
    progress: 0, 
    // Cor verde suave, representando equilíbrio
    color: "#81c784" 
  },
  { id: 3, 
    title: "Trilha 3: Gestão de Estresse e Ansiedade", 
    progress: 0, 
    // Cor roxa, representando reflexão e sabedoria
    color: "#ba68c8" 
  },
  { id: 4, 
    title: "Trilha 4: Saúde Física, Sono e Nutrição", 
    progress: 0, 
    // Cor laranja/amarelo, representando energia e foco
    color: "#ffb74d" 
  },
  { id: 5, 
    title: "Trilha 5: Comunicação Não-Violenta e Relações", 
    progress: 0, 
    // Cor cinza/azul mais escuro, representando estrutura
    color: "#4db6ac" 
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Carrega o usuário salvo no login
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (!savedUser) {
      // Se não estiver logado, volta pro login (rota '/')
      navigate("/", { replace: true }); 
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sua Trilha 🚀</h1>
        <p style={styles.subtitle}>
          Continue de onde parou, {user ? user.email : "Usuário"}.
        </p>

        <div style={styles.content}>
          {/* Mapeamento das Trilhas */}
          {mockTrilhas.map((trilha) => (
            <div key={trilha.id} style={styles.trilhaItem}>
              <span style={styles.trilhaTitle}>{trilha.title}</span>
              <div style={styles.progressBarContainer}>
                <div 
                  style={{
                    ...styles.progressBarFill,
                    width: `${trilha.progress}%`,
                    backgroundColor: trilha.color,
                  }}
                />
              </div>
              <span style={styles.trilhaProgress}>{trilha.progress}% completo</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 💅 Estilos inline simples e modernos
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Cor de fundo do MindFlow
    background: "linear-gradient(135deg, #3cffa1, #8df5ff)",
    fontFamily: "Poppins, Inter, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    textAlign: "left", // Mudamos para left para melhor leitura da lista
    maxWidth: "600px", // Aumentamos um pouco a largura para as trilhas
    width: "100%",
  },
  title: {
    marginBottom: "4px",
    fontSize: "30px",
    color: "#333",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#555",
    fontSize: "16px",
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  // NOVOS ESTILOS PARA AS TRILHAS
  trilhaItem: {
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#fafafa',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }
  },
  trilhaTitle: {
    fontWeight: 600,
    fontSize: '17px',
    color: '#3f3f3f',
    marginBottom: '8px',
    display: 'block'
  },
  progressBarContainer: {
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginBottom: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    transition: 'width 0.5s ease-in-out',
  },
  trilhaProgress: {
    fontSize: '13px',
    color: '#777',
    fontWeight: 500,
  }
};