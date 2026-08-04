// Bottom-left project popup
(function () {
    const popup = document.getElementById('project-popup');
    const titleEl = document.getElementById('popup-title');
    const descEl = document.getElementById('popup-desc');
    const frame = document.getElementById('popup-frame');
    const openLink = document.getElementById('popup-open');
    const fallback = document.getElementById('popup-fallback');
    const fallbackLink = document.getElementById('popup-fallback-link');
    const closeBtn = document.getElementById('popup-close');
    const items = document.querySelectorAll('.work-item');

    let loadTimer = null;

    function openPopup(item) {
        const title = item.dataset.title || '';
        const url = item.dataset.url || '';
        const desc = item.dataset.desc || '';

        titleEl.textContent = title;
        descEl.textContent = desc;
        openLink.href = url;
        fallbackLink.href = url;

        fallback.hidden = true;
        frame.hidden = false;
        frame.src = url;

        popup.hidden = false;
        popup.setAttribute('aria-hidden', 'false');
        popup.classList.add('is-open');
        document.body.classList.add('popup-open');

        // If the site blocks iframes, show fallback after a short wait
        clearTimeout(loadTimer);
        loadTimer = setTimeout(() => {
            try {
                // Cross-origin frames throw on contentDocument access — expected.
                // We still keep the iframe; fallback is a soft hint for blocked embeds.
                void frame.contentWindow;
            } catch (_) {
                /* ignore */
            }
        }, 2500);
    }

    function closePopup() {
        clearTimeout(loadTimer);
        popup.classList.remove('is-open');
        popup.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('popup-open');

        // Clear iframe after close animation
        setTimeout(() => {
            if (!popup.classList.contains('is-open')) {
                popup.hidden = true;
                frame.src = 'about:blank';
            }
        }, 220);
    }

    items.forEach((item) => {
        item.addEventListener('click', () => openPopup(item));
    });

    closeBtn.addEventListener('click', closePopup);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('is-open')) {
            closePopup();
        }
    });

    // Soft fallback when iframe fails to load
    frame.addEventListener('error', () => {
        frame.hidden = true;
        fallback.hidden = false;
    });
})();
