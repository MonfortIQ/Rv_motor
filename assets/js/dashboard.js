/**
 * RoadNest RV & Motorhome Care - Dashboard Scripts
 * Handles: Sidebar toggle, Multi-step Appointment Booking, Charts, Table filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initBookingWizard();
  initDashboardCharts();
  initAppointmentFilters();
});

/* -------------------------------------------------------------------
   1. Dashboard Mobile Sidebar Toggle
   ------------------------------------------------------------------- */
function initDashboardSidebar() {
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sidebar.classList.toggle('show');
  });

  // Close when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 992) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('show');
      }
    }
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
        if (!input.value) {
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
  }

  // Final confirmation
  wizardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const successBox = document.getElementById('bookingSuccessAlert');
    if (successBox) {
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
              callback: value => '$' + (value / 1000) + 'k'
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
            labels: { boxWidth: 12, font: { size: 11 } }
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
            angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
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
