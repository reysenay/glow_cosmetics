const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const baseProducts = [
    {
        name: "Make B Lipstick Collection",
        brand: "Make B",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Batons_Make_B_%40_S%C3%A3o_Paulo_Fashion_Week_em_Janeiro_e_Fevereiro_de_2011.jpg",
        description: "A lipstick display with multiple wearable shades."
    },
    {
        name: "Make B Display Lipsticks",
        brand: "Make B",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Batons_Make_B_%40_S%C3%A3o_Paulo_Fashion_Week_em_Janeiro_e_Fevereiro_de_2011_01.jpg",
        description: "A professional lipstick stand for everyday makeup looks."
    },
    {
        name: "Broken Lipstick Reflection Set",
        brand: "Glow Archive",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Broken_Lipsticks_and_reflection_-_%CE%A3%CF%80%CE%B1%CF%83%CE%BC%CE%AD%CE%BD%CE%B1_%CE%BA%CF%81%CE%B1%CE%B3%CE%B9%CF%8C%CE%BD_%CE%BC%CE%B5_%CE%B1%CE%BD%CF%84%CE%B1%CE%BD%CE%AC%CE%BA%CE%BB%CE%B1%CF%83%CE%B7.JPG",
        description: "A creative lipstick photo for bold makeup storytelling."
    },
    {
        name: "AVON Lipstick Assortment",
        brand: "AVON",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/48/AVON_Lipsticks.JPG",
        description: "A lipstick assortment with several red and neutral tones."
    },
    {
        name: "Collistar Lip Color",
        brand: "Collistar",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Collistar_%2843007074%29.jpeg",
        description: "A compact lip product for a polished makeup bag."
    },
    {
        name: "Crystal Hearts Lipstick",
        brand: "Crystal Hearts",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Crystal_Hearts_Lipstick_Review.jpg",
        description: "A decorative lipstick product with a soft beauty look."
    },
    {
        name: "Crystal Hearts Red Lipstick",
        brand: "Crystal Hearts",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Crystal_Hearts_Red_Lipstick_Review.jpg",
        description: "A red lipstick product for classic evening makeup."
    },
    {
        name: "Vintage Dodge La Femme Lipstick",
        brand: "Vintage Beauty",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/58/1955_Dodge_La_Femme_Lipstick.jpg",
        description: "A vintage lipstick image used as a heritage beauty item."
    },
    {
        name: "Cosmetic Bottle",
        brand: "Glow Basics",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Bouteille_cosm%C3%A9tique.JPG",
        description: "A simple cosmetic bottle suitable for toner or lotion."
    },
    {
        name: "Burt's Bees Miracle Salve",
        brand: "Burt's Bees",
        category: "Bath & Body",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Burt%27s_Bees_Miracle_Salve%2C_Sep_2012.JPG",
        description: "A multi-purpose salve for dry areas and daily care."
    },
    {
        name: "Burt's Bees Product Set",
        brand: "Burt's Bees",
        category: "Mini & Sets",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Burt%27s_Bees_Products%2C_Sep_2012.JPG",
        description: "A grouped set of personal care products."
    },
    {
        name: "Burt's Bees Hand Salve",
        brand: "Burt's Bees",
        category: "Bath & Body",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Burt%27s_Bees_Hand_Salve%2C_Sep_2012.JPG",
        description: "A hand salve for moisture and comfort."
    },
    {
        name: "Arbonne Awaken Lotion",
        brand: "Arbonne",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Arbonne_Awaken_Lotion_%28333940799%29.jpg",
        description: "A bottled lotion product for daily body care."
    },
    {
        name: "Bryltonic Hair Lotion",
        brand: "Bryltonic",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Bryltonic_Hairlotion_for_men.JPG",
        description: "A classic hair lotion product for styling."
    },
    {
        name: "Avoskin Skincare Bottle",
        brand: "Avoskin",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Avoskin.png",
        description: "A skincare bottle with a clean product presentation."
    },
    {
        name: "Avoskin Skincare Product",
        brand: "Avoskin",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Avoskin.jpg",
        description: "A skincare product photo for a modern routine."
    },
    {
        name: "African Black Soap",
        brand: "Natural Care",
        category: "Bath & Body",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/African_Black_Soap.jpg",
        description: "A cleansing soap product for body care."
    },
    {
        name: "Mirror Lipstick Product",
        brand: "Batom",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Batom_espelho_salto._-_Flickr_-_Ana_Patr%C3%ADcia_Almeida.jpg",
        description: "A lipstick product photographed with a mirror effect."
    },
    {
        name: "Eye Cream Jar",
        brand: "Augencreme",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Augencreme_V3.png",
        description: "A small eye cream product for skincare routines."
    },
    {
        name: "Eye Pads Pack",
        brand: "Augenpads",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Augenpads.png",
        description: "Eye pads for a refreshing skincare step."
    },
    {
        name: "Active Gel Tube",
        brand: "Active Gel",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Active_Gel.jpg",
        description: "A gel product for targeted skincare use."
    },
    {
        name: "Active Gel Product",
        brand: "Active Gel",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Active_gel_foto.jpg",
        description: "A second active gel product photo for skincare."
    },
    {
        name: "AVON Shampoo",
        brand: "AVON",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Avon_shampoo.png",
        description: "A shampoo product for regular hair washing."
    },
    {
        name: "Body Spray Collection",
        brand: "Glow Body",
        category: "Fragrance",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Bodysprays.jpg",
        description: "A body spray collection with fresh daily scents."
    },
    {
        name: "Wardah Product Set",
        brand: "Wardah",
        category: "Mini & Sets",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Contoh_Produk_Wardah.jpg",
        description: "A beauty product set with coordinated packaging."
    },
    {
        name: "Metamorpfoza Cream",
        brand: "Metamorpfoza",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cream_Metamorpfoza_A._M._Ostroumov.jpg",
        description: "A cream product for a skincare catalogue."
    },
    {
        name: "Retinol Sallve",
        brand: "Sallve",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Retinol_Sallve.webp",
        description: "A retinol skincare product for night routines."
    },
    {
        name: "Retinol Puro",
        brand: "Retinol Puro",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Retinol_Puro.png",
        description: "A retinol product focused on skin renewal."
    },
    {
        name: "Clarins Product Set",
        brand: "Clarins",
        category: "Mini & Sets",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Clarins_Products.jpg",
        description: "A skincare product set with premium packaging."
    },
    {
        name: "Pink Cosmetic Jar",
        brand: "Glow Skincare",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Cosmetic_jar_with_light_pink_product_displayed_on_a_textured_background.jpg",
        description: "A light pink cosmetic jar on a textured background."
    },
    {
        name: "Pink Background Skincare Set",
        brand: "Glow Skincare",
        category: "Mini & Sets",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Skin_care_products_displayed_on_a_light_pink_background_with_a_spoonful_of_powder_near_jars.jpg",
        description: "A coordinated skincare set displayed on a pink background."
    },
    {
        name: "Royalcos Product Group",
        brand: "Royalcos",
        category: "Mini & Sets",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Royalcos-products.jpg",
        description: "A product group suitable for a complete beauty routine."
    },
    {
        name: "Nivea Day Cream",
        brand: "Nivea",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Nivea_Tagescreme.png",
        description: "A day cream product for daily face care."
    },
    {
        name: "Nivea Night Care",
        brand: "Nivea",
        category: "Skincare",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Nivea_Nachtpflege.png",
        description: "A night care cream for evening skincare routines."
    },
    {
        name: "DHC Eyelash Tonic",
        brand: "DHC",
        category: "Makeup",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/DHC_EYELASH_TONIC.jpg",
        description: "An eyelash tonic product used in lash care."
    },
    {
        name: "Hair Mousse",
        brand: "Hair Care",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/17/Hair_mousse.jpg",
        description: "A mousse product for styling and volume."
    },
    {
        name: "Italian Hair and Skin Care Set",
        brand: "Italian Brands",
        category: "Mini & Sets",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/%22_12_-_ITALY_-_cosmetics_of_italian_brands_-_Hair_and_skin_care%2C_scrub_%28gommage%29_shaving_soap%2C_body_lotions_and_deodorant.JPG",
        description: "A grouped set of hair and skin care products."
    },
    {
        name: "Haircare Conditioner",
        brand: "Haircare",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Haircare_conditioner.jpg",
        description: "A conditioner product for softer hair."
    },
    {
        name: "Long Hair Product Set",
        brand: "Hair Products",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Hair_Products_for_Long_Hair.jpg",
        description: "A hair product set for long hair routines."
    },
    {
        name: "Fiala Familien Pomade",
        brand: "Fiala",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Fiala_Familien-Pomade_1869.png",
        description: "A vintage pomade product for hair styling."
    },
    {
        name: "Fiala Pomade Cropped",
        brand: "Fiala",
        category: "Hair Care",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Fiala_Familien-Pomade_1869_%28cropped%29.png",
        description: "A cropped vintage pomade product image."
    },
    {
        name: "Body Care Product",
        brand: "Body Care",
        category: "Bath & Body",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Body_care.png",
        description: "A body care product for daily routines."
    }
];

