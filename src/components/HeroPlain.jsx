import React from 'react';

export default function HeroPlain(){
  return (
    <>
      
      <header className="hero" role="banner" style={{maxWidth:1200, margin:'36px auto', padding:'28px 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'center'}}>
        <div className="hero-left">
          <h1 className="h1" style={{fontFamily:'Poppins, Inter, sans-serif', fontWeight:800, fontSize:46, lineHeight:1, marginBottom:18}}>
            <div style={{color:'#3f3f3f'}}>Respire.</div>
            <div style={{color:'#3cffa1'}}>Reflita.</div>
            <div style={{color:'#3f3f3f'}}>Renove.</div>
          </h1>

          <p className="lead" style={{color:'#6b7280', fontSize:18, maxWidth:560, marginBottom:22}}>
            <strong style={{color:'#3cffa1'}}>Seu primeiro passo para o Mindfulness.</strong>{' '}
            Comece já a cuidar da sua saúde mental de forma prática para o dia-a-dia.
          </p>

          <div className="cta-row" style={{display:'flex', gap:14, alignItems:'center', marginBottom:18}}>
            <a href="#" className="btn btn-primary btn-large" style={{padding:'12px 22px', borderRadius:16, background:'#3cffa1', color:'#3f3f3f', fontWeight:700, textDecoration:'none'}}>Comece gratuitamente</a>
            <a href="#" className="btn btn-ghost btn-large" style={{padding:'12px 22px', borderRadius:16, border:'1px solid #e6e9ee', textDecoration:'none', color:'#3f3f3f'}}>Ver trilhas</a>
          </div>

          <div className="badges" style={{display:'flex', gap:24, alignItems:'center', marginTop:8, color:'#6b7280', fontSize:14}}>
            <div className="badge-item">Acesso gratuito</div>
            <div className="badge-item">Trilhas Personalizadas</div>
            <div className="badge-item">Privacidade garantida</div>
          </div>
        </div>

        <div className="hero-right" style={{display:'flex', justifyContent:'center'}}>
          <img src="/hero-photo.jpeg" alt="MindFlow" className="hero-img" style={{width:'100%', maxWidth:520, borderRadius:16, boxShadow:'0 18px 40px rgba(15,23,42,0.08)'}} />
        </div>
      </header>
    </>
  );
}
