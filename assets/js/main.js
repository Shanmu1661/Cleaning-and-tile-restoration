/**
 * AquaGleam - Bathroom Cleaning & Tile Restoration Master JS
 * Version: 1.0.0
 * Features: Dark/Light Mode, RTL Toggle, Before/After Slider,
 *           Sticky Header, Mobile Navigation, Modals, Forms & Toasts.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initNavigation();
  initStickyHeader();
  initBeforeAfterSliders();
  initHeroVideo();
  initAccordions();
  initModals();
  initForms();
  initBackToTop();
  initPhotoUpload();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('aquagleam_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('aquagleam_theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
      showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info');
    });
  });

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('aquagleam_theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
      } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcons(false);
      }
    }
  });
}

function updateThemeIcons(isDark) {
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  const sunIcons = document.querySelectorAll('.theme-icon-sun');

  moonIcons.forEach(icon => {
    icon.style.display = isDark ? 'none' : 'inline-block';
  });
  sunIcons.forEach(icon => {
    icon.style.display = isDark ? 'inline-block' : 'none';
  });
}

/* ==========================================================================
   2. Direction Management (RTL / LTR)
   ========================================================================== */
function initDirection() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('aquagleam_dir') || 'ltr';

  applyDirection(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('aquagleam_dir', newDir);
      showToast(newDir === 'rtl' ? 'Layout switched to RTL (Right-to-Left)' : 'Layout switched to LTR (Left-to-Right)', 'info');
    });
  });
}

function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlLabels = document.querySelectorAll('.rtl-badge-label');
  rtlLabels.forEach(label => {
    label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ==========================================================================
   3. Responsive Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  if (!mobileMenuBtn || !mobileNavMenu) return;

  function openMenu() {
    mobileNavMenu.classList.remove('translate-x-full', '-translate-x-full');
    mobileNavMenu.classList.add('translate-x-0');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('hidden');
      mobileBackdrop.classList.add('block');
    }
    document.body.style.overflow = 'hidden';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    mobileNavMenu.classList.remove('translate-x-0');
    mobileNavMenu.classList.add(isRtl ? '-translate-x-full' : 'translate-x-full');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('block');
      mobileBackdrop.classList.add('hidden');
    }
    document.body.style.overflow = '';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNavMenu.classList.contains('translate-x-0')) {
      closeMenu();
    }
  });

  // Close when clicking internal links
  const mobileLinks = mobileNavMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (link.getAttribute('href').startsWith('#')) {
        closeMenu();
      }
    });
  });
}

/* ==========================================================================
   4. Sticky Header Blur
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-white/95', 'dark:bg-slate-900/95', 'shadow-md', 'backdrop-blur-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-white/95', 'dark:bg-slate-900/95', 'shadow-md', 'backdrop-blur-md');
      header.classList.add('bg-transparent');
    }
  });
}

/* ==========================================================================
   5. Interactive Before & After Comparison Slider
   ========================================================================== */
function initBeforeAfterSliders() {
  const sliderContainers = document.querySelectorAll('.before-after-container');

  sliderContainers.forEach(container => {
    const slider = container.querySelector('.before-after-slider');
    const afterImg = container.querySelector('.img-after');
    const handle = container.querySelector('.before-after-handle');
    const divider = container.querySelector('.before-after-divider');

    if (!afterImg) return;

    function updateSlider(val) {
      const percentage = Math.max(0, Math.min(100, parseFloat(val)));
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

      // Set CSS custom property on container
      container.style.setProperty('--split', `${percentage}%`);

      if (isRtl) {
        afterImg.style.clipPath = `inset(0 0 0 ${100 - percentage}%)`;
        afterImg.style.webkitClipPath = `inset(0 0 0 ${100 - percentage}%)`;
        afterImg.style.width = `${100 - percentage}%`;
        afterImg.style.right = '0';
        afterImg.style.left = 'auto';
        if (handle) {
          handle.style.left = 'auto';
          handle.style.right = `${percentage}%`;
        }
        if (divider) {
          divider.style.left = 'auto';
          divider.style.right = `${percentage}%`;
        }
      } else {
        afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        afterImg.style.webkitClipPath = `inset(0 ${100 - percentage}% 0 0)`;
        afterImg.style.width = `${percentage}%`;
        afterImg.style.left = '0';
        afterImg.style.right = 'auto';
        if (handle) {
          handle.style.left = `${percentage}%`;
          handle.style.right = 'auto';
        }
        if (divider) {
          divider.style.left = `${percentage}%`;
          divider.style.right = 'auto';
        }
      }

      if (slider && parseFloat(slider.value) !== percentage) {
        slider.value = percentage;
      }
    }

    if (slider) {
      slider.addEventListener('input', e => updateSlider(e.target.value));
      slider.addEventListener('change', e => updateSlider(e.target.value));
    }

    // Touch and mouse drag support directly on the container
    let isDragging = false;

    function handleMove(e) {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      let pos = ((clientX - rect.left) / rect.width) * 100;
      if (isRtl) {
        pos = ((rect.right - clientX) / rect.width) * 100;
      }
      const clamped = Math.max(0, Math.min(100, pos));
      updateSlider(clamped);
    }

    container.addEventListener('mousedown', e => {
      isDragging = true;
      handleMove(e);
    });
    window.addEventListener('mouseup', () => (isDragging = false));
    window.addEventListener('mousemove', handleMove);

    container.addEventListener('touchstart', e => {
      isDragging = true;
      handleMove(e);
    }, { passive: true });
    window.addEventListener('touchend', () => (isDragging = false));
    window.addEventListener('touchmove', handleMove, { passive: true });

    // Initial positioning
    updateSlider(50);
  });
}

