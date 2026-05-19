"use strict";

let currentProduct = null;
let productAdded = false;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    hero_subtitle: "Independent Visual Artist & Designer",
    about_seo: "I am a contemporary visual artist working between traditional oil painting and digital CG concept art. In my work I explore emotional identity, symbolic language and atmospheric storytelling. I create original artworks and limited releases for collectors and creative collaborations worldwide.",
    arts_seo: "These works include abstract oil paintings, experimental digital pieces and contemporary visual compositions. Each artwork reflects my balance between structure and emotion, fantasy and form.",
    store_seo: "In my store you can find original paintings, small-format works and limited releases. Each piece is created by me and available for collectors worldwide.",
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
    badge_limited: "Original",
    contact_title: "Contact",
    order_title: "Order request",
    send_tg: "Send via Telegram",
send_email: "Send via Email",
form_name: "Name",
form_email: "Email",
form_country: "Country",
form_message: "Message (optional)",
form_submit: "Send order request",
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
    form_name_ph:"Name",
    form_email_ph:"Email",
    form_msg_ph:"Message",
  },
  ru: {
    hero_subtitle: "Независимый художник и дизайнер",
    about_seo: "Я современный художник, работающий на стыке традиционной живописи и цифрового CG-арта. В своих работах я исследую эмоциональную идентичность, символику и атмосферное повествование. Я создаю оригинальные произведения и лимитированные работы для коллекционеров и творческих коллабораций по всему миру.",
    arts_seo: "Здесь собраны абстрактные живописные работы, экспериментальные цифровые произведения и современные визуальные композиции. В каждом произведении я ищу баланс между структурой и эмоцией, фантазией и формой.",
    store_seo: "В магазине представлены оригинальные работы, небольшие форматы и лимитированные релизы. Каждое произведение создано мной и доступно коллекционерам по всему миру.",
    nav_arts: "Арт",
    nav_projects: "Проекты",
    nav_about: "Обо мне",
    nav_store: "Магазин",
    nav_contact: "Контакты",
    arts_title: "Арт",
    projects_title: "Проекты",
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
    badge_limited: "Оригинал",
    contact_title: "Контакты",
    order_title: "Заказ",
    send_tg: "Через Telegram",
send_email: "Через Email",
    form_name: "Имя",
    form_email: "Email",
    form_country: "Страна",
    form_message: "Сообщение (необязательно)",
    form_submit: "Отправить запрос",
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
    form_name_ph:"Имя",
    form_email_ph:"Почта",
    form_msg_ph:"Сообщение",
  }
};




let currentLang;

const savedLang = localStorage.getItem("siteLang");

if (savedLang) {
  // если пользователь уже выбирал язык
  currentLang = savedLang;
} else {
  // первый заход — определяем по браузеру
  const browserLang = navigator.language || navigator.userLanguage;

  if (browserLang && browserLang.startsWith("ru")) {
    currentLang = "ru";
  } else {
    currentLang = "en";
  }
}




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
  const dict = i18n[currentLang];




  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });


  // Перевод placeholder
document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
  const key = el.dataset.i18nPlaceholder;
  el.placeholder = t(key);
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
   
const btn = document.getElementById("add-to-cart");

const exists = cart.some(i => i.id === card.dataset.id);

if (btn) {
  if (exists) {
    productAdded = true;
    btn.textContent =
      currentLang === "ru" ? "Открыть корзину" : "Open cart";
  } else {
    productAdded = false;
    btn.textContent =
      currentLang === "ru" ? "В корзину" : "Add to cart";
  }
}


    const d = card.dataset;
    // 🔹 жёсткий сброс галереи
img.src = "";
 //thumbs.innerHTML = ""; //

    document.getElementById("store-title").textContent =
      currentLang === "ru" ? d.titleRu : d.titleEn;

    document.getElementById("store-status").textContent =
      currentLang === "ru" ? d.statusRu : d.statusEn;

    document.getElementById("store-size").textContent =
      currentLang === "ru" ? d.sizeRu : d.sizeEn;

    document.getElementById("store-medium").textContent =
      currentLang === "ru" ? d.mediumRu : d.mediumEn;

      

    const priceEl = document.getElementById("store-price");

const basePrice = Number(d.priceEur);
const salePrice = Number(d.saleEur);

