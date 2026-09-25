document.querySelectorAll('img[src="assets/obbink-service.svg"]').forEach((logo) => {
  logo.src = 'assets/obbinkservice.png';
});

const serviceGrid = document.querySelector('#service-grid');
const services = window.OBBINK_CONTENT?.services || [];
// Stable category tags keep the homepage colour families independent of translations.
const serviceCardTypes = {
  Service: 'service', Klimaat: 'service', Netwerk: 'service', Installatie: 'service',
  Inbouw: 'solution', Energie: 'solution', AV: 'solution', Professional: 'solution', Premium: 'solution'
};

services.forEach((service) => {
  const card = document.createElement('article');
  card.className = 'service-card';
  if (serviceCardTypes[service.tag]) {
    card.classList.add('service-card--' + serviceCardTypes[service.tag]);
  }
  card.dataset.tag = service.tag;
  card.innerHTML = `
    <svg class="service-card-watermark" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="${service.watermark || ''}"></path></svg>
    <span class="tag">${service.tag}</span>
    <h3>${service.title}</h3>
    <p>${service.text}</p>
    <a href="${service.href}">Meer bekijken →</a>
  `;
  card.tabIndex = 0;
  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    card.querySelector('a')?.click();
  });
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (event.target.closest('a')) return;
    event.preventDefault();
    card.querySelector('a')?.click();
  });
  serviceGrid?.appendChild(card);
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
if (menuToggle && mainNav) {
  const mobileMenu = window.matchMedia('(width < 960px)');
  const icon = document.createElement('span');
  icon.className = 'menu-icon';
  icon.setAttribute('aria-hidden', 'true');
  menuToggle.prepend(icon);
  menuToggle.type = 'button';

  function setMenuOpen(open, restoreFocus = false) {
    mainNav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (restoreFocus) menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false, mobileMenu.matches);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav.classList.contains('open')) {
      setMenuOpen(false, true);
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.nav-wrap')) setMenuOpen(false);
  });
  document.addEventListener('focusin', (event) => {
    if (!event.target.closest('.nav-wrap')) setMenuOpen(false);
  });
  mobileMenu.addEventListener('change', () => {
    const focusWasInNav = mainNav.contains(document.activeElement);
    setMenuOpen(false, mobileMenu.matches && focusWasInNav);
    if (!mobileMenu.matches && document.activeElement === menuToggle) {
      mainNav.querySelector('a')?.focus();
    }
  });
}

const brandInput = document.querySelector('#brand-input');
const bshFields = document.querySelector('#bsh-fields');
const mieleFields = document.querySelector('#miele-fields');

function updateBrandFields() {
  if (!brandInput) return;
  const value = brandInput.value.trim().toLowerCase();
  if (bshFields) bshFields.hidden = !['bosch', 'siemens'].includes(value);
  if (mieleFields) mieleFields.hidden = value !== 'miele';
}
brandInput?.addEventListener('input', updateBrandFields);
brandInput?.addEventListener('change', updateBrandFields);
updateBrandFields();

