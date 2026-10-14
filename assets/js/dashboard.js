/**
 * RoadNest RV & Motorhome Care - Dashboard Scripts
 * Handles: Sidebar toggle, Multi-step Appointment Booking, Charts, Table filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initBookingWizard();
  initDashboardCharts();
  initAppointmentFilters();
  initStoredAppointments();
  window.addEventListener('roadnest:theme-change', initDashboardCharts);
});

/* -------------------------------------------------------------------
   1. Dashboard Mobile Sidebar Toggle
   ------------------------------------------------------------------- */
function initDashboardSidebar() {
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (!toggleBtn || !sidebar) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'dashboard-sidebar-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(backdrop);

  const setSidebarState = (open) => {
    sidebar.classList.toggle('show', open);
    backdrop.classList.toggle('is-open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    sidebar.setAttribute('aria-hidden', String(!open && window.innerWidth <= 1100));
    document.body.classList.toggle('dashboard-drawer-open', open);
  };

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setSidebarState(!sidebar.classList.contains('show'));
  });

  backdrop.addEventListener('click', () => setSidebarState(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('show')) setSidebarState(false);
  });

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1100) setSidebarState(false);
    });
  });

  // Close when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1100 && sidebar.classList.contains('show')) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && !backdrop.contains(e.target)) {
        setSidebarState(false);
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) setSidebarState(false);
  });
}

/* -------------------------------------------------------------------
   2. Multi-step Appointment Booking Wizard
   ------------------------------------------------------------------- */
function initBookingWizard() {
  const wizardForm = document.getElementById('appointmentWizardForm');
  if (!wizardForm) return;

  const steps = wizardForm.querySelectorAll('.wizard-step-pane');
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  let currentStep = 1;

  const dateInput = document.getElementById('wizardDate');
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localToday;
    if (!dateInput.value || dateInput.value < localToday) dateInput.value = localToday;
  }

  const showStep = (stepNumber) => {
    steps.forEach((pane, idx) => {
      if (idx + 1 === stepNumber) {
        pane.classList.remove('d-none');
      } else {
        pane.classList.add('d-none');
      }
    });

    stepNodes.forEach((node, idx) => {
      const nodeStep = idx + 1;
      node.classList.remove('active', 'completed');
      if (nodeStep === stepNumber) {
        node.classList.add('active');
      } else if (nodeStep < stepNumber) {
        node.classList.add('completed');
      }
    });
  };

  // Next and Prev button actions
  const nextBtns = wizardForm.querySelectorAll('.btn-wizard-next');
  const prevBtns = wizardForm.querySelectorAll('.btn-wizard-prev');

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Validate inputs in current step
      const currentPane = steps[currentStep - 1];
      const requiredInputs = currentPane.querySelectorAll('[required]');
      let isValid = true;
      requiredInputs.forEach(input => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (isValid && currentStep < steps.length) {
        // If transitioning to Review (Step 4), populate summary
        if (currentStep === 3) {
          populateReviewSummary();
        }
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  function populateReviewSummary() {
    const rvSelect = document.getElementById('wizardRvSelect');
    const serviceCategory = document.getElementById('wizardServiceCategory');
    const specificService = document.getElementById('wizardSpecificService');
    const serviceType = document.querySelector('input[name="serviceDelivery"]:checked');
    const dateInput = document.getElementById('wizardDate');
    const timeSelect = document.getElementById('wizardTime');
    const ownerEmail = document.getElementById('wizardOwnerEmail');
    const ownerPhone = document.getElementById('wizardOwnerPhone');

    if (document.getElementById('reviewRv')) {
      document.getElementById('reviewRv').textContent = rvSelect ? rvSelect.options[rvSelect.selectedIndex].text : '';
    }
    if (document.getElementById('reviewService')) {
      document.getElementById('reviewService').textContent = (specificService && specificService.value) ? specificService.value : (serviceCategory ? serviceCategory.value : '');
    }
    if (document.getElementById('reviewDateTime')) {
      document.getElementById('reviewDateTime').textContent = `${dateInput?.value || ''} at ${timeSelect?.value || ''}`;
    }
    if (document.getElementById('reviewType')) {
      document.getElementById('reviewType').textContent = serviceType?.value || 'Drop-off at Service Center';
    }
    if (document.getElementById('reviewContact')) {
      document.getElementById('reviewContact').textContent = `${ownerEmail?.value || ''} · ${ownerPhone?.value || ''}`;
    }
  }

  // Final confirmation
  wizardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!wizardForm.checkValidity()) {
      wizardForm.classList.add('was-validated');
      const firstInvalid = wizardForm.querySelector(':invalid');
      firstInvalid?.focus();
      return;
    }

    const rv = document.getElementById('wizardRvSelect')?.value || '';
    const service = document.getElementById('wizardSpecificService')?.value || '';
    const date = document.getElementById('wizardDate')?.value || '';
    const duplicateKey = `${rv}|${service}|${date}`;
    const appointmentId = `APT-${Date.now().toString().slice(-6)}`;
    const appointments = JSON.parse(localStorage.getItem('roadnest_appointments') || '[]');
    if (appointments.some(appointment => appointment.duplicateKey === duplicateKey && appointment.status !== 'Cancelled')) {
      window.alert('This RV already has the same service requested for that date. Choose another date or service before confirming.');
      return;
    }

    appointments.push({
      id: appointmentId,
      duplicateKey,
      rv,
      service,
      date,
      time: document.getElementById('wizardTime')?.value || '',
      delivery: document.querySelector('input[name="serviceDelivery"]:checked')?.value || '',
      contactEmail: document.getElementById('wizardOwnerEmail')?.value || '',
      contactPhone: document.getElementById('wizardOwnerPhone')?.value || '',
      status: 'Requested',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('roadnest_appointments', JSON.stringify(appointments));

    const successBox = document.getElementById('bookingSuccessAlert');
    if (successBox) {
      const appointmentLabel = successBox.querySelector('.text-primary');
      if (appointmentLabel) appointmentLabel.textContent = `#${appointmentId}`;
      successBox.classList.remove('d-none');
      wizardForm.classList.add('d-none');
    }
  });
}

