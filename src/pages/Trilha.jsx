// src/pages/Trilha.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

/* defaults (caso localStorage esteja vazio) */
const defaultTrilhas = [
  {
    id: 1,
    title: "Fundamentos do Autocuidado",
    description: "O seu ponto de partida para a atenção plena. Aprenda a base para gerenciar o estresse diário.",
    modules: [
      { id: 'm1', title: 'O Que é Autocuidado?', duration: 5, audio: '/audios/m1_audio_teste_chuva.mp3', icon: '/icone_star.png' },
      { id: 'm2', title: 'O Poder do Aqui e Agora', duration: 3, audio: '/audios/m2_audio_teste_chuva.mp3', icon: '/icone_star.png' },
      { id: 'm3', title: 'Meditação Guiada', duration: 7, audio: '/audios/m3_audio_teste_chuva.mp3', icon: '/icone_star.png' }
    ]
  },
  
];

function calcProgress(mods) {
  const list = Array.isArray(mods) ? mods : [];
  if (list.length === 0) return 0;
  const done = list.filter(m => m && m.done).length;
  return Math.round((done / list.length) * 100);
}

/* Normaliza módulos recebidos do storage ou de defaults.
   Garante {id, title, duration, icon, audio, done} */
function normalizeModules(mods) {
  if (!Array.isArray(mods)) return [];
  return mods.map(m => ({
    id: m.id,
    title: m.title || 'Untitled',
    duration: Number(m.duration) || 0,
    icon: m.icon || '/icone_star.png',
    audio: m.audio || null,
    // aceita formato antigo: status === 'done' ou new done boolean
    done: m.done === true || m.status === 'done' ? true : false
  }));
}

