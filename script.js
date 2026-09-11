/**
 * Offa Xpress - Food Delivery MVP Client Logic
 * Handles interactive food order formatting and WhatsApp URL generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const foodForm = document.getElementById('foodOrderForm');
  const foodOrderInput = document.getElementById('foodOrder');
  const foodSpotInput = document.getElementById('foodSpot');
  const deliveryLocationInput = document.getElementById('deliveryLocation');
  const deliveryTimeSelect = document.getElementById('deliveryTime');
  const extraInstructionsInput = document.getElementById('extraInstructions');
  const submitBtn = document.getElementById('btnSubmitOrder');

  // Phone / WhatsApp Number configuration
  const WHATSAPP_NUMBER = '2349123140961';

  if (foodForm) {
    foodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendOrderToWhatsApp();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sendOrderToWhatsApp();
    });
  }

  function sendOrderToWhatsApp() {
    const foodValue = foodOrderInput ? foodOrderInput.value.trim() : '';
    const locationValue = deliveryLocationInput ? deliveryLocationInput.value.trim() : '';
    const spotValue = foodSpotInput ? foodSpotInput.value.trim() : '';
    const timeValue = deliveryTimeSelect ? deliveryTimeSelect.value : 'As soon as possible';
    const extraValue = extraInstructionsInput ? extraInstructionsInput.value.trim() : '';

    // Validation
    let hasError = false;

    if (!foodValue) {
      if (foodOrderInput) {
        foodOrderInput.classList.add('is-invalid');
        foodOrderInput.focus();
      }
      hasError = true;
    } else {
      if (foodOrderInput) foodOrderInput.classList.remove('is-invalid');
    }

    if (!locationValue) {
      if (deliveryLocationInput) {
        deliveryLocationInput.classList.add('is-invalid');
        if (!hasError) deliveryLocationInput.focus();
      }
      hasError = true;
    } else {
      if (deliveryLocationInput) deliveryLocationInput.classList.remove('is-invalid');
    }

    if (hasError) {
      return;
    }

    // Build clear formatted food order message
    let message = `Hi Offa Xpress! 👋\nI’d like to order food.\n\n🍲 Food order:\n${foodValue}\n\n`;

    if (spotValue) {
      message += `🏪 Preferred food spot:\n${spotValue}\n\n`;
    } else {
      message += `🏪 Preferred food spot:\nAny good spot in Offa\n\n`;
    }

    message += `📍 Delivery location:\n${locationValue}\n\n`;
    message += `🕐 Preferred delivery:\n${timeValue}\n\n`;

    if (extraValue) {
      message += `📝 Special notes:\n${extraValue}`;
    } else {
      message += `📝 Special notes:\nNone`;
    }

    // Encode message safely
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Direct user to WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  // Remove validation warnings on typing
  if (foodOrderInput) {
    foodOrderInput.addEventListener('input', () => {
      if (foodOrderInput.value.trim()) {
        foodOrderInput.classList.remove('is-invalid');
      }
    });
  }

  if (deliveryLocationInput) {
    deliveryLocationInput.addEventListener('input', () => {
      if (deliveryLocationInput.value.trim()) {
        deliveryLocationInput.classList.remove('is-invalid');
      }
    });
  }

  // Mobile navbar toggle & collapse logic (Vanilla JS fallback)
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarNav');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarCollapse.classList.toggle('show');
      const isExpanded = navbarCollapse.classList.contains('show');
      navbarToggler.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          if (navbarToggler) {
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }
});
