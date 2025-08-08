// Função para redirecionar o usuário
function blockAccess() {
    // Redireciona para uma página de bloqueio ou página inicial
    window.location.href = '/blocked.php';
}

// Detecta DevTools no Chrome e Firefox
function detectDevTools() {
    // Detecta por diferença de tamanho da janela (Chrome DevTools)
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        blockAccess();
        return true;
    }
    
    return false;
}

// Detecta teclas de atalho comuns do DevTools
function detectDevToolsShortcuts(e) {
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, F12
    if (
        (e.keyCode === 73 && e.ctrlKey && e.shiftKey) || // Ctrl+Shift+I
        (e.keyCode === 74 && e.ctrlKey && e.shiftKey) || // Ctrl+Shift+J
        (e.keyCode === 67 && e.ctrlKey && e.shiftKey) || // Ctrl+Shift+C
        (e.keyCode === 123) // F12
    ) {
        e.preventDefault();
        blockAccess();
        return true;
    }
    return false;
}

// Detecta clique direito
function detectRightClick(e) {
    if (e.button === 2) {
        e.preventDefault();
        return false;
    }
}

// Detecta DevTools via console.log
const detectConsole = function() {
    const timestamp = new Date().getTime();
    debugger;
    if (new Date().getTime() - timestamp > 100) {
        blockAccess();
    }
};

// Inicializa todas as proteções
function initializeProtection() {
    // Monitora alterações na janela
    window.addEventListener('resize', detectDevTools);
    
    // Monitora teclas de atalho
    document.addEventListener('keydown', detectDevToolsShortcuts);
    
    // Desabilita clique direito
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('mousedown', detectRightClick);
    
    // Monitora continuamente
    setInterval(detectDevTools, 1000);
    setInterval(detectConsole, 1000);
    
    // Proteção adicional contra modificações
    setInterval(function() {
        const all = document.getElementsByTagName("*");
        for (let i = 0; i < all.length; i++) {
            if (window.getComputedStyle(all[i]).cursor === 'not-allowed') {
                blockAccess();
                break;
            }
        }
    }, 1000);
}

// Inicia a proteção quando a página carrega
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProtection);
} else {
    initializeProtection();
}

// Proteção contra desativação do JavaScript
document.onkeydown = function(e) {
    if(e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        return false;
    }
    if(e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        return false;
    }
};