const serviceForm = document.querySelector('#service-form');
const formMessage = document.querySelector('#form-message');
function initialiseServiceForm() {
  if (!serviceForm) return;
  const copy = window.obbinkServiceCopy;
  const submit = serviceForm.querySelector('[type="submit"]');
  const photo = serviceForm.elements.photo;
  let pending = false, submitted = false;
  submit.disabled = false;
  const element = (tag, text, className) => {
    const el = document.createElement(tag); if (text) el.textContent = text;
    if (className) el.className = className; return el;
  };
  function contactLinks() {
    const links = element('div', '', 'service-contact-actions');
    const call = element('a', copy.call + ' +31 6 57081028'); call.href = 'tel:+31657081028'; call.setAttribute('aria-label', copy.callLabel);
    const whatsapp = element('a', 'WhatsApp'); whatsapp.href = 'https://wa.me/31657081028?text=' + encodeURIComponent(copy.whatsappMessage);
    whatsapp.target = '_blank'; whatsapp.rel = 'noopener'; whatsapp.setAttribute('aria-label', copy.whatsappLabel);
    links.append(call, whatsapp); return links;
  }
  function message(title, body, success = false) {
    formMessage.replaceChildren(element('strong', title), element('p', body));
    formMessage.dataset.state = success ? 'success' : 'notice';
    if (success) formMessage.append(element('p', copy.direct));
    formMessage.append(contactLinks()); formMessage.focus();
  }
  const upload = element('div', '', 'regular-upload');
  const uploadLabel = element('label', copy.attachmentLabel); photo.id = 'service-photo'; uploadLabel.htmlFor = photo.id;
  const pick = element('button', copy.chooseFile, 'button button-secondary'); pick.type = 'button'; pick.addEventListener('click', () => photo.click());
  const fileList = element('span', copy.noFile, 'regular-file-list'); fileList.setAttribute('aria-live','polite');
  const remove = element('button', copy.removeFile, 'button button-secondary'); remove.type = 'button'; remove.hidden = true;
  const hint = element('p', copy.attachmentHelp, 'field-help'); hint.id = 'service-photo-hint'; pick.setAttribute('aria-describedby',hint.id);
  photo.parentElement.replaceWith(upload); photo.hidden = true; upload.append(uploadLabel,photo,pick,fileList,remove,hint);
  function updateFile() { fileList.textContent = photo.files.length ? photo.files[0].name : copy.noFile; remove.hidden = !photo.files.length; }
  photo.addEventListener('change', updateFile); remove.addEventListener('click',()=>{photo.value='';updateFile();});
  const fields = [...serviceForm.querySelectorAll('input,select,textarea')];
  fields.forEach(input => {
    if (input.type !== 'file' && input.tagName !== 'SELECT') input.maxLength = input.tagName === 'TEXTAREA' ? 5000 : 250;
    const error = element('span','','regular-field-error'); error.id = 'service-error-' + input.name; error.hidden = true;
    input.setAttribute('aria-describedby', error.id + (input === photo ? ' ' + hint.id : ''));
    if (input === photo) pick.setAttribute('aria-describedby', error.id + ' ' + hint.id);
    input.insertAdjacentElement('afterend',error);
    input.addEventListener('input',()=>{error.hidden=true;input.removeAttribute('aria-invalid');});
  });
  function validate() {
    let first;
    fields.forEach(input => {
      const error = document.getElementById('service-error-' + input.name);
      let text = '';
      if (input.required && !input.value.trim()) text = copy.required;
      else if (input.type === 'email' && !input.validity.valid) text = copy.emailError;
      else if (input.maxLength > 0 && input.value.length > input.maxLength) text = copy.lengthError;
      if (input === photo && [...photo.files].some(f => f.size > 2 * 1024 * 1024 || !/\.(jpe?g|png|webp|pdf)$/i.test(f.name))) text = copy.attachmentError;
      error.textContent = text; error.hidden = !text; input.setAttribute('aria-invalid',String(!!text));
      if (text && !first) first = input === photo ? pick : input;
    });
    if (first) { formMessage.textContent=copy.validation; first.focus(); }
    return !first;
  }
  serviceForm.addEventListener('submit', async event => {
    event.preventDefault(); if (pending || submitted || !validate()) return;
    // GitHub Pages/file previews cannot send mail. Never post personal data there.
    if (location.protocol === 'file:' || /(^|\.)github\.io$/i.test(location.hostname)) {
      message(copy.notSent, copy.unavailable); return;
    }
    pending = true; submit.disabled = true; submit.textContent = copy.sending;
    formMessage.textContent = copy.sending;
    let attempted = false;
    try {
      const capabilityResponse = await fetch('/api/service-requests/capabilities', { credentials:'same-origin', cache:'no-store', signal:AbortSignal.timeout(8000) });
      if (!capabilityResponse.ok || !capabilityResponse.headers.get('content-type')?.includes('application/json')) {
        message(copy.notSent,copy.unavailable); return;
      }
      const capability = await capabilityResponse.json();
      if (capability.available !== true || !capability.requestToken) { message(copy.notSent,copy.unavailable); return; }
      const data = new FormData(serviceForm);
      if (!['bosch','siemens'].includes(brandInput.value.trim().toLowerCase())) { data.delete('enr'); data.delete('fd'); }
      if (brandInput.value.trim().toLowerCase() !== 'miele') data.delete('miele_serial');
      attempted = true;
      const response = await fetch('/api/service-requests', {method:'POST',body:data,credentials:'same-origin',headers:{'X-CSRF-TOKEN':capability.requestToken},signal:AbortSignal.timeout(30000)});
      const result = response.headers.get('content-type')?.includes('application/json') ? await response.json() : {};
      if (response.status === 202 && result.accepted === true) {
        submitted = true; message(copy.received,copy.thanks,true);
      } else if (response.status === 429) message(copy.notSent,copy.rateLimited);
      else if (result.error === 'mail_unavailable') message(copy.notSent,copy.unavailable);
      else if (result.error === 'invalid_attachment') message(copy.notSent,copy.attachmentError);
      else if (result.error === 'invalid_request') message(copy.notSent,copy.validation);
      else message(copy.unconfirmed,copy.failed);
    } catch (_) {
      message(attempted ? copy.unconfirmed : copy.notSent,attempted ? copy.failed : copy.unavailable);
    } finally {
      pending = false; submit.disabled = submitted; submit.textContent = copy.submit;
    }
  });
}

const checklistModal = document.querySelector('#checklist-modal');
const checklistOpeners = document.querySelectorAll('#checklist-open, #checklist-store-open');
const checklistClose = checklistModal?.querySelector('.checklist-close');
const checklistCard = checklistModal?.querySelector('.checklist-modal-card');
let checklistTrigger = null;

function closeChecklist() {
  if (!checklistModal || checklistModal.hidden) return;
  checklistModal.hidden = true;
  document.body.classList.remove('modal-open');
  checklistTrigger?.focus();
  checklistTrigger = null;
}

checklistOpeners.forEach((opener) => opener.addEventListener('click', () => {
  if (!checklistModal || !checklistCard) return;
  checklistTrigger = opener;
  checklistModal.hidden = false;
  document.body.classList.add('modal-open');
  checklistCard.focus();
}));
checklistClose?.addEventListener('click', closeChecklist);
checklistModal?.addEventListener('click', (event) => {
  if (event.target === checklistModal) closeChecklist();
});

