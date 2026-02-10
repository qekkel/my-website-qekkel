"use strict";

let currentProduct = null;

/* =========================
   BASIC PAGE LOAD
========================= */
window.addEventListener("load", () => {
  document.body.classList.remove("is-preload");
  document.body.classList.add("bg-loaded");
  revealSections();
});

/* =========================
   REVEAL SECTIONS ON SCROLL
========================= */
const sections = document.querySelectorAll(".section");

function revealSections() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.88;

    section.classList.toggle("visible", visible);

 if (section.id === "about" && visible) {
  document.body.classList.add("about-active");
}
  });
}

window.addEventListener("scroll", revealSections, { passive: true });
window.addEventListener("resize", revealSections);

/* =========================
   HEADER SCROLL STATE
========================= */
(function () {
  const header = document.getElementById("header");
  if (!header) return;

  function onScroll() {
    const cut = header.offsetHeight * 0.35;
    document.body.classList.toggle("scrolled", window.scrollY > cut);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* =========================
   i18n + Currency
========================= */
const FX_EUR_TO_RUB = 100;

const i18n = {
  en: {
    hero_subtitle: "Artist portfolio",
    nav_arts: "Arts",
    nav_projects: "Projects",
    nav_about: "About",
    nav_store: "Store",
    nav_contact: "Contact",
    arts_title: "Arts",
    projects_title: "Projects",
   proj1_title: "Bloody Mary Stickers",
proj1_desc: "Bar sticker set with BDSM undertones, reflecting the bar’s unique identity.",

proj2_title: "Mushroom House – CG Concept",
proj2_desc: "Student CG project: cozy home of a mushroom gatherer in a stylized forest world.",

proj3_title: "‘Pole’ – Single Cover",
proj3_desc: "Cover art for Khmyrov’s music single ‘Pole’, visualizing sonic solitude.",

proj4_title: "Pastrama Mama Logo",
proj4_desc: "Logo design for a cozy café with a warm and modern visual identity.",
    about_title: "About",
    about_lead: "Hello, I’m Olga",
  about_text: [
    "Hello, I’m Olga",
    "I create visual worlds that live between fantasy and function.",
    { accent: "Atmosphere. Depth. Presence." },
    "Through painting, CG, and visual design, I explore emotional identity and symbolic communication.",
    "Open to collaborations with brands and artists who care about meaning and aesthetics.",
    "Based between Europe and Russia. Working worldwide."
  ],
    about_cta: "Contact",
    about_tags: [
      "Limited Drops",
    "CG Art",
    "Pixel Art",
 ],
    store_title: "Store",
    store_lead: "Original pieces, postcards, and limited drops.",
    badge_limited: "Limited",
    contact_title: "Contact",
    modal_price: "Price:",
    modal_size: "Size:",
    modal_medium: "Medium:",
    modal_inquire: "Inquire",
    form_ok: "Thanks! Your message was sent.",
    form_err: "Something went wrong. Try again.",
    cart_total: "Total:",
    cart_checkout: "Checkout",
    cart_title: "Your cart",
    cart_empty: "Cart is empty",
    cart: "Cart",
  },
  ru: {
    hero_subtitle: "Портфолио художника",
    nav_arts: "Арт",
    nav_projects: "Проекты",
    nav_about: "Обо мне",
    nav_store: "Магазин",
    nav_contact: "Контакты",
    arts_title: "Арт",
    // Русский
proj1_title: "Стикеры Bloody Mary",
proj1_desc: "Стикер-пак для бара с нотками БДСМ, отражающий уникальную атмосферу заведения.",

proj2_title: "Дом грибника – CG проект",
proj2_desc: "Учебный CG-проект: уютный домик грибника в стилизованном лесу.",

proj3_title: "«Поле» – обложка сингла",
proj3_desc: "Обложка для музыкального сингла Хмырова «Поле», визуализация звукового одиночества.",

proj4_title: "Логотип Pastrama Mama",
proj4_desc: "Разработка логотипа для уютного кафе с современной визуальной айдентикой.",
    about_title: "Обо мне",
    about_lead: "Привет! Я Ольга",
  about_text: [
    "Привет! Я Ольга",
    "Создаю визуальные миры на грани фантазии и функции.",
    { accent: "Атмосфера. Глубина. Присутствие." },
    "Через живопись, CG и визуальный дизайн исследую эмоциональную идентичность и символику.",
    "Открыта к сотрудничеству с брендами и художниками, которым важны смысл и эстетика.",
    "Между Европой и Россией. Работаю по всему миру."
  ],
    about_cta: "Связаться",
    store_title: "Магазин",
    store_lead: "Оригиналы, открытки и лимитированные дропы.",
    badge_limited: "Лимит",
    contact_title: "Контакты",
    modal_price: "Цена:",
    modal_size: "Размер:",
    modal_medium: "Техника:",
    modal_inquire: "Спросить",
    form_ok: "Спасибо! Сообщение отправлено.",
    form_err: "Ошибка. Попробуй ещё раз.",
    cart_total: "Итого:",
    cart_checkout: "Оформить заказ",
    cart_title: "Ваша корзина",
    cart_empty: "Корзина пуста",
    cart: "Корзина",
  }
};


let currentLang = "en";

function t(key) {
  return i18n[currentLang]?.[key] || key;
}

function formatMoney(amount, currency) {
  return new Intl.NumberFormat(
    currentLang === "ru" ? "ru-RU" : "en-GB",
    { style: "currency", currency, maximumFractionDigits: 0 }
  ).format(amount);
}

function applyI18n() {

  document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    applyI18n();
  });
});

  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });


  

 // ===== ABOUT TEXT (array → paragraphs) =====
