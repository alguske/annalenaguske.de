(() => {
    const nav = document.querySelector('.nav');
    const menu = document.getElementById('section-navigation');
    const toggle = document.querySelector('.nav-toggle');

    if (menu && toggle) {
        const setMenuOpen = (open) => {
            menu.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
        };

        toggle.hidden = false;
        nav.classList.add('menu-ready');
        toggle.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));
        menu.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;
            setMenuOpen(false);
            // Keep keyboard focus at the destination after the mobile menu closes.
            const section = document.querySelector(link.hash);
            if (section) {
                section.tabIndex = -1;
                section.focus({ preventScroll: true });
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
                toggle.focus();
            }
        });
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target)) setMenuOpen(false);
        });
        nav.addEventListener('focusout', (event) => {
            if (!nav.contains(event.relatedTarget)) setMenuOpen(false);
        });
        window.matchMedia('(max-width: 1099px)').addEventListener('change', () => setMenuOpen(false));
    }

    // Start with all CV content available, including when JavaScript is disabled.
    document.querySelectorAll('.btn-expand[data-target]').forEach((button) => {
        const target = document.getElementById(button.dataset.target);
        if (!target) return;
        const publications = target.querySelectorAll('.pub-hidden');
        const items = publications.length ? publications : [target];
        const setExpanded = (expanded) => {
            items.forEach((item) => { item.hidden = !expanded; });
            button.setAttribute('aria-expanded', String(expanded));
            button.textContent = expanded ? button.dataset.hide : button.dataset.show;
        };
        setExpanded(false);
        button.hidden = false;
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') !== 'true';
            setExpanded(expanded);
            if (!expanded) button.scrollIntoView({ block: 'nearest' });
        });
    });

    document.querySelectorAll('[data-print]').forEach((button) => {
        button.hidden = false;
        button.addEventListener('click', () => window.print());
    });

    const languageLinks = document.querySelectorAll('[data-language-link]');
    const updateLanguageLinks = () => {
        languageLinks.forEach((link) => { link.hash = window.location.hash; });
    };
    updateLanguageLinks();
    window.addEventListener('hashchange', updateLanguageLinks);

    // One update per frame, with a stable active section even for long entries.
    const sections = [...document.querySelectorAll('main > .section')];
    const sectionLinks = [...document.querySelectorAll('[data-section]')];
    let scheduled = false;
    const updateNavigation = () => {
        scheduled = false;
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 16);
        const offset = (nav ? nav.offsetHeight : 0) + 32;
        let active = '';
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= offset) active = section.id;
        });
        sectionLinks.forEach((link) => {
            const current = link.dataset.section === active;
            link.classList.toggle('active', current);
            if (current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    const scheduleNavigation = () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(updateNavigation);
    };
    window.addEventListener('scroll', scheduleNavigation, { passive: true });
    window.addEventListener('resize', scheduleNavigation);
    updateNavigation();
})();
