// Initialize AOS
const isPhone = window.matchMedia('(max-width: 767px)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// animações extras de entrada (sem mexer no HTML das fotos)
document.querySelectorAll('#galeria figure').forEach((f, i) => { f.dataset.aos = 'zoom-in'; f.dataset.aosDelay = isPhone ? 0 : i * 110; });
document.querySelectorAll('#galeria .text-center').forEach(el => { el.dataset.aos = 'fade-up'; });
document.querySelectorAll('#inicio .grid > div').forEach((el, i) => { el.dataset.aos = 'fade-up'; el.dataset.aosDelay = 200 + i * 130; });
// no celular, atrasos menores para não "demorar" a aparecer
if (isPhone) document.querySelectorAll('.service-card').forEach((c, i) => { c.dataset.aosDelay = (i % 2) * 90; });


// animações extras: entrada em cascata e brilho nos botões
document.querySelectorAll('#agendamento form .grid > div, #agendamento form > .pt-4').forEach((el, i) => { el.dataset.aos = 'fade-up'; el.dataset.aosDelay = isPhone ? (i % 2) * 60 : i * 80; });
document.querySelectorAll('#contato .grid > div').forEach((el, i) => { el.dataset.aos = 'fade-up'; el.dataset.aosDelay = isPhone ? 0 : i * 120; });
document.querySelectorAll('#localizacao .grid > div:first-child').forEach(el => { el.dataset.aos = 'fade-right'; });
document.querySelectorAll('#sobre [data-aos="fade-left"] > *').forEach((el, i) => { el.dataset.aos = 'fade-up'; el.dataset.aosDelay = i * 90; });
document.querySelectorAll('#sobre [data-aos="fade-left"]').forEach(el => { el.removeAttribute('data-aos'); });
if (window.AOS && !reduceMotion) document.querySelectorAll('#galeria figure img').forEach(img => img.classList.add('reveal-img'));
document.querySelectorAll('a[href="#agendamento"][class*="from-blush"], #booking-form button[type="submit"]').forEach(b => b.classList.add('btn-shine'));

if (window.AOS) AOS.init({
    duration: isPhone ? 650 : 800,
    offset: isPhone ? 40 : 120,
    easing: 'ease-out-cubic',
    once: true,
    disable: () => reduceMotion,
});

// depois que o cartão apareceu, o hover não deve herdar o atraso do AOS
document.addEventListener('aos:in', e => {
    const el = e.detail;
    if (!el.matches('.service-card')) return;
    const wait = (parseInt(el.dataset.aosDelay || 0, 10)) + (parseInt(el.dataset.aosDuration || 650, 10)) + 80;
    setTimeout(() => { el.style.transitionDelay = '0s'; el.style.transitionDuration = '.3s'; }, wait);
});

// barra de progresso de rolagem + sombra do cabeçalho
const progressBar = document.getElementById('scroll-progress');
const headerEl = document.getElementById('header');
let ticking = false;
function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    headerEl.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// pétalas / brilhos suaves no hero
(function () {
    const box = document.getElementById('petals');
    if (!box || reduceMotion) return;
    const colors = ['#c084fc', '#d8b4fe', '#a855f7', '#e9d5ff', '#f3e8ff', '#e9d5ff'];
    const total = isPhone ? 14 : 26;
    for (let i = 0; i < total; i++) {
        const el = document.createElement('span');
        el.className = 'petal';
        const size = 8 + Math.random() * 14;
        el.style.cssText = 'left:' + (Math.random() * 100) + '%;width:' + size + 'px;height:' + size + 'px;background:' + colors[i % colors.length] +
            ';animation-duration:' + (9 + Math.random() * 10) + 's;animation-delay:-' + (Math.random() * 18) + 's;--dx:' + ((Math.random() * 120) - 60) + 'px';
        box.appendChild(el);
    }
})();

// data mínima = hoje (evita agendar no passado)
(function () {
    const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    document.getElementById('booking-date').min = d.toISOString().slice(0, 10);
})();

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function setMenu(open) {
    document.body.classList.toggle('mobile-menu-open', open);
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menuBtn.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
mobileLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => {
    if (!document.getElementById('header').contains(event.target)) setMenu(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
});
window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
document.querySelectorAll('.service-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); }
    });
});
document.querySelectorAll('#booking-form label').forEach(label => {
    const field = label.parentElement.querySelector('input, select');
    if (field) label.htmlFor = field.id;
});
document.getElementById('client-name').autocomplete = 'name';
document.getElementById('client-phone').autocomplete = 'tel';
document.getElementById('client-phone').inputMode = 'tel';
const serviceSelect = document.getElementById('service-select');
const otherServiceField = document.getElementById('other-service-field');
const otherServiceInput = document.getElementById('other-service');
function updateOtherService(focusInput = false) {
    const isOther = serviceSelect.value === 'Outro';
    otherServiceField.hidden = !isOther;
    otherServiceInput.disabled = !isOther;
    otherServiceInput.required = isOther;
    otherServiceInput.setCustomValidity('');
    if (isOther && focusInput) otherServiceInput.focus();
}
serviceSelect.addEventListener('change', () => updateOtherService(true));
otherServiceInput.addEventListener('input', () => otherServiceInput.setCustomValidity(''));
window.addEventListener('pageshow', () => updateOtherService());
updateOtherService();
// Helper function when clicking a service card
function selectServiceForm(serviceName) {
    const selectEl = document.getElementById('service-select');
    selectEl.value = serviceName;
    updateOtherService();

    // Smooth scroll to booking section
    const bookingSection = document.getElementById('agendamento');
    bookingSection.scrollIntoView({ behavior: 'smooth' });
}

