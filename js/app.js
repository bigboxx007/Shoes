/**
 * HARSH WALKWEAR - Core Application Logic
 * Inspired by Neeman's E-Commerce Experience
 * Contact: +91 6230427856 | Instagram: @harsh_garg009 | Chandigarh
 * Fully Color-Synced Product Engine with Instant Transitions
 */

// State Management
const STATE = {
  products: PRODUCTS,
  activeCategory: 'all',
  sortBy: 'featured',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('harsh_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('harsh_wishlist')) || [],
  appliedCoupon: JSON.parse(localStorage.getItem('harsh_coupon')) || null,
  selectedProduct: null,
  activeColorIndex: 0,
  selectedSize: null
};

const PHONE_NUMBER = "6230427856";
const WHATSAPP_NUMBER = "916230427856";
const INSTAGRAM_HANDLE = "harsh_garg009";
const STORE_ADDRESS = "SCO 65-66, Sector 34B, Chandigarh, 160022";
const FREE_SHIPPING_THRESHOLD = 999;

// DOM Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderProducts();
  initCategoryFilters();
  initSorting();
  initCart();
  initSearch();
  initQuickViewModal();
  initCheckoutModal();
  initWishlistModal();
  updateCounters();
});

/* ==========================================================================
   NAVBAR & SCROLL
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active-mobile');
    });
  }
}

/* ==========================================================================
   PRODUCT CATALOG RENDERING WITH DYNAMIC COLOR SYNC
   ========================================================================== */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Filter products
  let filtered = STATE.products.filter(p => {
    const matchesCat = STATE.activeCategory === 'all' || p.category === STATE.activeCategory;
    const matchesSearch = !STATE.searchQuery || 
      p.name.toLowerCase().includes(STATE.searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(STATE.searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(STATE.searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort products
  if (STATE.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (STATE.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // Default featured order
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">No pairs found matching your criteria.</p>
        <button class="btn btn-secondary" onclick="resetFilters()" style="margin-top: 14px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = STATE.wishlist.includes(product.id);
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const primaryColor = product.colors[0];

    return `
      <article class="product-card" data-id="${product.id}" data-selected-color-index="0">
        <div class="card-media" onclick="openQuickView('${product.id}')">
          <img src="${primaryColor.image}" 
               alt="${product.name}" 
               class="card-img" 
               id="card-img-${product.id}" 
               style="${primaryColor.filter ? `filter: ${primaryColor.filter};` : ''}"
               loading="lazy">
          
          ${product.badge ? `<span class="card-badge ${product.isNew ? 'badge-new' : ''}">${product.badge}</span>` : ''}
          
          <!-- Live Active Color Label Badge -->
          <div class="card-color-indicator" id="color-badge-${product.id}">
            ${primaryColor.name}
          </div>

          <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(event, '${product.id}')" title="Save to Wishlist" aria-label="Save to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <div class="card-quick-view-overlay">
            <span class="btn-quick-view">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Quick View
            </span>
          </div>
        </div>

        <div class="card-body">
          <!-- Interactive Color Swatches with Instant Visual Sync -->
          <div class="card-swatches">
            ${product.colors.map((c, idx) => `
              <span class="swatch ${idx === 0 ? 'active' : ''}" 
                    style="background-color: ${c.hex};" 
                    title="${c.name}"
                    onclick="switchCardColor(event, '${product.id}', ${idx}, this)"></span>
            `).join('')}
          </div>

          <!-- Clean Minimalist Specs (No Customer Reviews) -->
          <div class="card-meta">
            <span class="card-spec-tag">${product.spec || 'Eco Comfort'}</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); font-weight: 600;">${product.weight}</span>
          </div>

          <h3 class="card-title" onclick="openQuickView('${product.id}')" style="cursor: pointer;">${product.name}</h3>
          <p class="card-subtitle">${product.subtitle}</p>

          <div class="card-sizes" id="sizes-${product.id}">
            ${product.sizes.map(size => `
              <span class="size-tag" onclick="selectCardSize(event, '${product.id}', ${size}, this)">UK ${size}</span>
            `).join('')}
          </div>

          <div class="card-footer">
            <div class="card-price-group">
              <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
              <div class="price-original-wrap">
                <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                <span class="discount-badge">${discountPercent}% OFF</span>
              </div>
            </div>
            <button class="btn-add-cart" onclick="quickAddToCart('${product.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Bag
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Color Swatch Interaction: Seamless visual sync of product color
window.switchCardColor = function(event, productId, colorIndex, swatchEl) {
  event.stopPropagation();
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;
  const color = product.colors[colorIndex];
  if (!color) return;

  const cardImg = document.getElementById(`card-img-${productId}`);
  const colorBadge = document.getElementById(`color-badge-${productId}`);

  if (cardImg) {
    // Smooth cross-fade transition
    cardImg.classList.add('color-switching');
    setTimeout(() => {
      if (color.image) cardImg.src = color.image;
      cardImg.style.filter = color.filter || 'none';
      cardImg.classList.remove('color-switching');
    }, 120);
  }

  if (colorBadge) {
    colorBadge.textContent = color.name;
  }

  // Update active swatch ring
  const parent = swatchEl.parentElement;
  parent.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  swatchEl.classList.add('active');

  // Record active color on product card DOM
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    card.dataset.selectedColorIndex = colorIndex;
  }
};

// Size tag interaction on card
window.selectCardSize = function(event, productId, size, sizeEl) {
  event.stopPropagation();
  const parent = sizeEl.parentElement;
  const isAlreadySelected = sizeEl.classList.contains('selected');
  parent.querySelectorAll('.size-tag').forEach(s => s.classList.remove('selected'));
  if (!isAlreadySelected) {
    sizeEl.classList.add('selected');
  }
};

function initCategoryFilters() {
  const buttons = document.querySelectorAll('.cat-btn[data-category]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });
}

function initSorting() {
  const sortSelect = document.getElementById('catalogSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      STATE.sortBy = e.target.value;
      renderProducts();
    });
  }
}

window.resetFilters = function() {
  STATE.activeCategory = 'all';
  STATE.searchQuery = '';
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.cat-btn[data-category="all"]')?.classList.add('active');
  renderProducts();
};

/* ==========================================================================
   WISHLIST SYSTEM
   ========================================================================== */
window.toggleWishlist = function(event, productId) {
  if (event) event.stopPropagation();
  const index = STATE.wishlist.indexOf(productId);
  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showToast("Removed from your Wishlist", "info");
  } else {
    STATE.wishlist.push(productId);
    const p = STATE.products.find(x => x.id === productId);
    showToast(`Saved ${p ? p.name : 'item'} to your Wishlist!`, "success");
  }
  localStorage.setItem('harsh_wishlist', JSON.stringify(STATE.wishlist));
  updateCounters();
  renderProducts();
};

/* ==========================================================================
   CART SYSTEM WITH COLOR RETENTION
   ========================================================================== */
function initCart() {
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const backdrop = document.getElementById('drawerBackdrop');
  const applyCouponBtn = document.getElementById('applyCouponBtn');

  if (openCartBtn) {
    openCartBtn.addEventListener('click', openCartDrawer);
  }
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCartDrawer);
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeCartDrawer();
      closeQuickView();
      closeCheckoutModal();
      closeWishlistModal();
      closeSearch();
    });
  }

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', applyPromoCode);
  }

  renderCart();
}

function openCartDrawer() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('drawerBackdrop')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('drawerBackdrop')?.classList.remove('active');
  document.body.style.overflow = '';
}

window.quickAddToCart = function(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  // Selected size
  const sizeContainer = document.getElementById(`sizes-${productId}`);
  const selectedTag = sizeContainer?.querySelector('.size-tag.selected');
  const size = selectedTag ? parseInt(selectedTag.textContent.replace('UK ', '')) : product.sizes[0];

  // Selected color index from card
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  const colorIndex = card && card.dataset.selectedColorIndex !== undefined 
    ? parseInt(card.dataset.selectedColorIndex) 
    : 0;
  const colorObj = product.colors[colorIndex] || product.colors[0];

  addToCart(product, colorObj, size, 1);
};

function addToCart(product, colorObj, size, quantity = 1) {
  const cartKey = `${product.id}-${colorObj.name}-${size}`;
  const existing = STATE.cart.find(item => item.cartKey === cartKey);

  if (existing) {
    existing.quantity += quantity;
  } else {
    STATE.cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      color: colorObj.name,
      image: colorObj.image,
      filter: colorObj.filter || 'none',
      size: size,
      quantity: quantity
    });
  }

  saveCart();
  renderCart();
  updateCounters();
  openCartDrawer();
  showToast(`Added ${product.name} (${colorObj.name}, UK ${size}) to Bag!`, "success");
}

function saveCart() {
  localStorage.setItem('harsh_cart', JSON.stringify(STATE.cart));
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');
  const shippingFill = document.getElementById('shippingProgressFill');
  const shippingText = document.getElementById('shippingMeterText');
  const appliedPill = document.getElementById('appliedCouponPill');
  const appliedCodeName = document.getElementById('appliedCodeName');

  if (!container) return;

  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h4>Your Bag is Empty</h4>
        <p>Explore our cloud-comfort shoes crafted with Merino wool and eco-knits.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); window.scrollTo({top: document.getElementById('collectionSection').offsetTop - 80, behavior: 'smooth'});">
          Explore Collection
        </button>
      </div>
    `;

    if (subtotalEl) subtotalEl.textContent = "₹0";
    if (discountEl) discountEl.textContent = "- ₹0";
    if (totalEl) totalEl.textContent = "₹0";
    if (shippingFill) shippingFill.style.width = "0%";
    if (shippingText) shippingText.innerHTML = `Add <strong>₹${FREE_SHIPPING_THRESHOLD}</strong> to unlock <strong>Free Express Shipping!</strong>`;
    if (appliedPill) appliedPill.classList.remove('active');
    return;
  }

  // Calculate Subtotal
  const subtotal = STATE.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Free shipping bar
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  if (shippingFill) shippingFill.style.width = `${progressPercent}%`;
  if (shippingText) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Nationwide Express Shipping!</strong>`;
    } else {
      const needed = FREE_SHIPPING_THRESHOLD - subtotal;
      shippingText.innerHTML = `Add <strong>₹${needed.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Express Shipping!</strong>`;
    }
  }

  // Calculate Discount
  let discountAmount = 0;
  if (STATE.appliedCoupon && PROMO_CODES[STATE.appliedCoupon]) {
    const coupon = PROMO_CODES[STATE.appliedCoupon];
    if (coupon.discountPercent) {
      discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
    } else if (coupon.flatDiscount) {
      discountAmount = coupon.flatDiscount;
    }
    if (appliedPill) {
      appliedPill.classList.add('active');
      if (appliedCodeName) appliedCodeName.textContent = `${STATE.appliedCoupon} (-₹${discountAmount})`;
    }
  } else {
    if (appliedPill) appliedPill.classList.remove('active');
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (discountEl) discountEl.textContent = `- ₹${discountAmount.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  // Render items with matching color filter
  container.innerHTML = STATE.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="${item.filter ? `filter: ${item.filter};` : ''}">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-spec">Shade: <strong>${item.color}</strong> | UK ${item.size}</div>
        <div class="cart-item-bottom">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateCartQty('${item.cartKey}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.cartKey}', 1)">+</button>
          </div>
          <span class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
          <button class="cart-item-remove" onclick="removeCartItem('${item.cartKey}')" title="Remove item">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.updateCartQty = function(cartKey, delta) {
  const item = STATE.cart.find(i => i.cartKey === cartKey);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeCartItem(cartKey);
    return;
  }
  saveCart();
  renderCart();
  updateCounters();
};

window.removeCartItem = function(cartKey) {
  STATE.cart = STATE.cart.filter(i => i.cartKey !== cartKey);
  saveCart();
  renderCart();
  updateCounters();
  showToast("Item removed from Bag", "info");
};

function applyPromoCode() {
  const input = document.getElementById('couponInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (PROMO_CODES[code]) {
    STATE.appliedCoupon = code;
    localStorage.setItem('harsh_coupon', JSON.stringify(code));
    renderCart();
    showToast(`Code ${code} applied successfully!`, "success");
    input.value = '';
  } else {
    showToast("Invalid promo code. Try HARSH10 or CHANDIGARH", "error");
  }
}

window.removePromoCoupon = function() {
  STATE.appliedCoupon = null;
  localStorage.removeItem('harsh_coupon');
  renderCart();
  showToast("Coupon removed", "info");
};

function updateCounters() {
  const cartBadge = document.getElementById('cartBadge');
  const wishlistBadge = document.getElementById('wishlistBadge');

  const cartCount = STATE.cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
  }

  if (wishlistBadge) {
    const wishCount = STATE.wishlist.length;
    wishlistBadge.textContent = wishCount;
    wishlistBadge.style.display = wishCount > 0 ? 'flex' : 'none';
  }
}

/* ==========================================================================
   DIRECT WHATSAPP CHECKOUT (CONNECTED TO HARSH: +91 6230427856)
   ========================================================================== */
window.checkoutViaWhatsApp = function() {
  if (STATE.cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  const subtotal = STATE.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discount = 0;
  if (STATE.appliedCoupon && PROMO_CODES[STATE.appliedCoupon]) {
    const coupon = PROMO_CODES[STATE.appliedCoupon];
    discount = coupon.discountPercent ? Math.round((subtotal * coupon.discountPercent) / 100) : coupon.flatDiscount;
  }
  const total = Math.max(0, subtotal - discount);

  let message = `*NEW ORDER INQUIRY - HARSH WALKWEAR*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Hello Harsh, I would like to place an order from your website:\n\n`;

  STATE.cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   • Shade: ${item.color}\n`;
    message += `   • Size: UK ${item.size}\n`;
    message += `   • Qty: ${item.quantity}\n`;
    message += `   • Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
  if (discount > 0) {
    message += `Discount (${STATE.appliedCoupon}): -₹${discount.toLocaleString('en-IN')}\n`;
  }
  message += `Shipping: FREE Express Delivery\n`;
  message += `*Grand Total: ₹${total.toLocaleString('en-IN')}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Flagship Store: ${STORE_ADDRESS}\n`;
  message += `Please confirm my order details and dispatch timeline. Thank you!`;

  const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
};

/* ==========================================================================
   QUICK VIEW MODAL (WITH COLOR-SYNCED GALLERY)
   ========================================================================== */
function initQuickViewModal() {
  const modalClose = document.getElementById('quickViewClose');
  if (modalClose) {
    modalClose.addEventListener('click', closeQuickView);
  }
}

window.openQuickView = function(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  // Retrieve current selected color index from card if user switched it
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  const initialColorIndex = card && card.dataset.selectedColorIndex !== undefined 
    ? parseInt(card.dataset.selectedColorIndex) 
    : 0;

  STATE.selectedProduct = product;
  STATE.activeColorIndex = initialColorIndex;
  STATE.selectedSize = product.sizes[0];

  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('drawerBackdrop');
  const container = document.getElementById('quickViewContainer');

  const activeColor = product.colors[initialColorIndex] || product.colors[0];
  const gallery = activeColor.gallery || [activeColor.image];
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  container.innerHTML = `
    <div class="quick-view-grid">
      <div class="modal-gallery">
        <img src="${gallery[0]}" 
             alt="${product.name}" 
             class="modal-main-img" 
             id="modalMainImg" 
             style="${activeColor.filter ? `filter: ${activeColor.filter};` : ''}">
        
        <div class="modal-thumbs" id="modalThumbs">
          ${gallery.map((img, i) => `
            <img src="${img}" 
                 class="thumb-item ${i === 0 ? 'active' : ''}" 
                 style="${activeColor.filter ? `filter: ${activeColor.filter};` : ''}"
                 onclick="switchModalMainImg('${img}', this, '${activeColor.filter || 'none'}')">
          `).join('')}
        </div>
      </div>

      <div class="modal-details">
        <span class="badge">${product.badge || 'Harsh Exclusive'}</span>
        <h2 class="modal-title">${product.name}</h2>
        <p class="modal-subtitle">${product.subtitle}</p>

        <div class="modal-price-box">
          <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          <span class="discount-badge">${discountPercent}% OFF</span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">
          ${product.description}
        </p>

        <div style="margin-bottom: 18px;">
          <div class="modal-section-label">Selected Color: <strong id="modalColorLabel" style="color: var(--text-primary);">${activeColor.name}</strong></div>
          <div class="card-swatches" style="margin-top: 8px;">
            ${product.colors.map((c, i) => `
              <span class="swatch ${i === initialColorIndex ? 'active' : ''}" 
                    style="background-color: ${c.hex}; width: 28px; height: 28px;" 
                    title="${c.name}"
                    onclick="switchModalColor(${i})"></span>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div class="modal-section-label">Choose Size (UK/India)</div>
            <span style="font-size: 0.75rem; text-decoration: underline; color: var(--brand-amber); cursor: pointer;" onclick="alert('Standard Indian / UK sizing applies. If you wear half sizes, we recommend sizing up for casual slip-ons!')">Size Guide</span>
          </div>
          <div class="card-sizes" id="modalSizes">
            ${product.sizes.map((s, idx) => `
              <span class="size-tag ${idx === 0 ? 'selected' : ''}" style="padding: 6px 14px; font-size: 0.85rem;" onclick="selectModalSize(${s}, this)">UK ${s}</span>
            `).join('')}
          </div>
        </div>

        <ul class="modal-features-list">
          ${product.features.map(f => `
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${f}
            </li>
          `).join('')}
        </ul>

        <div style="margin-top: auto; display: flex; gap: 12px; padding-top: 16px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="addModalItemToCart()">
            Add to Bag • ₹${product.price.toLocaleString('en-IN')}
          </button>
          <button class="btn btn-whatsapp" onclick="directModalWhatsAppOrder()" title="Inquire on WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
            Ask Harsh
          </button>
        </div>
      </div>
    </div>
  `;

  modal?.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.switchModalMainImg = function(src, thumbEl, filterStr = 'none') {
  const main = document.getElementById('modalMainImg');
  if (main) {
    main.src = src;
    main.style.filter = filterStr;
  }
  document.querySelectorAll('#modalThumbs .thumb-item').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
};

window.switchModalColor = function(colorIndex) {
  if (!STATE.selectedProduct) return;
  STATE.activeColorIndex = colorIndex;
  const color = STATE.selectedProduct.colors[colorIndex];
  const main = document.getElementById('modalMainImg');
  const label = document.getElementById('modalColorLabel');

  if (main) {
    main.classList.add('color-switching');
    setTimeout(() => {
      if (color.image) main.src = color.image;
      main.style.filter = color.filter || 'none';
      main.classList.remove('color-switching');
    }, 120);
  }

  if (label) label.textContent = color.name;

  const thumbs = document.getElementById('modalThumbs');
  if (thumbs && color.gallery) {
    thumbs.innerHTML = color.gallery.map((img, i) => `
      <img src="${img}" 
           class="thumb-item ${i === 0 ? 'active' : ''}" 
           style="${color.filter ? `filter: ${color.filter};` : ''}"
           onclick="switchModalMainImg('${img}', this, '${color.filter || 'none'}')">
    `).join('');
  }

  document.querySelectorAll('#quickViewContainer .swatch').forEach((s, idx) => {
    s.classList.toggle('active', idx === colorIndex);
  });
};

window.selectModalSize = function(size, tagEl) {
  STATE.selectedSize = size;
  document.querySelectorAll('#modalSizes .size-tag').forEach(t => t.classList.remove('selected'));
  tagEl.classList.add('selected');
};

window.addModalItemToCart = function() {
  if (!STATE.selectedProduct) return;
  const color = STATE.selectedProduct.colors[STATE.activeColorIndex];
  addToCart(STATE.selectedProduct, color, STATE.selectedSize, 1);
  closeQuickView();
};

window.directModalWhatsAppOrder = function() {
  if (!STATE.selectedProduct) return;
  const color = STATE.selectedProduct.colors[STATE.activeColorIndex];
  const size = STATE.selectedSize;
  const msg = `Hello Harsh! I'm inquiring about *${STATE.selectedProduct.name}* (Color: ${color.name}, Size: UK ${size}, Price: ₹${STATE.selectedProduct.price}) from your website. Is it available for immediate trial at your Sector 34B Chandigarh store or nationwide dispatch?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

function closeQuickView() {
  document.getElementById('quickViewModal')?.classList.remove('active');
  if (!document.getElementById('cartDrawer')?.classList.contains('open')) {
    document.getElementById('drawerBackdrop')?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   CHECKOUT MODAL & ORDER COMPLETION
   ========================================================================== */
function initCheckoutModal() {
  const checkoutBtn = document.getElementById('proceedCheckoutBtn');
  const closeBtn = document.getElementById('checkoutModalClose');
  const form = document.getElementById('checkoutForm');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (STATE.cart.length === 0) {
        showToast("Add items to your bag before checking out!", "error");
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCheckoutModal);
  }

  if (form) {
    form.addEventListener('submit', handleCheckoutSubmit);
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const backdrop = document.getElementById('drawerBackdrop');
  const totalAmountEl = document.getElementById('checkoutTotalAmount');
  const itemsCountEl = document.getElementById('checkoutItemsCount');

  const subtotal = STATE.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discount = 0;
  if (STATE.appliedCoupon && PROMO_CODES[STATE.appliedCoupon]) {
    const c = PROMO_CODES[STATE.appliedCoupon];
    discount = c.discountPercent ? Math.round((subtotal * c.discountPercent) / 100) : c.flatDiscount;
  }
  const total = Math.max(0, subtotal - discount);

  if (totalAmountEl) totalAmountEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (itemsCountEl) itemsCountEl.textContent = `${STATE.cart.length} item(s)`;

  modal?.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('active');
  document.getElementById('drawerBackdrop')?.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const city = document.getElementById('custCity').value.trim();
  const payment = document.querySelector('input[name="paymentMode"]:checked')?.value || 'Cash on Delivery';

  const orderId = 'HW-' + Math.floor(100000 + Math.random() * 900000);

  // Clear cart
  STATE.cart = [];
  STATE.appliedCoupon = null;
  saveCart();
  localStorage.removeItem('harsh_coupon');
  renderCart();
  updateCounters();
  closeCheckoutModal();

  // Show Success Alert Modal
  showOrderSuccessDialog(orderId, name, phone, address, city, payment);
}

function showOrderSuccessDialog(orderId, name, phone, address, city, payment) {
  const dialogHtml = `
    <div style="text-align: center; padding: 40px 24px;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: #DCFCE7; color: #15803D; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h3 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Order Confirmed!</h3>
      <p style="font-size: 0.95rem; color: #52525B; margin-bottom: 16px;">
        Thank you, <strong>${name}</strong>! Your order <strong>#${orderId}</strong> has been logged.
      </p>
      <div style="background: #F4F1EA; padding: 16px; border-radius: 10px; margin-bottom: 24px; text-align: left; font-size: 0.88rem; line-height: 1.6;">
        <div>📍 <strong>Delivery To:</strong> ${address}, ${city}</div>
        <div>📞 <strong>Contact:</strong> ${phone}</div>
        <div>💳 <strong>Payment Method:</strong> ${payment}</div>
        <div>🚚 <strong>Dispatched from:</strong> ${STORE_ADDRESS}</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn btn-whatsapp" onclick="notifyOrderOnWhatsApp('${orderId}', '${name}', '${phone}', '${city}')">
          Receive Instant Tracking on WhatsApp
        </button>
        <button class="btn btn-secondary" onclick="closeOrderSuccessModal()">
          Continue Browsing
        </button>
      </div>
    </div>
  `;

  const modal = document.getElementById('checkoutModal');
  const container = document.getElementById('checkoutModalBody');
  if (container) container.innerHTML = dialogHtml;
  modal?.classList.add('active');
}

window.notifyOrderOnWhatsApp = function(orderId, name, phone, city) {
  const msg = `Hi Harsh, I just placed order *#${orderId}* on your website.\nName: ${name}\nPhone: ${phone}\nDestination: ${city}\nPlease share dispatch status. Thank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  closeOrderSuccessModal();
};

window.closeOrderSuccessModal = function() {
  document.getElementById('checkoutModal')?.classList.remove('active');
  document.getElementById('drawerBackdrop')?.classList.remove('active');
  document.body.style.overflow = '';
  location.reload();
};

/* ==========================================================================
   LIVE SEARCH
   ========================================================================== */
function initSearch() {
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');

  if (openSearchBtn) {
    openSearchBtn.addEventListener('click', () => {
      searchModal?.classList.add('active');
      searchInput?.focus();
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', closeSearch);
  }

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Type to search sneakers, loafers, slip-ons, or walkers...</p>`;
        return;
      }

      const matches = STATE.products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No matching footwear found for "${q}".</p>`;
        return;
      }

      resultsContainer.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="closeSearch(); openQuickView('${p.id}')">
          <img src="${p.colors[0].image}" class="search-result-thumb" alt="${p.name}" style="${p.colors[0].filter ? `filter: ${p.colors[0].filter};` : ''}">
          <div style="flex-grow: 1;">
            <h4 style="font-size: 0.95rem; font-weight: 700;">${p.name}</h4>
            <p style="font-size: 0.78rem; color: var(--text-secondary);">${p.subtitle}</p>
          </div>
          <span style="font-weight: 800; font-size: 0.95rem;">₹${p.price.toLocaleString('en-IN')}</span>
        </div>
      `).join('');
    });
  }
}

function closeSearch() {
  document.getElementById('searchModal')?.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   WISHLIST MODAL
   ========================================================================== */
function initWishlistModal() {
  const closeBtn = document.getElementById('wishlistModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeWishlistModal);
  }
}

window.openWishlistModal = function() {
  const modal = document.getElementById('wishlistModal');
  const backdrop = document.getElementById('drawerBackdrop');
  const content = document.getElementById('wishlistModalContent');

  if (!modal || !content) return;

  const wishlistedProducts = STATE.products.filter(p => STATE.wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    content.innerHTML = `
      <div style="text-align: center; padding: 32px 16px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-muted); margin-bottom: 12px;">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">Your Wishlist is Empty</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 18px;">Click the heart icon on any pair to save your favorites here!</p>
        <button class="btn btn-primary" onclick="closeWishlistModal(); window.scrollTo({top: document.getElementById('collectionSection').offsetTop - 80, behavior: 'smooth'});">
          Discover Shoes
        </button>
      </div>
    `;
  } else {
    content.innerHTML = wishlistedProducts.map(p => `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px; border-radius: 10px; background: var(--bg-subtle); border: 1px solid var(--border-light);">
        <img src="${p.colors[0].image}" alt="${p.name}" style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover; ${p.colors[0].filter ? `filter: ${p.colors[0].filter};` : ''}">
        <div style="flex-grow: 1;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 2px;">${p.name}</h4>
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-primary);">₹${p.price.toLocaleString('en-IN')}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn btn-primary" style="padding: 8px 14px; font-size: 0.8rem;" onclick="closeWishlistModal(); openQuickView('${p.id}')">
            View & Select Size
          </button>
          <button style="color: #EF4444; font-size: 0.85rem; padding: 6px;" onclick="toggleWishlist(event, '${p.id}'); openWishlistModal();" title="Remove">
            ✕
          </button>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeWishlistModal = function() {
  document.getElementById('wishlistModal')?.classList.remove('active');
  document.getElementById('drawerBackdrop')?.classList.remove('active');
  document.body.style.overflow = '';
};

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
