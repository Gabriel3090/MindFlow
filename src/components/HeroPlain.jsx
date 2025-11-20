import React from 'react';

export default function HeroPlain(){
  return (
    <>
      
      <header className="hero" role="banner" style={{maxWidth:1200, margin:'36px auto', padding:'28px 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, alignItems:'center'}}>
        <div className="hero-left">
          <h1 className="h1" style={{fontFamily:'Poppins, Inter, sans-serif', fontWeight:800, fontSize:46, lineHeight:1, marginBottom:18}}>
            <div style={{color:'#3f3f3f'}}>Respire.</div>
            <div style={{color:'#3cffa1ff'}}>Reflita.</div>
            <div style={{color:'#3f3f3f'}}>Renove.</div>
          </h1>

          <p className="lead" style={{color:'#6b7280', fontSize:18, maxWidth:560, marginBottom:22}}>
            <strong style={{color:'#3cffa1'}}>Seu primeiro passo para o Mindfulness.</strong>{' '}
            Comece já a cuidar da sua saúde mental de forma prática para o dia-a-dia.
          </p>

          <div className="cta-row" style={{display:'flex', gap:14, alignItems:'center', marginBottom:18}}>
            <a href="cadastro" className="btn btn-primary btn-large" style={{padding:'12px 22px', borderRadius:16, background:'#3cffa1', color:'#3f3f3f', fontWeight:700, textDecoration:'none'}}>Comece gratuitamente</a>
            <a href="#trilhas-preview" className="btn btn-ghost btn-large" style={{padding:'12px 22px', borderRadius:16, border:'1px solid #e6e9ee', textDecoration:'none', color:'#3f3f3f'}}>Ver trilhas</a>
          </div>

          <div className="badges" style={{display:'flex', gap:24, alignItems:'center', marginTop:8, color:'#6b7280', fontSize:14}}>
            <div className="badge-item">Acesso gratuito</div>
            <div className="badge-item">Trilhas Personalizadas</div>
            <div className="badge-item">Privacidade garantida</div>
          </div>
        </div>

        <div className="hero-right" style={{display:'flex', justifyContent:'center'}}>
          <img src="/hero-photo.jpeg" alt="MindFlow" className="hero-img" style={{width:'100%', maxWidth:520, marginLeft: 70, borderRadius:16, boxShadow:'0 18px 40px rgba(15,23,42,0.08)'}} />
        </div>
      </header>

                
      <section
        id="sobre-assinatura"
        style={{
          width: '100%',
          background: '#fff',
          padding: '80px 20px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            width: '80%',
            display: 'grid',
            gridTemplateColumns: '1fr 420px', /* texto à esquerda, cards fixos à direita */
            gap: 40,
            alignItems: 'start'
          }}
        >
          
          <div id="sobre" style={{ width: '80%' }}>
            <h2 id="sobre-title" style={{ fontSize: 28, color: '#3f3f3f', marginBottom: 24 }}>Sobre a MindFlow</h2>
            <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.6 }}>
              A MindFlow é uma plataforma de micro-práticas de mindfulness pensada para jovens (estudantes e profissionais)
              que enfrentam sobrecarga mental. Entregamos sessões curtas, trilhas adaptativas baseadas em check-ins e conteúdo
              direto ao ponto — tudo com linguagem acessível e baixo atrito para facilitar a adesão diária. Em um mundo acelerado,
              jovens adultos enfrentam estresse e ansiedade constantes, com poucas ferramentas práticas e acessíveis para o autocuidado.
              A MindFlow surge como um ponto de partida simples e eficaz para reduzir a sobrecarga mental no cotidiano.
              Conteúdo Personalizado: Oferecemos trilhas de meditação baseadas no que o usuário está sentindo. O conteúdo é leve e 
              visual, educando de forma direta e prática. O nosso público alvo é o jovem, estudante ou profissional que sofrem coisas como ansiedade de desempenho, estresse acadêmico e desafios do início de carreira.
            </p>
          </div>

          
          <aside id="assinatura" aria-labelledby="assinatura-title" style={{ width: '100%' }}>
            <h2 id="assinatura-title" style={{ fontSize: 28, color: '#3f3f3f', marginBottom: 24 }}>Assinatura</h2>

            {/* Card Freemium */}
            <div className="assinatura-card" style={{ background: '#d6fde2ff', marginBottom: 20 }}>
              <h4 style={{ marginTop: 0 }}>Freemium</h4>
              <p style={{ color: '#6b7280', fontSize: 14 }}>Acesso gratuito a recursos essenciais.</p>
              <ul style={{ marginTop: 8, color: '#374151' }}>
                <h4>✅ 3 sessões diárias grátis</h4>
                <h4>✅ Check-ins rápidos</h4>
                <h4>✅ Trilhas básicas</h4>
              </ul>
            </div>

            {/* Card Premium */}
            <div className="assinatura-card" style={{ border: '1px solid rgba(60,255,161,0.12)', background: '#d6fde2ff' }}>
              <h4 style={{ marginTop: 0 }}>Premium</h4>
              <p style={{ color: '#6b7280', fontSize: 14 }}>Recursos avançados para resultados mais rápidos.</p>
              <ul style={{ marginTop: 8, color: '#374151' }}>
                <h4>⭐ Acesso ilimitado às trilhas</h4>
                <h4>⭐ Recomendações personalizadas (prioridade)</h4>
                <h4>⭐ Downloads</h4>
              </ul>
            </div>

          </aside>
        </div>
      </section>


        
        
        <section
          id="trilhas-preview"
          style={{
            
            background: '#3f3f3f',
            padding: '60px 5%',         
            marginBottom: '80px', 
            marginTop: '80px',
            marginLeft: '160px', 
            marginRight: '160px', 
            boxSizing: 'border-box',
            borderRadius: 12,
          }}
        >

          <div
            className="full-width-inner"
            style={{
              maxWidth: 1200,           
              margin: '0 auto',
              textAlign: 'center',
              width: '100%'
            }}
          >
            <h2 id="trilhas-title" style={{fontSize:24, color:'white', marginBottom:8}}>Trilhas — preview</h2>
            <p style={{color:'#dbdbdbff', marginBottom:22, maxWidth:760, marginLeft:'auto', marginRight:'auto'}}>
              Conheça exemplos de trilhas projetadas para momentos do dia a dia. Para acessar a sessão completa, é necessário criar uma conta gratuita.
            </p>

            <div style={{display:'flex', gap:20, flexWrap:'wrap', justifyContent:'center', alignItems:'stretch'}}>
              {/* card 1 */}
              <article style={{flex:'1 1 300px', maxWidth:320, padding:20, borderRadius:12, background:'#fff', boxShadow:'0 8px 24px rgba(15,23,42,0.04)', textAlign:'left'}}>
                <h4 style={{marginTop:0, color:'#3f3f3f'}}>Foco Rápido — 5 min</h4>
                <p style={{color:'#6b7280', fontSize:14, lineHeight:1.5}}>
                  Uma sequência guiada de respirações e ancoragens — projetada para reduzir distrações e reorientar a atenção antes de uma sessão de estudo ou tarefa curta.
                </p>
              </article>

              {/* card 2 */}
              <article style={{flex:'1 1 300px', maxWidth:320, padding:20, borderRadius:12, background:'#fff', boxShadow:'0 8px 24px rgba(15,23,42,0.04)', textAlign:'left'}}>
                <h4 style={{marginTop:0, color:'#3f3f3f'}}>Relaxar antes de dormir — 10 min</h4>
                <p style={{color:'#6b7280', fontSize:14, lineHeight:1.5}}>
                  Exercícios de relaxamento progressivo e visualização curta para desacelerar mente e corpo — indicado para reduzir ruminações noturnas.
                </p>
              </article>

              {/* card 3 */}
              <article style={{flex:'1 1 300px', maxWidth:320, padding:20, borderRadius:12, background:'#fff', boxShadow:'0 8px 24px rgba(15,23,42,0.04)', textAlign:'left'}}>
                <h4 style={{marginTop:0, color:'#3f3f3f'}}>Foco Longo — 15 min</h4>
                <p style={{color:'#6b7280', fontSize:14, lineHeight:1.5}}>
                  Trilha para atenção sustentada, com técnicas de ancoragem e prática para manter ritmo em sessões de estudo mais prolongadas.
                </p>
              </article>
            </div>

            <p style={{marginTop:20, color:'#dbdbdbff', fontSize:13}}>
              Para iniciar qualquer trilha completa, <a href="/cadastro" style={{color:'#3cffa1', textDecoration:'none'}}>crie sua conta gratuita</a>.
            </p>
          </div>
        </section>




    </>
  );
}