const format = (amount) =>
  currentLang === "ru"
    ? formatMoney(amount * FX_EUR_TO_RUB, "RUB")
    : formatMoney(amount, "EUR");

if (salePrice && salePrice < basePrice) {
  priceEl.innerHTML = `
    <div class="price-wrap">
      <span class="price-old">${format(basePrice)}</span>
      <span class="price-new">${format(salePrice)}</span>
    </div>
    <div class="price-note">
      ${currentLang === "ru"
       ? "Небольшая дырочка в холсте, аккуратно заклеена с обратной стороны"
       : "Small hole in the canvas, carefully repaired from the back and barely visible"}
    </div>
  `;
} else {
  priceEl.textContent = format(basePrice);
}

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

let currentIndex = 0;

if (imgs.length) {
  img.src = imgs[currentIndex];


  const prevBtn = panel.querySelector(".prev");
  const nextBtn = panel.querySelector(".next");

  if (imgs.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";

    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      img.src = imgs[currentIndex];
    };

    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % imgs.length;
      img.src = imgs[currentIndex];
    };
  }
}
// сброс состояния кнопки
const addToCartBtn = document.getElementById("add-to-cart");


if (addToCartBtn) {
  addToCartBtn.style.display = "inline-block";
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

document.addEventListener("DOMContentLoaded", () => {

  

  let checkoutMethod = "tg"; 

 document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;

    // сохраняем выбор
    localStorage.setItem("siteLang", currentLang);

    applyI18n();
  });
});



  applyI18n();

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function addToCart(item) {
    if (cart.some(i => i.id === item.id)) return;

    cart.push(item);
    saveCart();
    updateCartCounter();
  }

  // =========================
  // UPDATE COUNTER
  // =========================
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

  // =========================
  // CART ELEMENTS
  // =========================
  const cartModal = document.getElementById("cart-modal");
  const openCartBtn = document.getElementById("open-cart");
  const closeCartBtn = document.getElementById("close-cart");
  const clearCartBtn = document.getElementById("clear-cart");
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const addToCartBtn = document.getElementById("add-to-cart");
  const sendTgBtn = document.getElementById("send-tg");
  const sendEmailBtn = document.getElementById("send-email");

// =========================
// TELEGRAM (без формы)
// =========================
sendTgBtn?.addEventListener("click", () => {

  if (!cart.length) {
    alert(currentLang === "ru" ? "Корзина пуста" : "Cart is empty");
    return;
  }

  let orderText =
    currentLang === "ru"
      ? "Здравствуйте! Я хочу заказать:\n\n"
      : "Hello! I would like to order:\n\n";

  cart.forEach((item, i) => {
    orderText += `${i + 1}. ${item.title}\n`;
  });

  const total = cart.reduce((s, i) => s + i.price, 0);

  orderText +=
    currentLang === "ru"
      ? `\nИтого: €${total}`
      : `\nTotal: €${total}`;

  const tgUrl =
    `https://t.me/qekkel?text=${encodeURIComponent(orderText)}`;

  window.open(tgUrl, "_blank");

  // Закрываем корзину
  cartModal.classList.remove("open");
});

