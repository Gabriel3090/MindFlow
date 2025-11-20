import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Gera um URL SVG para um avatar com uma letra.
 * @param {string} letter A letra a ser exibida.
 * @returns {string} O URL de dados SVG.
 */
const getAvatarUrl = (letter) => {
    const bgColor = '#3cffa1'; // Cor de fundo da sua logo
    const textColor = '#3f3f3f'; // Cor do texto da sua logo
    const size = 150; // Tamanho do avatar

    const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${bgColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size * 0.6}" fill="${textColor}">${letter}</text>
    </svg>
  `.replace(/\n/g, ''); // Remove quebras de linha para manter o SVG em uma linha

    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Componente da página de Perfil do Usuário.
 * Exibe informações básicas e oferece opções de configuração.
 */
export default function Perfil() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("usuario");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const dadosDoUsuario = user || {
        nomeCompleto: 'Usuário Padrão',
        email: 'usuario.padrao@exemplo.com',
        fotoUrl: '', 
    };

    // Define a letra para o avatar
    const avatarLetter = (dadosDoUsuario.nomeCompleto || dadosDoUsuario.email).charAt(0).toUpperCase();
    // Define a URL da foto, priorizando a do usuário, depois o avatar gerado
    const profilePicture = dadosDoUsuario.fotoUrl || getAvatarUrl(avatarLetter);

    const displayName = dadosDoUsuario.nomeCompleto || dadosDoUsuario.nome || dadosDoUsuario.email;

    // Funções de Ação (Substituído alerts por console.log para evitar prompts)
    const handleEditPersonalInfo = () => console.log('Navegar para Edição de Informações Pessoais');
    const handleChangePassword = () => console.log('Abrir Modal/Página Alterar Senha');
    const handleNotificationPreferences = () => console.log('Navegar para Preferências de Notificação');
    const handlePrivacyAndData = () => console.log('Navegar para Privacidade e Dados');
    
    // Implementação da navegação para o Login
    const handleLogout = () => {
        // Limpa o token/dados de sessão
        localStorage.removeItem("usuario");
        console.log('Usuário desconectado. Redirecionando para /login.');
        
        // Redireciona para a rota de login
        navigate('/login'); 
    };
    
    // O handleBackToHome foi removido.

    return (
        <div style={styles.container}>
            {/* Seção da Foto de Perfil no Topo */}
            <div style={styles.profilePictureSection}>
                <img
                    src={profilePicture} // Usa a URL definida acima
                    alt="Foto do Perfil"
                    style={styles.avatar}
                />
                <h2 style={styles.profileName}>{displayName}</h2>
                {/* O botão "Voltar para Home" foi removido daqui */}
            </div>

            <div style={styles.card}>
                {/* Informações Pessoais */}
                <div style={styles.sectionBlock}>
                    <div style={styles.sectionHeader}>
                        <h3>Informações Pessoais</h3>
                        <button onClick={handleEditPersonalInfo} style={styles.editButtonSmall}>
                            Editar
                        </button>
                    </div>
                    <p style={styles.sectionDescription}>Gerencie suas informações de perfil</p>

                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Nome completo</label>
                        <div style={styles.displayInput}>{dadosDoUsuario.nomeCompleto || dadosDoUsuario.nome || 'Não definido'}</div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.inputLabel}>Email</label>
                        <div style={styles.displayInput}>{dadosDoUsuario.email}</div>
                    </div>
                </div>

                {/* Configurações da Conta */}
                <div style={{ ...styles.sectionBlock, marginTop: '40px' }}>
                    <div style={styles.sectionHeader}>
                        <h3>Configurações da Conta</h3>
                    </div>
                    <p style={styles.sectionDescription}>Gerencie suas preferências e segurança</p>

                    <button onClick={handleChangePassword} style={styles.configButton}>
                        Alterar senha
                    </button>
                    <button onClick={handleNotificationPreferences} style={styles.configButton}>
                        Preferências de notificação
                    </button>
                    <button onClick={handlePrivacyAndData} style={styles.configButton}>
                        Privacidade e dados
                    </button>

                    {/* Botão de Logout para /login */}
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Sair da conta
                    </button>
                </div>
            </div>
        </div>
    );
}

// Estilos
const styles = {
    container: {
        padding: '20px',
        maxWidth: '700px',
        margin: '30px auto',
        backgroundColor: '#f8f8f8',
        minHeight: 'calc(100vh - 100px)',
    },
    profilePictureSection: {
        textAlign: 'center',
        marginBottom: '40px',
        backgroundColor: 'white',
        padding: '30px 20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
    },
    // O estilo backButton foi removido daqui.
    avatar: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '15px',
        border: '4px solid #f0f0f0',
    },
    profileName: {
        fontSize: '1.8rem',
        color: '#333',
        margin: '0',
    },
    card: {
        backgroundColor: '#f8f8f8',
    },
    sectionBlock: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        padding: '30px',
        marginBottom: '20px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    sectionDescription: {
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '25px',
    },
    editButtonSmall: {
        padding: '8px 16px',
        backgroundColor: 'white',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s, border-color 0.2s',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    inputLabel: {
        display: 'block',
        fontSize: '0.9rem',
        color: '#555',
        marginBottom: '8px',
        fontWeight: 'bold',
    },
    displayInput: {
        width: '100%',
        padding: '12px',
        border: '1px solid #eee',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        color: '#333',
        fontSize: '1rem',
    },
    configButton: {
        width: '100%',
        padding: '15px 20px',
        backgroundColor: 'white',
        color: '#333',
        border: '1px solid #eee',
        borderRadius: '8px',
        textAlign: 'left',
        cursor: 'pointer',
        fontSize: '1rem',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background-color 0.2s, border-color 0.2s',
    },
    logoutButton: {
        width: '100%',
        padding: '15px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: '30px',
        transition: 'background-color 0.2s',
    },
};