// WhatsApp Form Submission
function sendToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const selectedService = serviceSelect.value;
    const service = selectedService === 'Outro' ? otherServiceInput.value.trim() : selectedService;
    if (selectedService === 'Outro' && !service) {
        otherServiceInput.setCustomValidity('Digite o serviço desejado.');
        otherServiceInput.reportValidity();
        return;
    }
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;

    if (!name || !phone || !service || !date || !time) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

    // Format date to DD/MM/YYYY for nicer display
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Create formatted message
    const message = `Olá! Gostaria de agendar um horário no Ateliê Dani Costa.\n\n*Nome:* ${name}\n*WhatsApp:* ${phone}\n*Serviço:* ${service}\n*Data:* ${formattedDate}\n*Horário:* ${time}`;

    const encodedMessage = encodeURIComponent(message);
    const ownerNumber = "5585986468442";
    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
}

const photoViewer = document.getElementById('photo-viewer');
const expandedPhoto = document.getElementById('expanded-photo');
let photoScrollY = 0;
const originalBodyPosition = { position: '', top: '', width: '' };
function openPhoto(photo) {
    expandedPhoto.src = photo.currentSrc || photo.src;
    expandedPhoto.alt = photo.alt;
    photoScrollY = window.scrollY;
    originalBodyPosition.position = document.body.style.position;
    originalBodyPosition.top = document.body.style.top;
    originalBodyPosition.width = document.body.style.width;
    photoViewer.showModal();
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + photoScrollY + 'px';
    document.body.style.width = '100%';
}
document.querySelectorAll('#galeria img, #sobre img').forEach(photo => {
    photo.tabIndex = 0;
    photo.setAttribute('role', 'button');
    photo.setAttribute('aria-label', 'Ampliar imagem: ' + photo.alt);
    photo.setAttribute('aria-haspopup', 'dialog');
    photo.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); openPhoto(photo); });
    photo.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); openPhoto(photo); }
    });
});
document.getElementById('close-photo').addEventListener('click', () => photoViewer.close());
photoViewer.addEventListener('click', event => {
    const bounds = photoViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoViewer.close();
});
photoViewer.addEventListener('close', () => {
    document.body.style.position = originalBodyPosition.position;
    document.body.style.top = originalBodyPosition.top;
    document.body.style.width = originalBodyPosition.width;
    window.scrollTo({ top: photoScrollY, behavior: 'instant' });
});

// Eventos separados do HTML.
document.querySelectorAll('[data-service]').forEach(card => {
    card.addEventListener('click', () => selectServiceForm(card.dataset.service));
});
document.getElementById('booking-form').addEventListener('submit', sendToWhatsApp);
