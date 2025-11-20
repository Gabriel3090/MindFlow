// src/pages/Checkin.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MOODS = [
  { id: 'sobrecarregado', label: 'Sobrecarregado(a)', emoji: '🥵', color: '#ff1a1aff' },
  { id: 'preocupado', label: 'Preocupado(a)', emoji: '😟', color: '#ff7f23ff' },
  { id: 'neutro', label: 'Neutro(a)', emoji: '😐', color: '#77fda1ff' },
  { id: 'bem', label: 'Bem', emoji: '🙂', color: '#20ff63ff' },
  { id: 'excelente', label: 'Excelente', emoji: '😁', color: '#fbff00ff' },
];

const TAGS = [
  'Concentração', 'Qualidade do Sono', 'Preocupação Excessiva',
  'Falta de Foco', 'Estresse no Trabalho', 'Ansiedade Social', 'Procrastinação', 'Autocrítica', 'Fadiga Mental', 'Outros',
];

const TIMES = [
  { id: '5', label: '5 minutos' },
  { id: '15', label: '15 minutos' },
  { id: '20+', label: 'Mais de 20 minutos' }
];

const WELCOMES = [
  "Obrigado por nos contar! Estamos aqui para ajudar a trazer mais leveza ao seu dia.",
  "Valeu por compartilhar — vamos indicar algo simples e útil agora.",
  "Obrigado por confiar — escolhemos uma prática curta para você.",
];