sendEmailBtn?.addEventListener("click", () => {
  checkoutMethod = "email";
  checkoutModal.hidden = false;
});

  // =========================
  // ADD BUTTON
  // =========================
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!currentProduct) return;

      if (!productAdded) {
        addToCart(currentProduct);

        addToCartBtn.textContent =
          currentLang === "ru" ? "Открыть корзину" : "Open cart";

        productAdded = true;
      } else {
        renderCart();
        cartModal.hidden = false;

        requestAnimationFrame(() => {
          cartModal.classList.add("open");
        });
      }
    });
  }

  // =========================
  // RENDER CART
  // =========================
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

     div.querySelector(".remove-btn").addEventListener("click", (e) => {
  e.stopPropagation();   // ← ВАЖНО
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
// =========================
// OPEN / CLOSE CART
// =========================

openCartBtn?.addEventListener("click", () => {
  renderCart();
  cartModal.hidden = false;
});

closeCartBtn?.addEventListener("click", () => {
  cartModal.hidden = true;
});

// Закрытие по клику вне содержимого
cartModal?.addEventListener("click", (e) => {
  if (!e.target.closest(".cart-content")) {
    cartModal.hidden = true;
  }
});

// Закрытие по ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cartModal.hidden = true;
  }
});
  // =====================
  // CHECKOUT
  // =========================

  const checkoutBtn = document.getElementById("checkout");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutClose = document.getElementById("checkout-close");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutSuccess = document.getElementById("checkout-success");

  checkoutBtn?.addEventListener("click", () => {
    if (!cart.length) {
      alert(currentLang === "ru" ? "Корзина пуста" : "Cart is empty");
      return;
    }

   checkoutForm.hidden = true;
checkoutSuccess.hidden = false;

cart = [];
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCounter();
renderCart();

// Через 1.5 секунды закрываем всё
setTimeout(() => {
  checkoutModal.hidden = true;
  cartModal.hidden = true;

  checkoutForm.hidden = false;
  checkoutSuccess.hidden = true;
}, 1500);

cart = [];
saveCart();
updateCartCounter();
renderCart();

    checkoutModal.hidden = false;
  });

  checkoutClose?.addEventListener("click", () => {
    checkoutModal.hidden = true;
  });

  checkoutModal?.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkout-overlay")) {
      checkoutModal.hidden = true;
    }
  });

  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(checkoutForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const country = formData.get("country");
    const message = formData.get("message");

    const orderId = "ORD-" + Date.now();

    let orderText =
      `New Order ${orderId}\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Country: ${country}\n\n`;

    cart.forEach((item, i) => {
      orderText += `${i + 1}. ${item.title} — €${item.price}\n`;
    });

    const total = cart.reduce((s, i) => s + i.price, 0);
    orderText += `\nTotal: €${total}\n\n`;
    orderText += `Message:\n${message}`;

   if (checkoutMethod === "tg") {
  const tgUrl =
    `https://t.me/qekkel?text=${encodeURIComponent(orderText)}`;
  window.open(tgUrl, "_blank");
}

if (checkoutMethod === "email") {
  const mailUrl =
    `mailto:your@email.com?subject=Artwork Order ${orderId}&body=${encodeURIComponent(orderText)}`;
  window.location.href = mailUrl;
}

    checkoutForm.hidden = true;
    checkoutSuccess.hidden = false;

    cart = [];
    saveCart();
    updateCartCounter();
    renderCart();
  });

  // =========================
  // INIT
  // =========================
  cartModal.hidden = true;
  updateCartCounter();

/* =========================
   CUSTOM CURSOR SMOOTH
========================= */

const cursor = document.querySelector(".custom-cursor");