const variants = [
    "Classic",
    "Mini",
    "Travel Size",
    "Daily Routine",
    "Gift Edition",
    "Professional"
];

function priceFor(index) {
    return 240 + ((index * 41) % 760);
}

function buildProducts() {
    const products = [];

    for (let index = 0; products.length < 104; index = index + 1) {
        const base = baseProducts[index % baseProducts.length];
        const variant = variants[Math.floor(index / baseProducts.length) % variants.length];
        const variantSuffix = index < baseProducts.length ? "" : " - " + variant;
        const itemNumber = products.length + 1;

        products.push({
            id: "gc-" + String(itemNumber).padStart(3, "0"),
            name: base.name + variantSuffix,
            brand: base.brand,
            category: base.category,
            price: priceFor(itemNumber),
            image: base.image,
            description: base.description,
            details: "This product name is matched with the product image. The repeated versions are catalogue variants such as mini, travel size, gift edition, or professional size.",
            source: "Wikimedia Commons"
        });
    }

    return products;
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

function productList(products, icon) {
    return products.slice(0, 8).map(function(product) {
        const iconHtml = icon ? '<i class="fa-solid fa-bag-shopping"></i> ' : "";
        return `        <li>${iconHtml}${product.name} - ${product.category}</li>`;
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
        Aynı ürün kataloğunun en sade hali burada gösterilir.
    -->
    <h1>Glow Cosmetics</h1>

    <p>
        Glow Cosmetics is a beauty and makeup store with makeup, skincare,
        hair care, fragrance, body care, and beauty set products.
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
    <!-- Stage 2 için en az bir görsel zorunluydu; burada aynı katalogdan 4 gerçek görsel kullanıldı. -->
${imageGallery(products)}

    <h2 id="products">Featured Products</h2>
    <ul>
${productList(products, false)}
    </ul>

    <h2 id="prices">Product Prices</h2>
    <!-- Stage 2 için zorunlu tablo. -->
    <table border="1">
        <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
        </tr>
${tableRows(products)}
    </table>

    <h2>Business Information</h2>
    <p>Business Type: Beauty &amp; Makeup Store</p>
    <p>Total Catalogue Size: 104 products</p>
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
        Bu aşamada margin ve padding kullanılmaz.
    -->
    <h1><i class="fa-solid fa-sparkles"></i> Glow Cosmetics</h1>

    <p>
        Glow Cosmetics is a beauty and makeup store with a consistent product catalogue.
    </p>

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
        <p>Professional beauty catalogue with matched names, categories, and product images.</p>
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

function productCard(product, withButtons) {
    const actions = withButtons
        ? `                    <div class="product-actions">
                        <button type="button" class="details-button">Details</button>
                        <button type="button" class="cart-button">Add</button>
                    </div>`
        : "";

    return `                <article class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <p class="category-name">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>${product.price} TL</strong>
${actions}
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
        Aynı katalog artık CSS Grid ile 104 ürün olarak gösterilir.
        Ürün isimleri görsellerle uyumlu olacak şekilde yazıldı.
    -->
    <header class="site-header">
        <a href="../index.html" class="back-link">Project Landing</a>
        <h1>Glow Cosmetics</h1>
        <p>Beauty store catalogue with ${products.length} matched products and real product images.</p>
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
${products.map(function(product) {
    return productCard(product, false);
}).join("\n")}
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
    Bu dosyada ürün bilgileri liste halinde tutulur.
    İsimler görsellerdeki ürün türleriyle uyumlu olacak şekilde düzenlendi.
*/

const products = ${JSON.stringify(products, null, 4)};
`);
}

function main() {
    const products = buildProducts();
    writeStage2(products);
    writeStage3(products);
    writeStage4(products);
    writeStage5(products);
    writeProductsJs(products);
    console.log("Coherent products generated:", products.length);
}

main();
