/**
 * IDX Helper Script
 * Injetado pelo Wrapper Nativo para melhorar a usabilidade mobile.
 */

(function() {
    console.log("IDX Helper carregado!");

    // 1. Prevenir zoom automático em inputs
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);

    // 2. Função para maximizar elementos (Terminal/Chat)
    let isMaximized = false;
    let originalStyle = "";
    let maximizedElement = null;

    window.toggleMaximize = function(selector) {
        const el = document.querySelector(selector);
        if (!el) return;

        if (!isMaximized) {
            originalStyle = el.getAttribute('style') || "";
            el.style.position = 'fixed';
            el.style.top = '0';
            el.style.left = '0';
            el.style.width = '100vw';
            el.style.height = '100vh';
            el.style.zIndex = '10000';
            el.style.backgroundColor = 'var(--vscode-editor-background, #1e1e1e)';
            isMaximized = true;
            maximizedElement = el;
        } else {
            el.setAttribute('style', originalStyle);
            isMaximized = false;
            maximizedElement = null;
        }
    };

    // 3. Detectar Double Tap para maximizar o terminal
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            // Verifica se o toque foi no terminal
            if (e.target.closest('.terminal') || e.target.closest('[role="complementary"]')) {
                window.toggleMaximize('.terminal-container'); // Seletor genérico, precisa ajustar conforme o DOM do IDX
                e.preventDefault();
            }
        }
        lastTap = currentTime;
    });

    // 4. Melhorar scroll no terminal
    document.addEventListener('touchmove', function(e) {
        if (isMaximized) {
            // Permite scroll normal dentro do elemento maximizado
            e.stopPropagation();
        }
    }, { passive: false });

})();
