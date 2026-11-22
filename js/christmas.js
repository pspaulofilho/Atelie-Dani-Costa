/* Edição de Natal: aparência somente, sem armazenamento ou dependências. */
(() => {
    'use strict';
    const root = document.documentElement;
    const header = document.getElementById('header');
    if (!header || root.classList.contains('adc-natal')) return;
    root.classList.add('adc-natal');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const phone = window.matchMedia('(max-width: 767px)');
    const connection = navigator.connection;
    const layers = [];
    const visibility = new WeakMap();
    const limited = () => motion.matches || connection?.saveData || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2);
    function item(parent, text, className, index = 0) {
        const element = document.createElement('span');
        element.className = className;
        element.textContent = text;
        element.style.setProperty('--adc-i', index);
        parent.appendChild(element);
        return element;
    }
    function layer(parent, className) {
        const element = document.createElement('div');
        element.className = 'adc-xmas-layer ' + className;
        element.setAttribute('aria-hidden', 'true');
        parent.appendChild(element);
        layers.push(element);
        visibility.set(element, true);
        return element;
    }
    function lights(parent) {
        const cord = layer(parent, 'adc-xmas-lights');
        for (let i = 0; i < 24; i++) item(cord, '', 'adc-xmas-bulb', i);
    }
    lights(header);
    const headerTrim = layer(header, 'adc-xmas-header-trim');
    for (let i = 0; i < 3; i++) item(headerTrim, '', 'adc-xmas-bauble adc-xmas-bauble-' + i, i);
    const motifs = [
        ['🎄', '🎁', '🔔', '🎀'], ['🎁', '🔔', '🎄', '🍬'],
        ['🎀', '✦', '🎁', '🎄'], ['🔔', '🎀', '🎄', '🍬']
    ];
    ['inicio', 'servicos', 'galeria', 'sobre', 'agendamento', 'localizacao', 'redes', 'contato'].forEach((id, index) => {
        const section = document.getElementById(id);
        if (!section) return;
        const decor = layer(section, 'adc-xmas-section' + (id === 'inicio' ? ' adc-xmas-hero' : ''));
        item(decor, '', 'adc-xmas-pine adc-xmas-pine-left');
        item(decor, '', 'adc-xmas-pine adc-xmas-pine-right');
        item(decor, '', 'adc-xmas-candy');
        motifs[index % motifs.length].forEach((symbol, i) => item(decor, symbol, 'adc-xmas-ornament adc-xmas-ornament-' + i, i));
        item(decor, '', 'adc-xmas-wreath');
        for (let i = 0; i < 3; i++) item(decor, '', 'adc-xmas-bauble adc-xmas-bauble-' + i, i);
    });
    const hero = document.getElementById('inicio');
    if (hero) {
        const shimmer = layer(hero, 'adc-xmas-shimmer');
        for (let i = 0; i < 12; i++) item(shimmer, '✦', 'adc-xmas-spark', i);
        const sky = layer(hero, 'adc-xmas-sky');
        item(sky, '🦌 🦌 🛷🎅', 'adc-xmas-santa');
        const title = hero.querySelector('h1');
        if (title) {
            const greeting = document.createElement('p');
            greeting.className = 'adc-xmas-greeting';
            greeting.textContent = 'Um Natal cheio de beleza e encanto! 🎄';
            title.insertAdjacentElement('afterend', greeting);
        }
    }
    const footer = document.getElementById('contato');
    if (footer) {
        lights(footer);
        const message = document.createElement('p');
        message.className = 'adc-xmas-footer-message';
        message.textContent = 'Feliz Natal! Que a beleza e o carinho iluminem seus dias. ✨';
        footer.appendChild(message);
    }
    const snow = layer(document.body, 'adc-xmas-snow');
    function makeSnow() {
        snow.replaceChildren();
        if (limited()) return;
        const count = phone.matches ? 12 : 22;
        for (let i = 0; i < count; i++) {
            const flake = item(snow, i % 3 === 0 ? '✦' : '❄', 'adc-xmas-flake', i);
            flake.style.setProperty('--adc-duration', (12 + i % 6 * 2) + 's');
            flake.style.setProperty('--adc-delay', (-i * 2.7) + 's');
        }
    }
    function sync() {
        root.classList.toggle('adc-natal-still', Boolean(limited()));
        root.classList.toggle('adc-natal-paused', document.hidden);
        layers.forEach(element => {
            element.classList.toggle('adc-xmas-paused', document.hidden || !visibility.get(element));
        });
    }
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => visibility.set(entry.target, entry.isIntersecting));
            sync();
        }, { rootMargin: '40px' });
        layers.filter(element => element !== snow).forEach(element => observer.observe(element));
    }
    function adapt() { makeSnow(); sync(); }
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', adapt);
    phone.addEventListener('change', adapt);
    connection?.addEventListener('change', adapt);
    adapt();
})();
