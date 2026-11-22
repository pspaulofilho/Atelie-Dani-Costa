/* Decorative only. No storage, network requests, or changes to existing handlers. */
(() => {
    'use strict';
    if (document.getElementById('adc-xmas-toggle')) return;
    const header = document.getElementById('header');
    if (!header) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const phone = window.matchMedia('(max-width: 767px)');
    const connection = navigator.connection;
    const layers = [];
    let enabled = true;

    function layer(parent, extra) {
        const element = document.createElement('div');
        element.className = 'adc-xmas-layer ' + extra;
        element.setAttribute('aria-hidden', 'true');
        parent.appendChild(element);
        layers.push(element);
        return element;
    }
    function decoration(parent, text, className) {
        const element = document.createElement('span');
        element.className = className;
        element.textContent = text;
        parent.appendChild(element);
        return element;
    }
    const lights = layer(header, 'adc-xmas-lights');
    for (let i = 0; i < 18; i++) decoration(lights, '', 'adc-xmas-bulb');
    const sky = layer(header, 'adc-xmas-sky');
    decoration(sky, '🎅', 'adc-xmas-santa');
    const motifs = [['🎄', 'adc-xmas-tree'], ['🎁', 'adc-xmas-gift'], ['🔔', 'adc-xmas-bell'], ['🎀', 'adc-xmas-bow']];
    // Only the existing positioned sections with ample top/bottom padding.
    ['inicio', 'servicos', 'sobre', 'agendamento', 'localizacao', 'redes', 'contato'].forEach((id, i) => {
        const section = document.getElementById(id);
        if (!section) return;
        const box = layer(section, id === 'inicio' ? 'adc-xmas-hero' : '');
        const [symbol, kind] = motifs[i % motifs.length];
        decoration(box, symbol, 'adc-xmas-ornament adc-xmas-left ' + kind);
        decoration(box, '✦', 'adc-xmas-ornament adc-xmas-right adc-xmas-star');
    });
    const snow = layer(document.body, 'adc-xmas-snow');
    function makeSnow() {
        snow.replaceChildren();
        if (motion.matches || connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) return;
        const count = phone.matches ? 6 : 10;
        for (let i = 0; i < count; i++) {
            const flake = decoration(snow, '❄', 'adc-xmas-flake');
            flake.style.animationDelay = (-i * 3.7) + 's';
            flake.style.animationDuration = (18 + i % 4 * 3) + 's';
        }
    }
    const toggle = document.createElement('button');
    toggle.id = 'adc-xmas-toggle';
    toggle.type = 'button';
    toggle.textContent = '🎄';
    toggle.setAttribute('aria-label', 'Decoração de Natal');
    document.body.appendChild(toggle);

    function sync() {
        const still = motion.matches || connection?.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
        layers.forEach(element => {
            element.hidden = !enabled;
            element.classList.toggle('adc-xmas-still', Boolean(still));
            element.classList.toggle('adc-xmas-paused', document.hidden || !enabled);
        });
        toggle.setAttribute('aria-pressed', String(enabled));
        toggle.title = enabled ? 'Desativar decoração de Natal' : 'Ativar decoração de Natal';
    }
    toggle.addEventListener('click', () => { enabled = !enabled; sync(); });
    document.addEventListener('visibilitychange', sync);
    function adapt() { makeSnow(); sync(); }
    motion.addEventListener('change', adapt);
    phone.addEventListener('change', adapt);
    connection?.addEventListener('change', adapt);
    adapt();
})();