export default function Checkin() {
  const navigate = useNavigate();
  const [mood, setMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [time, setTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    // se quiser, carregar último check-in
    const prev = localStorage.getItem('mf_last_checkin');
    if (prev) {
      // mantém histórico (não auto-seleciona)
    }
  }, []);

  const toggleTag = (t) => {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  function buildRecommendation(mood, tags, time) {
    if (!mood) return null;
    if (mood === 'sobrecarregado' || tags.includes('Estresse no Trabalho')) {
      if (time === '5') return { title: 'Foco Rápido', minutes: 5, desc: 'Sequência de respirações para reduzir pressão' };
      return { title: 'Relaxamento Progressivo', minutes: 10, desc: 'Relaxamento corporal guiado' };
    }
    if (mood === 'preocupado' || tags.includes('Preocupação Excessiva')) {
      return { title: 'Ancoragem', minutes: 5, desc: 'Ancoragens curtas para acalmar a mente' };
    }
    if (time === '15') return { title: 'Meditação Guiada', minutes: 15, desc: 'Prática para foco e clareza' };
    return { title: 'Foco Rápido', minutes: 5, desc: 'Sequência prática para retomar a atenção' };
  }

  function handleSubmit(e) {
    e && e.preventDefault();
    if (!mood || !time) {
      alert('Escolha pelo menos o humor e o tempo disponível para receber a recomendação.');
      return;
    }

    const payload = { mood, tags, time, at: new Date().toISOString() };
    localStorage.setItem('mf_last_checkin', JSON.stringify(payload));

    setWelcomeMsg(WELCOMES[Math.floor(Math.random() * WELCOMES.length)]);
    const rec = buildRecommendation(mood, tags, time);
    setRecommendation(rec);
    setSubmitted(true);

    // opcional: incrementar contador de dias de uso (streak)
    try {
      const lastDate = localStorage.getItem('mf_last_checkin_date');
      const today = new Date().toISOString().slice(0,10);
      if (lastDate !== today) {
        localStorage.setItem('mf_last_checkin_date', today);
        const prev = parseInt(localStorage.getItem('mf_dias_ofensiva')||'0',10);
        localStorage.setItem('mf_dias_ofensiva', String(prev+1));
      }
    } catch {}
  }

  const canSubmit = mood && time;

  return (
    <div className="checkin-page" style={{ padding: '36px 20px', fontFamily: 'Poppins, Inter, sans-serif', background: '#f7faf8', minHeight: '100vh' }}>
      <div className="checkin-inner" style={{ maxWidth: 980, margin: '0 auto' }}>
        <header className="checkin-header" style={{ background: 'linear-gradient(180deg,#f0fff6,#ffffff)', padding: 26, borderRadius: 12, marginBottom: 20 }}>
          <h1 className="checkin-title" style={{ margin: 0, fontSize: 32, color: '#0f172a' }}>Como você está se sentindo hoje?</h1>
          <p className="checkin-sub" style={{ color: '#6b7280', marginTop: 8 }}>Faça um rápido check-in e receba uma recomendação personalizada.</p>
        </header>

        <form className="checkin-form" onSubmit={handleSubmit}>
          {/* Mood */}
          <section className="checkin-section mood-section" style={{ marginBottom: 20 }}>
            <h3 className="section-title" style={{ margin: '8px 0 12px 0' }}>Escolha o que mais se aproxima do seu estado atual:</h3>
            <div className="mood-grid" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {MOODS.map(m => {
                const selected = mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`mood-button ${selected ? 'selected' : ''}`}
                    onClick={() => setMood(m.id)}
                    aria-pressed={selected}
                    style={{
                      minWidth: 180,
                      height: 110,
                      borderRadius: 12,
                      border: selected ? `4px solid rgba(60,255,161,0.9)` : '1px solid rgba(0,0,0,0.06)',
                      background: selected ? m.color : '#fff',
                      boxShadow: selected ? '0 10px 30px rgba(60,255,161,0.12)' : '0 6px 18px rgba(15,23,42,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      marginTop: 10,
                      marginBottom: 10,
                      cursor: 'pointer',
                      transition: 'transform .12s, box-shadow .12s',
                      outline: 'none'
                    }}
                  >
                    <div className="mood-emoji" style={{ fontSize: 34 }}>{m.emoji}</div>
                    <div className="mood-label" style={{ fontSize: 14, color: '#0f172a' }}>{m.label}</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tags */}
          <section className="checkin-section tags-section" style={{ marginBottom: 20 }}>
            <h3 className="section-title" style={{ margin: '8px 0 12px 0' }}>O que mais está incomodando agora?</h3>
            <div className="tags-grid" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {TAGS.map(t => {
                const active = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    className={`tag-chip ${active ? 'active' : ''}`}
                    onClick={() => toggleTag(t)}
                    style={{
                      padding: '10px 14px',
                      marginTop: 20,
                      borderRadius: 999,
                      background: active ? '#3cffa1' : '#ebebebff',
                      border: active ? 'none' : '1px solid #eee',
                      color: active ? '#06313a' : '#444',
                      cursor: 'pointer',
                      marginRight: 30,
                      fontWeight: 700
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Time */}
          <section className="checkin-section time-section" style={{ marginBottom: 20, marginTop: 30 }}>
            <h3 className="section-title" style={{ margin: '8px 0 12px 0' }}>Quanto tempo você tem para a prática hoje?</h3>
            <div className="time-grid" style={{ display: 'flex', gap: 12 }}>
              {TIMES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`time-btn ${time === t.id ? 'selected' : ''}`}
                  onClick={() => setTime(t.id)}
                  style={{
                    padding: '10px 18px',
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 999,
                    background: time === t.id ? '#3cffa1' : '#ecececff',
                    border: time === t.id ? 'none' : '1px solid #eee',
                    color: time === t.id ? '#06313a' : '#444',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="checkin-cta" style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`cta-btn ${canSubmit ? 'enabled' : 'disabled'}`}
              style={{
                width: '80%',
                maxWidth: 640,
                padding: 16,
                borderRadius: 999,
                background: canSubmit ? '#3cffa1' : '#cfeee0',
                border: 'none',
                color: '#06313a',
                fontWeight: 600,
                fontSize: 18,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                boxShadow: canSubmit ? '0 12px 30px rgba(60,255,161,0.12)' : 'none'
              }}
            >
              Ver Recomendação
            </button>
          </div>
        </form>

        {/* Resultado / mensagem de acolhimento */}
        {submitted && (
          <div className="checkin-result-wrap" style={{ marginTop: 28, maxWidth: 880, marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="checkin-result" style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
              <div className="result-thanks" style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Obrigado por compartilhar</div>
              <div className="result-welcome" style={{ color: '#6b7280', marginBottom: 12 }}>{welcomeMsg}</div>

              {recommendation ? (
                <div className="result-recommendation" style={{ display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div>
                    <div className="rec-title" style={{ fontSize: 18, fontWeight: 800 }}>{recommendation.title} — {recommendation.minutes} min</div>
                    <div className="rec-desc" style={{ color: '#6b7280', marginTop: 6 }}>{recommendation.desc}</div>
                  </div>

                  <div className="rec-actions" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button
                      className="rec-start"
                      onClick={() => {
                        alert(`Iniciando: ${recommendation.title} — (simulação)`);
                      }}
                      style={{
                        padding: '10px 16px',
                        borderRadius: 10,
                        background: '#16a34a',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Iniciar Sessão
                    </button>

                    <button
                      className="rec-again"
                      onClick={() => {
                        setSubmitted(false);
                        setRecommendation(null);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        background: '#f3f4f6',
                        border: '1px solid #e6e6e6',
                        cursor: 'pointer'
                      }}
                    >
                      Fazer outro check-in
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rec-none" style={{ color: '#6b7280' }}>Não encontramos uma recomendação — tente ajustar suas escolhas.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
