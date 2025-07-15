document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  btn.addEventListener('click', () => {
    console.log('Menu button clicked, isMenuOpen:', isMenuOpen);
    if (!isMenuOpen) {
      menu.classList.remove('max-h-0');
      menu.classList.add('max-h-96');
    } else {
      menu.classList.remove('max-h-96');
      menu.classList.add('max-h-0');
    }
    isMenuOpen = !isMenuOpen;
  });

  document.querySelectorAll('.desktop-link, .mobile-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      console.log('Target ID:', targetId, 'Target Element:', target);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 500);
      } else {
        console.error('Target not found:', targetId);
      }

      if (isMenuOpen) {
        menu.classList.remove('max-h-96');
        menu.classList.add('max-h-0');
        isMenuOpen = false;
      }
    });
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  });


  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
  });
});