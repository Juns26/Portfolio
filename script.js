// Smooth scroll highlight
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 200;

  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    const link = document.querySelector(`nav a[href="#${id}"]`);
    if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
