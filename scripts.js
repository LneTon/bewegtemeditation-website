window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / docHeight, 1);
  const eased = 1 - Math.pow(1 - progress, 3);

  const hueBaseWarm = 40;
  const hueShiftWarm = hueBaseWarm - eased * 22;
  const lightnessBaseWarm = 60;
  const lightnessShiftWarm = lightnessBaseWarm - eased * 10;

  const warm1 = `hsl(${hueShiftWarm}, 75%, ${lightnessShiftWarm + 10}%)`;
  const warm2 = `hsl(${hueShiftWarm - 5}, 70%, ${lightnessShiftWarm}%)`;
  const warm3 = `hsl(${hueShiftWarm - 10}, 65%, ${lightnessShiftWarm - 10}%)`;

const hueBaseIndigo = 240;
const hueShiftIndigo = hueBaseIndigo + eased * 5;
const lightnessBaseIndigo = 48;                 
const lightnessShiftIndigo = lightnessBaseIndigo + eased * 5;
const indigo1 = `hsl(${hueShiftIndigo}, 100%, ${lightnessShiftIndigo + 10}%)`;
const indigo2 = `hsl(${hueShiftIndigo + 3}, 95%,  ${lightnessShiftIndigo}%)`;   
const indigo3 = `hsl(${hueShiftIndigo + 6}, 90%,  ${lightnessShiftIndigo - 8}%)`; 

const hueBaseBlue = 235;                
const hueShiftBlue = hueBaseBlue + eased * 5; 
const lightnessBaseBlue = 48;           
const lightnessShiftBlue = lightnessBaseBlue + eased * 5;
const blue1 = `hsl(${hueShiftBlue}, 100%, ${lightnessShiftBlue + 8}%)`; 
const blue2 = `hsl(${hueShiftBlue + 2}, 98%,  ${lightnessShiftBlue}%)`;  
const blue3 = `hsl(${hueShiftBlue + 4}, 95%,  ${lightnessShiftBlue - 10}%)`;

  const root = document.documentElement;
  root.style.setProperty("--color1", warm1);
  root.style.setProperty("--color2", warm2);
  root.style.setProperty("--color3", warm3);
  root.style.setProperty("--indigo1", indigo1);
  root.style.setProperty("--indigo2", indigo2);
  root.style.setProperty("--indigo3", indigo3);
  root.style.setProperty("--blue1", blue1);
  root.style.setProperty("--blue2", blue2);
  root.style.setProperty("--blue3", blue3);
});

const ua = navigator.userAgent;
const isSafari =
  /Safari/.test(ua) &&
  !/Chrome/.test(ua) &&
  !/Chromium/.test(ua) &&
  !/Android/.test(ua);

if (isSafari) {
  document.documentElement.classList.add("is-safari");
}

const text = document.querySelector(".parallax-text");

if (!isSafari && text) {

  let isScrolling;

  function updateParallax() {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const progress = Math.min(scrollTop / viewportHeight, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const translateY = (1 - eased) * viewportHeight;

    text.style.transform =
      progress >= 1
        ? "translateY(0) translateZ(0)"
        : `translateY(${translateY}px) translateZ(0)`;

    requestAnimationFrame(updateParallax);
  }

  requestAnimationFrame(updateParallax);

  window.addEventListener("scroll", () => {
    clearTimeout(isScrolling);
    text.classList.remove("is-resting");
    isScrolling = setTimeout(() => text.classList.add("is-resting"), 120);
  });
} else if (text) {
  text.style.transform = "translateY(0)";
  text.style.transition = "none";
}


async function setLanguage(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) el.innerHTML = translations[key];
    });

    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
  } catch (err) {
    console.error(`Error loading ${lang}:`, err);
  }
}

const savedLang = localStorage.getItem('language') || 'en';
setLanguage(savedLang);

const langToggle = document.getElementById('langToggle');
langToggle.textContent = savedLang === 'en' ? 'EN / DE' : 'DE / EN';

langToggle.addEventListener('click', () => {
  const newLang = document.documentElement.lang === 'en' ? 'de' : 'en';
  setLanguage(newLang);
  langToggle.textContent = newLang === 'en' ? 'EN / DE' : 'DE / EN';
});
