/**
 * AquaGleam - Bathroom Cleaning & Tile Restoration Booking & Estimator Engine
 * Version: 1.0.0
 * Handles: Real-time price calculation, dynamic multi-step booking wizard,
 *          add-on selection, calendar slot picking, and booking confirmation.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCostEstimator();
  initBookingWizard();
});

/* ==========================================================================
   1. Real-time Instant Cost Estimator
   ========================================================================== */
function initCostEstimator() {
  const estimatorForm = document.getElementById('tile-estimator-form');
  if (!estimatorForm) return;

  const roomTypeSelect = document.getElementById('calc-room-type');
  const serviceTypeSelect = document.getElementById('calc-service-type');
  const areaSlider = document.getElementById('calc-area-range');
  const areaDisplay = document.getElementById('calc-area-val');
  const addonCheckboxes = document.querySelectorAll('.calc-addon-check');

  const totalPriceEl = document.getElementById('calc-total-price');
  const durationEl = document.getElementById('calc-est-duration');
  const depositEl = document.getElementById('calc-est-deposit');

  function calculateEstimate() {
    let basePrice = 149;
    let baseHours = 2.0;

    // Room type base pricing
    if (roomTypeSelect) {
      const roomVal = roomTypeSelect.value;
      if (roomVal === 'powder') { basePrice = 129; baseHours = 1.5; }
      else if (roomVal === 'standard') { basePrice = 199; baseHours = 2.5; }
      else if (roomVal === 'master') { basePrice = 289; baseHours = 3.5; }
      else if (roomVal === 'commercial') { basePrice = 449; baseHours = 5.0; }
    }

    // Service multiplier
    if (serviceTypeSelect) {
      const serviceVal = serviceTypeSelect.value;
      if (serviceVal === 'deep-clean') { basePrice += 40; baseHours += 0.5; }
      else if (serviceVal === 'regrout') { basePrice += 120; baseHours += 1.5; }
      else if (serviceVal === 'colorseal') { basePrice += 95; baseHours += 1.0; }
      else if (serviceVal === 'stone-polish') { basePrice += 160; baseHours += 2.0; }
      else if (serviceVal === 'mold-remedy') { basePrice += 80; baseHours += 1.0; }
    }

    // Area square footage multiplier
    if (areaSlider) {
      const sqft = parseInt(areaSlider.value, 10) || 100;
      if (areaDisplay) areaDisplay.textContent = sqft;
      // Incremental sqft cost above 80 sq.ft
      if (sqft > 80) {
        basePrice += (sqft - 80) * 0.85;
      }
    }

    // Addons
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-price') || 0);
        basePrice += cost;
        baseHours += 0.5;
      }
    });

    const finalPrice = Math.round(basePrice);
    const depositPrice = Math.round(finalPrice * 0.2); // 20% booking deposit

    if (totalPriceEl) totalPriceEl.textContent = `$${finalPrice}`;
    if (durationEl) durationEl.textContent = `~${baseHours.toFixed(1)} hrs`;
    if (depositEl) depositEl.textContent = `$${depositPrice}`;
  }

  // Bind event listeners
  if (roomTypeSelect) roomTypeSelect.addEventListener('change', calculateEstimate);
  if (serviceTypeSelect) serviceTypeSelect.addEventListener('change', calculateEstimate);
  if (areaSlider) areaSlider.addEventListener('input', calculateEstimate);
  addonCheckboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));

  // Run initial calculation
  calculateEstimate();
}

/* ==========================================================================
   2. Interactive Multi-Step Booking Wizard
   ========================================================================== */
