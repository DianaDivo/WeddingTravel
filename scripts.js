// Mobile menu toggle
const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isHidden = mobileMenu.hasAttribute('hidden');
    mobileMenu.toggleAttribute('hidden');
    burger.setAttribute('aria-expanded', String(isHidden));
  });
  // Close on link click
  mobileMenu.addEventListener('click', e => {
    if (e.target.matches('a')) {
      mobileMenu.setAttribute('hidden', '');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Lazy YouTube embed
document.querySelectorAll('.video__thumb').forEach(el => {
  const url = el.dataset.video;
  const createIframe = () => {
    const iframe = document.createElement('iframe');
    iframe.src = url + '?autoplay=1&rel=0';
    iframe.title = 'Видеоотзыв';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.style.border = '0';
    iframe.width = '100%';
    iframe.height = '100%';
    el.replaceWith(iframe);
  };
  el.addEventListener('click', createIframe);
  el.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && createIframe());
});

// Calculator logic (примерная оценка диапазона)
const calcBtn = document.getElementById('calcBtn');
const calcResult = document.getElementById('calcResult');

function formatCurrency(n){
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

if (calcBtn) {
  calcBtn.addEventListener('click', () => {
    const form = document.querySelector('.calc');
    const region = form.region.value;
    const venue = form.venue.value;
    const guests = Math.max(2, Math.min(200, parseInt(form.guests.value || 0, 10)));
    const season = form.season.value;
    const service = form.service.value;
    const priorities = Array.from(form.querySelectorAll('input[name="priority"]:checked')).map(i=>i.value);

    // Базовые ставки (условные)
    const regionBase = { europe: 14000, asia: 12000, belarus_russia: 9000, islands: 16000 }[region] || 10000;
    const venueMod   = { villa: 1.1, winery: 1.15, beach: 1.05, castle: 1.25, loft: 1.0 }[venue] || 1.0;
    const seasonMod  = { low: 0.95, mid: 1.0, high: 1.12 }[season] || 1.0;
    const serviceMod = { full: 1.0, coordination: 0.65, partial: 0.8 }[service] || 1.0;

    // Перс‑коэффициенты
    const guestCost = 120 * guests; // кейтеринг+аренда за гостя (условно)
    const priorityAdd = priorities.reduce((sum, p) => {
      const map = { decor: 2500, photo: 1800, catering: 0, music: 1200 };
      return sum + (map[p] || 0);
    }, 0);

    let base = regionBase * venueMod * seasonMod * serviceMod + guestCost + priorityAdd;

    // Диапазон: +/- 15% в зависимости от площадки/сезона
    const low = Math.round(base * 0.85);
    const high = Math.round(base * 1.15);

    calcResult.innerHTML = `
      <h3>Ориентировочная смета</h3>
      <ul>
        <li><b>Диапазон:</b> ${formatCurrency(low)} — ${formatCurrency(high)}</li>
        <li><b>Включено:</b> площадка/аренда, базовый декор, координация, фото (частично), логистика</li>
        <li><b>Зависит от:</b> выбранной локации, даты и состава команды</li>
      </ul>
      <p>Для точного расчёта подготовим 2–3 локации с разбивкой бюджета по статьям.</p>
    `;
    calcResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Contact form mock submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());
    alert('Спасибо! Мы свяжемся с вами в течение 24 часов.');
    console.log('Заявка:', data);
    contactForm.reset();
  });
}
