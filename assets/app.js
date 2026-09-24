document.querySelectorAll('img[src="assets/obbink-service.svg"]').forEach((logo) => {
  logo.src = 'assets/obbinkservice.png';
});

const serviceGrid = document.querySelector('#service-grid');
const services = window.OBBINK_CONTENT?.services || [];

services.forEach((service) => {
  const card = document.createElement('article');
  card.className = 'service-card';
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
serviceForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = 'Dank u. Dit is nog een prototype: in de volgende fase koppelen we de aanvraag aan de Obbink Service-processen en onze backoffice.';
  if (formMessage) formMessage.textContent = window.obbinkT ? window.obbinkT(message) : message;
});

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
