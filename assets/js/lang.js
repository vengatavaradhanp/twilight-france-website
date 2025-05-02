const languageSelect = document.getElementById('language-select');

async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang.toLowerCase().slice(0, 2)}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Optional: Save preference
    localStorage.setItem('language', lang);
  } catch (error) {
    console.error('Error loading language:', error);
  }
}

if (languageSelect) {
  languageSelect.addEventListener('change', (e) => {
    loadLanguage(e.target.value);
  });

  window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'English';
    languageSelect.value = savedLang;
    loadLanguage(savedLang);
  });
}
