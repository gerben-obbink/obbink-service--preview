const serviceGrid = document.querySelector('#service-grid');
const services = window.OBBINK_CONTENT?.services || [];

services.forEach((service) => {
  const card = document.createElement('article');
  card.className = 'service-card';
  card.dataset.tag = service.tag;
  card.innerHTML = `
    <span class="tag">${service.tag}</span>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
    <a href="${service.href}">Meer bekijken →</a>
  `;
  serviceGrid?.appendChild(card);
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

const brandSelect = document.querySelector('#brand-select');
const bshFields = document.querySelector('#bsh-fields');
const mieleFields = document.querySelector('#miele-fields');

function updateBrandFields() {
  if (!brandSelect) return;
  const value = brandSelect.value;
  if (bshFields) bshFields.hidden = !['bosch', 'siemens'].includes(value);
  if (mieleFields) mieleFields.hidden = value !== 'miele';
}
brandSelect?.addEventListener('change', updateBrandFields);
updateBrandFields();

const serviceForm = document.querySelector('#service-form');
const formMessage = document.querySelector('#form-message');
serviceForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formMessage) formMessage.textContent = 'Prototype: de intake werkt aan de voorkant. In de volgende fase koppelen we verzending aan de Obbink Service-processen.';
});
