const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "assets", "product-photos");
fs.mkdirSync(outputDir, { recursive: true });

const jsonFiles = [
    "/tmp/commons_lipstick.json",
    "/tmp/commons_cosmetics.json",
    "/tmp/commons_skincare.json",
    "/tmp/commons_makeup.json",
    "/tmp/commons_containers.json",
    "/tmp/commons_hair.json"
];

function readProducts() {
    const code = fs.readFileSync(path.join(root, "stage6", "products.js"), "utf8");
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(code + "\nthis.products = products;", sandbox);
    return sandbox.products;
}

function collectUrls() {
    const urls = [];

    jsonFiles.forEach(function(file) {
        if (!fs.existsSync(file)) {
            return;
        }

        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        const pages = Object.values((data.query && data.query.pages) || {});

        pages.forEach(function(page) {
            const info = page.imageinfo && page.imageinfo[0];
            if (!info || !info.url) {
                return;
            }

            const lower = info.url.toLowerCase();
            const isPhoto = lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png") || lower.endsWith(".webp");

            if (isPhoto) {
                urls.push(info.url);
            }
        });
    });

    return Array.from(new Set(urls));
}

function download(url, destination) {
    try {
        execFileSync("curl", ["-L", url, "-o", destination], { stdio: "ignore" });
        return fs.existsSync(destination) && fs.statSync(destination).size > 3000;
    } catch (error) {
        return false;
    }
}

async function main() {
    const products = readProducts();
    const urls = collectUrls();
    const downloaded = [];

    for (let index = 0; index < urls.length && downloaded.length < 60; index = index + 1) {
        const url = urls[index];
        const extensionMatch = url.match(/\.(jpg|jpeg|png|webp)$/i);
        const extension = extensionMatch ? extensionMatch[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
        const destination = path.join(outputDir, "photo-" + String(downloaded.length + 1).padStart(3, "0") + "." + extension);
        const ok = download(url, destination);

        if (ok) {
            downloaded.push(destination);
        }
    }

    products.forEach(function(product, index) {
        if (downloaded.length > 0) {
            const photoPath = downloaded[index % downloaded.length];
            product.image = "../assets/product-photos/" + path.basename(photoPath);
        }
    });

    const productFile =
`/*
    Product data for Stage 6.
    Bu dosyada ürün bilgileri liste halinde tutulur.
    script.js bu listeyi okuyarak ürün kartlarını, detay penceresini ve sepeti oluşturur.
*/

const products = ${JSON.stringify(products, null, 4)};
`;

    fs.writeFileSync(path.join(root, "stage6", "products.js"), productFile);
    console.log("Downloaded photos:", downloaded.length);
}

main();
