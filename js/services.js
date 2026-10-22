/**
 * HARSH WALKWEAR - All-Services Landing Page Logic
 * Interactive service filters, FAQ accordions, and WhatsApp booking builder
 * Contact: +91 6230427856 | SCO 65-66, Sector 34B, Chandigarh
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceFilters();
  initFaqAccordions();
  initServiceBookingForm();
});

/* ==========================================================================
   SERVICE CATEGORY FILTERS
   ========================================================================== */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-main-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.serviceCategory;

      serviceCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   FAQ ACCORDION TOGGLE
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other FAQs
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      // Toggle current FAQ
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ==========================================================================
   INTERACTIVE SERVICE BOOKING FORM & WHATSAPP BUILDER
   ========================================================================== */
function initServiceBookingForm() {
  const form = document.getElementById('serviceBookingForm');
  const serviceSelect = document.getElementById('serviceTypeSelect');
  const estimatedCostEl = document.getElementById('serviceEstimatedCost');

  // Service Pricing Map
  const servicePrices = {
    'spa-express': '₹299',
    'spa-deep': '₹599',
    'spa-full': '₹799',
    'gait-analysis': 'FREE / Complimentary',
    'try-at-home': 'FREE (Tricity)',
    'monogramming': '₹450 / pair',
    'eco-exchange': '₹500 Store Voucher Granted',
    'corporate-wedding': 'Custom Quote'
  };

  if (serviceSelect && estimatedCostEl) {
    serviceSelect.addEventListener('change', () => {
      const selected = serviceSelect.value;
      estimatedCostEl.textContent = servicePrices[selected] || 'Complimentary / Custom';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleServiceBookingSubmit();
    });
  }
}

function handleServiceBookingSubmit() {
  const serviceSelect = document.getElementById('serviceTypeSelect');
  const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
  const shoeModel = document.getElementById('serviceShoeModel').value.trim() || 'Harsh Walkwear Pair';
  const custName = document.getElementById('serviceCustName').value.trim();
  const custPhone = document.getElementById('serviceCustPhone').value.trim();
  const preferredDate = document.getElementById('serviceDate').value || 'Earliest Available';
  const address = document.getElementById('serviceAddress').value.trim() || 'Sector 34B Chandigarh Flagship Studio';
  const notes = document.getElementById('serviceNotes').value.trim() || 'None';

  const bookingRef = 'SRV-' + Math.floor(100000 + Math.random() * 900000);

  // Format WhatsApp message to Harsh (+91 6230427856)
  let msg = `*SERVICE BOOKING INQUIRY - HARSH WALKWEAR*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Ref ID: *#${bookingRef}*\n`;
  msg += `Service: *${serviceName}*\n`;
  msg += `Shoe Model / Style: ${shoeModel}\n`;
  msg += `Preferred Date / Time: ${preferredDate}\n\n`;
  msg += `Customer Name: ${custName}\n`;
  msg += `Phone: ${custPhone}\n`;
  msg += `Location / Address: ${address}\n`;
  if (notes !== 'None') {
    msg += `Special Requests: ${notes}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Studio: SCO 65-66, Sector 34B, Chandigarh\n`;
  msg += `Please confirm my service booking and slot. Thank you!`;

  const waUrl = `https://wa.me/916230427856?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');

  if (typeof showToast === 'function') {
    showToast(`Service request #${bookingRef} created! Opening WhatsApp...`, 'success');
  } else {
    alert(`Thank you ${custName}! Your service booking #${bookingRef} has been prepared. Opening WhatsApp to confirm with Harsh.`);
  }

  document.getElementById('serviceBookingForm').reset();
  const estimatedCostEl = document.getElementById('serviceEstimatedCost');
  if (estimatedCostEl) estimatedCostEl.textContent = 'Select a service';
}

// Quick pre-select service from card click
window.selectServiceAndScroll = function(serviceVal) {
  const select = document.getElementById('serviceTypeSelect');
  const formSection = document.getElementById('bookingSection');

  if (select && formSection) {
    select.value = serviceVal;
    select.dispatchEvent(new Event('change'));
    formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
