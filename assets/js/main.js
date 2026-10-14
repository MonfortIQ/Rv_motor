/**
 * RoadNest RV & Motorhome Care - Master JavaScript
 * Handles: Theme toggle, RTL toggle, Navigation, Counters, Blog filter, Form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initCounters();
  initBackToTop();
  initBlogFilter();
  initForms();
});

/* -------------------------------------------------------------------
   1. Theme Toggle (Light / Dark Mode) with localStorage persistence
   ------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('roadnest_theme') || 'light';
  
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('roadnest_theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  // Update button icons
  const icons = document.querySelectorAll('.theme-toggle-btn i');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* -------------------------------------------------------------------
   2. RTL Toggle (LTR / RTL) with localStorage persistence
   ------------------------------------------------------------------- */
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('roadnest_dir') || 'ltr';

  applyRTL(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyRTL(newDir);
      localStorage.setItem('roadnest_dir', newDir);
    });
  });
}

function applyRTL(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlLabels = document.querySelectorAll('.rtl-toggle-btn .rtl-label');
  rtlLabels.forEach(label => {
    label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* -------------------------------------------------------------------
   3. Sticky Navbar & Active States
   ------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.rn-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled', 'shadow-sm');
    } else {
      header.classList.remove('scrolled', 'shadow-sm');
    }
  });
}

/* -------------------------------------------------------------------
   4. Animated Counters on Scroll
   ------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            el.textContent = Math.ceil(count).toLocaleString() + suffix;
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        };

        updateCount();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* -------------------------------------------------------------------
   5. Back To Top Button
   ------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------
   6. Blog Category Filter & Search
   ------------------------------------------------------------------- */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const searchInput = document.getElementById('blogSearchInput');
  const blogItems = document.querySelectorAll('.blog-grid-item');

  if (!blogItems.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    blogItems.forEach(item => {
      const itemCat = item.getAttribute('data-category') || '';
      const itemTitle = (item.querySelector('.card-rn-title')?.textContent || '').toLowerCase();
      const itemDesc = (item.querySelector('.card-rn-text')?.textContent || '').toLowerCase();

      const matchesCat = (currentCategory === 'all' || itemCat === currentCategory);
      const matchesSearch = (searchQuery === '' || itemTitle.includes(searchQuery) || itemDesc.includes(searchQuery));

      if (matchesCat && matchesSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active', 'btn-accent'));
      filterBtns.forEach(b => b.classList.add('btn-outline-navy'));
      btn.classList.remove('btn-outline-navy');
      btn.classList.add('active', 'btn-accent');

      currentCategory = btn.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* -------------------------------------------------------------------
   7. Form Handling & Feedback
   ------------------------------------------------------------------- */
function initForms() {
  // Appointment Form or Contact Form submissions feedback enhancement
  const forms = document.querySelectorAll('form[data-validate="true"]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
      }
    });
  });
}
