// Bottom-left project popup
// GitHub Pages projects embed in an iframe; Streamlit (and other hosts that block framing) get an in-page card.
(function () {
    const popup = document.getElementById('project-popup');
    const sidebarPhoto = document.getElementById('sidebar-photo');
    const titleEl = document.getElementById('popup-title');
    const frame = document.getElementById('popup-frame');
    const openLink = document.getElementById('popup-open');
    const card = document.getElementById('popup-card');
    const cardNote = document.getElementById('popup-card-note');
    const cardLink = document.getElementById('popup-card-link');
    const closeBtn = document.getElementById('popup-close');
    const items = document.querySelectorAll('.work-item');

    function canEmbed(url, explicit) {
        if (explicit === 'false') return false;
        if (explicit === 'true') return true;
        try {
            const host = new URL(url).hostname;
            if (host.endsWith('streamlit.app') || host.includes('share.streamlit.io')) {
                return false;
            }
            return true;
        } catch (_) {
            return false;
        }
    }

    function openPopup(item) {
        const title = item.dataset.title || '';
        const url = item.dataset.url || '';
        const embed = canEmbed(url, item.dataset.embed);

        titleEl.textContent = title;
        openLink.href = url;
        cardLink.href = url;

        if (embed) {
            popup.classList.remove('is-card');
            card.hidden = true;
            frame.hidden = false;
            frame.src = url;
        } else {
            popup.classList.add('is-card');
            frame.hidden = true;
            frame.src = 'about:blank';
            card.hidden = false;
            cardNote.textContent =
                'This project runs on Streamlit, which doesn’t allow in-page previews. Open it in a new tab to use the full dashboard.';
        }

        popup.hidden = false;
        popup.setAttribute('aria-hidden', 'false');
        popup.classList.add('is-open');
        if (sidebarPhoto) sidebarPhoto.classList.add('is-hidden');
    }

    function closePopup() {
        popup.classList.remove('is-open');
        popup.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            if (!popup.classList.contains('is-open')) {
                popup.hidden = true;
                frame.src = 'about:blank';
                popup.classList.remove('is-card');
                if (sidebarPhoto) sidebarPhoto.classList.remove('is-hidden');
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
})();

