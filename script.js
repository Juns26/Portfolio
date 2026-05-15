// Smooth scroll highlight & Navbar shrink
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 200;

  // Navbar shrink
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    const link = document.querySelector(`nav a[href="#${id}"]`);
    if (link) {
      if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

// Typing Animation
const texts = ["Data Analyst", "Business Intelligence Analyst"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

(function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];

  if (isDeleting) {
    letter = currentText.slice(0, --index);
  } else {
    letter = currentText.slice(0, ++index);
  }

  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    typingElement.textContent = letter;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && letter.length === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && letter.length === 0) {
    isDeleting = false;
    count++;
    typeSpeed = 500; // Pause before new word
  }

  setTimeout(type, typeSpeed);
}());
