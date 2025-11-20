import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";


const mockTrilhas = [
  { id: 1, title: "Foco Rápido - Mantenha seu foco", progress: 0, color: "#64b5f6", image: "/home_trilha1.png", sessions: 3, duration: 15, tag: "Concentração", level: "Iniciante" },
  { id: 2, title: "Mindfulness - Atenção plena", progress: 0, color: "#6fd1b8", image: "/home_trilha2.jpg", sessions: 4, duration: 15, tag: "Relaxamento", level: "Intermediário" },
  { id: 3, title: "Fadiga Mental - Alivie o estresse", progress: 0, color: "#5ec7c4", image: "/home_trilha3.png", sessions: 3, duration: 10, tag: "Sono", level: "Iniciante" },
  { id: 4, title: "Sono Tranquilo - Relaxe para uma boa noite de sono", progress: 0, color: "#7ad8c9", image: "/home_trilha4.png", sessions: 3, duration: 20, tag: "Bem-estar", level: "Iniciante" },
  { id: 5, title: "Meditação Profunda - Autocuidado para o corpo e a mente", progress: 0, color: "#4fb0d9", image: "/home_trilha5.png", sessions: 5, duration: 25, tag: "Concentração", level: "Avançado" }
];

function ProgressBar({ value = 0, color = "#3cffa1" }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="mf-progress-track" aria-hidden>
      <div className="mf-progress-fill" style={{ width: `${safe}%`, background: color }} />
    </div>
  );
}


