/**
 * RoadNest RV & Motorhome Care - Master JavaScript
 * Handles: Theme toggle, RTL toggle, Navigation, Counters, Blog filter, Form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initFavicon();
  initSiteFooter();
  initContactDetails();
  initSocialLinks();
  initTheme();
  initRTL();
  initHeaderScrollState();
  initMobileSidebarMenu();
  initNavbar();
  initCounters();
  initBackToTop();
  initBlogFilter();
  initFormSubmitForms();
  initForms();
  initImageFallbacks();
  initQueryFeedback();
  initDeadLinkGuards();
  initDashboardSidebars();
  initDateGuards();
  initInvoiceActions();
});

/* -------------------------------------------------------------------
   Standard mobile sidebar navigation
   Keeps every public page on the same compact menu and removes
   page-specific duplicate links from older sidebar markup.
   ------------------------------------------------------------------- */
function initMobileSidebarMenu() {
  const offcanvas = document.querySelector('#mobileMenuOffcanvas');
  const body = offcanvas?.querySelector('.offcanvas-body');
  if (!body) return;

  const pathname = window.location.pathname.toLowerCase();
  const rootPath = /\/(blog-details|service-details)\//.test(pathname) ? '../' : '';
  const pageName = pathname.split('/').pop() || 'index.html';
  const homeId = 'roadnestMobileHomeSub';
  const pagesId = 'roadnestMobilePagesSub';
  const isHome = ['index.html', 'home-2.html', ''].includes(pageName);
  const isPages = ['faq.html', 'coming-soon.html', '404.html'].includes(pageName);

  body.innerHTML = `
    <nav class="d-flex flex-column mb-4" aria-label="Mobile navigation">
      <a class="mobile-nav-link${isHome ? ' text-warning fw-bold' : ''}" data-bs-toggle="collapse" href="#${homeId}" role="button" aria-expanded="false">
        <span><i class="fas fa-home me-2 text-warning"></i> Home</span><i class="fas fa-chevron-down"></i>
      </a>
      <div class="collapse mobile-subnav" id="${homeId}">
        <a class="mobile-subnav-link" href="${rootPath}index.html"><i class="fas fa-warehouse me-1"></i> Home 1 - Service Center</a>
        <a class="mobile-subnav-link" href="${rootPath}home-2.html"><i class="fas fa-compass me-1"></i> Home 2 - Road Trip Care</a>
      </div>

      <a class="mobile-nav-link" href="${rootPath}about.html"><i class="fas fa-info-circle me-2 text-warning"></i> About Us</a>
      <a class="mobile-nav-link" href="${rootPath}services.html"><i class="fas fa-tools me-2 text-warning"></i> Services</a>

      <a class="mobile-nav-link${isPages ? ' text-warning fw-bold' : ''}" data-bs-toggle="collapse" href="#${pagesId}" role="button" aria-expanded="false">
        <span><i class="fas fa-layer-group me-2 text-warning"></i> Pages</span><i class="fas fa-chevron-down"></i>
      </a>
      <div class="collapse mobile-subnav" id="${pagesId}">
        <a class="mobile-subnav-link" href="${rootPath}faq.html"><i class="fas fa-circle-question me-1"></i> FAQ</a>
        <a class="mobile-subnav-link" href="${rootPath}coming-soon.html"><i class="fas fa-hourglass-half me-1"></i> Coming Soon</a>
        <a class="mobile-subnav-link" href="${rootPath}404.html"><i class="fas fa-triangle-exclamation me-1"></i> 404 Error</a>
      </div>

      <a class="mobile-nav-link" href="${rootPath}pricing.html"><i class="fas fa-tags me-2 text-warning"></i> Pricing</a>
      <a class="mobile-nav-link" href="${rootPath}blog.html"><i class="fas fa-newspaper me-2 text-warning"></i> Blog</a>
      <a class="mobile-nav-link" href="${rootPath}contact.html"><i class="fas fa-phone me-2 text-warning"></i> Contact Workshop</a>
      <a class="mobile-nav-link" href="${rootPath}login.html"><i class="fas fa-user-circle me-2 text-warning"></i> Login</a>
      <a class="mobile-nav-link" href="${rootPath}dashboard/index.html"><i class="fas fa-tachometer-alt me-2 text-warning"></i> Dashboard</a>
    </nav>
    <a href="${rootPath}dashboard/book-service.html" class="btn btn-accent w-100">
      <i class="fas fa-calendar-check"></i> Book Appointment
    </a>`;
}