/* ==========================================================================
   6. Accordions (FAQ & Details)
   ========================================================================== */
function initAccordions() {
  const accordionButtons = document.querySelectorAll('.accordion-trigger');

  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target') || btn.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      const icon = btn.querySelector('.accordion-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (!content) return;

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   7. Accessible Modal Windows
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-modal-open]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const modals = document.querySelectorAll('.modal-backdrop');

  openButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('is-open')) {
          modal.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/* ==========================================================================
   8. Form Validation & Submissions
   ========================================================================== */
function initForms() {
  const forms = document.querySelectorAll('.validate-form');

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        const formGroup = input.closest('.form-group') || input.parentElement;
        const value = input.value.trim();

        if (!value) {
          isValid = false;
          formGroup.classList.add('has-error');
          formGroup.classList.remove('is-valid');
        } else if (input.type === 'email' && !validateEmail(value)) {
          isValid = false;
          formGroup.classList.add('has-error');
          formGroup.classList.remove('is-valid');
        } else if (input.type === 'tel' && !validatePhone(value)) {
          isValid = false;
          formGroup.classList.add('has-error');
          formGroup.classList.remove('is-valid');
        } else {
          formGroup.classList.remove('has-error');
          formGroup.classList.add('is-valid');
        }

        // Clear error on input
        input.addEventListener('input', () => {
          formGroup.classList.remove('has-error');
        }, { once: true });
      });

      if (isValid) {
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        }

        // Simulate secure submission
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          form.reset();
          form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
          showToast('Thank you! Your request has been received. Our tile restoration team will contact you within 2 hours.', 'success');
        }, 1200);
      } else {
        showToast('Please correct the highlighted fields before submitting.', 'danger');
      }
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[\d\s\(\)\-\+\.]{7,20}$/.test(phone);
}

/* ==========================================================================
   9. Toast Notification Engine
   ========================================================================== */