function initBookingWizard() {
  const wizardContainer = document.getElementById('booking-wizard');
  if (!wizardContainer) return;

  let currentStep = 1;
  const totalSteps = 4;

  const stepContents = document.querySelectorAll('.wizard-step-pane');
  const stepIndicators = document.querySelectorAll('.step-indicator-item');
  const nextBtns = document.querySelectorAll('.btn-wizard-next');
  const prevBtns = document.querySelectorAll('.btn-wizard-prev');
  const finishBtn = document.getElementById('btn-wizard-submit');

  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;
    currentStep = step;

    // Show active step pane
    stepContents.forEach(pane => {
      const paneStep = parseInt(pane.getAttribute('data-step'), 10);
      if (paneStep === currentStep) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    // Update step indicators
    stepIndicators.forEach(ind => {
      const indStep = parseInt(ind.getAttribute('data-step'), 10);
      const circle = ind.querySelector('.step-circle');
      const label = ind.querySelector('.step-label');

      if (indStep < currentStep) {
        circle.classList.remove('bg-slate-200', 'text-slate-600', 'dark:bg-slate-700', 'dark:text-slate-300', 'bg-primary', 'text-white');
        circle.classList.add('bg-emerald-500', 'text-white');
        circle.innerHTML = '<i class="fa-solid fa-check text-xs"></i>';
      } else if (indStep === currentStep) {
        circle.classList.remove('bg-slate-200', 'text-slate-600', 'dark:bg-slate-700', 'dark:text-slate-300', 'bg-emerald-500');
        circle.classList.add('bg-primary', 'text-white', 'ring-4', 'ring-primary/20');
        circle.textContent = indStep;
      } else {
        circle.classList.remove('bg-primary', 'bg-emerald-500', 'text-white', 'ring-4', 'ring-primary/20');
        circle.classList.add('bg-slate-200', 'text-slate-600', 'dark:bg-slate-700', 'dark:text-slate-300');
        circle.textContent = indStep;
      }
    });

    // Update review summary if step 4
    if (currentStep === 4) {
      updateReviewSummary();
    }

    // Scroll to wizard top smoothly
    wizardContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function validateCurrentStep() {
    const currentPane = document.querySelector(`.wizard-step-pane[data-step="${currentStep}"]`);
    if (!currentPane) return true;

    let isValid = true;
    const requiredInputs = currentPane.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      const group = input.closest('.form-group') || input.parentElement;
      const val = input.value.trim();

      if (!val) {
        isValid = false;
        group.classList.add('has-error');
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        isValid = false;
        group.classList.add('has-error');
      } else if (input.type === 'tel' && !/^[\d\s\(\)\-\+\.]{7,20}$/.test(val)) {
        isValid = false;
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }

      input.addEventListener('input', () => group.classList.remove('has-error'), { once: true });
    });

    if (!isValid) {
      if (typeof showToast === 'function') {
        showToast('Please fill out all required fields before proceeding.', 'danger');
      }
    }

    return isValid;
  }

  function updateReviewSummary() {
    const serviceRadio = document.querySelector('input[name="wizard-service"]:checked');
    const tileRadio = document.querySelector('input[name="wizard-tile"]:checked');
    const bathSize = document.getElementById('wizard-bath-size');
    const dateInput = document.getElementById('wizard-date');
    const timeSlot = document.querySelector('input[name="wizard-timeslot"]:checked');
    const nameInput = document.getElementById('wizard-fullname');
    const phoneInput = document.getElementById('wizard-phone');
    const addressInput = document.getElementById('wizard-address');

    const summaryService = document.getElementById('summary-service');
    const summaryTile = document.getElementById('summary-tile');
    const summarySize = document.getElementById('summary-size');
    const summaryDate = document.getElementById('summary-datetime');
    const summaryClient = document.getElementById('summary-client');
    const summaryAddress = document.getElementById('summary-address');

    if (summaryService && serviceRadio) summaryService.textContent = serviceRadio.value;
    if (summaryTile && tileRadio) summaryTile.textContent = tileRadio.value;
    if (summarySize && bathSize) summarySize.textContent = bathSize.options[bathSize.selectedIndex].text;
    if (summaryDate) {
      const dt = dateInput ? dateInput.value : 'Preferred Date';
      const slot = timeSlot ? timeSlot.value : 'Morning (8am - 12pm)';
      summaryDate.textContent = `${dt} (${slot})`;
    }
    if (summaryClient && nameInput && phoneInput) {
      summaryClient.textContent = `${nameInput.value} (${phoneInput.value})`;
    }
    if (summaryAddress && addressInput) summaryAddress.textContent = addressInput.value;
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        goToStep(currentStep + 1);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        finishBtn.disabled = true;
        finishBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming Reservation...';

        setTimeout(() => {
          finishBtn.disabled = false;
          finishBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Book My Restoration';

          // Show Success Modal
          const modal = document.getElementById('booking-success-modal');
          const codeEl = document.getElementById('booking-code-display');
          if (codeEl) {
            const randomCode = 'AGY-' + Math.floor(100000 + Math.random() * 900000);
            codeEl.textContent = randomCode;
          }

          if (modal) {
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
          }

          if (typeof showToast === 'function') {
            showToast('Booking Confirmed! Check your email for full technician arrival details.', 'success');
          }
        }, 1500);
      }
    });
  }

  // Initial step setup
  goToStep(1);
}