/* -------------------------------------------------------------------
   Public Site Footer
   Keeps public utility pages consistent with the master footer while
   leaving dashboard, admin, login, and registration screens untouched.
   ------------------------------------------------------------------- */
function initSiteFooter() {
  const pathname = window.location.pathname.toLowerCase();
  const pageName = pathname.split('/').pop() || 'index.html';
  const isPrivateArea = /\/(dashboard|admin)\//.test(pathname);
  const isAuthPage = ['login.html', 'register.html'].includes(pageName);

  if (isPrivateArea || isAuthPage) return;

  const nestedPage = /\/(blog-details|service-details)\//.test(pathname);
  const rootPath = nestedPage ? '../' : '';
  const currentFooter = document.querySelector('footer');

  const footer = `
    <footer class="rn-footer rn-master-footer">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-4">
            <a class="navbar-brand text-white mb-3 d-inline-flex" href="${rootPath}index.html">
              <div class="brand-icon"><i class="fas fa-caravan"></i></div>
              <div>
                <span class="fw-bold text-white">RoadNest</span>
                <span class="brand-text-sub">RV & Motorhome Care</span>
              </div>
            </a>
            <p class="small text-muted mb-2">2450 Adventure Drive<br>Denver, CO 80216, USA</p>
            <p class="small text-muted mb-2"><a href="mailto:service@roadnestrv.com" class="text-muted text-decoration-none">service@roadnestrv.com</a></p>
            <p class="small text-muted mb-4">Specialized recreational vehicle maintenance, roof repairs, electrical diagnostics, winterization, and certified pre-trip inspections for worry-free travel.</p>
            <div class="d-flex gap-2 mb-4">
              <a href="https://facebook.com" class="rn-social-btn" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" class="rn-social-btn" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="https://youtube.com" class="rn-social-btn" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
              <a href="https://linkedin.com" class="rn-social-btn" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <div class="p-3 rounded-3 rn-emergency-card">
              <div class="small fw-bold text-warning mb-1"><i class="fas fa-truck-pickup me-1"></i> Service & Roadside Support</div>
              <a href="tel:+13035550144" class="fs-5 fw-bold text-white text-decoration-none">+1 (303) 555-0144</a>
            </div>
          </div>

          <div class="col-sm-6 col-lg-2">
            <h5>Specialized Services</h5>
            <ul class="rn-footer-links">
              <li><a href="${rootPath}service-details/preventive-maintenance.html">Preventive Maintenance</a></li>
              <li><a href="${rootPath}service-details/winterization.html">RV Winterization</a></li>
              <li><a href="${rootPath}service-details/electrical.html">Electrical & Solar</a></li>
              <li><a href="${rootPath}service-details/plumbing.html">Plumbing Systems</a></li>
              <li><a href="${rootPath}service-details/roof-repair.html">Roof Resealing</a></li>
              <li><a href="${rootPath}service-details/generator.html">Generator Service</a></li>
              <li><a href="${rootPath}service-details/pre-trip-inspection.html">Pre-Trip Inspections</a></li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-2">
            <h5>Company & Care</h5>
            <ul class="rn-footer-links">
              <li><a href="${rootPath}about.html">About RoadNest</a></li>
              <li><a href="${rootPath}services.html">All Services Directory</a></li>
              <li><a href="${rootPath}pricing.html">Inspection Pricing</a></li>
              <li><a href="${rootPath}blog.html">Maintenance Blog</a></li>
              <li><a href="${rootPath}faq.html">Frequently Asked Questions</a></li>
              <li><a href="${rootPath}contact.html">Contact Workshop</a></li>
              <li><a href="${rootPath}coming-soon.html">Mobile Van Dispatch</a></li>
              <li><a href="${rootPath}404.html">404 Error Screen</a></li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-2">
            <h5>Owner Support</h5>
            <ul class="rn-footer-links">
              <li><a href="${rootPath}login.html">Owner Portal Login</a></li>
              <li><a href="${rootPath}register.html">Register Your RV</a></li>
              <li><a href="${rootPath}dashboard/index.html">Owner Dashboard</a></li>
              <li><a href="${rootPath}dashboard/book-service.html">Book Appointment</a></li>
              <li><a href="${rootPath}dashboard/service-records.html">Service Records</a></li>
              <li><a href="${rootPath}dashboard/warranty.html">Warranty Claims</a></li>
            </ul>
          </div>

          <div class="col-sm-6 col-lg-2">
            <h5>Workshop Hours</h5>
            <ul class="list-unstyled small text-muted mb-4">
              <li class="mb-1"><strong class="text-white">Mon - Fri:</strong> 8:00 AM - 6:00 PM</li>
              <li class="mb-1"><strong class="text-white">Saturday:</strong> 9:00 AM - 4:00 PM</li>
              <li class="mb-1"><strong class="text-white">Sunday:</strong> Closed</li>
            </ul>
            <h5 class="fs-6">Traveler Newsletter</h5>
            <form action="https://formsubmit.co/clament.iq@outlook.com" method="POST" class="mt-2">
              <input type="hidden" name="_subject" value="Newsletter Subscription">
              <input type="hidden" name="_captcha" value="false">
              <div class="input-group">
                <input type="email" class="form-control form-control-sm" name="email" required placeholder="Your email">
                <button class="btn btn-sm btn-accent" type="submit"><i class="fas fa-paper-plane"></i></button>
              </div>
            </form>
          </div>
        </div>

        <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>&copy; 2026 RoadNest RV & Motorhome Care. All rights reserved. Built for RV Explorers.</div>
          <div class="d-flex gap-3 small">
            <a href="${rootPath}privacy.html" class="text-muted text-decoration-none">Privacy Policy</a>
            <span class="text-muted">•</span>
            <a href="${rootPath}terms.html" class="text-muted text-decoration-none">Terms of Service</a>
            <span class="text-muted">•</span>
            <a href="${rootPath}accessibility.html" class="text-muted text-decoration-none">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>`;

  if (currentFooter) {
    currentFooter.outerHTML = footer;
  } else {
    document.body.insertAdjacentHTML('beforeend', footer);
  }
}