const energyTopicModal = document.querySelector('#energy-topic-modal');
const energyTopicCards = document.querySelectorAll('[data-energy-topic]');
const energyTopicClose = energyTopicModal?.querySelector('.energy-topic-close');
const energyTopicCard = energyTopicModal?.querySelector('.energy-topic-modal-card');
const energyTopicLabel = document.querySelector('#energy-topic-label');
const energyTopicTitle = document.querySelector('#energy-topic-title');
const energyTopicContent = document.querySelector('#energy-topic-content');
let energyTopicTrigger = null;
const energyTopicContentMap = {
  solar: {
    label: 'ZONNEPANELEN',
    title: 'Waarom kan een thuisbatterij juist nu interessant zijn?',
    content: '<p>Zonnepanelen produceren vooral energie op momenten dat de zon schijnt. Dat is niet altijd hetzelfde moment waarop u thuis de meeste elektriciteit gebruikt. Met een thuisbatterij kunt u een deel van de opgewekte energie opslaan en later gebruiken, bijvoorbeeld in de avond.</p><p>Daardoor kunt u meer van uw eigen opgewekte energie zelf gebruiken en hoeft u minder direct terug te leveren aan het elektriciteitsnet.</p><p>Of een thuisbatterij voor u financieel en praktisch interessant is, hangt onder andere af van uw energieverbruik, zonnepanelen, teruglevering, energiecontract en de gekozen batterijcapaciteit.</p>'
  },
  smart: {
    label: 'SLIMME ENERGIE',
    title: 'Wat maakt een thuisbatterij écht slim?',
    content: '<p>Een slimme thuisbatterij doet meer dan alleen elektriciteit opslaan.</p><p>Slimme energiesturing kan bepalen wanneer het verstandig is om energie op te slaan en wanneer deze weer gebruikt wordt. Daarbij kan het systeem rekening houden met bijvoorbeeld de opbrengst van zonnepanelen, het energieverbruik in de woning en energietarieven.</p><p>Juist de combinatie van batterij, energiemeting en slimme software bepaalt hoe efficiënt het systeem met energie omgaat. ANKER SOLIX is een voorbeeld van een oplossing waarbij die combinatie en het passende advies samenkomen.</p>'
  },
  contract: {
    label: 'ENERGIECONTRACT',
    title: 'Welk energiecontract past bij een slimme thuisbatterij?',
    content: '<p>Een thuisbatterij kan gebruikt worden in combinatie met een vast, variabel of dynamisch energiecontract.</p><p>Bij een dynamisch energiecontract veranderen de stroomprijzen gedurende de dag. Een slim batterijsysteem kan daardoor extra mogelijkheden bieden om energie op gunstige momenten op te slaan en op andere momenten te gebruiken.</p><p>Dat betekent niet dat een dynamisch contract automatisch voor iedereen de beste keuze is. Uw verbruik, zonnepanelen, persoonlijke voorkeur en de mogelijkheden van het batterijsysteem spelen allemaal een rol.</p><p>Laat u daarom adviseren over de combinatie van batterij en energiecontract.</p>'
  },
  capacity: {
    label: 'CAPACITEIT',
    title: 'Hoe groot moet mijn thuisbatterij zijn?',
    content: '<p>Een grotere batterij is niet automatisch een betere batterij.</p><p>De juiste capaciteit hangt onder andere af van:</p><ul><li>uw jaarlijkse elektriciteitsverbruik;</li><li>het aantal zonnepanelen;</li><li>hoeveel energie u overdag opwekt;</li><li>hoeveel energie u teruglevert;</li><li>wanneer u thuis energie gebruikt;</li><li>wat u met de batterij wilt bereiken.</li></ul><p>Een batterij die goed aansluit bij uw werkelijke energiegebruik is meestal belangrijker dan simpelweg zoveel mogelijk opslagcapaciteit kiezen.</p><p>Onze specialisten in de Obbink-winkel kijken graag samen met u welke capaciteit bij uw woning en energiegebruik past.</p>'
  }
};

function closeEnergyTopic() {
  if (!energyTopicModal || energyTopicModal.hidden) return;
  energyTopicModal.hidden = true;
  document.body.classList.remove('modal-open');
  energyTopicTrigger?.focus();
  energyTopicTrigger = null;
}

function openEnergyTopic(trigger) {
  const topic = energyTopicContentMap[trigger.dataset.energyTopic];
  if (!topic || !energyTopicModal || !energyTopicCard) return;
  energyTopicTrigger = trigger;
  const translateEnergy = (value) => window.obbinkT ? window.obbinkT(value) : value;
  energyTopicLabel.textContent = translateEnergy(topic.label);
  energyTopicTitle.textContent = translateEnergy(topic.title);
  energyTopicContent.innerHTML = topic.content;
  energyTopicContent.querySelectorAll('*').forEach((element) => {
    if (element.children.length === 0) element.textContent = translateEnergy(element.textContent);
  });
  energyTopicModal.hidden = false;
  document.body.classList.add('modal-open');
  energyTopicCard.focus();
}

energyTopicCards.forEach((card) => {
  card.addEventListener('click', () => openEnergyTopic(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openEnergyTopic(card);
    }
  });
});
energyTopicClose?.addEventListener('click', closeEnergyTopic);
energyTopicModal?.addEventListener('click', (event) => {
  if (event.target === energyTopicModal) closeEnergyTopic();
});

