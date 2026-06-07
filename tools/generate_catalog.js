const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const productDir = path.join(root, "assets", "products");

const categories = [
    {
        name: "Makeup",
        color: "#B84A62",
        light: "#F9D8DE",
        shape: "lipstick",
        items: [
            ["GC Matte Rose Lipstick", "Velvety rose lipstick with a soft matte finish."],
            ["GC Satin Nude Lipstick", "Everyday nude lipstick for a polished makeup look."],
            ["GC Cream Blush Peach", "Cream blush that gives cheeks a fresh peach glow."],
            ["GC Soft Focus Foundation", "Medium coverage foundation with a natural finish."],
            ["GC Bright Eye Concealer", "Lightweight concealer for under-eye brightness."],
            ["GC Volume Mascara", "Black mascara that adds visible volume to lashes."],
            ["GC Liquid Eyeliner", "Easy liquid eyeliner with a precise felt tip."],
            ["GC Bronze Eyeshadow Palette", "Warm neutral eyeshadow palette for daily looks."],
            ["GC Clear Brow Gel", "Clear brow gel for a neat and lifted brow shape."],
            ["GC Sunlit Bronzer", "Soft bronzer for warmth and dimension."],
            ["GC Pearl Highlighter", "Pearl highlighter for a controlled glow."],
            ["GC Velvet Powder", "Finishing powder that reduces shine."],
            ["GC Grip Primer", "Makeup primer that helps foundation last longer."],
            ["GC Mist Setting Spray", "Fine mist setting spray for a fresh finish."],
            ["GC Rose Lip Liner", "Creamy lip liner that defines the lip shape."],
            ["GC Glossy Lip Oil", "Shiny lip oil with a comfortable feel."]
        ]
    },
    {
        name: "Skincare",
        color: "#4A7C73",
        light: "#D9EFEA",
        shape: "bottle",
        items: [
            ["GC Green Tea Cleanser", "Gentle cleanser for a fresh morning routine."],
            ["GC Hyaluronic Serum", "Hydrating serum for a plump skin look."],
            ["GC Barrier Cream", "Daily moisturizer that supports the skin barrier."],
            ["GC Vitamin C Drops", "Brightening serum for dull-looking skin."],
            ["GC Rose Toner", "Soft toner that refreshes skin after cleansing."],
            ["GC Night Repair Cream", "Rich night cream for overnight comfort."],
            ["GC Peptide Eye Cream", "Eye cream for a smoother under-eye appearance."],
            ["GC Clay Pore Mask", "Clay mask for oily and combination skin."],
            ["GC Milky Essence", "Light essence that adds a hydrated glow."],
            ["GC BHA Clarifying Gel", "Exfoliating gel for clearer-looking skin."],
            ["GC Cica Recovery Balm", "Comforting balm for sensitive-feeling skin."],
            ["GC Oil Cleanse Balm", "Cleansing balm that melts makeup gently."],
            ["GC Ceramide Lotion", "Light lotion for daily skin comfort."],
            ["GC Glow Pads", "Pre-soaked pads for quick gentle exfoliation."],
            ["GC Water Cream", "Cooling gel cream for lightweight hydration."],
            ["GC Sleep Mask", "Overnight mask for soft-looking skin."]
        ]
    },
    {
        name: "Fragrance",
        color: "#6E5DA8",
        light: "#E5E0F5",
        shape: "perfume",
        items: [
            ["GC Bloom Eau de Parfum", "Floral fragrance with rose, jasmine, and soft musk."],
            ["GC Amber Veil Perfume", "Warm amber fragrance for evening wear."],
            ["GC Citrus Morning Mist", "Fresh citrus scent for everyday use."],
            ["GC Vanilla Cloud Spray", "Soft vanilla body mist with a cozy finish."],
            ["GC White Musk Eau de Toilette", "Clean musk fragrance with a light trail."],
            ["GC Velvet Orchid Perfume", "Elegant floral scent with orchid notes."],
            ["GC Pink Pepper Perfume", "Modern spicy scent with pink pepper."],
            ["GC Sea Salt Mist", "Fresh aquatic body spray for daytime."],
            ["GC Gardenia Dream Perfume", "White floral perfume with creamy gardenia."],
            ["GC Fig Leaf Cologne", "Green fig fragrance with a clean dry down."],
            ["GC Cashmere Woods Perfume", "Soft woody scent with a warm base."],
            ["GC Berry Bloom Mist", "Sweet berry fragrance for a playful mood."],
            ["GC Mini Discovery Set", "Small fragrance set for trying different scents."],
            ["GC Golden Nectar Perfume", "Sweet floral perfume with warm nectar notes."]
        ]
    },
    {
        name: "Hair Care",
        color: "#9A6B3F",
        light: "#F1E2D0",
        shape: "tube",
        items: [
            ["GC Shine Shampoo", "Gentle shampoo for shiny-looking hair."],
            ["GC Smooth Conditioner", "Conditioner that helps hair feel soft."],
            ["GC Repair Hair Mask", "Weekly mask for dry and damaged hair."],
            ["GC Curl Cream", "Styling cream for defined curls."],
            ["GC Heat Protect Spray", "Spray that protects hair before styling."],
            ["GC Dry Shampoo", "Quick refresh spray for second-day hair."],
            ["GC Scalp Serum", "Light serum for scalp comfort."],
            ["GC Leave-In Milk", "Leave-in treatment for easier brushing."],
            ["GC Volume Mousse", "Mousse that adds body to flat hair."],
            ["GC Anti-Frizz Oil", "Hair oil for smooth ends and shine."],
            ["GC Purple Shampoo", "Toning shampoo for blonde hair."],
            ["GC Texture Spray", "Texturizing spray for effortless waves."],
            ["GC Bond Repair Serum", "Serum that supports stronger-looking hair."],
            ["GC Satin Hair Mist", "Finishing mist for soft shine."]
        ]
    },
    {
        name: "Tools & Brushes",
        color: "#2F6F9F",
        light: "#D9EAF6",
        shape: "brush",
        items: [
            ["GC Foundation Brush", "Dense brush for smooth foundation application."],
            ["GC Blush Brush", "Soft angled brush for blush and bronzer."],
            ["GC Powder Brush", "Large fluffy brush for loose powder."],
            ["GC Eyeshadow Brush", "Flat brush for packing eyeshadow color."],
            ["GC Blending Brush", "Rounded brush for blending eyeshadow."],
            ["GC Brow Spoolie", "Brow brush for shaping and grooming."],
            ["GC Makeup Sponge", "Soft sponge for blending base products."],
            ["GC Lash Curler", "Classic lash curler for lifted lashes."],
            ["GC Travel Brush Set", "Small brush set for makeup bags."],
            ["GC Facial Roller", "Cooling roller for a relaxing routine."],
            ["GC Cleansing Cloths", "Reusable cloths for makeup removal."],
            ["GC Compact Mirror", "Small mirror for touch-ups."]
        ]
    },
    {
        name: "Bath & Body",
        color: "#C76F3E",
        light: "#F7E0D2",
        shape: "jar",
        items: [
            ["GC Almond Body Lotion", "Soft body lotion with a warm almond scent."],
            ["GC Sugar Body Scrub", "Body scrub for smoother-feeling skin."],
            ["GC Rose Shower Gel", "Fresh shower gel with a soft rose scent."],
            ["GC Hand Cream Trio", "Three hand creams for daily moisture."],
            ["GC Body Butter", "Rich body butter for dry areas."],
            ["GC Bath Soak", "Relaxing bath soak for evening routines."],
            ["GC Body Oil", "Light body oil for a healthy-looking glow."],
            ["GC Deodorant Cream", "Cream deodorant with a soft scent."],
            ["GC Foot Balm", "Comforting balm for dry feet."],
            ["GC Lavender Soap", "Gentle soap bar with lavender scent."],
            ["GC Body Mist Coconut", "Light coconut body mist."],
            ["GC Spa Gift Box", "Bath and body set for gifting."]
        ]
    },
    {
        name: "Mini & Sets",
        color: "#7D5968",
        light: "#ECDDE3",
        shape: "box",
        items: [
            ["GC Mini Lip Kit", "Small lip products for trying new shades."],
            ["GC Mini Skincare Set", "Travel-size cleanser, serum, and cream."],
            ["GC Weekend Makeup Set", "Compact makeup set for short trips."],
            ["GC Glow Starter Kit", "Beginner-friendly beauty routine set."],
            ["GC Mini Mascara Duo", "Two mini mascaras for day and night."],
            ["GC Trial Fragrance Wardrobe", "Mini fragrances for different moods."],
            ["GC Blush and Brush Set", "Blush compact with a travel brush."],
            ["GC Hydration Duo", "Serum and cream duo for hydration."],
            ["GC Party Ready Kit", "Small makeup kit for evening looks."],
            ["GC Bestsellers Box", "A curated set of customer favorites."]
        ]
    },
    {
        name: "Sun Care",
        color: "#D3A12C",
        light: "#F7EDCF",
        shape: "tube",
        items: [
            ["GC Daily SPF 50", "Light sunscreen for daily face protection."],
            ["GC Mineral SPF 30", "Mineral sunscreen with a soft finish."],
            ["GC Tinted Sunscreen", "Tinted SPF for light coverage."],
            ["GC After Sun Gel", "Cooling gel for after-sun comfort."],
            ["GC SPF Lip Balm", "Lip balm with sun protection."],
            ["GC Body Sunscreen Spray", "Easy spray sunscreen for body use."],
            ["GC Glow SPF Drops", "Dewy SPF drops for a radiant look."],
            ["GC Sport SPF Stick", "Portable SPF stick for outdoor days."],
            ["GC Kids Gentle SPF", "Gentle sunscreen for sensitive skin."],
            ["GC Sun Care Travel Set", "Small SPF products for travel."]
        ]
    }
];

