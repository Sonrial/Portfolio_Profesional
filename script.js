// Menú móvil + animación reveal + año footer
(() => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar al hacer click en un link
    navMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", closeMenu);
    });

    // Cerrar al hacer click fuera
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!target) return;
      if (!navMenu.contains(target) && !navToggle.contains(target)) {
        closeMenu();
      }
    });

    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Reveal on scroll (IntersectionObserver)
  const els = Array.from(document.querySelectorAll("[data-reveal]"));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  } else {
    // fallback
    els.forEach(el => el.classList.add("revealed"));
  }

  // Año en footer
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