/* -------------------------------------------------------------------
   Shared contact details
   Normalizes legacy contact text and FormSubmit recipients that still
   exist in page-specific markup, so every page stays consistent.
   ------------------------------------------------------------------- */
function initContactDetails() {
  const replacements = [
    ['742 Horizon Valley Pkwy, Bay Complex 4-12', '2450 Adventure Drive'],
    ['742 Horizon Valley Pkwy, Denver, CO 80216', '2450 Adventure Drive, Denver, CO 80216, USA'],
    ['742 Horizon Valley Pkwy, Denver CO', '2450 Adventure Drive, Denver, CO 80216, USA'],
    ['(800) 555-ROAD', '+1 (303) 555-0144'],
    ['(303) 555-ROAD', '+1 (303) 555-0144'],
    ['service@roadnestrvcare.com', 'service@roadnestrv.com'],
    ['claims@roadnestrvcare.com', 'service@roadnestrv.com'],
    ['support@roadnestrvcare.com', 'service@roadnestrv.com'],
    ['newsletter@roadnestrvcare.com', 'service@roadnestrv.com'],
    ['dispatch@roadnestrvcare.com', 'service@roadnestrv.com'],
    ['7:30 AM - 6:00 PM', '8:00 AM - 6:00 PM'],
    ['7:30 AM – 6:00 PM', '8:00 AM – 6:00 PM'],
    ['8:00 AM - 4:00 PM', '9:00 AM - 4:00 PM'],
    ['8:00 AM – 4:00 PM', '9:00 AM – 4:00 PM'],
    ['Sunday: Emergency Dispatch', 'Sunday: Closed'],
    ['Sunday: On-Call Roadside Dispatch Only', 'Sunday: Closed'],
    ['Sunday: Emergency Roadside Dispatch Only', 'Sunday: Closed']
  ];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.parentElement?.closest('script, style, noscript')) textNodes.push(node);
  }

  textNodes.forEach(node => {
    let text = node.nodeValue;
    replacements.forEach(([from, to]) => {
      text = text.split(from).join(to);
    });
    node.nodeValue = text;
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = 'tel:+13035550144';
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = 'mailto:service@roadnestrv.com';
  });

  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
    const action = form.getAttribute('action') || '';
    form.setAttribute('action', action.replace(/(?:support|newsletter|dispatch|service)@(?:roadnestrvcare|roadnestrv)\.com/g, 'clament.iq@outlook.com'));
  });
}

