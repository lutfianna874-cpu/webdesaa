// ================================
// MUSIK DESA
// ================================

const tombolMusik = document.getElementById("playMusic");
const musikDesa = document.getElementById("musikDesa");

if (tombolMusik && musikDesa) {

    tombolMusik.addEventListener("click", function () {

        if (musikDesa.paused) {

            musikDesa.play()
                .then(function () {

                    tombolMusik.innerHTML = "⏸️ Jeda Musik";

                })
                .catch(function (error) {

                    console.log(
                        "Musik gagal diputar:",
                        error
                    );

                });

        } else {

            musikDesa.pause();

            tombolMusik.innerHTML = "🎵 Putar Musik";

        }

    });

}


// ================================
// ANIMASI SAAT SCROLL
// ================================

const elements =
    document.querySelectorAll(".reveal");

function revealOnScroll() {

    elements.forEach(function (element) {

        const posisi =
            element.getBoundingClientRect().top;

        const tinggiLayar =
            window.innerHeight;

        if (posisi < tinggiLayar - 100) {

            element.classList.add("show");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


// ================================
// EFEK TOMBOL
// ================================

const buttons =
    document.querySelectorAll(".btn");

buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            button.classList.add("clicked");

            setTimeout(function () {

                button.classList.remove("clicked");

            }, 200);

        }
    );

});


// ================================
// EFEK GAMBAR
// ================================

const images =
    document.querySelectorAll(
        ".gallery-card img, .image-frame img, .mini-gallery img"
    );

images.forEach(function (image) {

    image.addEventListener(
        "mouseenter",
        function () {

            image.style.filter =
                "brightness(1.1) saturate(1.1)";

        }
    );

    image.addEventListener(
        "mouseleave",
        function () {

            image.style.filter =
                "brightness(1) saturate(1)";

        }
    );

});


// ================================
// EFEK PARALLAX HERO
// ================================

const hero =
    document.querySelector(".hero");

if (hero) {

    window.addEventListener(
        "scroll",
        function () {

            const scroll =
                window.scrollY;

            hero.style.backgroundPosition =
                "center " +
                (scroll * 0.35) +
                "px";

        }
    );

}


// ================================
// ANIMASI DAUN TAMBAHAN
// ================================

const leafContainer =
    document.querySelector(".floating-leaves");

if (leafContainer) {

    const leaves = [
        "🍃",
        "🌿",
        "🍂",
        "🌱",
        "🍃",
        "🌾",
        "🍂",
        "🌿"
    ];

    leaves.forEach(function (leaf, index) {

        const element =
            document.createElement("span");

        element.innerHTML = leaf;

        element.style.left =
            Math.random() * 100 + "%";

        element.style.animationDuration =
            (8 + Math.random() * 8) + "s";

        element.style.animationDelay =
            (Math.random() * 8) + "s";

        element.style.fontSize =
            (18 + Math.random() * 18) + "px";

        leafContainer.appendChild(element);

    });

}


// ================================
// TAHUN OTOMATIS
// ================================

const tahun =
    document.querySelectorAll(
        ".current-year"
    );

tahun.forEach(function (element) {

    element.textContent =
        new Date().getFullYear();

});


// ================================
// PESAN CONSOLE
// ================================

console.log(
    "🌾 Website Desa Sepinggan Gelik berhasil dijalankan!"
);

// =====================================================
// DATABASE DESA - BAGIAN TAMBAHAN
// =====================================================

(function () {
    const apiUrl =
        typeof WEB_APP_URL !== "undefined"
            ? WEB_APP_URL
            : "";

    if (!apiUrl || apiUrl.includes("PASTE_URL")) {
        const list = document.getElementById("publicDataList");
        if (list) {
            list.innerHTML =
                '<div class="data-empty">Database belum terhubung. Admin perlu mengatur URL Google Apps Script.</div>';
        }
        return;
    }

    function formatDate(value) {
        if (!value) return "";
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function safeUrl(value) {
        const url = String(value || "").trim();
        if (!url) return "";
        if (/^(https?:\/\/|\/|\.\/)/i.test(url)) return url;
        return "";
    }

    function createCard(item) {
        const card = document.createElement("article");
        card.className = "public-data-card";

        const imageUrl = safeUrl(item.urlGambar || item.URL_GAMBAR);
        if (imageUrl) {
            const img = document.createElement("img");
            img.className = "public-data-image";
            img.src = imageUrl;
            img.alt = item.judul || "Gambar data desa";
            img.loading = "lazy";
            img.onerror = function () {
                this.style.display = "none";
            };
            card.appendChild(img);
        }

        const body = document.createElement("div");
        body.className = "public-data-body";

        const category = document.createElement("span");
        category.className = "public-data-category";
        category.textContent =
            item.kategori || item.KATEGORI || "Beranda";

        const title = document.createElement("h3");
        title.textContent =
            item.judul || item.JUDUL || "Tanpa judul";

        const desc = document.createElement("p");
        desc.textContent =
            item.deskripsi || item.DESKRIPSI || "";

        const meta = document.createElement("div");
        meta.className = "public-data-meta";
        const nama =
            item.nama || item.NAMA || "Admin Desa";
        const tanggal =
            item.tanggal || item.TANGGAL || "";

        meta.textContent =
            "👤 " + nama +
            (tanggal ? " • 📅 " + formatDate(tanggal) : "");

        body.appendChild(category);
        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(meta);
        card.appendChild(body);

        return card;
    }

    async function loadPublicData(category) {
        const list = document.getElementById("publicDataList");
        if (!list) return;

        list.innerHTML =
            '<div class="data-loading">Memuat data desa...</div>';

        try {
            const response =
                await fetch(apiUrl + "?action=list", {
                    method: "GET",
                    cache: "no-store"
                });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || "Gagal mengambil data.");
            }

            let data = Array.isArray(result.data)
                ? result.data
                : [];

            if (category && category !== "Semua") {
                data = data.filter(function (item) {
                    return (item.kategori || item.KATEGORI) === category;
                });
            }

            if (!data.length) {
                list.innerHTML =
                    '<div class="data-empty">Belum ada data untuk kategori ini.</div>';
                return;
            }

            list.innerHTML = "";
            data.forEach(function (item) {
                list.appendChild(createCard(item));
            });

        } catch (error) {
            console.error(error);
            list.innerHTML =
                '<div class="data-error">Data belum dapat dimuat. Pastikan URL Google Apps Script sudah benar dan Web App sudah diakses.</div>';
        }
    }

    const defaultSection =
        document.querySelector(".page-database-section");

    const homeSection =
        document.getElementById("dataDesa");

    if (homeSection) {
        loadPublicData("Semua");

        document.querySelectorAll(".data-filter")
            .forEach(function (button) {
                button.addEventListener("click", function () {
                    document.querySelectorAll(".data-filter")
                        .forEach(function (btn) {
                            btn.classList.remove("active");
                        });

                    button.classList.add("active");
                    loadPublicData(button.dataset.category);
                });
            });
    } else if (defaultSection) {
        loadPublicData(
            defaultSection.dataset.defaultCategory || "Semua"
        );
    }
})();
