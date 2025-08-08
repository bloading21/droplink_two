let lastScroll = window.scrollY;          //NAV UL
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

function toggleChevron(linkElement) {                 //NAV DROPDWN
  const icon = linkElement.querySelector('.nav_icon');
  const dropdown = linkElement.parentElement.querySelector('.dropdown-content');
  
  // Dreht das Icon
  icon.classList.toggle('rotate');

  // Zeigt/versteckt das zugehörige Dropdown-Menü
  if (dropdown) {
      const visible = dropdown.style.display === 'flex' || dropdown.style.display === 'block';
      dropdown.style.display = visible ? 'none' : 'flex';
  }
}











const wildSteps = document.querySelectorAll('.wild-step');
const wildLine = document.querySelector('.wild-timeline-line');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY + window.innerHeight / 2;
  const lineTop = wildLine.getBoundingClientRect().top + window.scrollY;
  const lineHeight = wildLine.offsetHeight;
  const progress = Math.min(1, (scrollTop - lineTop) / lineHeight);
  wildLine.style.setProperty('--wild-line-progress', `${progress * 100}%`);

  wildSteps.forEach(step => {
    const boxTop = step.getBoundingClientRect().top + window.scrollY;
    const boxHeight = step.offsetHeight;
    const card = step.querySelector('.wild-card');

    if (scrollTop > boxTop + boxHeight / 3) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
});



let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollTimeline(); // hier ist dein Code drin
      ticking = false;
    });
    ticking = true;
  }
});
