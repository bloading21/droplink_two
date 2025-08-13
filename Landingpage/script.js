//NAV UL
let lastScroll = window.scrollY;          
const navUl = document.querySelector("nav ul");
window.addEventListener("scroll", () => {
  // Nur auf größeren Bildschirmen aktivieren
  if (window.innerWidth > 1360 && navUl) {
    const currentScroll = window.scrollY;

    if (currentScroll < lastScroll) {
      // Hochscrollen: Navigation zeigen
      navUl.classList.remove("hide-on-scroll");
      navUl.classList.add("show-on-scroll");
    } else {
      // Runterscrollen: Navigation verstecken
      navUl.classList.remove("show-on-scroll");
      navUl.classList.add("hide-on-scroll");
    }

    lastScroll = currentScroll;
  } else {
    // Bei kleinen Bildschirmen: Klassen entfernen
    navUl.classList.remove("hide-on-scroll", "show-on-scroll");
  }
});




// ==========================
// NAV DROPDOWN (ALLE MENÜS)
// ==========================
function toggleDropdown(linkElement) {
  const allDropdowns = document.querySelectorAll('.dropdown_menu');
  const allIcons = document.querySelectorAll('.nav_icon');

  const currentDropdown = linkElement.nextElementSibling;
  const currentIcon = linkElement.querySelector('.nav_icon');

  // Alle Dropdowns schließen (außer das aktuelle)
  allDropdowns.forEach(menu => {
    if (menu !== currentDropdown) menu.classList.remove('show');
  });

  // Alle Icons zurücksetzen
  allIcons.forEach(icon => {
    if (icon !== currentIcon) icon.classList.remove('rotate');
  });

  // Aktuelles Dropdown toggeln
  currentDropdown.classList.toggle('show');
  currentIcon.classList.toggle('rotate');
}
// Event-Listener für alle Dropdown-Toggles setzen
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDropdown(toggle);
  });
});
// Klick außerhalb schließt alle Dropdowns
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-item.dropdown')) {
    document.querySelectorAll('.dropdown_menu').forEach(menu => menu.classList.remove('show'));
    document.querySelectorAll('.nav_icon').forEach(icon => icon.classList.remove('rotate'));
  }
});





//Dynmic Tabs
let currentIndex = 0;               
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.feature_content');
let interval = setInterval(nextSlide, 4500);
function nextSlide() {
  currentIndex = (currentIndex + 1) % tabs.length;
  showSlide(currentIndex);
}
function showSlide(index) {
  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));

  tabs[index].classList.add('active');
  contents[index].classList.add('active');
}
// Optional: Manuell klicken
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    clearInterval(interval); // Auto stoppen beim Klick
    currentIndex = i;
    showSlide(i);
  });
});








const wildSteps = document.querySelectorAll('.wild-step');
const wildLine  = document.querySelector('.wild-timeline-line');

let ticking = false;
let lastProgress = -1;

function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

// Viewport-Mitte robust (visualViewport auf Mobile)
function getViewportMidY(){
  const vv = window.visualViewport;
  return (vv ? vv.height : window.innerHeight) / 2 + window.scrollY;
}

// Element-Top relativ zum Dokument, stabiler als nur getBoundingClientRect() pur
function topInDoc(el){
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
}

