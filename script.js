// Smooth Navbar shrink & typing animation

document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    if (window.scrollY > 280) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// Typing Animation
const texts = ["Data Analyst", "Business Intelligence Analyst", "Operations Researcher"];
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

  let typeSpeed = isDeleting ? 45 : 95;

  if (!isDeleting && letter.length === currentText.length) {
    typeSpeed = 2200; // Pause at end
    isDeleting = true;
  } else if (isDeleting && letter.length === 0) {
    isDeleting = false;
    count++;
    typeSpeed = 400; // Pause before new word
  }

  setTimeout(type, typeSpeed);
})();
