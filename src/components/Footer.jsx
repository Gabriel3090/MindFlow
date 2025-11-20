import React from 'react';

export default function Footer(){
  return (
    <footer id="contato" style={{background:'#3f3f3f', padding:'24px 20px', borderTop:'1px solid rgba(0,0,0,0.04)'}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'flex', gap:30, alignItems:'flex-start', flexWrap:'wrap', justifyContent:'space-between'}}>
        <div style={{flex:'1 1 320px'}}>
          <h3 style={{margin:0, fontSize:18, color:'#ffffffff'}}>Contato</h3>
          <p style={{color:'#ffffffff', marginTop:8}}>Fale com a gente para parcerias, dúvidas ou feedback.</p>
          
        </div>

        <div>
            <ul style={{listStyle:'none', padding:0, marginTop:1, color:'#ffffffff'}}>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                    <img src="/Instagram_icon.png" alt="Instagram" width="20" height="20" />
                    <span>
                        <strong>Instagram:</strong>
                        <a href="https://instagram.com/mindflow.projeto2025" target="_blank" rel="noreferrer" style={{color:'var(--mint)', textDecoration:'none'}}> @mindflow.projeto2025</a>
                    </span>
                </li>
                <li style={{marginTop:8, display:'flex', alignItems:'center', gap:'8px'}}>
                    <img src="/email_icon.png" alt="E-mail" width="20" height="20" />
                    <span>
                        <strong>E-mail:</strong>
                        <a href="mailto:projetomindflow007@gmail.com" style={{color:'var(--mint)', textDecoration:'none'}}> projetomindflow007@gmail.com</a>
                    </span>
                </li>
            </ul>
        </div>



        <div style={{flex:'0 0 280px', textAlign:'right', marginTop: 10, color:'#ffffffff', fontSize:13}}>
          <div>© {new Date().getFullYear()} MindFlow</div>
            <div>Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  );
}