function initSocialLinks() {
  document.querySelectorAll('a.rn-social-btn').forEach(link => {
    const icon = link.querySelector('i');
    if (!icon) return;

    const platform = icon.className.match(/fa-(facebook|instagram|youtube|linkedin)/)?.[1];
    if (!platform) return;

    link.href = `https://www.${platform}.com/`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${platform.charAt(0).toUpperCase()}${platform.slice(1)} RoadNest page`);
  });
}

/* -------------------------------------------------------------------
   Site Favicon
   ------------------------------------------------------------------- */
function initFavicon() {
  const nestedPage = /\/(admin|dashboard|blog-details|service-details)\//.test(window.location.pathname);
  const faviconPath = `${nestedPage ? '../' : ''}assets/images/roadnest-favicon.svg`;
  let favicon = document.querySelector('link[rel~="icon"]');

  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    document.head.appendChild(favicon);
  }

  favicon.href = faviconPath;
}

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

  window.dispatchEvent(new CustomEvent('roadnest:theme-change', { detail: { theme } }));
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
   3. Global fixed header state
   Adds a lightweight scrolled state to public, auth, owner, and admin
   headers without moving or hiding the navigation.
   ------------------------------------------------------------------- */
function initHeaderScrollState() {
  const headers = document.querySelectorAll('.rn-header, .auth-header, .dashboard-topbar');
  if (!headers.length) return;

  let framePending = false;

  const updateHeaderState = () => {
    const isScrolled = window.scrollY > 24;
    headers.forEach(header => {
      header.classList.toggle('header-scrolled', isScrolled);
      header.classList.toggle('scrolled', isScrolled);
      header.classList.toggle('shadow-sm', isScrolled);
    });
    framePending = false;
  };

  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateHeaderState);
  }, { passive: true });

  updateHeaderState();
}

/* -------------------------------------------------------------------
   4. Navbar ordering & active states
   ------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.rn-header');
  if (!header) return;

  const movePagesAfterServices = (container, itemSelector, serviceSelector) => {
    if (!container) return;
    const items = [...container.children];
    const pagesItem = items.find(item => item.matches(itemSelector) && /\bPages\b/.test(item.textContent));
    const servicesItem = items.find(item => item.matches(serviceSelector) && /Services/.test(item.textContent));
    if (!pagesItem || !servicesItem || pagesItem === servicesItem) return;

    const pagesSubmenu = pagesItem.nextElementSibling?.classList.contains('mobile-subnav')
      ? pagesItem.nextElementSibling
      : null;
    servicesItem.after(pagesItem);
    if (pagesSubmenu) pagesItem.after(pagesSubmenu);
  };

  movePagesAfterServices(
    header.querySelector('.navbar-nav'),
    '.nav-item',
    '.nav-item'
  );

  movePagesAfterServices(
    header.querySelector('.offcanvas-body nav.d-flex.flex-column'),
    '.mobile-nav-link',
    '.mobile-nav-link'
  );

}

/* -------------------------------------------------------------------
   5. Animated Counters on Scroll
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

  const queryCategory = new URLSearchParams(window.location.search).get('category');
  if (queryCategory && [...filterBtns].some(btn => btn.getAttribute('data-category') === queryCategory)) {
    currentCategory = queryCategory;
    filterBtns.forEach(btn => {
      const active = btn.getAttribute('data-category') === currentCategory;
      btn.classList.toggle('active', active);
      btn.classList.toggle('btn-accent', active);
      btn.classList.toggle('btn-outline-navy', !active);
    });
  }

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

  document.querySelectorAll('.blog-category-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(`.blog-filter-btn[data-category="${link.dataset.category}"]`);
      target?.click();
      document.querySelector('.blog-grid-item')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  applyFilters();
}

/* -------------------------------------------------------------------
   7. Image fallbacks: keep remote-image failures from rendering broken icons
   ------------------------------------------------------------------- */
function initImageFallbacks() {
  const fallbackSvg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
      <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#0d233a"/><stop offset="1" stop-color="#1a56db"/></linearGradient></defs>
      <rect width="1200" height="700" fill="url(#g)"/><path d="M0 560h1200v140H0z" fill="#091728"/>
      <text x="600" y="330" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="42" font-weight="700">RoadNest RV Care</text>
      <text x="600" y="382" text-anchor="middle" fill="#f97316" font-family="Arial,sans-serif" font-size="22">RV &amp; Motorhome Service Center</text>
    </svg>`);

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = fallbackSvg;
      img.alt = img.alt || 'RoadNest RV service center';
    }, { once: true });
  });
}

/* -------------------------------------------------------------------
   8. FormSubmit return-state feedback
   ------------------------------------------------------------------- */
