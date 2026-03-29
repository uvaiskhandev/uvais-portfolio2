// ====================== THEME TOGGLE ======================
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  }
});

// ====================== PROJECT MODAL ======================
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTechTags = document.getElementById('modal-tech-tags');
const closeModalBtn = document.getElementById('close-modal');

const projectData = {
  1: {
    title: "ShopSphere",
    description: "Modern full-featured e-commerce platform with cart, wishlist, payment integration and admin dashboard.",
    image: "images/shopsphere.jpg",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "TypeScript"]
  },
  2: {
    title: "Analytics Pro",
    description: "Real-time business analytics dashboard with beautiful charts and live data updates.",
    image: "images/analytics.jpg",
    tech: ["React", "Recharts", "Firebase", "Tailwind"]
  },
  3: {
    title: "Creative Agency",
    description: "Bold portfolio website for creative agency with smooth animations.",
    image: "images/agency.jpg",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "GSAP"]
  }
};

function showProjectModal(id) {
  const project = projectData[id];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalImage.style.backgroundImage = `url('${project.image}')`;

  modalTechTags.innerHTML = '';
  project.tech.forEach(item => {
    const span = document.createElement('span');
    span.textContent = item;
    modalTechTags.appendChild(span);
  });

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Project cards click
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    if (id) showProjectModal(id);
  });
});
// =========================cnt
// ====================== CONTACT FORM - GOOGLE SHEETS (Fixed) ======================
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLS1ML53Y5vF_fy4UFSvO7Q9bzO_NdN9ON6x8rRv0gjgqfk/formResponse";

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();   // Redirect rokne ke liye

  const formData = new FormData();
  formData.append("entry.1984456640", document.getElementById("name").value);
  formData.append("entry.849046089", document.getElementById("email").value);
  formData.append("entry.39425027", document.getElementById("message").value);

  try {
    // Background mein submit (no redirect)
    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    // Success Message
    successMessage.textContent = "✅ Message sent successfully! I'll get back to you soon.";
    successMessage.style.display = 'block';

    contactForm.reset();

    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);

  } catch (error) {
    successMessage.textContent = "❌ Something went wrong. Please try again.";
    successMessage.style.display = 'block';
    successMessage.style.color = "#ef4444";
  }
});






// =================LAST EDITED HERO.

// Typing Animation
const texts = ["Frontend Developer", "UI/UX Enthusiast", "React Specialist", "Next.js Developer"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

const typingElement = document.getElementById('typing');

function type() {
  if (count === texts.length) count = 0;
  
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  typingElement.textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000); // Pause before next word
  } else {
    setTimeout(type, 80); // Typing speed
  }
}

// Start typing animation
setTimeout(type, 1000);

// ====footer==============================================

// Current Year in Footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



// ====================== MOBILE MENU (3 Dots) ======================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.createElement('div');
mobileMenu.id = 'mobile-menu';
mobileMenu.className = 'mobile-menu';

const navLinksHTML = `
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#skills">Skills</a>
  <a href="#projects">Projects</a>
  <a href="#contact">Contact</a>
`;

mobileMenu.innerHTML = navLinksHTML;
document.body.appendChild(mobileMenu);

let isMenuOpen = false;

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  
  isMenuOpen = !isMenuOpen;
  
  if (isMenuOpen) {
    mobileMenu.classList.add('active');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Cross icon
  } else {
    mobileMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
  }
});

// Close menu when clicking outside
document.addEventListener('click', () => {
  if (isMenuOpen) {
    mobileMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    isMenuOpen = false;
  }
});

// Close menu when clicking on a link
mobileMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    mobileMenu.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
    isMenuOpen = false;
  }
});
