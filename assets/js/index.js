/**
 * Pawpress — theme interactions
 * Imports CSS entrypoint and wires: mobile nav, gallery lightbox,
 * testimonial carousel, smooth-scroll, sticky CTA visibility.
 */
import '../css/index.css';

(function () {
    'use strict';

    const ready = (fn) => {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    };

    // --- Mobile nav toggle ---
    const initNav = () => {
        const toggle = document.querySelector('[data-nav-toggle]');
        const nav = document.querySelector('[data-nav]');
        if (!toggle || !nav) return;
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('pw-nav-open');
            toggle.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('pw-nav-locked', open);
        });
        nav.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                nav.classList.remove('pw-nav-open');
                document.body.classList.remove('pw-nav-locked');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    };

    // --- Smooth scroll for in-page anchors ---
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href || href === '#' || href.length < 2) return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    };

    // --- Sticky CTA visibility (show after hero) ---
    const initStickyCta = () => {
        const cta = document.querySelector('.pw-sticky-cta-wrap');
        if (!cta) return;
        const hero = document.querySelector('.pw-hero');
        if (!hero) {
            cta.classList.add('pw-visible');
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    cta.classList.toggle('pw-visible', !entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        );
        io.observe(hero);
    };

    // --- Gallery lightbox ---
    const initLightbox = () => {
        const lightbox = document.querySelector('[data-lightbox]');
        if (!lightbox) return;
        const img = lightbox.querySelector('[data-lightbox-img]');
        const closeBtn = lightbox.querySelector('[data-lightbox-close]');
        const triggers = document.querySelectorAll('[data-lightbox-src]');
        if (!img || !triggers.length) return;

        const open = (src, alt) => {
            img.src = src;
            img.alt = alt || '';
            lightbox.classList.add('pw-lightbox-open');
            document.body.classList.add('pw-nav-locked');
        };
        const close = () => {
            lightbox.classList.remove('pw-lightbox-open');
            document.body.classList.remove('pw-nav-locked');
            img.src = '';
        };

        triggers.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                open(el.getAttribute('data-lightbox-src'), el.getAttribute('data-lightbox-alt'));
            });
        });
        if (closeBtn) closeBtn.addEventListener('click', close);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    };

    // --- Testimonial carousel ---
    const initCarousels = () => {
        document.querySelectorAll('[data-carousel]').forEach((root) => {
            const track = root.querySelector('[data-carousel-track]');
            const nav = root.querySelector('[data-carousel-nav]');
            const prev = root.querySelector('.pw-prev');
            const next = root.querySelector('.pw-next');
            if (!track) return;
            const slides = Array.from(track.children);
            if (!slides.length) return;

            let index = 0;
            const goTo = (i) => {
                index = (i + slides.length) % slides.length;
                track.style.transform = `translateX(-${index * 100}%)`;
                if (nav) {
                    Array.from(nav.children).forEach((dot, d) => {
                        dot.classList.toggle('pw-active', d === index);
                    });
                }
            };

            if (nav) {
                slides.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'pw-carousel-dot';
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.addEventListener('click', () => goTo(i));
                    nav.appendChild(dot);
                });
            }
            if (prev) prev.addEventListener('click', () => goTo(index - 1));
            if (next) next.addEventListener('click', () => goTo(index + 1));

            let timer = setInterval(() => goTo(index + 1), 6000);
            root.addEventListener('mouseenter', () => clearInterval(timer));
            root.addEventListener('mouseleave', () => {
                timer = setInterval(() => goTo(index + 1), 6000);
            });

            goTo(0);
        });
    };

    ready(() => {
        initNav();
        initSmoothScroll();
        initStickyCta();
        initLightbox();
        initCarousels();
    });
})();