function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-msg toast-${type}`;

  let iconHtml = '<i class="fa-solid fa-circle-info text-blue-500"></i>';
  if (type === 'success') {
    iconHtml = '<i class="fa-solid fa-circle-check text-emerald-500"></i>';
  } else if (type === 'danger') {
    iconHtml = '<i class="fa-solid fa-triangle-exclamation text-rose-500"></i>';
  }

  toast.innerHTML = `
    <div class="text-lg">${iconHtml}</div>
    <div class="flex-1 text-sm font-medium">${message}</div>
    <button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-white" aria-label="Dismiss">
      <i class="fa-solid fa-xmark text-xs"></i>
    </button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Hero Video Showcase Controller
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-restoration-video');
  const container = document.getElementById('hero-video-container');
  const playBtn = document.getElementById('hero-video-play-btn');
  const playIcon = document.getElementById('hero-video-icon');

  if (!video) return;

  // Permanently muted ambient showcase
  video.muted = true;

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      if (playIcon) playIcon.className = 'fa-solid fa-pause text-white';
      if (playBtn) playBtn.classList.remove('opacity-100');
    } else {
      if (playIcon) playIcon.className = 'fa-solid fa-play text-white ml-0.5';
      if (playBtn) playBtn.classList.add('opacity-100');
    }
  }

  function togglePlay() {
    if (video.paused) {
      video.play().then(() => {
        updatePlayState(true);
      }).catch(err => console.log('Autoplay prevented:', err));
    } else {
      video.pause();
      updatePlayState(false);
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (container) container.addEventListener('click', togglePlay);

  video.addEventListener('play', () => updatePlayState(true));
  video.addEventListener('pause', () => updatePlayState(false));

  if (!video.paused) {
    updatePlayState(true);
  }
}

/* ==========================================================================
   11. Interactive Photo Upload Dropzone
   ========================================================================== */
function initPhotoUpload() {
  const dropzone = document.getElementById('photo-dropzone');
  const fileInput = document.getElementById('bathroom-photos-input');
  const previewContainer = document.getElementById('photo-preview-container');
  const previewGrid = document.getElementById('photo-preview-grid');
  const countBadge = document.getElementById('photo-count-badge');
  const clearAllBtn = document.getElementById('photo-clear-all');
  const contactForm = document.getElementById('main-contact-form');

  if (!dropzone || !fileInput) return;

  const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB
  const MAX_SINGLE_SIZE = 15 * 1024 * 1024; // 15MB
  let attachedFiles = [];

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function syncDataTransfer() {
    try {
      const dt = new DataTransfer();
      attachedFiles.forEach(f => dt.items.add(f));
      fileInput.files = dt.files;
    } catch (e) {
      // DataTransfer may be unsupported in some environments
    }
  }

  function renderPreviews() {
    if (!previewContainer || !previewGrid) return;

    if (attachedFiles.length === 0) {
      previewContainer.classList.add('hidden');
      previewGrid.innerHTML = '';
      return;
    }

    previewContainer.classList.remove('hidden');
    previewGrid.innerHTML = '';

    const totalBytes = attachedFiles.reduce((acc, f) => acc + f.size, 0);
    if (countBadge) {
      countBadge.innerHTML = `<i class="fa-solid fa-images"></i> <span>${attachedFiles.length} photo${attachedFiles.length > 1 ? 's' : ''} attached (${formatBytes(totalBytes)} of 25MB)</span>`;
    }

    attachedFiles.forEach((file, index) => {
      const card = document.createElement('div');
      card.className = 'relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 shadow-sm transition-all hover:shadow-md';

      const thumbUrl = URL.createObjectURL(file);

      card.innerHTML = `
        <div class="w-full h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
          <img src="${thumbUrl}" alt="${file.name}" class="w-full h-full object-cover">
          <button type="button" data-index="${index}" class="remove-photo-btn absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center text-xs shadow-md transition-colors" title="Remove photo" aria-label="Remove photo">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="mt-1 px-1">
          <p class="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">${file.name}</p>
          <p class="text-[10px] text-slate-400 font-medium">${formatBytes(file.size)}</p>
        </div>
      `;

      const removeBtn = card.querySelector('.remove-photo-btn');
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        URL.revokeObjectURL(thumbUrl);
        removeFile(index);
      });

      previewGrid.appendChild(card);
    });
  }

  function removeFile(index) {
    attachedFiles.splice(index, 1);
    syncDataTransfer();
    renderPreviews();
    if (typeof showToast === 'function') {
      showToast('Photo removed.', 'info', 2000);
    }
  }

  function handleFiles(files) {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    let addedCount = 0;
    let currentTotal = attachedFiles.reduce((acc, f) => acc + f.size, 0);

    for (const file of fileList) {
      const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|heic|gif)$/i.test(file.name);
      if (!isImage) {
        if (typeof showToast === 'function') {
          showToast(`"${file.name}" is not an image file. Only JPG, PNG, WEBP, and HEIC are supported.`, 'danger');
        }
        continue;
      }

      if (file.size > MAX_SINGLE_SIZE) {
        if (typeof showToast === 'function') {
          showToast(`"${file.name}" exceeds the 15MB single file limit.`, 'danger');
        }
        continue;
      }

      if (currentTotal + file.size > MAX_TOTAL_SIZE) {
        if (typeof showToast === 'function') {
          showToast('Total photo upload limit of 25MB reached.', 'danger');
        }
        break;
      }

      const isDuplicate = attachedFiles.some(f => f.name === file.name && f.size === file.size);
      if (isDuplicate) continue;

      attachedFiles.push(file);
      currentTotal += file.size;
      addedCount++;
    }

    if (addedCount > 0) {
      syncDataTransfer();
      renderPreviews();
      if (typeof showToast === 'function') {
        showToast(`${addedCount} photo${addedCount > 1 ? 's' : ''} added successfully!`, 'success');
      }
    }
  }

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    fileInput.value = '';
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('border-primary-500', 'bg-primary-50/60', 'dark:bg-primary-950/40');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('border-primary-500', 'bg-primary-50/60', 'dark:bg-primary-950/40');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  });

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      attachedFiles = [];
      syncDataTransfer();
      renderPreviews();
      if (typeof showToast === 'function') {
        showToast('All attached photos cleared.', 'info', 2000);
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('reset', () => {
      attachedFiles = [];
      syncDataTransfer();
      renderPreviews();
    });
  }
}