const aboutContainer = document.getElementById("about-text");

if (aboutContainer) {
  const lines = t("about_text");

  if (Array.isArray(lines)) {
    aboutContainer.innerHTML = lines
      .map(item => {

        if (typeof item === "string") {
          return `<p>${item}</p>`;
        }

        if (typeof item === "object" && item.accent) {
          return `<p><span class="about-accent">${item.accent}</span></p>`;
        }

        return "";
      })
      .join("");
  }
}

  document.querySelectorAll(".store-card").forEach(card => {
    const title = card.querySelector(".store-title");
    if (!title) return;
    title.textContent =
      currentLang === "ru"
        ? card.dataset.titleRu || title.textContent
        : card.dataset.titleEn || title.textContent;
  });

  document.querySelectorAll("[data-price]").forEach(el => {
    const card = el.closest(".store-card");
    const eur = Number(card?.dataset?.priceEur || 0);
    el.textContent =
      currentLang === "ru"
        ? formatMoney(eur * FX_EUR_TO_RUB, "RUB")
        : formatMoney(eur, "EUR");
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === currentLang);
  });

  // ✅ ВОТ ЗДЕСЬ
  if (typeof renderCart === "function") {
    renderCart();
  }
}



/* =========================
   STORE MODAL + GALLERY
========================= */
(function () {
  const panel = document.getElementById("store-listing");
  const img = document.getElementById("store-img");
  const thumbs = document.getElementById("store-thumbs");
  const media = document.getElementById("store-media");
  const closeBtn = document.getElementById("store-close");

  if (!panel || !img || !thumbs || !media) return;


  
  function open(card) {
    const d = card.dataset;
    // 🔹 жёсткий сброс галереи
img.src = "";
thumbs.innerHTML = "";

    document.getElementById("store-title").textContent =
      currentLang === "ru" ? d.titleRu : d.titleEn;

    document.getElementById("store-status").textContent =
      currentLang === "ru" ? d.statusRu : d.statusEn;

    document.getElementById("store-size").textContent =
      currentLang === "ru" ? d.sizeRu : d.sizeEn;

    document.getElementById("store-medium").textContent =
      currentLang === "ru" ? d.mediumRu : d.mediumEn;

    document.getElementById("store-price").textContent =
      currentLang === "ru"
        ? formatMoney(d.priceEur * FX_EUR_TO_RUB, "RUB")
        : formatMoney(d.priceEur, "EUR");

        currentProduct = {
  id: d.id,
  title: currentLang === "ru" ? d.titleRu : d.titleEn,
  price: Number(d.priceEur),
  img: (d.img || "").split(",")[0]
};

  // ===== EXTRA ARTWORKS =====
const extrasWrap = document.getElementById("store-extras");
const extrasGrid = extrasWrap?.querySelector(".store-extras-grid");

if (extrasWrap && extrasGrid) {
  extrasGrid.innerHTML = "";

  const extras = (d.extras || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  if (extras.length) {
    extrasWrap.hidden = false;

    extras.forEach(src => {
      const imgEl = document.createElement("img");
      imgEl.src = src;
      imgEl.alt = "Extra artwork";

      // клик → показать в большом изображении
    imgEl.addEventListener("click", () => {
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = src;
    img.style.opacity = 1;

    // 🔹 полностью сбрасываем активные thumbs
    thumbs.querySelectorAll("button")
      .forEach(b => b.classList.remove("active"));
  }, 150);
});

      extrasGrid.appendChild(imgEl);
    });
  } else {
    extrasWrap.hidden = true;
  }
}


    thumbs.innerHTML = "";

    const imgs = (d.imgs || d.img || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (imgs.length) {
      img.src = imgs[0];
      const zoomWrap = img.closest(".zoom-wrap");
enableHoverZoom(zoomWrap, img, 2.2);
      imgs.forEach((src, i) => {
        const b = document.createElement("button");
        const t = document.createElement("img");
        t.src = src;
        b.appendChild(t);
        if (i === 0) b.classList.add("active");

        b.onclick = () => {
          img.src = src;
          thumbs.querySelectorAll("button").forEach(x => x.classList.remove("active"));
          b.classList.add("active");
        };

        thumbs.appendChild(b);
      });
    }

    panel.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    panel.hidden = true;
    document.body.style.overflow = "";
  }

 document.querySelectorAll(".store-card").forEach(card => {
  card.addEventListener("click", () => open(card));
});

  closeBtn?.addEventListener("click", close);
  panel.addEventListener("click", e => e.target === panel && close());
  document.addEventListener("keydown", e => e.key === "Escape" && !panel.hidden && close());




})();

