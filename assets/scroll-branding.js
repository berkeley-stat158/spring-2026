document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const navbarBrand = document.querySelector('.navbar-brand');
  const scrollThreshold = 130;
  const siteBase = window.SITE_BASE || "";

  if (navbarBrand && !document.querySelector('.navbar-brand-logo')) {
    const logoElement = document.createElement('div');
    logoElement.className = 'navbar-brand-logo';

    const img = document.createElement('img');
    img.src = `${siteBase}/assets/stat158logo_small_green.png`;
    img.alt = 'STAT 158 Logo';

    logoElement.appendChild(img);
    navbarBrand.appendChild(logoElement);
  }

  function updateNavbarBranding() {
    if (!navbar) return;

    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateNavbarBranding();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateNavbarBranding();
});