if (cursor) {

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    cursor.style.left = posX + "px";
    cursor.style.top = posY + "px";

    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button")) {
      cursor.style.width = "28px";
      cursor.style.height = "28px";
      cursor.style.background = "rgba(255,255,255,0.3)";
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button")) {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      cursor.style.background = "rgba(255,255,255,0.9)";
    }
  });

  // 🔥 ВАЖНО: отдельно, не внутри другого события
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

}

});
/* =========================
   ARTS MODAL (opens all)
========================= */
(function () {
  const modal = document.getElementById("art-modal");
  const closeBtn = document.getElementById("art-close");
  const imgEl = document.getElementById("art-img");
  const titleEl = document.getElementById("art-title");
  const descEl = document.getElementById("art-desc");
  const metaEl = document.getElementById("art-meta");
  const processTitleEl = document.getElementById("art-process-title");
  const processListEl = document.getElementById("art-process-list");

  if (!modal || !imgEl || !titleEl || !descEl || !metaEl || !processTitleEl || !processListEl) return;

  const ARTS = {
art1: {
  titleEn: "Adventure Time in an alternate reality",
  titleRu: "Adventure Time в реальной реальности",
  year: "2023",
  mediumEn: "Animated GIF, Digital Illustration",
  mediumRu: "GIF, цифровая иллюстрация",
  descEn: "Cartoon characters placed into a reality that feels slightly too real",
  descRu: "ерои мультика помещены в реальность, которая кажется слишком уж реалистичной",
  process: {
    en: [
      "Adobe Photoshop",
    ],
    ru: [
      "Adobe Photoshop",
    ]
  }
},
  art2: {
    titleEn: "BMO",
    titleRu: "Бимо",
    year: "2023",
    mediumEn: "Digital Illustration",
    mediumRu: "Цифровая иллюстрация",
    descEn: "BMO Cross-Section: a tiny heart sleeping among the wires",
    descRu: "Бимо в разрезе: среди проводов можно заметить сладко спящее сердечко",
   process: {
    en: [
      "Adobe Photoshop",
    ],
    ru: [
      "Adobe Photoshop",
    ]
  }
  },

  art3: {
    titleEn: "Vampire Queen",
    titleRu: "Королева вампиров",
    year: "2025",
    mediumEn: "Animated GIF, Digital Illustration",
    mediumRu: "GIF, цифровая иллюстрация",
    descEn: "Marceline has spotted her next victim",
    descRu: "Марселин заметила новую жертву",
   process: {
    en: [
      "Procreate",
    ],
    ru: [
      "Procreate",
    ]
  }
  },

art4: {
  titleEn: "Over the Garden Wall",
  titleRu: "По ту сторону Изгороди",
  year: "2023",
  mediumEn: "Watercolor on Paper",
  mediumRu: "Акварель на бумаге",
  descEn: "Greg and Wirt preparing for Halloween",
  descRu: "Грег и Вирт готовятся к Хэллоуину",
  process: {
    en: [
      "Watercolor painting",
      "A5",
    ],
    ru: [
      "Акварельная живопись",
      "A5",
    ]
  }
},

art5: {
  titleEn: "Sagittarius",
  titleRu: "Стрелец",
  year: "2024",
  mediumEn: "Digital Illustration",
  mediumRu: "Цифровая иллюстрация",
  descEn: "Huntress releasing her arrow",
  descRu: "Охотница выпускает стрелу",
  process: {
    en: [
      "Adobe Photoshop"
    ],
    ru: [
      "Adobe Photoshop"
    ]
  }
},

art6: {
  titleEn: "Sing Street",
  titleRu: "Рок-н-рольщики",
  year: "2018",
  mediumEn: "Ink on Paper",
  mediumRu: "Тушь на бумаге",
  descEn: "Boys imagine their first song together",
  descRu: "Мальчики придумывают свою первую песню",
  process: {
    en: [
      "Ink drawing"
    ],
    ru: [
      "Рисунок тушью"
    ]
  }
},

art7: {
  titleEn: "Surreal Bouquet",
  titleRu: "Сюрреалистический букет",
  year: "2024",
  mediumEn: "Acrylic on Canvas",
  mediumRu: "Акрил на холсте",
  descEn: "Flowers growing from my hands",
  descRu: "Из рук моих вырастут цветы",
  process: {
    en: [
      "Acryl"
    ],
    ru: [
      "Акрил"
    ]
  }
},

art8: {
  titleEn: "Marceline",
  titleRu: "Марселин",
  year: "2023",
  mediumEn: "Oil on Canvas",
  mediumRu: "Масло на холсте",
  descEn: "A small tribute to Marcy – painted as a way of expressing my love for her.",
  descRu: "Небольшая дань Марси – картина, через которую я выражаю свою любовь к ней.",
  process: {
    en: [
      "Oil painting"
    ],
    ru: [
      "Живопись маслом"
    ]
  }
},

};

  function getLang() {
    return typeof currentLang === "string" ? currentLang : "en";
  }

  function openFromItem(item) {
    const id = item.dataset.artId;
    const img = item.querySelector("img");
    const src = img?.getAttribute("src") || "";
    const alt = img?.getAttribute("alt") || "";

    const L = getLang();
    const art = ARTS[id] || {};

    const title =
      (L === "ru" ? art.titleRu : art.titleEn) ||
      alt ||
      id ||
      "Artwork";

    titleEl.textContent = title;

    // meta
    const year = art.year ? String(art.year) : "";
    const medium = (L === "ru" ? art.mediumRu : art.mediumEn) || "";
    const meta = [year, medium].filter(Boolean).join(" • ");
    metaEl.textContent = meta;
    metaEl.style.display = meta ? "" : "none";

    // desc
    const desc = (L === "ru" ? art.descRu : art.descEn) || "";
    descEl.textContent = desc;
    descEl.style.display = desc ? "" : "none";

    // process
    processTitleEl.textContent = L === "ru" ? "Техника" : "Medium";
    processListEl.innerHTML = "";
    const steps = (art.process && (L === "ru" ? art.process.ru : art.process.en)) || [];

    if (steps.length) {
      steps.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        processListEl.appendChild(li);
      });
      processListEl.parentElement.style.display = "";
    } else {
      processListEl.parentElement.style.display = "none";
    }

    // image
    imgEl.src = src || art.image || "";
    imgEl.alt = title;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeArt() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".art-item[data-art-id]").forEach(item => {
    item.addEventListener("click", () => openFromItem(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFromItem(item);
      }
    });
  });

  closeBtn?.addEventListener("click", closeArt);
  modal.addEventListener("click", e => { if (e.target === modal) closeArt(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeArt(); });
})();


