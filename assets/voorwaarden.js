(() => {
  const lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('obbink-language') || 'nl';
  const labels = { nl: ['Bekijk details', 'Sluit details'], de: ['Details anzeigen', 'Details schließen'], en: ['View details', 'Close details'], fr: ['Afficher les détails', 'Masquer les détails'], zh: ['查看详情', '收起详情'] }[lang] || ['Bekijk details', 'Sluit details'];
  document.body.classList.add('terms-enhanced');
  document.querySelector('.terms-language-note').hidden = lang === 'nl';
  const setOpen = (button, open) => {
    button.setAttribute('aria-expanded', String(open));
    button.firstElementChild.textContent = labels[open ? 1 : 0];
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  };
  document.querySelectorAll('.terms-toggle').forEach(button => {
    setOpen(button, false);
    button.addEventListener('click', () => setOpen(button, button.getAttribute('aria-expanded') !== 'true'));
  });
  const openAnchor = () => {
    const section = document.getElementById(location.hash.slice(1));
    const button = section?.querySelector('.terms-toggle');
    if (button) setOpen(button, true);
  };
  document.querySelectorAll('.terms-card').forEach(link => link.addEventListener('click', () => {
    const section = document.getElementById(link.hash.slice(1));
    const button = section?.querySelector('.terms-toggle');
    if (button) setOpen(button, true);
  }));
  window.addEventListener('hashchange', openAnchor);
  openAnchor();
})();
