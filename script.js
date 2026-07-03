const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
const year = document.querySelector('[data-year]');
const copyButtons = document.querySelectorAll('[data-copy]');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.getAttribute('data-copy');
    const status = button.parentElement?.querySelector('.copy-status');

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      if (status) status.textContent = 'Copied.';
      button.textContent = button.classList.contains('copy-email') ? 'Email copied' : 'Address copied';
      window.setTimeout(() => {
        if (status) status.textContent = '';
        button.textContent = button.classList.contains('copy-email') ? 'Copy email' : 'Copy address';
      }, 2200);
    } catch {
      if (status) status.textContent = text;
    }
  });
});