// === PROJECT MODAL ===
(function () {
  const overlay  = document.getElementById('project-modal');
  if (!overlay) return;
  const closeBtn = document.getElementById('project-close');
  const mainImg  = document.getElementById('project-modal-img');
  const thumbsEl = document.getElementById('project-modal-thumbs');
  const titleEl  = document.getElementById('project-modal-title');
  const descEl   = document.getElementById('project-modal-desc');
  const catEl    = document.getElementById('project-modal-category');
  const metaEl   = document.getElementById('project-modal-meta');
  const tagsEl   = document.getElementById('project-modal-tags');
  const numEl    = document.getElementById('project-modal-num');
  const prevBtn  = document.getElementById('project-prev');
  const nextBtn  = document.getElementById('project-next');

  const cards = Array.from(document.querySelectorAll('.project-card'));
  let currentCardIndex = 0;
  let images = [];

  function getLang() {
    return (typeof currentLang === 'string' ? currentLang : 'en');
  }

  function setThumb(i) {
    mainImg.src = images[i];
    thumbsEl.querySelectorAll('.pm-thumb').forEach((t, idx) => {
      t.classList.toggle('active', idx === i);
    });
  }

  function openModal(cardIndex) {
    currentCardIndex = cardIndex;
    const card = cards[cardIndex];
    const lang = getLang();
    const isRu = lang === 'ru';

    images = (card.dataset.images || card.dataset.img || '').split(',').map(s => s.trim()).filter(Boolean);

    mainImg.src = images[0] || '';
    mainImg.alt = (isRu ? card.dataset.titleRu : card.dataset.titleEn) || '';
    titleEl.textContent = (isRu ? card.dataset.titleRu : card.dataset.titleEn) || '';
    descEl.textContent  = (isRu ? card.dataset.descRu  : card.dataset.descEn)  || '';
    catEl.textContent   = (isRu ? card.dataset.categoryRu : card.dataset.categoryEn) || '';

    // thumbnails
    thumbsEl.innerHTML = '';
    images.forEach((src, i) => {
      const d = document.createElement('div');
      d.className = 'pm-thumb' + (i === 0 ? ' active' : '');
      d.innerHTML = '<img src="' + src + '" alt="">';
      d.addEventListener('click', () => setThumb(i));
      thumbsEl.appendChild(d);
    });

    // meta rows
    const metaRaw = (isRu ? card.dataset.metaRu : card.dataset.metaEn) || '';
    const metaParts = metaRaw.split('|');
    metaEl.innerHTML = '';
    for (let i = 0; i < metaParts.length; i += 2) {
      if (!metaParts[i]) continue;
      const row = document.createElement('div');
      row.className = 'pm-meta-row';
      row.innerHTML = '<span class="pm-meta-label">' + metaParts[i] + '</span><span class="pm-meta-value">' + (metaParts[i+1] || '') + '</span>';
      metaEl.appendChild(row);
    }

    // tags
    const tags = (card.dataset.tags || '').split(',').map(s => s.trim()).filter(Boolean);
    tagsEl.innerHTML = tags.map(t => '<span class="pm-tag">' + t + '</span>').join('');

    // counter
    const n = String(cardIndex + 1).padStart(2, '0');
    const total = String(cards.length).padStart(2, '0');
    numEl.textContent = n + ' / ' + total;

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  cards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => openModal(i));
  });

  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') openModal((currentCardIndex + 1) % cards.length);
    if (e.key === 'ArrowLeft')  openModal((currentCardIndex - 1 + cards.length) % cards.length);
  });

  prevBtn && prevBtn.addEventListener('click', () => openModal((currentCardIndex - 1 + cards.length) % cards.length));
  nextBtn && nextBtn.addEventListener('click', () => openModal((currentCardIndex + 1) % cards.length));
})();

if (typeof window.gtag === "function") {
  gtag("event", "add_to_cart", {
    currency: "EUR",
    value: currentProduct?.price || 0,
    items: [{ item_name: currentProduct?.title || "unknown" }]
  });
}