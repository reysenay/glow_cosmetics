const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const feeds = [
    { file: "/tmp/sokoglam_products.json", store: "Soko Glam" },
    { file: "/tmp/peachandlily_products.json", store: "Peach & Lily" },
    { file: "/tmp/boj_products.json", store: "Beauty of Joseon" }
];

function cleanText(html) {
    return String(html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
}

function categoryFor(product) {
    const text = (product.product_type + " " + product.title + " " + product.tags.join(" ")).toLowerCase();

    if (text.includes("cleanser") || text.includes("cleansing")) return "Cleansers";
    if (text.includes("toner") || text.includes("essence")) return "Toners & Essences";
    if (text.includes("serum") || text.includes("ampoule") || text.includes("treatment")) return "Serums";
    if (text.includes("cream") || text.includes("moisturizer") || text.includes("balm")) return "Moisturizers";
    if (text.includes("sunscreen") || text.includes("spf") || text.includes("sun")) return "Sun Care";
    if (text.includes("mask") || text.includes("peel")) return "Masks";
    if (text.includes("set") || text.includes("kit") || text.includes("duo")) return "Sets";
    if (text.includes("tool") || text.includes("device") || text.includes("brush")) return "Tools";
    if (text.includes("body") || text.includes("hair") || text.includes("oil")) return "Body & Hair";

    return "K-Beauty";
}

function detailFor(product, category, brand, source) {
    const details = {
        "Tools": "This beauty tool is designed for at-home skincare routines. It supports a more polished routine by making application or treatment steps easier and more practical.",
        "Toners & Essences": "This toner or essence prepares the skin before serum and moisturizer. It is suitable for a daily routine because it focuses on hydration, comfort, and a fresh skin feeling.",
        "Serums": "This serum targets a specific skincare need with a concentrated texture. It works well between toner and moisturizer for customers who want a stronger routine step.",
        "Moisturizers": "This moisturizer helps complete the skincare routine by sealing in hydration. It is a good choice for customers who want softer, smoother, and more comfortable skin.",
        "Sun Care": "This sun care product is made for daily protection and a healthy glow. It fits morning routines and helps the customer keep skincare consistent during the day.",
        "Masks": "This mask is a focused care product for special routine days. It gives the customer an easy spa-like step for hydration, soothing, or refreshed-looking skin.",
        "Sets": "This set brings multiple routine steps together in one package. It is useful for customers who want to try a complete routine or buy a gift-ready beauty selection.",
        "Cleansers": "This cleanser is used as the first step of the skincare routine. It helps remove daily buildup while keeping the skin feeling clean, balanced, and ready for the next steps.",
        "Body & Hair": "This body and hair product extends the beauty routine beyond facial skincare. It is selected for customers who enjoy fragrance, softness, and everyday self-care.",
        "K-Beauty": "This K-beauty product adds a trend-focused step to the catalogue. It is chosen for customers who like modern Korean beauty formulas and visually appealing products."
    };

    return details[category] + " Brand: " + brand + ". Source catalogue: " + source + ".";
}

function priceFor(product, index) {
    const variant = product.variants && product.variants[0];
    const rawPrice = variant ? Number(variant.price) : 0;

    if (rawPrice > 0) {
        return Math.round(rawPrice * 35);
    }

    return 280 + ((index * 43) % 900);
}

function firstImage(product) {
    if (product.images && product.images[0] && product.images[0].src) {
        return product.images[0].src;
    }

    if (product.image && product.image.src) {
        return product.image.src;
    }

    return "";
}

function loadProducts() {
    const catalog = [];
    const seen = new Set();

    feeds.forEach(function(feed) {
        const data = JSON.parse(fs.readFileSync(feed.file, "utf8"));
        const products = data.products || [];

        products.forEach(function(product) {
            const image = firstImage(product);

            if (!image || seen.has(product.handle)) {
                return;
            }

            const title = product.title.trim();
            const brand = product.vendor || feed.store;
            const category = categoryFor(product);
            const description = cleanText(product.body_html).slice(0, 135);

            catalog.push({
                id: "gc-" + String(catalog.length + 1).padStart(3, "0"),
                name: brand + " - " + title,
                brand: brand,
                category: category,
                price: priceFor(product, catalog.length + 1),
                image: image,
                description: description || "A real K-beauty product with matching product name and image.",
                details: detailFor(product, category, brand, feed.store),
                source: feed.store
            });

            seen.add(product.handle);
        });
    });

    return catalog.slice(0, 104);
}

function tableRows(products) {
    return products.slice(0, 8).map(function(product) {
        return `        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price} TL</td>
        </tr>`;
    }).join("\n");
}

function imageGallery(products) {
    return products.slice(0, 4).map(function(product) {
        return `        <figure>
            <img src="${product.image}" alt="${product.name}" width="260">
            <figcaption>${product.name}</figcaption>
        </figure>`;
    }).join("\n");
}

function productList(products, icon) {
    return products.slice(0, 8).map(function(product) {
        const iconHtml = icon ? '<i class="fa-solid fa-bag-shopping"></i> ' : "";
        return `        <li>${iconHtml}${product.name} - ${product.category}</li>`;
    }).join("\n");
}

function writeStage2(products) {
    fs.writeFileSync(path.join(root, "stage2", "index.html"), `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glow Cosmetics - Stage 2</title>
</head>
<body>
    <!--
        STAGE 2 - Skeleton (HTML Only)
        Bu dosyada sadece HTML etiketleri kullanıldı.
        Aynı gerçek K-beauty kataloğunun en sade hali burada gösterilir.
    -->
    <h1>Glow Cosmetics</h1>

    <p>
        Glow Cosmetics is a K-beauty inspired store with real product names,
        matching product images, and a consistent catalogue across all stages.
    </p>

    <h2>Navigation</h2>
    <ul>
        <li><a href="../index.html">Project Landing Page</a></li>
        <li><a href="../stage3/index.html">Stage 3</a></li>
        <li><a href="../stage4/index.html">Stage 4</a></li>
        <li><a href="../stage5/index.html">Stage 5</a></li>
        <li><a href="../stage6/index.html">Stage 6</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#prices">Prices</a></li>
    </ul>

    <h2>Product Images</h2>
${imageGallery(products)}

    <h2 id="products">Featured Products</h2>
    <ul>
${productList(products, false)}
    </ul>

    <h2 id="prices">Product Prices</h2>
    <table border="1">
        <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
        </tr>
${tableRows(products)}
    </table>

    <h2>Business Information</h2>
    <p>Business Type: Beauty &amp; K-Beauty Store</p>
    <p>Total Catalogue Size: ${products.length} products</p>
    <p>Email: glowcosmetics@example.com</p>
</body>
</html>
`);
}

function writeStage3(products) {
    fs.writeFileSync(path.join(root, "stage3", "index.html"), `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glow Cosmetics - Stage 3</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <!--
        STAGE 3 - Colors and Typography
        Stage 2 içeriği korundu; sadece font, renk ve ikon eklendi.
        Bu aşamada kutu boşluğu özellikleri kullanılmaz.
    -->
    <h1><i class="fa-solid fa-sparkles"></i> Glow Cosmetics</h1>

    <p>Glow Cosmetics is a K-beauty inspired store with matched product names and images.</p>

    <h2>Navigation</h2>
    <ul>
        <li><a href="../index.html">Project Landing Page</a></li>
        <li><a href="../stage2/index.html">Stage 2</a></li>
        <li><a href="../stage4/index.html">Stage 4</a></li>
        <li><a href="../stage5/index.html">Stage 5</a></li>
        <li><a href="../stage6/index.html">Stage 6</a></li>
    </ul>

    <h2>Product Images</h2>
${imageGallery(products)}

    <h2 id="products">Featured Products</h2>
    <ul>
${productList(products, true)}
    </ul>

    <h2 id="prices">Product Prices</h2>
    <table border="1">
        <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
        </tr>
${tableRows(products)}
    </table>
</body>
</html>
`);
}

function writeStage4(products) {
    fs.writeFileSync(path.join(root, "stage4", "index.html"), `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glow Cosmetics - Stage 4</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <!--
        STAGE 4 - Box Model Integration
        Stage 3 ile aynı katalog kullanılır.
        Bu aşamada margin, padding ve border ile daha ferah bir görünüm verilir.
    -->
    <header>
        <h1><i class="fa-solid fa-sparkles"></i> Glow Cosmetics</h1>
        <p>Professional K-beauty catalogue with matched names, categories, and product images.</p>
    </header>

    <nav>
        <a href="../index.html">Landing</a>
        <a href="../stage2/index.html">Stage 2</a>
        <a href="../stage3/index.html">Stage 3</a>
        <a href="../stage5/index.html">Stage 5</a>
        <a href="../stage6/index.html">Stage 6</a>
    </nav>

    <main>
        <section>
            <h2>Product Images</h2>
${imageGallery(products)}
        </section>

        <section id="products">
            <h2>Featured Products</h2>
            <ul>
${productList(products, true)}
            </ul>
        </section>

        <section id="prices">
            <h2>Product Prices</h2>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
${tableRows(products)}
            </table>
        </section>
    </main>
</body>
</html>
`);
}

function productCard(product) {
    return `                <article class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <p class="category-name">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>${product.price} TL</strong>
                </article>`;
}

function writeStage5(products) {
    const categories = Array.from(new Set(products.map(function(product) {
        return product.category;
    })));

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
        Aynı gerçek ürün kataloğu artık CSS Grid ile 104 ürün olarak gösterilir.
    -->
    <header class="site-header">
        <a href="../index.html" class="back-link">Project Landing</a>
        <h1>Glow Cosmetics</h1>
        <p>K-beauty catalogue with ${products.length} real products and matching product images.</p>
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
${products.map(productCard).join("\n")}
            </div>
        </section>
    </main>
</body>
</html>
`);
}

function writeProductsJs(products) {
    fs.writeFileSync(path.join(root, "stage6", "products.js"), `/*
    Product data for Stage 6.
    Bu dosyada gerçek ürün adı ve kendi gerçek görseli birlikte tutulur.
    script.js bu listeyi okuyarak ürün kartlarını, detay penceresini ve sepeti oluşturur.
*/

const products = ${JSON.stringify(products, null, 4)};
`);
}

function main() {
    const products = loadProducts();

    writeStage2(products);
    writeStage3(products);
    writeStage4(products);
    writeStage5(products);
    writeProductsJs(products);

    console.log("K-beauty catalogue generated:", products.length);
}

main();
