const monBtn = document.querySelector('.mon');
const yearBtn = document.querySelector('.year');
const monatlichContent = document.querySelector('.columns_box');
const jährlichContent = document.querySelector('.columns_box_year');

monBtn.addEventListener('click', () => {
  if (monBtn.classList.contains('active')) return;

  monBtn.classList.add('active');
  yearBtn.classList.remove('active');

  // YÄHRLICH ausblenden → zuerst opacity 0
  jährlichContent.style.opacity = '0';

  setTimeout(() => {
    jährlichContent.classList.remove('active');
    monatlichContent.classList.add('active');
    monatlichContent.style.opacity = '1';
  }, 400); // Dauer entspricht deiner CSS-Transition
});

yearBtn.addEventListener('click', () => {
  if (yearBtn.classList.contains('active')) return;

  yearBtn.classList.add('active');
  monBtn.classList.remove('active');

  // MONATLICH ausblenden → zuerst opacity 0
  monatlichContent.style.opacity = '0';

  setTimeout(() => {
    monatlichContent.classList.remove('active');
    jährlichContent.classList.add('active');
    jährlichContent.style.opacity = '1';
  }, 400); // passend zur CSS-Übergangsdauer
});





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