export default function Trilha() {
  const { id } = useParams();
  const storageKey = 'mf_trilhas_v1';

  const [trilha, setTrilha] = useState(null);
  const [loading, setLoading] = useState(true);

  // áudio
  const audioRef = useRef(null);
  const [currentAudioSrc, setCurrentAudioSrc] = useState(null);
  const [currentAudioModuleId, setCurrentAudioModuleId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(storageKey);
      const saved = savedRaw ? JSON.parse(savedRaw) : null;

      // tentativa de encontrar a trilha em storage (se for array)
      let chosen = null;
      if (Array.isArray(saved)) {
        const found = saved.find(t => String(t.id) === String(id));
        if (found) chosen = found;
      }

      
      if (!chosen) {
        chosen = defaultTrilhas.find(t => String(t.id) === String(id)) || defaultTrilhas[0];
      }

      
      const normalized = normalizeModules(chosen.modules);
      if (!normalized.length) {
        const fallback = defaultTrilhas.find(t => String(t.id) === String(id)) || defaultTrilhas[0];
        chosen = { ...chosen, modules: normalizeModules(fallback.modules) };
      } else {
        chosen = { ...chosen, modules: normalized };
      }

      setTrilha(chosen);
    } catch (e) {
      console.warn('Erro ao carregar trilhas do localStorage — usando defaults.', e);
      const fallback = { ...defaultTrilhas[0], modules: normalizeModules(defaultTrilhas[0].modules) };
      setTrilha(fallback);
    } finally {
      setLoading(false);
    }
  }, [id]);

  function persistUpdate(updated) {
    try {
      const savedRaw = localStorage.getItem(storageKey);
      const saved = savedRaw ? JSON.parse(savedRaw) : null;

      let nextAll = [];
      if (Array.isArray(saved)) {
        nextAll = saved.map(t => (String(t.id) === String(updated.id) ? updated : t));
        if (!nextAll.find(t => String(t.id) === String(updated.id))) {
          nextAll.push(updated);
        }
      } else {
        nextAll = defaultTrilhas.map(t => (String(t.id) === String(updated.id) ? updated : t));
        if (!nextAll.find(t => String(t.id) === String(updated.id))) nextAll.push(updated);
      }

      localStorage.setItem(storageKey, JSON.stringify(nextAll));
    } catch (e) {
      console.warn('Erro ao salvar trilha no localStorage', e);
      try {
        localStorage.setItem(storageKey, JSON.stringify([updated]));
      } catch (err) { /* swallow */ }
    }
    setTrilha(updated);
  }

  
  function toggleDone(moduleId) {
    if (!trilha) return;
    const next = {
      ...trilha,
      modules: (trilha.modules || []).map(m => (m.id === moduleId ? { ...m, done: !m.done } : m))
    };
    persistUpdate(next);
  }

  
  function marcarConcluido(moduleId) {
    if (!trilha) return;
    const next = {
      ...trilha,
      modules: trilha.modules.map(m => (m.id === moduleId ? { ...m, done: true } : m))
    };
    persistUpdate(next);
  }

  
  function iniciarModulo(moduleId) {
    if (!trilha) return;
    const mod = (trilha.modules || []).find(m => m.id === moduleId);
    if (!mod) return;

    
    if (currentAudioModuleId === moduleId && isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    const ok = window.confirm(`Iniciar: "${mod.title}" — ${mod.duration} min?\n(Áudio será reproduzido. Ao terminar a lição, ela será marcada como concluída.)`);
    if (!ok) return;

    if (mod.audio) {
      // pausa áudio anterior se houver
      if (audioRef.current) {
        try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch (e) {}
      }
      setCurrentAudioSrc(mod.audio);
      setCurrentAudioModuleId(moduleId);
      setIsPlaying(true);
      // o useEffect abaixo iniciará a reprodução quando currentAudioSrc mudar
    } else {
      // sem áudio: alterna marcação (comportamento simples)
      toggleDone(moduleId);
    }
  }

  
  useEffect(() => {
    if (!currentAudioSrc) return;
    const a = audioRef.current;
    if (!a) return;

    a.load();
    const playPromise = a.play();
    if (playPromise && playPromise.then) {
      playPromise.then(() => setIsPlaying(true)).catch(err => {
        console.warn('Playback falhou:', err);
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(true);
    }

    return () => {
      try { a.pause(); a.currentTime = 0; } catch (e) {}
      setIsPlaying(false);
    };
  }, [currentAudioSrc]);

  function handleAudioEnded() {
    if (currentAudioModuleId) {
      marcarConcluido(currentAudioModuleId);
    }
    setIsPlaying(false);
    setCurrentAudioModuleId(null);
    setCurrentAudioSrc(null);
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentAudioModuleId(null);
    setCurrentAudioSrc(null);
  }

  if (loading || !trilha) return <div style={{ padding: 28 }}>Carregando trilha…</div>;

  const modulesList = Array.isArray(trilha.modules) ? trilha.modules : [];
  const progress = calcProgress(modulesList);
  const totalDuration = modulesList.reduce((s, m) => s + (Number(m.duration) || 0), 0);
  const completedCount = modulesList.filter(m => m.done).length;

  return (
    <div style={{ padding: '36px 20px', fontFamily: 'Poppins, Inter, sans-serif', background: '#f7faf8' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.06)', marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 32, color: '#0f172a' }}>{`Trilha ${trilha.id}: ${trilha.title}`}</h1>
          <p style={{ color: '#6b7280', marginTop: 8 }}>{trilha.description}</p>

          <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 180px', background: '#f7fff8', padding: 12, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src="/icone_checkup.png" alt="Módulos" width="40" height="36" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: '#374151' }}>Módulos</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{modulesList.length} Lições</div>
              </div>
            </div>

            <div style={{ flex: '1 1 180px', background: '#f1f7ff', padding: 12, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src="/icone_tempo.png" alt="Duração" width="40" height="36" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: '#374151' }}>Duração</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{totalDuration} min totais</div>
              </div>
            </div>

            <div style={{ flex: '1 1 180px', background: '#fff7f9', padding: 12, borderRadius: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src="/icone_heart.png" alt="Progresso" width="38" height="40" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: '#374151' }}>Progresso</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{completedCount}/{modulesList.length} completo</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, height: 12, background: '#e6eef0', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#3cffa1,#64b5f6)', transition: 'width .4s' }} />
              </div>
              <div style={{ width: 48, textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>{progress}%</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <button
              className="btn-continuar-trilha"
              onClick={() => {
                const next = modulesList.find(m => !m.done);
                if (next) iniciarModulo(next.id);
                else {
                  if (window.confirm('Já completou tudo — deseja reiniciar a trilha (limpar progresso)?')) {
                    const reset = { ...trilha, modules: modulesList.map(m => ({ ...m, done: false })) };
                    persistUpdate(reset);
                  }
                }
              }}
              style={{ width: '100%', padding: 14, borderRadius: 12, color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Continuar Trilha
            </button>
          </div>

          {/* Player de Áudio (visível quando um áudio está carregado) */}
          {currentAudioSrc && (
            <div style={{ marginTop: 16, background: '#fff', padding: 12, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', display:'flex', gap:12, alignItems:'center' }}>
              <audio
                ref={audioRef}
                src={currentAudioSrc}
                onEnded={handleAudioEnded}
                controls
                style={{ width: '100%' }}
                preload="auto"
              />
              <div style={{ display:'flex', flexDirection:'column', gap:6, minWidth:140 }}>
                <div style={{ fontWeight:700, color:'#0f172a' }}>{`Tocando: ${currentAudioModuleId || ''}`}</div>
                <div style={{ fontSize:13, color:'#6b7280' }}>{isPlaying ? 'Reproduzindo...' : 'Pausado'}</div>
                <div style={{ display:'flex', gap:8 }}>
                  <button onClick={() => audioRef.current && audioRef.current.play()} style={{ padding:'8px 10px', borderRadius:8 }}>▶︎</button>
                  <button onClick={() => audioRef.current && audioRef.current.pause()} style={{ padding:'8px 10px', borderRadius:8 }}>❚❚</button>
                  <button onClick={stopAudio} style={{ padding:'8px 10px', borderRadius:8 }}>⏹</button>
                </div>
              </div>
            </div>
          )}

        </div>

        
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Jornada de Aprendizado</h2>

        <div style={{ display: 'grid', gap: 18 }}>
          {modulesList.map((m, idx) => {
            const isDone = !!m.done;
            const isLast = idx === modulesList.length - 1;

            return (
              <div key={m.id} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{ width: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    
                  }}>
                    
                  </div>

                  {!isLast && (
                    <div aria-hidden style={{
                      width: 2,
                      flex: 1,
                      background: '#e6f3ea',
                      marginTop: 6,
                      borderRadius: 2
                    }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 6px 16px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      {m.icon && <img src={m.icon} alt="" width="48" height="48" style={{ flexShrink: 0, borderRadius: 8 }} />}
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 16 }}>{m.title}</div>
                        <div style={{ color: '#6b7280', fontSize: 13, marginTop: 6 }}>{m.duration} min</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {isDone ? (
                        <button
                          onClick={() => toggleDone(m.id)}
                          style={{ padding: '8px 12px', background: '#fff', border: '1px solid #e6f4ec', color: '#065f46', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Refazer
                        </button>
                      ) : (
                        <button
                          onClick={() => iniciarModulo(m.id)}
                          style={{ padding: '10px 14px', background: '#3cffa1', color: '#06313a', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Iniciar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
        <div style={{ marginTop: 26, background: '#f6fffb', padding: 18, borderRadius: 12, border: '1px solid rgba(24,120,87,0.06)' }}>
          <strong style={{ display: 'block', marginBottom: 6 }}>Continue sua jornada</strong>
          <div style={{ color: '#6b7280' }}>Cada lição é um passo em direção ao equilíbrio e bem-estar. Dedique alguns minutos por dia e transforme sua relação com o estresse.</div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