const assistantMarkup = `
  <button class="service-assistant-launcher" type="button" aria-controls="service-assistant" aria-expanded="false">Obbink Service Assistent</button>
  <section class="service-assistant" id="service-assistant" role="dialog" aria-modal="true" aria-labelledby="service-assistant-title" hidden>
    <div class="service-assistant-card" tabindex="-1">
      <button class="service-assistant-close" type="button" aria-label="Sluit Obbink Service Assistent">&times;</button>
      <h2 id="service-assistant-title">Obbink Service Assistent</h2>
      <div class="service-assistant-choices" role="group" aria-label="Kies een onderwerp">
        <button type="button" data-assistant-category="Airco advies">Airco advies</button>
        <button type="button" data-assistant-category="Reparatie & storing">Reparatie & storing</button>
        <button type="button" data-assistant-category="Onderhoud & service">Onderhoud & service</button>
        <button type="button" data-assistant-category="Winkeladvies">Winkeladvies</button>
      </div>
      <div class="service-assistant-messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
      <form class="service-assistant-form">
        <label for="service-assistant-question">Stel uw vraag…</label>
        <div class="service-assistant-input">
          <textarea id="service-assistant-question" rows="2" maxlength="1000" required></textarea>
          <button class="button" type="submit">Versturen</button>
        </div>
      </form>
    </div>
  </section>`;
document.body.insertAdjacentHTML('beforeend', assistantMarkup);

const assistantLauncher = document.querySelector('.service-assistant-launcher');
const assistant = document.querySelector('#service-assistant');
const assistantCard = assistant?.querySelector('.service-assistant-card');
const assistantClose = assistant?.querySelector('.service-assistant-close');
const assistantForm = assistant?.querySelector('.service-assistant-form');
const assistantQuestion = assistant?.querySelector('#service-assistant-question');
const assistantMessages = assistant?.querySelector('.service-assistant-messages');
const assistantSubmit = assistantForm?.querySelector('button[type="submit"]');
let assistantTrigger = null;
let assistantCategory = '';
let assistantBusy = false;
let assistantLoadingMessage = null;
const assistantDefaultPlaceholder = 'Stel uw vraag…';
const assistantWelcomeMessage = 'Waar kunnen we u mee helpen?';
const assistantLoadingMessageText = 'Even kijken…';
const assistantFallbackMessage = 'Dit is onze AI-assistent in ontwikkeling. We werken er voortdurend aan om de antwoorden beter en duidelijker te maken. Uw vragen helpen ons te ontdekken welke informatie klanten nodig hebben en waar we onze kennis verder kunnen verbeteren.';
const assistantFallbackSupport = 'Komt u er niet uit? Dan helpen onze medewerkers van Obbink Service u natuurlijk graag verder.';
const assistantPlaceholders = {
  'Airco advies': 'Waar kunnen we u over adviseren?',
  'Reparatie & storing': 'Beschrijf uw storing of foutmelding…',
  'Onderhoud & service': 'Waar kunnen we u mee helpen?',
  Winkeladvies: 'Wat wilt u graag weten?'
};

const serviceAssistantClient = {
  async send(question, category) {
    const response = await fetch('/api/service-assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category, timestamp: new Date().toISOString() })
    });
    if (!response.ok) throw new Error('assistant_unavailable');
    return response.json();
  }
};

function translateAssistant(value) {
  return window.obbinkT ? window.obbinkT(value) : value;
}

// Keep native validation, but show messages in the selected website language.
[serviceForm, assistantForm].forEach((form) => {
  if (!form) return;
  const clearValidation = (event) => event.target.setCustomValidity?.('');
  form.addEventListener('input', clearValidation);
  form.addEventListener('change', clearValidation);
  form.addEventListener('invalid', (event) => {
    const field = event.target;
    field.setCustomValidity('');
    if (field.validity.valid) return;
    const message = field.validity.valueMissing ? 'Vul dit veld in.'
      : field.type === 'email' && field.validity.typeMismatch ? 'Vul een geldig e-mailadres in.'
      : 'Controleer de ingevulde waarde.';
    field.setCustomValidity(translateAssistant(message));
  }, true);
});

function scrollAssistantMessages() {
  if (!assistantMessages) return;
  requestAnimationFrame(() => assistantMessages.scrollTo({
    top: assistantMessages.scrollHeight,
    behavior: 'smooth'
  }));
}

function addAssistantMessage(text, { loading = false, support = false } = {}) {
  if (!assistantMessages) return null;
  const message = document.createElement('article');
  message.className = `assistant-message assistant-message-assistant${loading ? ' assistant-message-loading' : ''}`;
  message.setAttribute('aria-label', translateAssistant('Obbink Service Assistent'));
  if (!loading) {
    const label = document.createElement('span');
    label.className = 'assistant-message-label';
    label.textContent = translateAssistant('Obbink Service Assistent');
    message.appendChild(label);
  }
  const content = document.createElement('p');
  content.textContent = translateAssistant(text);
  message.appendChild(content);
  if (support) {
    const supportText = document.createElement('small');
    supportText.textContent = translateAssistant(assistantFallbackSupport);
    message.appendChild(supportText);
  }
  assistantMessages.appendChild(message);
  scrollAssistantMessages();
  return message;
}

function addUserMessage(text) {
  if (!assistantMessages) return;
  const message = document.createElement('article');
  message.className = 'assistant-message assistant-message-user';
  message.setAttribute('aria-label', translateAssistant('Gebruiker'));
  const content = document.createElement('p');
  content.textContent = text;
  message.appendChild(content);
  assistantMessages.appendChild(message);
  scrollAssistantMessages();
}

