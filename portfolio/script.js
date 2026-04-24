/* =============================================
   PORTFOLIO SCRIPT — Keziah Manansala Tangco
============================================= */

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
});

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ---- Active nav on scroll ----
function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  const scrollY  = window.scrollY + 130;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-link[data-section="${sec.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

// ---- Typed text ----
const words = ['BSBA Graduate', 'Operations Manager', 'Team Leader', 'Event Host', 'Freelance Tutor'];
const el    = document.getElementById('typedText');
let wi = 0, ci = 0, deleting = false;
function type() {
  const word    = words[wi];
  el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 55 : 100;
  if (!deleting && ci > word.length) { delay = 1600; deleting = true; }
  else if (deleting && ci < 0)       { delay = 380;  deleting = false; wi = (wi + 1) % words.length; }
  setTimeout(type, delay);
}
type();

// ---- Intersection Observer: reveal ----
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Skill bars ----
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(s => skillObserver.observe(s));

// ---- Timeline items stagger ----
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.timeline-item');
      items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, i * 140);
      });
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
const tl = document.querySelector('.timeline');
if (tl) tlObserver.observe(tl);

// ---- Competency card entrance ----
const compObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.competency-card');
      cards.forEach((c, i) => {
        c.style.opacity = '0';
        c.style.transform = 'scale(0.85)';
        setTimeout(() => {
          c.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          c.style.opacity = '1';
          c.style.transform = 'scale(1)';
        }, i * 80);
      });
      compObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
const compGrid = document.querySelector('.competency-grid');
if (compGrid) compObserver.observe(compGrid);

// ---- Contact Form ----
function sendMessage() {
  const fname   = document.getElementById('fname');
  const lname   = document.getElementById('lname');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');
  const btn     = document.getElementById('sendBtn');

  ['fnameErr','lnameErr','emailErr','msgErr'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
  [fname, lname, email, message].forEach(f => f.style.borderColor = '');

  let valid = true;
  if (!fname.value.trim()) {
    document.getElementById('fnameErr').textContent = 'First name is required.';
    fname.style.borderColor = '#c0392b'; valid = false;
  }
  if (!lname.value.trim()) {
    document.getElementById('lnameErr').textContent = 'Last name is required.';
    lname.style.borderColor = '#c0392b'; valid = false;
  }
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRx.test(email.value)) {
    document.getElementById('emailErr').textContent = 'Please enter a valid email address.';
    email.style.borderColor = '#c0392b'; valid = false;
  }
  if (!message.value.trim() || message.value.trim().length < 10) {
    document.getElementById('msgErr').textContent = 'Message must be at least 10 characters.';
    message.style.borderColor = '#c0392b'; valid = false;
  }
  if (!valid) return;

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  setTimeout(() => {
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.remove('hidden');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    [fname, lname, email, message].forEach(f => f.value = '');
    document.getElementById('subject').value = '';
  }, 1800);
}

document.querySelectorAll('#contactForm input').forEach(input => {
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
});

// ---- Subtle parallax on hero image ----
window.addEventListener('scroll', () => {
  const blob = document.querySelector('.image-blob');
  if (blob) blob.style.transform = `translateY(${window.scrollY * 0.055}px)`;
});

// Init
updateActiveNav();