function initQueryFeedback() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('submitted') !== '1' && params.get('newsletter') !== '1') return;
  const form = document.querySelector('form[data-validate="true"]');
  if (!form) return;
  const notice = document.createElement('div');
  notice.className = 'alert alert-success d-flex gap-2 align-items-start mb-4';
  notice.setAttribute('role', 'status');
  notice.innerHTML = '<i class="fas fa-check-circle mt-1"></i><span><strong>Request received.</strong> A RoadNest service advisor will follow up with your RV details and next available bay window.</span>';
  form.parentElement.insertBefore(notice, form);
}

/* -------------------------------------------------------------------
   9. Keep placeholder legal/category links useful without breaking
   dropdown controls or intentional inline demo actions
   ------------------------------------------------------------------- */
function initDeadLinkGuards() {
  const rootPrefix = /\/(admin|dashboard|blog-details|service-details)\//.test(window.location.pathname) ? '../' : '';
  document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.hasAttribute('data-bs-toggle') || link.hasAttribute('onclick')) return;
    const label = link.textContent.trim().toLowerCase();
    if (label.includes('privacy')) link.href = `${rootPrefix}privacy.html`;
    else if (label.includes('terms')) link.href = `${rootPrefix}terms.html`;
    else if (label.includes('warranty')) link.href = `${rootPrefix}terms.html#warranty`;
    else link.href = `${rootPrefix}contact.html`;
  });
}

/* -------------------------------------------------------------------
   11. Normalize Owner/Admin sidebar actions on every dashboard route
   ------------------------------------------------------------------- */
function initDashboardSidebars() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (!sidebar) return;
  const isAdmin = /Admin Console/i.test(sidebar.textContent || '') || /\/admin\//i.test(window.location.pathname);
  const menu = sidebar.querySelector('.sidebar-menu');
  if (!menu) return;

  if (isAdmin) {
    if (!menu.querySelector('a[href="../blog.html"]')) {
      menu.insertAdjacentHTML('beforeend', '<li class="sidebar-item"><a href="../blog.html" class="sidebar-link"><i class="fas fa-newspaper"></i> Blog</a></li>');
    }
    if (!menu.querySelector('a[href="index.html#analytics"]')) {
      menu.insertAdjacentHTML('beforeend', '<li class="sidebar-item"><a href="index.html#analytics" class="sidebar-link"><i class="fas fa-chart-pie"></i> Analytics</a></li>');
    }
  } else {
    const appointmentsLink = [...menu.querySelectorAll('a')].find(link => link.getAttribute('href') === 'appointments.html');
    if (appointmentsLink && !/My Appointments/i.test(appointmentsLink.textContent)) {
      const badge = appointmentsLink.querySelector('.badge-counter');
      appointmentsLink.innerHTML = '<i class="fas fa-calendar-check"></i> My Appointments';
      if (badge) appointmentsLink.appendChild(badge);
    }
    const maintenanceLink = [...menu.querySelectorAll('a')].find(link => /Maintenance History/i.test(link.textContent));
    if (maintenanceLink && ![...menu.querySelectorAll('a')].some(link => /Service Records/i.test(link.textContent))) {
      const item = document.createElement('li');
      item.className = 'sidebar-item';
      item.innerHTML = '<a href="service-records.html" class="sidebar-link"><i class="fas fa-file-medical"></i> Service Records</a>';
      maintenanceLink.closest('.sidebar-item')?.after(item);
    }
  }

  const logout = sidebar.querySelector('[title="Logout"], [title="Sign Out"]');
  if (logout && !logout.querySelector('span')) {
    logout.classList.add('d-inline-flex', 'align-items-center', 'gap-1');
    logout.insertAdjacentHTML('beforeend', '<span class="d-none d-xl-inline">Logout</span>');
  }
}

function initDateGuards() {
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.min = today;
  });
}

function initInvoiceActions() {
  document.querySelectorAll('table').forEach(table => {
    const hasInvoiceHeader = [...table.querySelectorAll('th')].some(th => /Actions/i.test(th.textContent));
    if (!hasInvoiceHeader) return;
    table.querySelectorAll('tbody tr').forEach(row => {
      const viewButton = row.querySelector('[data-bs-target="#invoiceModal"]');
      if (!viewButton || row.querySelector('.invoice-download')) return;
      const invoiceId = row.querySelector('td')?.textContent.trim().replace('#', '') || 'invoice';
      const download = document.createElement('button');
      download.type = 'button';
      download.className = 'btn btn-sm btn-outline-navy invoice-download';
      download.innerHTML = '<i class="fas fa-download me-1"></i> Download';
      download.addEventListener('click', () => downloadInvoice(invoiceId, row.innerText));
      viewButton.parentElement?.appendChild(download);
    });
  });
}

