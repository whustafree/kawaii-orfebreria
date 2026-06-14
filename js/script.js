/* ============================================
   Kawaii Orfebrería — Main Script
   ============================================ */

// ============ CONFIGURATION ============
const CONFIG = {
  // ⚠️ REEMPLAZA ESTE NÚMERO CON TU WHATSAPP REAL
  // Formato: código de país + número, sin + ni espacios
  // Ejemplo Chile: 569XXXXXXXX (donde X es tu número)
  whatsappNumber: '56912345678',
  whatsappMessage: '¡Hola! ✿ Me encantaría consultar por un producto'
};

// ============ DOM REFS ============
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const stripItems = document.querySelectorAll('.strip-item');
const scrollTopBtn = document.getElementById('scrollTop');
const contactWhatsAppBtn = document.getElementById('contactWhatsAppBtn');

// ============ RENDER PRODUCTS ============
function renderProducts(category = 'all') {
  const filtered = category === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === category);

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products">
        <p>✨ No hay productos en esta categoría todavía</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(product => `
    <div class="product-card theme-${product.theme}" data-category="${product.category}">
      <div class="product-image">
        <div class="product-image-bg"></div>
        <div class="product-image-content">
          <span class="product-image-emoji">${product.emoji}</span>
          <span class="product-image-label">${CATEGORY_LABELS[product.category]}</span>
        </div>
        <span class="product-category-badge">${CATEGORY_LABELS[product.category]}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-materials">${product.materials}</p>
        <p class="product-price">$${product.price} <span>CLP</span></p>
        <div class="product-actions">
          <button class="btn btn-whatsapp btn-small" onclick="inquireWhatsApp('${product.name}', ${product.id})">
            💬 Consultar Precio
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ============ WHATSAPP INTEGRATION ============
function inquireWhatsApp(productName, productId) {
  const message = `${CONFIG.whatsappMessage} ✦\n\n` +
    `Me interesa: *${productName}* 🎀\n` +
    `ID: #${productId}\n\n` +
    `¿Me puedes dar el precio y disponibilidad? 💕`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function contactWhatsApp() {
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  window.open(url, '_blank');
}

// ============ FILTERS ============
function setActiveFilter(category) {
  // Update filter buttons
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  // Update strip items
  stripItems.forEach(item => {
    item.classList.toggle('active', item.dataset.category === category);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.filter;
    setActiveFilter(category);
    renderProducts(category);
  });
});

stripItems.forEach(item => {
  item.addEventListener('click', () => {
    const category = item.dataset.category;
    setActiveFilter(category);
    renderProducts(category);

    // Scroll to catalog section on mobile
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
  });
});

// Global function for footer links
window.filterCategory = function(category) {
  setActiveFilter(category);
  renderProducts(category);
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
};

// ============ HEADER SCROLL ============
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add shadow class
  header.classList.toggle('scrolled', currentScroll > 50);

  // Scroll to top button
  scrollTopBtn.classList.toggle('visible', currentScroll > 500);

  lastScroll = currentScroll;
});

// ============ SCROLL TO TOP ============
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ MOBILE MENU ============
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('open');
  });
});

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ============ CONTACT WHATSAPP BTN ============
if (contactWhatsAppBtn) {
  contactWhatsAppBtn.addEventListener('click', contactWhatsApp);
}

// ============ SMOOTH SCROLL FOR NAV ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============ INIT ============
renderProducts('all');