function mergeSavedWithDefaults(savedArray, defaults) {
  try {
    if (!Array.isArray(savedArray)) return defaults;

    const savedMap = new Map(savedArray.map(t => [String(t.id), t]));

    return defaults.map(def => {
      const s = savedMap.get(String(def.id));
      if (!s) return def;

      return {
        
        ...def,
        
        ...s,
        image: s.image || def.image,
        sessions: typeof s.sessions === "number" ? s.sessions : def.sessions,
        duration: typeof s.duration === "number" ? s.duration : def.duration,
        tag: s.tag || def.tag,
        level: s.level || def.level,
        progress: typeof s.progress === "number" ? s.progress : def.progress,
      };
    });
  } catch (e) {
    console.warn("mergeSavedWithDefaults erro:", e);
    return defaults;
  }
}

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [trilhas, setTrilhas] = useState(() => {
    try {
      const raw = localStorage.getItem("mf_trilhas_v1");
      if (!raw) return mockTrilhas;

      const parsed = JSON.parse(raw);
      // se parsed for array mas com formato antigo, mescla com defaults
      if (Array.isArray(parsed)) {
        return mergeSavedWithDefaults(parsed, mockTrilhas);
      }
      // se parsed for objeto (um caso estranho), tenta extrair array
      if (parsed && parsed.trilhas && Array.isArray(parsed.trilhas)) {
        return mergeSavedWithDefaults(parsed.trilhas, mockTrilhas);
      }
      return mockTrilhas;
    } catch (e) {
      console.warn("Falha ao carregar trilhas do localStorage; usando defaults", e);
      return mockTrilhas;
    }
  });

  useEffect(() => {
    // verificar usuário autenticado
    const savedUser = localStorage.getItem("usuario");
    if (!savedUser) {
      navigate("/login", { replace: true });
    } else {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
    
  }, [navigate]);

  
  useEffect(() => {
    try {
      localStorage.setItem("mf_trilhas_v1", JSON.stringify(trilhas));
    } catch (e) {
      console.warn("Erro salvando trilhas no localStorage", e);
    }
  }, [trilhas]);

  function abrirTrilha(id) {
    navigate(`/trilha/${id}`);
  }

  function handlePlayClick(e, id) {
    e.stopPropagation();
    abrirTrilha(id);
  }

  const stats = useMemo(() => {
    const total = trilhas.length;
    const sum = trilhas.reduce((s, t) => s + (Number(t.progress) || 0), 0);
    const avg = Math.round(sum / (total || 1));
    const completed = trilhas.filter(t => Number(t.progress) >= 100).length;
    return { total, avg, completed };
  }, [trilhas]);

  return (
    <div className="mf-page">
      <div className="mf-wrapper">
        <main className="mf-left">
          <div className="mf-card mf-card-page-title">
            <h1 className="mf-title">Suas Trilhas <span role="img" aria-label="rocket">🚀</span></h1>
            <p className="mf-subtitle">Continue de onde parou, <strong>{user ? user.email : "Usuário"}</strong>.</p>
          </div>

          {trilhas.map(trilha => (
            <article
              key={trilha.id}
              className="trilha-card"
              role="button"
              tabIndex={0}
              onClick={() => abrirTrilha(trilha.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') abrirTrilha(trilha.id); }}
            >
              <div className="trilha-card-inner">
                <div className="trilha-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div className="trilha-title">{trilha.title}</div>
                      <div className="trilha-subinfo">{trilha.progress}% completo</div>
                    </div>

                    <button
                      onClick={(e) => handlePlayClick(e, trilha.id)}
                      className="play-btn"
                      aria-label={`Abrir trilha ${trilha.title}`}
                      title="Abrir trilha"
                    >
                      ▶
                    </button>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <ProgressBar value={trilha.progress} color={trilha.color} />
                  </div>

                  
                  <div className="trilha-image-center">
                    {trilha.image ? (
                      
                      <img src={trilha.image} alt={trilha.title} className="trilha-image-large" />
                    ) : (
                      <div className="trilha-image-placeholder">Sem imagem</div>
                    )}
                  </div>

                  <div className="trilha-meta">
                    <div className="meta-left">
                      <img src="/icone_fone.png" alt="sessões" className="meta-icon" />
                      <span className="meta-text">{trilha.sessions ?? '—'} sessões</span>

                      <img src="/icone_timer.png" alt="duração" className="meta-icon" style={{ marginLeft: 16 }} />
                      <span className="meta-text">{trilha.duration ?? '—'} min</span>

                      <img src="/icone_brain.png" alt="tag" className="meta-icon" style={{ marginLeft: 16 }} />
                      <span className="meta-text">{trilha.tag ?? '—'}</span>
                    </div>

                    <div className="meta-right">
                      <span className="pill-level">{trilha.level ?? ''}</span>
                      <span className="pill-time">{trilha.duration ? `${trilha.duration} min` : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </main>

        <aside className="mf-right">
          <div className="mf-card">
            <h3 style={{ marginTop: 0 }}>Acesso Rápido</h3>
            <div className="quick-grid">
              <button className="quick-btn" onClick={() => navigate('/checkin')}>
                <span className="quick-icon"><img src="/icone_checkin2.png" alt="Check-in" /></span>
                <div className="quick-label">Check-in</div>
              </button>

              <button className="quick-btn" onClick={() => alert('Áudios (simulação)')}>
                <span className="quick-icon"><img src="/icone_fone.png" alt="Áudios" /></span>
                <div className="quick-label">Áudios</div>
              </button>

              <button className="quick-btn" onClick={() => alert('Dormir (simulação)')}>
                <span className="quick-icon"><img src="/icone_lua.png" alt="Dormir" /></span>
                <div className="quick-label">Dormir</div>
              </button>

              <button className="quick-btn" onClick={() => alert('Relaxar (simulação)')}>
                <span className="quick-icon"><img src="/icone_relax.png" alt="Relaxar" /></span>
                <div className="quick-label">Relaxar</div>
              </button>
            </div>

          </div>

          <div style={{ height: 18 }} />

          

          <div className="mf-card">
            <h4 style={{ marginTop: 0 }}>Recomendado para você</h4>
            <div className="rec-list">
              <div className="rec-item">
                <div className="rec-left">
                  <div className="rec-title">Mindfulness</div>
                  <div className="rec-meta">15 min · Atenção</div>
                </div>
                <button className="rec-play" onClick={() => abrirTrilha(1)}>▶</button>
              </div>

              <div className="rec-item">
                <div className="rec-left">
                  <div className="rec-title">Sono</div>
                  <div className="rec-meta">20 min · Bem-estar</div>
                </div>
                <button className="rec-play" onClick={() => abrirTrilha(5)}>▶</button>
              </div>

              <div className="rec-item">
                <div className="rec-left">
                  <div className="rec-title">Foco Rápido</div>
                  <div className="rec-meta">5 min · Concentração</div>
                </div>
                <button className="rec-play" onClick={() => abrirTrilha(4)}>▶</button>
              </div>
            </div>
          </div>

          <div style={{ height: 18 }} />

          <div className="mf-card">
            <h4 style={{ marginTop: 0 }}>Estatísticas</h4>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div>
                <div className="stat-label">Progresso médio</div>
                <div className="stat-value">{stats.avg}%</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div className="stat-label">Concluídas</div>
                <div className="stat-value">{stats.completed}/{stats.total}</div>
              </div>
            </div>
          </div>

          <div className="title-premium">Seja Premium MindFlow</div>
          <div className="desc-premium">Desbloqueie todas as trilhas e recursos exclusivos.</div>
          <div style={{ height: 12 }} />
          
          <div className="card-premium">
            <img src="/card_premium.png" alt="MindFlow Premium" className="card-premium-image" />
          </div>

          <div>
            <button
              className="btn-premium"
              onClick={() => alert('Upgrade para Premium (simulação)')}
            >
              Quero ser Premium!
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