function downloadInvoice(invoiceId, summary) {
  const blob = new Blob([`RoadNest RV & Motorhome Care\nInvoice ${invoiceId}\n\n${summary}`], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${invoiceId}-roadnest-invoice.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

/* -------------------------------------------------------------------
   12. Form Handling & Feedback
   ------------------------------------------------------------------- */
function initFormSubmitForms() {
  document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
    if (form.dataset.rnAsyncBound === 'true') return;
    form.dataset.rnAsyncBound = 'true';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        form.reportValidity();
        return;
      }

      const submitButton = form.querySelector('button:not([type]), button[type="submit"], input[type="submit"]');
      const originalButtonMarkup = submitButton?.innerHTML || '';
      const originalButtonValue = submitButton?.value || '';
      const originalAction = form.getAttribute('action') || '';
      const ajaxAction = originalAction.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      if (submitButton) {
        submitButton.disabled = true;
        if ('value' in submitButton && submitButton.tagName === 'INPUT') {
          submitButton.value = 'Sending...';
        } else {
          submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Sending...';
        }
      }

      showFormStatus(form, '', 'loading');

      try {
        const response = await fetch(ajaxAction, {
          method: (form.getAttribute('method') || 'POST').toUpperCase(),
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        const result = await response.json().catch(() => ({}));
        const failed = !response.ok || (result.success !== undefined && result.success !== true && result.success !== 'true');

        if (failed) throw new Error(result.message || 'The form could not be sent.');

        form.reset();
        form.classList.remove('was-validated');
        delete form.dataset.submitting;
        showFormStatus(form, '<strong>Sent successfully.</strong>', 'success');
      } catch (error) {
        /*
         * Some local browsers block FormSubmit's JSON response because of
         * CORS even though the POST itself can still be delivered. Retry
         * those network-level failures as a no-cors POST and keep the user
         * on the same page with a reset form.
         */
        if (error?.name === 'TypeError') {
          try {
            await fetch(originalAction, {
              method: (form.getAttribute('method') || 'POST').toUpperCase(),
              body: new FormData(form),
              mode: 'no-cors',
              keepalive: true
            });
            form.reset();
            form.classList.remove('was-validated');
            delete form.dataset.submitting;
            showFormStatus(form, '<strong>Sent successfully.</strong>', 'success');
            return;
          } catch (fallbackError) {
            // Continue to the clear error message below when the retry fails.
          }
        }

        showFormStatus(form, '<strong>Unable to send right now.</strong> Please try again or call +1 (303) 555-0144.', 'danger');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          if ('value' in submitButton && submitButton.tagName === 'INPUT') {
            submitButton.value = originalButtonValue;
          } else {
            submitButton.innerHTML = originalButtonMarkup;
          }
        }
      }
    });
  });
}

function showFormStatus(form, message, type) {
  const parent = form.parentElement;
  if (!parent) return;
  parent.querySelector('.rn-form-status')?.remove();
  if (type === 'loading') return;

  const notice = document.createElement('div');
  notice.className = `rn-form-status alert alert-${type} d-flex align-items-start gap-2 mt-3 mb-0`;
  notice.setAttribute('role', type === 'success' ? 'status' : 'alert');
  notice.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'triangle-exclamation'} mt-1"></i><span>${message}</span>`;
  form.insertAdjacentElement('beforebegin', notice);
}

function initForms() {
  const forms = document.querySelectorAll('form[data-validate="true"]');
  forms.forEach(form => {
    const password = form.querySelector('#regPass');
    const confirmation = form.querySelector('#regConfirmPass');
    const syncPasswords = () => {
      if (!password || !confirmation) return;
      confirmation.setCustomValidity(password.value === confirmation.value ? '' : 'Passwords do not match.');
    };
    password?.addEventListener('input', syncPasswords);
    confirmation?.addEventListener('input', syncPasswords);
    form.addEventListener('submit', (e) => {
      syncPasswords();
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        const firstInvalid = form.querySelector(':invalid');
        firstInvalid?.focus();
        return;
      }

      form.classList.add('was-validated');
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton && !form.dataset.submitting) {
        form.dataset.submitting = 'true';
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending request…';
      }
    });
  });
}
