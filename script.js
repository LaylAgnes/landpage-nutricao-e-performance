document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');

  toggleBtn.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('show');
    this.textContent = expanded ? '☰' : '✖';
  });

  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Fecha o menu
      menu.classList.remove('show');
      toggleBtn.setAttribute('aria-expanded', false);
      toggleBtn.textContent = '☰'; // Ícone do menu fechado
    });
  });
});

function scrollToElement(targetSelector, duration = 1000) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  // Se o navegador suporta scroll suave nativo
  if ('scrollBehavior' in document.documentElement.style) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    return;
  }

  // Fallback: animação manual
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    // EaseInOutQuad
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToElement(this.getAttribute('href'), 500); // Duração ajustável
  });
});