function productSvg(product, index, category) {
    const title = product.name.replace(/&/g, "&amp;");
    const brand = product.brand.replace(/&/g, "&amp;");
    const shape = category.shape;
    const productShape = {
        lipstick: `
            <rect x="118" y="95" width="64" height="118" rx="14" fill="#ffffff" stroke="${category.color}" stroke-width="4"/>
            <rect x="132" y="60" width="36" height="58" rx="18" fill="${category.color}"/>
            <rect x="124" y="172" width="52" height="36" rx="8" fill="${category.light}"/>`,
        bottle: `
            <rect x="124" y="55" width="52" height="32" rx="12" fill="${category.color}"/>
            <rect x="98" y="82" width="104" height="132" rx="24" fill="#ffffff" stroke="${category.color}" stroke-width="4"/>
            <circle cx="150" cy="137" r="28" fill="${category.light}"/>`,
        perfume: `
            <rect x="128" y="55" width="44" height="28" rx="8" fill="${category.color}"/>
            <rect x="106" y="82" width="88" height="122" rx="28" fill="#ffffff" stroke="${category.color}" stroke-width="4"/>
            <path d="M118 150 C140 118, 162 118, 184 150" fill="none" stroke="${category.light}" stroke-width="16" stroke-linecap="round"/>`,
        tube: `
            <path d="M105 65 L195 65 L178 215 L122 215 Z" fill="#ffffff" stroke="${category.color}" stroke-width="4"/>
            <rect x="116" y="184" width="68" height="30" rx="8" fill="${category.light}"/>
            <circle cx="150" cy="122" r="26" fill="${category.light}"/>`,
        brush: `
            <rect x="137" y="98" width="26" height="116" rx="13" fill="${category.color}"/>
            <path d="M112 60 C125 35, 175 35, 188 60 C182 98, 118 98, 112 60 Z" fill="${category.light}" stroke="${category.color}" stroke-width="4"/>`,
        jar: `
            <rect x="95" y="92" width="110" height="38" rx="14" fill="${category.color}"/>
            <rect x="104" y="124" width="92" height="82" rx="28" fill="#ffffff" stroke="${category.color}" stroke-width="4"/>
            <ellipse cx="150" cy="124" rx="44" ry="13" fill="${category.light}"/>`,
        box: `
            <rect x="92" y="82" width="116" height="116" rx="18" fill="#ffffff" stroke="${category.color}" stroke-width="4"/>
            <path d="M92 118 H208" stroke="${category.color}" stroke-width="4"/>
            <path d="M150 82 V198" stroke="${category.light}" stroke-width="12"/>`
    }[shape];

    return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="0 0 300 300" role="img" aria-label="${title}">
<rect width="300" height="300" rx="28" fill="${category.light}"/>
<circle cx="238" cy="56" r="42" fill="#ffffff" opacity="0.55"/>
<circle cx="62" cy="236" r="52" fill="#ffffff" opacity="0.45"/>
${productShape}
<text x="150" y="246" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#222222">${brand}</text>
<text x="150" y="268" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555555">${title.length > 30 ? title.slice(0, 29) + "..." : title}</text>
<text x="28" y="38" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="${category.color}">Glow ${String(index).padStart(3, "0")}</text>
</svg>`;
}

function createProducts() {
    let index = 1;
    const products = [];

    categories.forEach(function(category) {
        category.items.forEach(function(item) {
            const price = 240 + ((index * 37) % 860);
            const id = "gc-" + String(index).padStart(3, "0");
            const product = {
                id: id,
                name: item[0],
                brand: "Glow Cosmetics",
                category: category.name,
                price: price,
                image: "../assets/products/" + id + ".svg",
                description: item[1],
                details: "Inspired by professional beauty store product pages: clear product photo, short benefit text, price, category, and cart action."
            };

            products.push(product);
            fs.writeFileSync(path.join(productDir, id + ".svg"), productSvg(product, index, category));
            index = index + 1;
        });
    });

    return products;
}

function productCardHtml(product) {
    return `                <article class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <p class="category-name">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>${product.price} TL</strong>
                </article>`;
}

function stage5Html(products) {
    const productCards = products.map(productCardHtml).join("\n");

    return `<!DOCTYPE html>
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
        Profesyonel katalog görünümü için ürün kartları, kategori bilgisi ve görseller eklendi.
    -->
    <header class="site-header">
        <a href="../index.html" class="back-link">Project Landing</a>
        <h1>Glow Cosmetics</h1>
        <p>Beauty store catalogue with ${products.length} products across makeup, skincare, fragrance, hair care, tools, body care, mini sets, and sun care.</p>
    </header>

    <main class="catalog-layout">
        <aside class="sidebar">
            <h2>Categories</h2>
            <ul>
                ${categories.map(function(category) {
                    return `<li>${category.name}</li>`;
                }).join("\n                ")}
            </ul>
        </aside>

        <section class="catalog-section" id="products">
            <div class="section-title">
                <h2>Product Catalogue</h2>
                <p>${products.length} products shown with CSS Grid.</p>
            </div>
            <div class="product-grid">
${productCards}
            </div>
        </section>
    </main>
</body>
</html>
`;
}

const products = createProducts();
const productsFile = `/*
    Product data for Stage 6.
    Bu dosyada ürün bilgileri liste halinde tutulur.
    script.js bu listeyi okuyarak ürün kartlarını, detay penceresini ve sepeti oluşturur.
*/

const products = ${JSON.stringify(products, null, 4)};
`;

fs.writeFileSync(path.join(root, "stage6", "products.js"), productsFile);
fs.writeFileSync(path.join(root, "stage5", "index.html"), stage5Html(products));
console.log("Generated " + products.length + " products.");