/* -------------------------------------------------------------------
   3. Chart.js Visualizations (Owner & Admin)
   ------------------------------------------------------------------- */
function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  ['adminRevenueChart', 'adminServiceDistributionChart', 'ownerHealthChart'].forEach(id => {
    const canvas = document.getElementById(id);
    const existing = canvas && Chart.getChart(canvas);
    if (existing) existing.destroy();
  });

  const styles = getComputedStyle(document.documentElement);
  const textColor = styles.getPropertyValue('--rn-text-muted').trim() || '#64748b';
  const borderColor = styles.getPropertyValue('--rn-border').trim() || '#e2e8f0';

  // Chart 1: Admin Revenue Chart
  const revenueChartCanvas = document.getElementById('adminRevenueChart');
  if (revenueChartCanvas) {
    new Chart(revenueChartCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Revenue ($)',
          data: [42500, 51200, 68900, 89400, 112000, 134500, 142000, 128900, 115000, 121000],
          borderColor: '#ea580c',
          backgroundColor: 'rgba(234, 88, 12, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointBackgroundColor: '#ea580c',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '$' + (value / 1000) + 'k',
              color: textColor
            }
          }
        }
      }
    });
  }

  // Chart 2: Admin Service Category Distribution
  const serviceDistributionCanvas = document.getElementById('adminServiceDistributionChart');
  if (serviceDistributionCanvas) {
    new Chart(serviceDistributionCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Preventive & Oil', 'Winterization/De-winter', 'Electrical & Solar', 'HVAC & AC', 'Plumbing & Water', 'Roof & Slide-out'],
        datasets: [{
          data: [32, 22, 18, 12, 10, 6],
          backgroundColor: [
            '#0d233a',
            '#1a56db',
            '#ea580c',
            '#10b981',
            '#f59e0b',
            '#8b5cf6'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, color: textColor, font: { size: 11 } }
          }
        }
      }
    });
  }

  // Chart 3: Owner Maintenance Health
  const ownerHealthCanvas = document.getElementById('ownerHealthChart');
  if (ownerHealthCanvas) {
    new Chart(ownerHealthCanvas, {
      type: 'radar',
      data: {
        labels: ['Engine & Chassis', 'Electrical & Solar', 'Roof Seals', 'Plumbing', 'HVAC System', 'Tires & Brakes'],
        datasets: [{
          label: 'Health Score (%)',
          data: [96, 92, 88, 95, 84, 90],
          backgroundColor: 'rgba(234, 88, 12, 0.2)',
          borderColor: '#ea580c',
          pointBackgroundColor: '#ea580c',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: borderColor },
            grid: { color: borderColor },
            pointLabels: { color: textColor },
            suggestedMin: 50,
            suggestedMax: 100
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

/* -------------------------------------------------------------------
   4. Appointment Status Filters
   ------------------------------------------------------------------- */
function initAppointmentFilters() {
  const filterBtns = document.querySelectorAll('.appointment-status-filter');
  const rows = document.querySelectorAll('.appointment-table-row');
  if (!filterBtns.length || !rows.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active', 'btn-accent'));
      filterBtns.forEach(b => b.classList.add('btn-outline-navy'));
      btn.classList.remove('btn-outline-navy');
      btn.classList.add('active', 'btn-accent');

      const status = btn.getAttribute('data-status');
      rows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        if (status === 'all' || rowStatus === status) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------
   5. Demo appointment persistence
   ------------------------------------------------------------------- */
function initStoredAppointments() {
  const tableBody = document.querySelector('.appointment-table-row')?.closest('tbody');
  if (!tableBody) return;

  const appointments = JSON.parse(localStorage.getItem('roadnest_appointments') || '[]');
  appointments.slice().reverse().forEach(appointment => {
    const row = document.createElement('tr');
    const statusClass = (appointment.status || 'Requested').toLowerCase().replace(/\s+/g, '-');
    row.className = 'appointment-table-row';
    row.dataset.status = statusClass;
    row.innerHTML = `
      <td class="fw-bold text-primary">#${escapeHtml(appointment.id)}</td>
      <td><div class="fw-bold">2024 Winnebago Adventurer 35F</div><small class="text-muted">Owner portal request</small></td>
      <td><div class="fw-bold">${escapeHtml(appointment.service)}</div><small class="text-muted">${escapeHtml(appointment.delivery)}</small></td>
      <td><div>${escapeHtml(appointment.date)}</div><small class="text-muted">${escapeHtml(appointment.time)}</small></td>
      <td>RoadNest Service Advisor</td>
      <td><span class="status-pill status-${statusClass}">${escapeHtml(appointment.status || 'Requested')}</span></td>
      <td><a href="book-service.html" class="btn btn-sm btn-outline-navy">Modify</a></td>`;
    tableBody.prepend(row);
  });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}
