/*
 * IDX Helper Script
 * Injetado pelo Wrapper Nativo para melhorar a usabilidade mobile.
 */

(function () {
  console.log("IDX Helper carregado");

  // 1. Prevenir zoom automático em inputs
  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content =
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
  document.getElementsByTagName("head")[0].appendChild(meta);

  // 2. Função para maximizar elementos
  let isMaximized = false;
  let originalStyle = "";
  let maximizedElement = null;

  window.toggleMaximize = function (selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    if (!isMaximized) {
      originalStyle = el.getAttribute("style") || "";
      el.style.position = "fixed";
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100vw";
      el.style.height = "100vh";
      el.style.zIndex = "10000";
      el.style.backgroundColor = "#1e1e1e";
      isMaximized = true;
      maximizedElement = el;
    } else {
      el.setAttribute("style", originalStyle);
      isMaximized = false;
      maximizedElement = null;
    }
  };

  // 3. Double tap no terminal
  let lastTap = 0;
  document.addEventListener(
    "touchend",
    function (e) {
      const now = Date.now();
      const delta = now - lastTap;

      if (delta < 300 && delta > 0) {
        const target = e.target;
        if (
          target.closest(".terminal") ||
          target.closest(".terminal-container")
        ) {
          window.toggleMaximize(".terminal-container");
          e.preventDefault();
        }
      }

      lastTap = now;
    },
    { passive: false }
  );

  // 4. Scroll correto
  document.addEventListener(
    "touchmove",
    function (e) {
      if (isMaximized) {
        e.stopPropagation();
      }
    },
    { passive: false }
  );
})();
