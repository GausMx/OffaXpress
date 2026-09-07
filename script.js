/**
 * Offa Xpress - Landing Page Client Logic
 * Handles interactive shopping list formatting and WhatsApp URL generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const listForm = document.getElementById('shoppingListForm');
  const shoppingListInput = document.getElementById('shoppingList');
  const deliveryLocationInput = document.getElementById('deliveryLocation');
  const maxBudgetInput = document.getElementById('maxBudget');
  const deliveryTimeSelect = document.getElementById('deliveryTime');
  const extraInstructionsInput = document.getElementById('extraInstructions');
  const submitBtn = document.getElementById('btnSubmitList');

  // Phone / WhatsApp Number configuration
  const WHATSAPP_NUMBER = '2347059745190';

  if (listForm) {
    listForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendListToWhatsApp();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sendListToWhatsApp();
    });
  }

  function sendListToWhatsApp() {
    const listValue = shoppingListInput ? shoppingListInput.value.trim() : '';
    const locationValue = deliveryLocationInput ? deliveryLocationInput.value.trim() : '';
    const budgetValue = maxBudgetInput ? maxBudgetInput.value.trim() : '';
    const timeValue = deliveryTimeSelect ? deliveryTimeSelect.value : 'As soon as possible';
    const extraValue = extraInstructionsInput ? extraInstructionsInput.value.trim() : '';

    // Simple validation
    let hasError = false;

    if (!listValue) {
      if (shoppingListInput) {
        shoppingListInput.classList.add('is-invalid');
        shoppingListInput.focus();
      }
      hasError = true;
    } else {
      if (shoppingListInput) shoppingListInput.classList.remove('is-invalid');
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

    // Build clear formatted message
    let message = `Hi Offa Xpress 👋\nI'd like to place an order.\n\n🛒 My shopping list:\n${listValue}\n\n`;

    if (budgetValue) {
      message += `💰 Maximum budget:\n${budgetValue}\n\n`;
    } else {
      message += `💰 Maximum budget:\nNot specified\n\n`;
    }

    message += `📍 Delivery location:\n${locationValue}\n\n`;
    message += `🕐 Preferred delivery:\n${timeValue}\n\n`;

    if (extraValue) {
      message += `📝 Extra instructions:\n${extraValue}`;
    } else {
      message += `📝 Extra instructions:\nNone`;
    }

    // Encode message safely
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Direct user to WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  // Remove validation warnings on typing
  if (shoppingListInput) {
    shoppingListInput.addEventListener('input', () => {
      if (shoppingListInput.value.trim()) {
        shoppingListInput.classList.remove('is-invalid');
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

  // Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
  const navbarCollapse = document.getElementById('navbarNav');
  
  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }
});
