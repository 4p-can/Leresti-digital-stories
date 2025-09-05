// Language toggle and show more/less logic
document.addEventListener('DOMContentLoaded', function () {
    const langToggle = document.getElementById('lang-toggle');
    const labelRo = document.getElementById('lang-label-ro');
    const labelEn = document.getElementById('lang-label-en');
    let lang = 'ro';

    function updateLangUI() {
        // Update header language
        const headerRo = document.querySelector('header .lang-ro');
        const headerEn = document.querySelector('header .lang-en');
        if (headerRo && headerEn) {
            headerRo.style.display = lang === 'ro' ? '' : 'none';
            headerEn.style.display = lang === 'en' ? '' : 'none';
        }

        // Update intro section language
        const introRo = document.querySelector('.intro-artwork .lang-ro');
        const introEn = document.querySelector('.intro-artwork .lang-en');
        if (introRo && introEn) {
            introRo.style.display = lang === 'ro' ? '' : 'none';
            introEn.style.display = lang === 'en' ? '' : 'none';
        }
 
        // Update footer language
        const footerRo = document.querySelector('footer .lang-ro');
        const footerEn = document.querySelector('footer .lang-en');
        if (footerRo && footerEn) {
            footerRo.style.display = lang === 'ro' ? '' : 'none';
            footerEn.style.display = lang === 'en' ? '' : 'none';
        }

        // Update copyright language
        const copyrightRo = document.querySelector('.copyright .lang-ro');
        const copyrightEn = document.querySelector('.copyright .lang-en');
        if (copyrightRo && copyrightEn) {
            copyrightRo.style.display = lang === 'ro' ? '' : 'none';
            copyrightEn.style.display = lang === 'en' ? '' : 'none';
        }

        // Update artwork descriptions
        document.querySelectorAll('.artwork-description-group').forEach(group => {
            const roDesc = group.querySelector('.artwork-description.lang-ro');
            const enDesc = group.querySelector('.artwork-description.lang-en');
            if (roDesc && enDesc) {
                roDesc.style.display = lang === 'ro' ? '' : 'none';
                enDesc.style.display = lang === 'en' ? '' : 'none';
            }
        });

        // Update artwork titles
        document.querySelectorAll('.artwork-title').forEach(title => {
            const roTitle = title.querySelector('.lang-ro');
            const enTitle = title.querySelector('.lang-en');
            if (roTitle && enTitle) {
                roTitle.style.display = lang === 'ro' ? '' : 'none';
                enTitle.style.display = lang === 'en' ? '' : 'none';
            }
        });

        // Update full quality button text
        document.querySelectorAll('.full-quality-btn').forEach(btn => {
            const roSpan = btn.querySelector('.lang-ro');
            const enSpan = btn.querySelector('.lang-en');
            if (roSpan && enSpan) {
                roSpan.style.display = lang === 'ro' ? '' : 'none';
                enSpan.style.display = lang === 'en' ? '' : 'none';
            }
        });

        // Update toggle labels
        if (lang === 'ro') {
            labelRo.classList.add('active');
            labelEn.classList.remove('active');
            langToggle.checked = false;
        } else {
            labelEn.classList.add('active');
            labelRo.classList.remove('active');
            langToggle.checked = true;
        }

        // Update show more/less buttons text
        document.querySelectorAll('.show-more-btn').forEach(btn => {
            const desc = btn.closest('.artwork-description');
            const more = desc.querySelector('.more-text');
            if (more && more.style.display === 'none') {
                btn.textContent = lang === 'ro' ? 'Afișează mai mult' : 'Show more';
            } else {
                btn.textContent = lang === 'ro' ? 'Afișează mai puțin' : 'Show less';
            }
        });
    }

    langToggle.addEventListener('change', function () {
        lang = langToggle.checked ? 'en' : 'ro';
        updateLangUI();
    });

    // Initialize language state
    updateLangUI();

    // Show more/less functionality
    document.querySelectorAll('.artwork-description-group').forEach(group => {
        group.querySelectorAll('.show-more-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const desc = btn.closest('.artwork-description');
                const more = desc.querySelector('.more-text');
                if (more.style.display === 'none' || more.style.display === '') {
                    more.style.display = 'block';
                    btn.textContent = lang === 'ro' ? 'Afișează mai puțin' : 'Show less';
                } else {
                    more.style.display = 'none';
                    btn.textContent = lang === 'ro' ? 'Afișează mai mult' : 'Show more';
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