function replaceLoadingMessage(text, support = false) {
  if (!assistantLoadingMessage) return;
  assistantLoadingMessage.classList.remove('assistant-message-loading');
  const content = assistantLoadingMessage.querySelector('p');
  if (content) content.textContent = translateAssistant(text);
  if (support) {
    const supportText = document.createElement('small');
    supportText.textContent = translateAssistant(assistantFallbackSupport);
    assistantLoadingMessage.appendChild(supportText);
  }
  assistantLoadingMessage = null;
  scrollAssistantMessages();
}

function resetAssistantConversation() {
  if (!assistantMessages) return;
  assistantMessages.replaceChildren();
  assistantLoadingMessage = null;
  addAssistantMessage(assistantWelcomeMessage);
}

function setAssistantBusy(busy) {
  assistantBusy = busy;
  if (assistantQuestion) assistantQuestion.disabled = busy;
  if (assistantSubmit) assistantSubmit.disabled = busy;
  assistant?.querySelectorAll('[data-assistant-category]').forEach((choice) => {
    choice.disabled = busy;
  });
}

function closeAssistant() {
  if (!assistant || assistant.hidden) return;
  assistant.hidden = true;
  document.body.classList.remove('assistant-open');
  assistantLauncher?.setAttribute('aria-expanded', 'false');
  assistantCategory = '';
  assistantQuestion.value = '';
  assistantQuestion.placeholder = translateAssistant(assistantDefaultPlaceholder);
  setAssistantBusy(false);
  assistantMessages?.replaceChildren();
  assistant.querySelectorAll('[data-assistant-category].active').forEach((choice) => choice.classList.remove('active'));
  assistantTrigger?.focus();
  assistantTrigger = null;
}

assistantLauncher?.addEventListener('click', () => {
  if (!assistant || !assistantCard) return;
  assistantTrigger = assistantLauncher;
  assistant.hidden = false;
  document.body.classList.add('assistant-open');
  assistantLauncher.setAttribute('aria-expanded', 'true');
  resetAssistantConversation();
  assistantCard.focus();
});
assistantClose?.addEventListener('click', closeAssistant);
assistant?.addEventListener('click', (event) => {
  if (event.target === assistant) closeAssistant();
});
assistant?.querySelectorAll('[data-assistant-category]').forEach((choice) => {
  choice.addEventListener('click', () => {
    assistantCategory = choice.dataset.assistantCategory || '';
    assistant.querySelectorAll('[data-assistant-category]').forEach((item) => item.classList.toggle('active', item === choice));
    assistantQuestion.value = '';
    assistantQuestion.placeholder = translateAssistant(assistantPlaceholders[assistantCategory] || assistantDefaultPlaceholder);
    assistantQuestion.focus();
  });
});
assistantForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!assistantQuestion || assistantBusy) return;
  const question = assistantQuestion.value.trim();
  if (!question) {
    assistantQuestion.reportValidity();
    return;
  }
  addUserMessage(question);
  assistantQuestion.value = '';
  assistantLoadingMessage = addAssistantMessage(assistantLoadingMessageText, { loading: true });
  setAssistantBusy(true);
  try {
    const result = await serviceAssistantClient.send(question, assistantCategory);
    if (result?.answer) replaceLoadingMessage(String(result.answer));
    else replaceLoadingMessage(assistantFallbackMessage, true);
  } catch (_) {
    replaceLoadingMessage(assistantFallbackMessage, true);
  } finally {
    setAssistantBusy(false);
    assistantQuestion.focus();
  }
});
assistantQuestion?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    assistantForm?.requestSubmit();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeChecklist();
  if (event.key === 'Escape') closeEnergyTopic();
  if (event.key === 'Escape') closeAssistant();
});

const currentLanguage = new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('obbink-language') || 'nl';
const i18nScript = document.createElement('script');
// A page can request a fresh translation bundle without changing other pages.
const i18nVersion = encodeURIComponent(document.currentScript?.dataset.i18nVersion || '1');
i18nScript.src = currentLanguage === 'zh' ? `assets/i18n-zh.js?v=${i18nVersion}` : `assets/i18n.js?v=${i18nVersion}`;
i18nScript.async = false;
i18nScript.addEventListener('load', () => {
  // Exact public preview only: no banner on local servers or production hosts.
  if (location.hostname === 'gerben-obbink.github.io' && location.pathname.startsWith('/obbink-service--preview/')) {
    const banner = document.createElement('aside');
    banner.className = 'preview-environment-banner';
    const label = document.createElement('strong');
    label.textContent = window.obbinkPreviewCopy.label;
    banner.append(label, document.createTextNode(' – ' + window.obbinkPreviewCopy.text));
    document.body.prepend(banner);
  }
  initialiseServiceForm();
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    const url = new URL(link.href);
    const message = url.searchParams.get('text');
    if (message) {
      url.searchParams.set('text', window.obbinkT(message));
      link.href = url.toString();
    }
  });
  if (assistantQuestion) assistantQuestion.placeholder = translateAssistant(assistantPlaceholders[assistantCategory] || assistantDefaultPlaceholder);
  if (currentLanguage === 'zh') return;
  const switcher = document.querySelector('.language-switcher');
  if (!switcher || switcher.querySelector('[data-language="zh"]')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.language = 'zh';
  button.textContent = '中文';
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    localStorage.setItem('obbink-language', 'zh');
    const url = new URL(window.location.href);
    url.searchParams.set('lang', 'zh');
    window.location.href = url.toString();
  });
  switcher.appendChild(button);
});
document.body.appendChild(i18nScript);

