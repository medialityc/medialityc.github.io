
//EFECTO TYPWRITER
const words = ["EFICIENTES", "INNOVADORAS", "VERSATILES"];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
const rotatingWordsElement = document.getElementById("rotating-words");

function typeWriter() {
    const currentWord = words[currentIndex];

    if (!isDeleting) {
        rotatingWordsElement.textContent = currentWord.substring(
            0,
            charIndex + 1
        );
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000);
        } else {
            setTimeout(typeWriter, 100);
        }
    } else {
        rotatingWordsElement.textContent = currentWord.substring(
            0,
            charIndex - 1
        );
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % words.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, 50);
        }
    }
}
typeWriter();

// MENU OVERLAY RESPONSIVE
const menuButton = document.getElementById('menu-btn-container');
const overlay = document.getElementById('overlay-header');
const xImage = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(22, 87, 207, 1);"><path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path></svg>';
const menuImage = '<svg id="menu-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(22, 87, 207, 1);"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>';

function openMenu() {
  overlay.style.display = 'flex';
  menuButton.innerHTML = xImage;
  document.body.style.overflow = 'hidden';
  overlay.classList.remove('hidden', 'fade-out');
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
}

// Animación para cerrar el menu
function closeMenu() {
  overlay.classList.add('fade-out');
  menuButton.innerHTML = menuImage;
  
  setTimeout(() => {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    overlay.classList.remove('fade-out');
  }, 300);
}

function toggleMenu() {
  if (overlay.style.display === 'none' || overlay.style.display === '') {
    openMenu();
  } else {
    closeMenu();
  }
}

// Cerrar menú 
const menuLinks = overlay.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.target && link.href && link.href.includes('#')) {
      e.preventDefault();
      closeMenu();
      setTimeout(() => {
        if (link.href) {
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 300);
    }
  });
});

menuButton.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
});

overlay.addEventListener('click', function(e) {
  if (e.target === overlay) {
    closeMenu();
  }
});

//Pagina de detalles
const inventarios = ''