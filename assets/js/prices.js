// ===== ЦЕНЫ =====
// Чтобы изменить цены — редактируй только этот файл.
// sale — цена со скидкой (если есть).

var PRICES = {
  'aerial':          { price: 240 },
  'sakura':          { price: 70 },
  'sakura-ii':       { price: 70 },
  'spring-park':     { price: 70 },
  'siesta':          { price: 130 },
  'surreal-bouquet': { price: 175, sale: 150 },
  'tropical-vortex': { price: 180 }
};

// Маппинг data-id -> slug (для страниц store.html и index.html)
var PRICE_ID_MAP = {
  'original-01': 'aerial',
  'original-02': 'surreal-bouquet',
  'original-03': 'tropical-vortex',
  'original-04': 'siesta',
  'original-05': 'sakura',
  'original-06': 'spring-park',
  'original-07': 'sakura-ii'
};

(function () {
  function applyPrice(card, p) {
    if (!p) return;
    card.dataset.priceEur = p.price;
    if (p.sale !== undefined) {
      card.dataset.saleEur = p.sale;
    }
  }

  function updateJsonLd(price) {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (tag) {
      try {
        var ld = JSON.parse(tag.textContent);
        var nodes = ld['@graph'] ? ld['@graph'] : [ld];
        var changed = false;
        nodes.forEach(function (node) {
          if (node.offers) {
            var offers = Array.isArray(node.offers) ? node.offers : [node.offers];
            offers.forEach(function (o) {
              if (o.price !== undefined) { o.price = String(price); changed = true; }
            });
          }
        });
        if (changed) tag.textContent = JSON.stringify(ld['@graph'] ? ld : nodes[0]);
      } catch (e) {}
    });
  }

  var slug = window.location.pathname.split('/').filter(Boolean).pop();
  if (slug) slug = slug.replace('.html', '');
  var p = PRICES[slug];
  if (p) {
    var card = document.querySelector('.store-card');
    if (card) applyPrice(card, p);
    updateJsonLd(p.price);
    return;
  }

  document.querySelectorAll('.store-card[data-id]').forEach(function (card) {
    var productSlug = PRICE_ID_MAP[card.dataset.id];
    applyPrice(card, PRICES[productSlug]);
  });
})();