const communityRegions = document.querySelector('.community-regions');
if (communityRegions) {
  const regionCards = [...communityRegions.querySelectorAll('details.community-region')];
  let syncingCommunityRegions = false;

  for (let index = 0; index < regionCards.length - 1; index += 2) {
    const region = regionCards[index];
    const pairedRegion = regionCards[index + 1];
    region.addEventListener('toggle', () => {
      if (syncingCommunityRegions) return;
      syncingCommunityRegions = true;
      pairedRegion.open = region.open;
      syncingCommunityRegions = false;
    });
    pairedRegion.addEventListener('toggle', () => {
      if (syncingCommunityRegions) return;
      syncingCommunityRegions = true;
      region.open = pairedRegion.open;
      syncingCommunityRegions = false;
    });
  }
}

// Shared business intake. Stable route IDs stay independent of the interface language.
(() => {
  const triggers = [...document.querySelectorAll('a, button')].filter(el => el.textContent.trim() === 'Zakelijke aanvraag starten');
  if (!triggers.length) return;
  const translationsReady = window.obbinkBusinessCopy ? Promise.resolve() : new Promise(resolve => i18nScript.addEventListener('load', resolve, { once: true }));
  const departments = ['purchasing', 'technical', 'facilities', 'ict', 'management', 'care', 'other'];
  const subjects = ['laundry', 'climate', 'network', 'av', 'repair', 'assembly', 'other'];
  const types = ['quote', 'fault', 'advice', 'maintenance', 'installation'];
  // [field ID, label key, control kind, required, options]
  const routes = {
    fault: [['brand','brand'],['model','model'],['serial','serial'],['deviceLocation','deviceLocation','text',true],['faultDescription','faultDescription','textarea',true],['faultCode','faultCode'],['halted','halted','choice',true,['yes','no']],['urgency','urgency','choice',true,['normal','soon','stopped']],['faultUpload','faultUpload','file'],['extra','extra','textarea']],
    quote: [['product','product','text',true],['quantity','quantity','number',true],['site','site','text',true],['delivery','delivery'],['installWanted','installWanted','choice',true,['yes','no']],['timeframe','timeframe'],['requestDescription','requestDescription','textarea',true],['docUpload','docUpload','file']],
    advice: [['adviceTopic','adviceTopic','textarea',true],['currentSituation','currentSituation','textarea',true],['desiredSituation','desiredSituation','textarea',true],['location','location','text',true],['timeframe','timeframe'],['optionalUpload','optionalUpload','file']],
    maintenance: [['equipment','equipment','text',true],['brand','brand'],['model','model'],['location','location','text',true],['maintenanceSituation','maintenanceSituation','textarea'],['desiredService','desiredService','textarea',true],['frequency','frequency']],
    installation: [['installWhat','installWhat','textarea',true],['brandModel','brandModel'],['location','location','text',true],['quantity','quantity','number',true],['period','period'],['siteUpload','siteUpload','file'],['extra','extra','textarea']]
  };
  let dialog, form, copy, opener, step = 1, review = false, completed = false;
  const t = key => copy[key];
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const button = (key, className, action) => {
    const el = make('button', className, t(key));
    el.type = 'button'; el.addEventListener('click', action); return el;
  };
  const value = name => form.elements.namedItem(name)?.value || '';
  const selectedDepartment = () => value('department') === 'other' ? value('departmentOther') : t(value('department'));
  const selectedSubject = () => value('subject') === 'other' ? value('subjectOther') : t(value('subject'));
  const panels = {};
  const routePanels = {};
  function field(parent, prefix, spec) {
    const [key, label, kind = 'text', required = false, options = []] = spec;
    const name = prefix + key;
    const wrap = make(kind === 'choice' ? 'fieldset' : 'div', 'business-field' + (kind === 'textarea' || kind === 'file' || kind === 'choice' ? ' business-wide' : ''));
    wrap.dataset.field = name;
    const caption = make(kind === 'choice' ? 'legend' : 'label', 'business-label', t(label) + (required ? ' *' : ''));
    wrap.append(caption);
    const error = make('p', 'business-field-error');
    error.id = 'business-error-' + name; error.hidden = true;
    const setup = el => {
      el.name = name; el.required = required;
      el.setAttribute('aria-describedby', error.id);
      return el;
    };
    if (kind === 'choice') {
      const grid = make('div', 'business-options');
      options.forEach(option => {
        const choice = make('label', 'business-choice');
        const input = setup(make('input'));
        input.type = 'radio'; input.value = option;
        choice.append(input, make('span', '', t(option))); grid.append(choice);
      });
      wrap.append(grid);
    } else {
      const input = setup(make(kind === 'textarea' ? 'textarea' : 'input'));
      input.id = 'business-' + name; caption.htmlFor = input.id;
      if (kind === 'textarea') { input.rows = 3; input.maxLength = 3000; }
      else input.type = kind;
      if (kind === 'number') { input.min = '1'; input.step = '1'; }
      if (kind === 'text') input.maxLength = 250;
      if (kind === 'file') {
        input.multiple = true; input.accept = '.jpg,.jpeg,.png,.webp,.pdf'; input.hidden = true;
        const upload = button('chooseFiles', 'business-secondary', () => input.click());
        upload.setAttribute('aria-describedby', 'business-hint-' + name + ' ' + error.id);
        const list = make('p', 'business-file-list', t('noFiles')); list.setAttribute('aria-live', 'polite');
        const remove = button('removeFiles', 'business-text-button', () => { input.value = ''; updateFiles(); });
        const hint = make('p', 'business-hint', t('uploadHint')); hint.id = 'business-hint-' + name;
        function updateFiles() {
          const files = [...input.files];
          const invalid = files.length > 5 || files.some(file => file.size > 10 * 1024 * 1024 || !/\.(jpe?g|png|webp|pdf)$/i.test(file.name));
          input.setCustomValidity(invalid ? t('uploadError') : '');
          list.textContent = files.length ? files.map(file => file.name).join(', ') : t('noFiles');
          remove.hidden = !files.length;
          error.textContent = invalid ? t('uploadError') : ''; error.hidden = !invalid;
          upload.setAttribute('aria-invalid', String(invalid));
        }
        input.addEventListener('change', updateFiles); remove.hidden = true;
        wrap.append(input, upload, list, remove, hint);
      } else { wrap.append(input); }
    }
    wrap.append(error);
    // Remove a field error as soon as its corrected value is valid.
    const clearResolvedError = () => {
      const controls = [...wrap.querySelectorAll('input, textarea')];
      const valid = kind === 'choice' ? controls.some(el => el.checked) : controls.every(el => el.validity.valid && (!el.required || el.value.trim()));
      if (!valid) return;
      error.hidden = true; error.textContent = '';
      controls.forEach(el => el.removeAttribute('aria-invalid'));
      if (!dialog.querySelector('.business-field-error:not([hidden])')) dialog.querySelector('.business-errors').textContent = '';
    };
    wrap.addEventListener('input', clearResolvedError);
    wrap.addEventListener('change', clearResolvedError);
    parent.append(wrap); return wrap;
  }
  function conditional(name, control) {
    const wrap = form.querySelector('[data-field="' + name + '"]');
    const show = value(control) === 'other';
    wrap.hidden = !show; wrap.querySelector('input').disabled = !show;
  }
  function syncRoute() {
    Object.entries(routePanels).forEach(([route, panel]) => {
      const active = route === value('requestType'); panel.hidden = !active; panel.disabled = !active;
    });
  }
  function validate(panel) {
    let first;
    panel.querySelectorAll('[data-field]').forEach(wrap => {
      const inputs = [...wrap.querySelectorAll('input, textarea')].filter(input => !input.matches(':disabled'));
      if (!inputs.length) return;
      const input = inputs[0];
      let message = '';
      if (input.type === 'radio') { if (input.required && !inputs.some(el => el.checked)) message = t('choose'); }
      else if (input.required && !input.value.trim()) message = t('required');
      else if (!input.validity.valid) message = t(input.type === 'email' ? 'invalidEmail' : input.type === 'number' ? 'invalidQuantity' : input.type === 'file' ? 'uploadError' : 'required');
      const error = wrap.querySelector('.business-field-error'); error.textContent = message; error.hidden = !message;
      inputs.forEach(el => el.setAttribute('aria-invalid', String(!!message)));
      if (message && !first) first = input.type === 'file' ? wrap.querySelector('button') : input;
    });
    const errors = dialog.querySelector('.business-errors'); errors.textContent = first ? t('errors') : '';
    if (first) first.focus(); return !first;
  }
  function show() {
    syncRoute();
    Object.entries(panels).forEach(([key, panel]) => { panel.hidden = completed || review || Number(key) !== step; });
    dialog.querySelector('.business-summary').hidden = !review || completed;
    dialog.querySelector('.business-success').hidden = !completed;
    dialog.querySelector('.business-footer').hidden = completed;
    dialog.querySelector('.business-errors').textContent = '';
    const progress = dialog.querySelector('.business-progress');
    progress.hidden = completed; progress.textContent = t('step' + step);
    dialog.querySelector('.business-progress-track').hidden = completed;
    dialog.querySelector('.business-progress-fill').style.width = (step / 3 * 100) + '%';
    const back = dialog.querySelector('[data-action="back"]'); back.hidden = step === 1 || review;
    const next = dialog.querySelector('[data-action="next"]'); next.hidden = review; next.textContent = t(step === 3 ? 'review' : 'next');
    dialog.querySelector('[data-action="edit"]').hidden = !review;
    dialog.querySelector('[data-action="send"]').hidden = !review;
    const target = completed ? dialog.querySelector('.business-success h3') : review ? dialog.querySelector('.business-summary h3') : progress;
    target.focus(); dialog.querySelector('.business-scroll').scrollTop = 0;
  }
  function summary() {
    const container = dialog.querySelector('.business-summary'); container.replaceChildren();
    const heading = make('h3', '', t('summary')); heading.tabIndex = -1; container.append(heading);
    const list = make('dl', 'business-summary-list'); container.append(list);
    const add = (label, text) => { if (!text) return; const row = make('div'); row.append(make('dt','',t(label)), make('dd','',text)); list.append(row); };
    add('department', selectedDepartment()); add('subject', selectedSubject()); add('requestType', t(value('requestType')));
    add('organisation', value('company')); add('location', value('branch'));
    routes[value('requestType')].forEach(([key,label,kind]) => {
      const name = value('requestType') + '-' + key;
      const text = kind === 'file' ? [...form.elements.namedItem(name).files].map(file=>file.name).join(', ') : kind === 'choice' ? t(value(name)) : value(name);
      add(label, text);
    });
    ['contact','role','email','phone'].forEach(key => add(key, value(key)));
    add('preference', t(value('preference')));
  }
  function close() { dialog.close(); }
  function build() {
    copy = window.obbinkBusinessCopy;
    dialog = make('dialog', 'business-intake'); dialog.id = 'business-intake';
    dialog.setAttribute('aria-labelledby', 'business-title'); dialog.setAttribute('aria-describedby', 'business-intro');
    const closeButton = button('close', 'business-close', close); closeButton.textContent = '×'; closeButton.setAttribute('aria-label', t('close'));
    const scroll = make('div', 'business-scroll');
    const header = make('header', 'business-header');
    const title = make('h2', '', t('title')); title.id = 'business-title';
    const intro = make('p','',t('intro')); intro.id = 'business-intro';
    header.append(make('p','business-brand','Obbink Zakelijk'), title, intro);
    form = make('form', 'business-form'); form.noValidate = true;
    const progress = make('h3', 'business-progress'); progress.tabIndex = -1;
    const track = make('div','business-progress-track'); track.setAttribute('aria-hidden','true'); track.append(make('span','business-progress-fill'));
    form.append(progress,track,make('p','business-hint',t('requiredHint')));
    for (let number = 1; number <= 3; number++) { panels[number] = make('section','business-step'); panels[number].dataset.step = number; form.append(panels[number]); }
    field(panels[1], '', ['department','departmentQuestion','choice',true,departments]);
    field(panels[1], '', ['departmentOther','departmentOther','text',true]);
    field(panels[1], '', ['subject','subjectQuestion','choice',true,subjects]);
    field(panels[1], '', ['subjectOther','subjectOther','text',true]);
    field(panels[1], '', ['requestType','typeQuestion','choice',true,types]);
    Object.entries(routes).forEach(([route,specs]) => {
      const panel = make('fieldset','business-detail-grid'); routePanels[route] = panel;
      panel.append(make('legend','business-route-title',t(route))); specs.forEach(spec=>field(panel, route+'-',spec)); panels[2].append(panel);
    });
    panels[3].classList.add('business-contact-grid');
    [['company','company','text',true],['branch','branch','text',true],['contactDepartment','department'],['contact','contact','text',true],['role','role'],['email','email','email',true],['phone','phone','tel',true],['preference','preference','choice',true,['call','mail']]].forEach(spec => field(panels[3], '', spec));
    const departmentInput = form.elements.namedItem('contactDepartment'); departmentInput.readOnly = true;
    const autofill = {company:'organization',contact:'name',role:'organization-title',email:'email',phone:'tel'};
    Object.entries(autofill).forEach(([name, token]) => { form.elements.namedItem(name).autocomplete = token; });
    form.append(make('section','business-summary'));
    const success = make('section','business-success');
    const successTitle = make('h3','',t('received')); successTitle.tabIndex = -1;
    success.append(make('span','business-success-icon','✓'),successTitle,make('p','',t('confirmation')),button('done','business-primary',close)); form.append(success);
    const errors = make('p','business-errors'); errors.setAttribute('role','alert'); form.append(errors);
    const footer = make('div','business-footer');
    const back = button('back','business-secondary',()=>{ step--; show(); }); back.dataset.action='back';
    const next = button('next','business-primary',()=>{
      if (!validate(panels[step])) return;
      if (step === 1) departmentInput.value = selectedDepartment();
      if (step === 3) { review = true; summary(); } else step++;
      show();
    }); next.dataset.action='next';
    const edit = button('edit','business-secondary',()=>{ review=false; step=1; show(); }); edit.dataset.action='edit';
    const send = make('button','business-primary',t('send')); send.type='submit'; send.dataset.action='send';
    footer.append(back,edit,next,send); form.append(footer,make('p','business-prototype',t('prototype')));
    scroll.append(header,form); dialog.append(closeButton,scroll); document.body.append(dialog);
    form.addEventListener('change', event => {
      conditional('departmentOther','department'); conditional('subjectOther','subject'); syncRoute();
      // Keep operational impact and urgency consistent, without inferring response times.
      if (event.target.name === 'fault-halted' && value('fault-halted') === 'yes') form.elements.namedItem('fault-urgency').value = 'stopped';
      if (event.target.name === 'fault-halted' && value('fault-halted') === 'no' && value('fault-urgency') === 'stopped') form.elements.namedItem('fault-urgency').value = 'normal';
      if (event.target.name === 'fault-urgency') form.elements.namedItem('fault-halted').value = value('fault-urgency') === 'stopped' ? 'yes' : 'no';
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!review) { next.click(); return; }
      // Deliberately no fetch, email, storage or backend request in this prototype.
      completed = true; review = false; show();
    });
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => { document.body.classList.remove('business-intake-open'); opener?.focus(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.stopPropagation(); event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button,input,textarea,[tabindex="0"]')].filter(el => !el.matches(':disabled') && el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !focusable.includes(document.activeElement))) { event.preventDefault(); first.focus(); }
    });
    conditional('departmentOther','department'); conditional('subjectOther','subject');
  }
  triggers.forEach(trigger => {
    trigger.setAttribute('aria-haspopup','dialog'); trigger.setAttribute('aria-controls','business-intake');
    trigger.addEventListener('click', async event => {
      event.preventDefault(); await translationsReady;
      if (!dialog) build(); opener = trigger;
      if (completed) { form.reset(); dialog.remove(); dialog = null; step = 1; review = false; completed = false; build(); }
      document.body.classList.add('business-intake-open'); dialog.showModal(); show();
    });
  });
})();
