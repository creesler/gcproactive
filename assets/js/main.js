// GC Proactive Main JS

document.addEventListener('DOMContentLoaded', () => {
  initThreeHero();
  initScrollEffects();
  initTypingEffect();
});

// Three.js Hero Animation
function initThreeHero() {
  const canvas = document.querySelector('#hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Objects - More premium rings
  const rings = [];
  const ringCount = 5;
  
  for (let i = 0; i < ringCount; i++) {
    const geometry = new THREE.TorusGeometry(3 + i * 0.8, 0.02, 16, 100);
    const material = new THREE.MeshBasicMaterial({ 
      color: i % 2 === 0 ? 0x007bff : 0x7cfc00,
      transparent: true,
      opacity: 0.4 - (i * 0.05)
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    scene.add(ring);
    rings.push(ring);
  }

  // Floating Particles System
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x00c6ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 8;

  // Mouse Movement
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
  });

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);

    rings.forEach((ring, index) => {
      ring.rotation.z += 0.002 * (index + 1);
      ring.rotation.x += 0.001 * (index + 1);
      
      // Gentle floating
      ring.position.x += (mouseX * 0.5 - ring.position.x) * 0.05;
      ring.position.y += (-mouseY * 0.5 - ring.position.y) * 0.05;
    });

    particlesMesh.rotation.y += 0.001;
    particlesMesh.position.x += (mouseX * 1 - particlesMesh.position.x) * 0.02;

    renderer.render(scene, camera);
  };

  animate();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Scroll Effects
function initScrollEffects() {
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('#mobile-menu');
  const navLinks = document.querySelector('#nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close menu when link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Scroll triggers for all fade-up elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .glass-card, .process-step').forEach(el => {
    observer.observe(el);
  });
}

// Typing Animation
function initTypingEffect() {
  const textElement = document.querySelector('#typing-text');
  if (!textElement) return;

  const words = ["Manual Work", "Repetitive Tasks", "Admin Stress", "Data Entry", "Bottlenecks"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      charIndex--;
      typeSpeed = 100;
    } else {
      charIndex++;
      typeSpeed = 200;
    }

    textElement.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}