/* =========================
   CONTACT FORM (Formspree)
========================= */
(function () {
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (!form || !note) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    note.textContent = "";

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      note.textContent = res.ok ? t("form_ok") : t("form_err");
      if (res.ok) form.reset();
    } catch {
      note.textContent = t("form_err");
    }
  });
})();

/* =========================
   FOOTER YEAR
========================= */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();



/* ===== IMAGE HOVER ZOOM ===== */
function enableHoverZoom(container, img, scale = 2) {
  if (!container || !img) return;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = `scale(${scale})`;
  });

  container.addEventListener("mouseleave", () => {
    img.style.transformOrigin = "50% 50%";
    img.style.transform = "scale(1)";
  });
}


document.addEventListener("DOMContentLoaded", () => {
    applyI18n();   // ← ВОТ ЗДЕСЬ
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

 function updateCartCounter() {
  const counters = document.querySelectorAll(".cart-count");

  counters.forEach(c => {
    c.textContent = cart.length;
    c.classList.add("bump");

    setTimeout(() => {
      c.classList.remove("bump");
    }, 300);
  });
}
  function addToCart(item) {
    // Проверка на дубликат
    if (cart.some(i => i.title === item.title)) return;
    cart.push(item);
    saveCart();
    updateCartCounter();
    if (addToCartBtn) {
  addToCartBtn.classList.add("added");

  setTimeout(() => {
    addToCartBtn.classList.remove("added");
  }, 1200);
}

setTimeout(() => {
  addToCartBtn.classList.remove("added");
}, 1200);
  }

 const checkoutBtn = document.getElementById("checkout");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
      alert("Корзина пуста");
      return;
    }
let message =
  currentLang === "ru"
    ? "Здравствуйте!\nХочу заказать:\n"
    : "Hello!\nI'd like to order:\n";

cart.forEach((item, i) => {
  message += `${i + 1}. ${item.title} — €${item.price}\n`;
});

const total = cart.reduce((s, i) => s + i.price, 0);
message += `\nИтого: €${total}`;

const telegramUsername = "qekkel"; // твой username
const url =
  `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;

window.open(url, "_blank");
  });
}




  // ======= Добавление из модалки товара
 const addToCartBtn = document.getElementById("add-to-cart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", (e) => {
    e.stopPropagation();   // ← ВАЖНО
    if (!currentProduct) return;
    addToCart(currentProduct);
    document.getElementById("store-listing").hidden = true;
document.body.style.overflow = "";
  });
}

  // ======= КОРЗИНА
const cartModal = document.getElementById("cart-modal");
const openCartBtn = document.getElementById("open-cart");
const closeCartBtn = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const priceFormatted =
      currentLang === "ru"
        ? formatMoney(item.price * FX_EUR_TO_RUB, "RUB")
        : formatMoney(item.price, "EUR");

    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-item-details">
        <strong>${item.title}</strong>
        <div>${priceFormatted}</div>
      </div>
      <button class="remove-btn">×</button>
    `;

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartItemsEl.appendChild(div);
    total += item.price;
  });

  const totalFormatted =
    currentLang === "ru"
      ? formatMoney(total * FX_EUR_TO_RUB, "RUB")
      : formatMoney(total, "EUR");

  cartTotalEl.textContent = totalFormatted;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCounter();
}

openCartBtn?.addEventListener("click", () => {
  renderCart();
  cartModal.hidden = false;
  requestAnimationFrame(() => {
    cartModal.classList.add("open");
  });
});

closeCartBtn?.addEventListener("click", () => {
  cartModal.classList.remove("open");
  setTimeout(() => {
    cartModal.hidden = true;
  }, 250);
});

cartModal?.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove("open");
    setTimeout(() => {
      cartModal.hidden = true;
    }, 250);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !cartModal.hidden) {
    cartModal.classList.remove("open");
    setTimeout(() => {
      cartModal.hidden = true;
    }, 250);
  }
});

clearCartBtn?.addEventListener("click", () => {
  if (confirm("Очистить корзину?")) {
    cart = [];
    saveCart();
    renderCart();
    updateCartCounter();
  }
});

  // при загрузке
  cartModal.hidden = true;
  updateCartCounter();

  console.log("END REACHED");
});