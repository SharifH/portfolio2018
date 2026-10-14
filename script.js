(() => {
  const root = document.documentElement;
  const theme = document.getElementById('theme');
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch {}
  function applyTheme(mode) {
    root.dataset.theme = mode;
    theme.textContent = mode === 'dark' ? 'Light mode' : 'Dark mode';
    theme.setAttribute('aria-label', `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`);
  }
  applyTheme(preference || (system.matches ? 'dark' : 'light'));
  theme.addEventListener('click', () => {
    preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(preference);
    try { localStorage.setItem('portfolio-theme', preference); } catch {}
  });
  system.addEventListener('change', () => {
    if (!preference) applyTheme(system.matches ? 'dark' : 'light');
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); reveal.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.project, .capability-list article, .archive-grid article').forEach(el => reveal.observe(el));
  }
  document.getElementById('copy')?.addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText('me@sharifhadidi.com');
      status.textContent = 'Email copied';
    } catch {
      status.textContent = 'Select and copy: me@sharifhadidi.com';
    }
  });
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(item => {
      item.hidden = category !== 'all' && item.dataset.category !== category;
      if (!item.hidden) count++;
    });
    document.getElementById('work-count').textContent = `${count} projects`;
  }));
})();
