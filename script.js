// Language toggle and show more/less logic
document.addEventListener('DOMContentLoaded', function () {
    const langSelect = document.getElementById('lang-select');
    let lang = 'en';

    function createFrenchPlaceholders() {
        const artworks = Array.from(document.querySelectorAll('.gallery .artwork'));

        artworks.forEach((artwork, index) => {
            const todoId = index + 1;

            const title = artwork.querySelector('.artwork-title');
            if (title && !title.querySelector('.lang-fr')) {
                const frTitle = document.createElement('span');
                frTitle.className = 'lang-fr';
                frTitle.style.display = 'none';
                frTitle.textContent = `TODO FR-${todoId}: Titre du tableau`;
                title.appendChild(frTitle);
            }

            const group = artwork.querySelector('.artwork-description-group');
            if (group && !group.querySelector('.artwork-description.lang-fr')) {
                const sourceDesc = group.querySelector('.artwork-description.lang-en') || group.querySelector('.artwork-description.lang-ro');
                const sourceFullBtn = sourceDesc ? sourceDesc.querySelector('.full-quality-btn') : null;
                const fullQualityHref = sourceFullBtn ? sourceFullBtn.getAttribute('href') : '#';

                const frDesc = document.createElement('div');
                frDesc.className = 'artwork-description lang-fr';
                frDesc.style.display = 'none';
                frDesc.dataset.todoId = String(todoId);

                frDesc.innerHTML = `
                    <p>TODO FR-${todoId}: Texte français temporaire pour ce tableau.<br><br></p>
                    <div class="more-text" style="display:none;">
                        <hr style="border: none; border-top: 2px solid #ffd700; margin: 20px auto; width: 25%;" />
                        <p>TODO FR-${todoId}: Texte français étendu (placeholder).<br><br></p>
                    </div>
                    <div class="button-group">
                        <button class="show-more-btn">TODO FR-${todoId}: Voir plus</button>
                        <a href="${fullQualityHref}" target="_blank" class="full-quality-btn">
                            <span class="lang-fr">TODO FR-${todoId}: Peinture qualité complète</span>
                        </a>
                    </div>
                `;

                group.appendChild(frDesc);
            }
        });
    }

    function updateLangUI() {
        if (!['ro', 'en', 'fr'].includes(lang)) {
            lang = 'en';
        }

        document.documentElement.lang = lang;

        document.querySelectorAll('.lang-ro, .lang-en, .lang-fr').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll(`.lang-${lang}`).forEach(el => {
            el.style.display = '';
        });

        if (langSelect && langSelect.value !== lang) {
            langSelect.value = lang;
        }

        // Update show more/less buttons text
        document.querySelectorAll('.show-more-btn').forEach(btn => {
            const desc = btn.closest('.artwork-description');
            if (!desc) return;

            const more = desc.querySelector('.more-text');
            const isCollapsed = !more || more.style.display === 'none' || more.style.display === '';
            const todoId = desc.dataset.todoId;

            if (todoId) {
                if (desc.classList.contains('lang-fr')) {
                    btn.textContent = isCollapsed
                        ? `TODO FR-${todoId}: Voir plus`
                        : `TODO FR-${todoId}: Voir moins`;
                    return;
                }

                if (desc.classList.contains('lang-ro')) {
                    btn.textContent = isCollapsed
                        ? `TODO RO-${todoId}: Afișează mai mult`
                        : `TODO RO-${todoId}: Afișează mai puțin`;
                    return;
                }

                btn.textContent = isCollapsed
                    ? `TODO EN-${todoId}: Show more`
                    : `TODO EN-${todoId}: Show less`;
                return;
            }

            if (desc.classList.contains('lang-fr')) {
                btn.textContent = isCollapsed ? 'Voir plus' : 'Voir moins';
            } else if (desc.classList.contains('lang-ro')) {
                btn.textContent = isCollapsed ? 'Afișează mai mult' : 'Afișează mai puțin';
            } else {
                btn.textContent = isCollapsed ? 'Show more' : 'Show less';
            }
        });
    }

    createFrenchPlaceholders();

    if (langSelect) {
        langSelect.value = 'en';
        langSelect.addEventListener('change', function () {
            lang = langSelect.value;
            updateLangUI();
        });
    }

    // Initialize language state
    updateLangUI();

    // Show more/less functionality
    document.querySelectorAll('.artwork-description-group').forEach(group => {
        group.querySelectorAll('.show-more-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const desc = btn.closest('.artwork-description');
                const more = desc.querySelector('.more-text');
                const todoId = desc.dataset.todoId;
                if (more.style.display === 'none' || more.style.display === '') {
                    more.style.display = 'block';
                    if (todoId) {
                        if (desc.classList.contains('lang-fr')) {
                            btn.textContent = `TODO FR-${todoId}: Voir moins`;
                        } else if (desc.classList.contains('lang-ro')) {
                            btn.textContent = `TODO RO-${todoId}: Afișează mai puțin`;
                        } else {
                            btn.textContent = `TODO EN-${todoId}: Show less`;
                        }
                    } else if (desc.classList.contains('lang-fr')) {
                        btn.textContent = 'Voir moins';
                    } else {
                        btn.textContent = lang === 'ro' ? 'Afișează mai puțin' : 'Show less';
                    }
                } else {
                    more.style.display = 'none';
                    if (todoId) {
                        if (desc.classList.contains('lang-fr')) {
                            btn.textContent = `TODO FR-${todoId}: Voir plus`;
                        } else if (desc.classList.contains('lang-ro')) {
                            btn.textContent = `TODO RO-${todoId}: Afișează mai mult`;
                        } else {
                            btn.textContent = `TODO EN-${todoId}: Show more`;
                        }
                    } else if (desc.classList.contains('lang-fr')) {
                        btn.textContent = 'Voir plus';
                    } else {
                        btn.textContent = lang === 'ro' ? 'Afișează mai mult' : 'Show more';
                    }
                }
            });
        });
    });
});

// Modal logic for artwork images
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('artworkModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementById('modalClose');
    document.querySelectorAll('.modal-trigger').forEach(img => {
        img.addEventListener('click', function () {
            if (img.src && img.src !== window.location.href) {
                modal.classList.add('open');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            }
        });
    });
    closeBtn.addEventListener('click', function () {
        modal.classList.remove('open');
        modalImg.src = '';
    });
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            modalImg.src = '';
        }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modal.classList.remove('open');
            modalImg.src = '';
        }
    });
});
