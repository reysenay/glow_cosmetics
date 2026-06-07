const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

const jsonFiles = [
    "/tmp/commons_lipstick.json",
    "/tmp/commons_cosmetics.json",
    "/tmp/commons_skincare.json",
    "/tmp/commons_makeup.json",
    "/tmp/commons_containers.json",
    "/tmp/commons_hair.json"
];

const includeWords = [
    "lipstick",
    "lipsticks",
    "batons",
    "batom",
    "collistar",
    "bouteille",
    "burt",
    "salve",
    "lotion",
    "bryltonic",
    "avoskin",
    "black soap",
    "augencreme",
    "augenpads",
    "active gel",
    "bodysprays",
    "wardah",
    "cream",
    "retinol",
    "clarins",
    "cosmetic jar",
    "skin care products",
    "royalcos",
    "nivea",
    "eyelash tonic",
    "hair mousse",
    "conditioner",
    "hair products",
    "pomade",
    "body care",
    "shampoo"
];

const excludeWords = [
    "woman",
    "person",
    "clinic",
    "treatment",
    "laser",
    "production",
    "machine",
    "circus",
    "soldat",
    "performer",
    "museum",
    "infographic",
    "lobby",
    "salon",
    "street"
];

function readProducts() {
    const code = fs.readFileSync(path.join(root, "stage6", "products.js"), "utf8");
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(code + "\nthis.products = products;", sandbox);
    return sandbox.products;
}

function collectUrls() {
    const selected = [];

    jsonFiles.forEach(function(file) {
        if (!fs.existsSync(file)) {
            return;
        }

        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        const pages = Object.values((data.query && data.query.pages) || {});

        pages.forEach(function(page) {
            const title = page.title || "";
            const url = page.imageinfo && page.imageinfo[0] && page.imageinfo[0].url;

            if (!url || !/\.(jpe?g|png|webp)$/i.test(url)) {
                return;
            }

            const text = title.toLowerCase();
            const wanted = includeWords.some(function(word) {
                return text.includes(word);
            });
            const unwanted = excludeWords.some(function(word) {
                return text.includes(word);
            });

            if (wanted && !unwanted) {
                selected.push(url);
            }
        });
    });

    return Array.from(new Set(selected));
}

function updateStage5(products) {
    const categories = Array.from(new Set(products.map(function(product) {
        return product.category;
    })));

    const cards = products.map(function(product) {
        return `                <article class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <p class="category-name">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>${product.price} TL</strong>
                </article>`;
    }).join("\n");

    fs.writeFileSync(path.join(root, "stage5", "index.html"), `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glow Cosmetics - Stage 5</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <!--
        STAGE 5 - CSS Grid Layout
        Bu sayfa JavaScript kullanmadan 100+ ürünü grid yapısında gösterir.
        Ürün görselleri internetten, Wikimedia Commons görsel URL'lerinden çekilir.
    -->
    <header class="site-header">
        <a href="../index.html" class="back-link">Project Landing</a>
        <h1>Glow Cosmetics</h1>
        <p>Beauty store catalogue with ${products.length} products and product images loaded from the internet.</p>
    </header>

    <main class="catalog-layout">
        <aside class="sidebar">
            <h2>Categories</h2>
            <ul>
                ${categories.map(function(category) {
                    return `<li>${category}</li>`;
                }).join("\n                ")}
            </ul>
        </aside>

        <section class="catalog-section" id="products">
            <div class="section-title">
                <h2>Product Catalogue</h2>
                <p>${products.length} products shown with CSS Grid.</p>
            </div>
            <div class="product-grid">
${cards}
            </div>
        </section>
    </main>
</body>
</html>
`);
}

const products = readProducts();
const urls = collectUrls();

products.forEach(function(product, index) {
    product.image = urls[index % urls.length];
});

fs.writeFileSync(
    path.join(root, "stage6", "products.js"),
    `/*
    Product data for Stage 6.
    Bu dosyada ürün bilgileri liste halinde tutulur.
    script.js bu listeyi okuyarak ürün kartlarını, detay penceresini ve sepeti oluşturur.
*/

const products = ${JSON.stringify(products, null, 4)};
`
);

updateStage5(products);
console.log("External image URLs used:", urls.length);