function onScroll(){
  if (ticking) return;
  ticking = true;

  requestAnimationFrame(() => {
    const lineTop    = topInDoc(wildLine);
    const lineHeight = wildLine.offsetHeight || wildLine.getBoundingClientRect().height;
    const viewportMid = getViewportMidY();

    let progress = clamp((viewportMid - lineTop) / lineHeight, 0, 1);

    // quantisieren = weniger Repaints (0.1%-Schritte)
    progress = Math.round(progress * 1000) / 1000;

    if (progress !== lastProgress) {
      wildLine.style.setProperty('--wild-progress', progress);
      lastProgress = progress;
    }

    // Cards aktivieren/deaktivieren
    const vh = (window.visualViewport?.height || window.innerHeight);
    const triggerY = window.scrollY + vh * 0.4;

    wildSteps.forEach(step => {
      const card = step.querySelector('.wild-card');
      if (!card) return;
      (topInDoc(step) < triggerY) ? card.classList.add('active')
                                  : card.classList.remove('active');
    });

    ticking = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
window.addEventListener('orientationchange', onScroll);
document.addEventListener('visibilitychange', onScroll);
document.addEventListener('DOMContentLoaded', onScroll);









const monBtn = document.querySelector('.mon');
const yearBtn = document.querySelector('.year');
const monatlichContent = document.querySelector('.columns_box');
const jährlichContent = document.querySelector('.columns_box_year');

let isAnimating = false;
const DURATION = 400; // entspricht CSS-Transition

function crossfadePanels(showYearly) {
  if (isAnimating) return;
  isAnimating = true;

  const currentPanel = showYearly ? monatlichContent : jährlichContent;
  const nextPanel = showYearly ? jährlichContent : monatlichContent;

  // Buttons aktualisieren
  monBtn.classList.toggle('active', !showYearly);
  yearBtn.classList.toggle('active', showYearly);

  // Schritt 1: aktuelles Panel ausblenden
  currentPanel.style.opacity = '0';

  // Warten bis ausblenden fertig ist
  setTimeout(() => {
    currentPanel.classList.remove('active');
    nextPanel.classList.add('active');
    nextPanel.style.opacity = '1';
    isAnimating = false;
  }, DURATION);
}

monBtn.addEventListener('click', () => crossfadePanels(false));
yearBtn.addEventListener('click', () => crossfadePanels(true));






//FAQ
document.querySelectorAll('.faq-question').forEach(button => {    
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    if (isOpen) {
      answer.style.height = answer.scrollHeight + 'px'; 
      requestAnimationFrame(() => {
        answer.style.height = '0px';
      });
      item.classList.remove('open');
    } else {
      answer.style.height = answer.scrollHeight + 'px';
      item.classList.add('open');

      answer.addEventListener('transitionend', function handler() {
        if (item.classList.contains('open')) {
          answer.style.height = 'auto';
        }
        answer.removeEventListener('transitionend', handler);
      });
    }
  });
});






//BLOG POST
;(() => {
  /* ---------- Settings ---------- */
  const STEP_PCT = 100 / 3;        // 33.333…  (3 Karten sichtbar)
  const AUTO_MS  = 3500;           // Autoplay

  /* ---------- DOM ---------- */
  const track = document.getElementById('carouselTrack');
  const box   = document.querySelector('.blogcarousel_container');

  /* ---------- Helper: aktive Mitte markieren ---------- */
  const setActive = () => {
    [...track.children].forEach(c => c.classList.remove('active'));
    if (track.children[1]) track.children[1].classList.add('active');
  };

  /* ---------- Slide nach rechts ---------- */
  const slideNext = () => {
    track.style.transition = 'transform .5s ease';
    track.style.transform  = `translateX(-${STEP_PCT}%)`;

    track.addEventListener('transitionend', function cb () {
      track.removeEventListener('transitionend', cb);
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild); // erste Karte ans Ende
      track.style.transform = 'translateX(0)';
      requestAnimationFrame(setActive);
    }, { once: true });
  };

  /* ---------- Slide nach links ---------- */
  const slidePrev = () => {
    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild); // letzte Karte vorn
    track.style.transform = `translateX(-${STEP_PCT}%)`;

    requestAnimationFrame(() => {
      track.style.transition = 'transform .5s ease';
      track.style.transform  = 'translateX(0)';

      track.addEventListener('transitionend', function cb () {
        track.removeEventListener('transitionend', cb);
        setActive();
      }, { once: true });
    });
  };

  /* ---------- Klick-Navigation auf Karten ---------- */
  track.addEventListener('click', e => {
    const card = e.target.closest('.blogcarousel_card');
    if (!card) return;

    /* Welche DOM-Position hat diese Karte? */
    const idx = [...track.children].indexOf(card);

    if (idx === 0) {                // linke Karte
      e.preventDefault();           // Link nicht sofort auslösen
      slidePrev();
    } else if (idx === 2) {         // rechte Karte
      e.preventDefault();
      slideNext();
    }
    /* idx === 1 → mittlere Karte: normaler Link-Klick, kein Slide */
  });

  /* ---------- Buttons global ---------- */
  window.nextSlide = slideNext;
  window.prevSlide = slidePrev;

  /* ---------- Autoplay ---------- */
  let auto = setInterval(slideNext, AUTO_MS);
  box.addEventListener('mouseenter', () => clearInterval(auto));
  box.addEventListener('mouseleave', () => auto = setInterval(slideNext, AUTO_MS));

  /* ---------- Initial ---------- */
  setActive();
})();






//preview dynamik
document.addEventListener("DOMContentLoaded", () => {
  const previews = document.querySelectorAll('.dashboard_preview');
  const previewImage = document.getElementById('dashboard_preview_image');

  // Standardmäßig erstes Element aktivieren
  const first = previews[0];
  if (first) {
    first.classList.add('active');
    const newImage = first.getAttribute('data-image');
    if (newImage) previewImage.src = newImage;
  }

  // Klick-Logik für alle Vorschau-Elemente
  previews.forEach(preview => {
    preview.addEventListener('click', (e) => {
      e.preventDefault();

      // Alle deaktivieren
      previews.forEach(p => p.classList.remove('active'));

      // Geklicktes aktivieren
      preview.classList.add('active');

      // Bild wechseln
      const newImage = preview.getAttribute('data-image');
      if (newImage) previewImage.src = newImage;
    });
  });
});
















(function() {
  const DURATION_MS = 2000; // 2 Sekunden pro Counter
  const START_DELAY = 250; // 0,5 Sekunden zwischen den Starts
  const EASE = t => 1 - Math.pow(1 - t, 3); // Ease-out-Cubic

  function animateCount(el, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        const numEl = el.querySelector('.num');
        const target = parseFloat(el.getAttribute('data-target') || '100');
        const startTime = performance.now();

        function frame(now) {
          const t = Math.min(1, (now - startTime) / DURATION_MS);
          const eased = EASE(t);
          numEl.textContent = String(Math.round(target * eased));
          if (t < 1) {
            requestAnimationFrame(frame);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(frame);
      }, delay);
    });
  }

  const counters = document.querySelectorAll('.counter');
  let started = false;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (started) return;
      if (entry.isIntersecting) {
        started = true;

        counters.forEach((counter, i) => {
          animateCount(counter, i * START_DELAY);
        });

        io.disconnect();
      }
    });
  }, {
    root: null,
    rootMargin: "-35% 0px -35% 0px", // mittlere 30% vom Viewport
    threshold: 0
  });

  const firstCard = document.querySelector('.triple_card_one');
  if (firstCard) io.observe(firstCard);
})();
