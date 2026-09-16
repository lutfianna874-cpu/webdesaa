// =====================================================
// DESA SEPINGGAN GELIK
// SCRIPT.JS
// =====================================================
// =====================================================
// MUSIK DESA
// BERJALAN DI SEMUA HALAMAN
// =====================================================
document.addEventListener("DOMContentLoaded", function () {
    const tombolMusik =
        document.getElementById("playMusic");
    const musikDesa =
        document.getElementById("musikDesa");
    // Jika halaman tidak memiliki audio
    if (!musikDesa) {
        return;
    }
    // =================================================
    // AMBIL POSISI MUSIK TERAKHIR
    // =================================================
    const waktuTerakhir =
        localStorage.getItem("musicTime");
    if (waktuTerakhir) {
        musikDesa.currentTime =
            parseFloat(waktuTerakhir);
    }
    // =================================================
    // CEK STATUS MUSIK
    // =================================================
    const musikSedangNyala =
        localStorage.getItem("musicPlaying");
    if (musikSedangNyala === "true") {
        musikDesa.play()
            .then(function () {
                if (tombolMusik) {
                    tombolMusik.innerHTML =
                        "⏸️ Jeda Musik";
                }
            })
            .catch(function () {
                console.log(
                    "Browser menunggu interaksi pengguna untuk memutar musik."
                );
            });
    }
    // =================================================
    // TOMBOL PUTAR / JEDA
    // =================================================
    if (tombolMusik) {
        tombolMusik.addEventListener(
            "click",
            function () {
                if (musikDesa.paused) {
                    musikDesa.play()
                        .then(function () {
                            localStorage.setItem(
                                "musicPlaying",
                                "true"
                            );
                            tombolMusik.innerHTML =
                                "⏸️ Jeda Musik";
                        })
                        .catch(function (error) {
                            console.log(
                                "Musik gagal diputar:",
                                error
                            );
                        });
                } else {
                    musikDesa.pause();
                    localStorage.setItem(
                        "musicPlaying",
                        "false"
                    );
                    tombolMusik.innerHTML =
                        "🎵 Putar Musik";
                }
            }
        );
    }
    // =================================================
    // SIMPAN POSISI MUSIK
    // =================================================
    musikDesa.addEventListener(
        "timeupdate",
        function () {
            localStorage.setItem(
                "musicTime",
                musikDesa.currentTime
            );
        }
    );
    // =================================================
    // JIKA LAGU SELESAI
    // =================================================
    musikDesa.addEventListener(
        "ended",
        function () {
            musikDesa.currentTime = 0;
            musikDesa.play()
                .catch(function () {});
        }
    );
});
// =====================================================
// ANIMASI SAAT SCROLL
// =====================================================
const elements =
    document.querySelectorAll(".reveal");
function revealOnScroll() {
    elements.forEach(function (element) {
        const posisi =
            element.getBoundingClientRect().top;
        const tinggiLayar =
            window.innerHeight;
        if (
            posisi <
            tinggiLayar - 100
        ) {
            element.classList.add("show");
        }
    });
}
window.addEventListener(
    "scroll",
    revealOnScroll
);
revealOnScroll();
// =====================================================
// EFEK TOMBOL
// =====================================================
const buttons =
    document.querySelectorAll(".btn");
buttons.forEach(function (button) {
    button.addEventListener(
        "click",
        function () {
            button.classList.add("clicked");
            setTimeout(
                function () {
                    button.classList.remove(
                        "clicked"
                    );
                },
                200
            );
        }
    );
});
// =====================================================
// EFEK GAMBAR
// =====================================================
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
// =====================================================
// EFEK PARALLAX HERO
// =====================================================
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
// =====================================================
// ANIMASI DAUN
// =====================================================
const leafContainer =
    document.querySelector(
        ".floating-leaves"
    );
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
    leaves.forEach(
        function (leaf) {
            const element =
                document.createElement(
                    "span"
                );
            element.innerHTML =
                leaf;
            element.style.left =
                Math.random() * 100 +
                "%";
            element.style.animationDuration =
                (
                    8 +
                    Math.random() * 8
                ) +
                "s";
            element.style.animationDelay =
                (
                    Math.random() * 8
                ) +
                "s";
            element.style.fontSize =
                (
                    18 +
                    Math.random() * 18
                ) +
                "px";
            leafContainer.appendChild(
                element
            );
        }
    );
}
// =====================================================
// TAHUN OTOMATIS
// =====================================================
const tahun =
    document.querySelectorAll(
        ".current-year"
    );
tahun.forEach(
    function (element) {
        element.textContent =
            new Date().getFullYear();
    }
);
// =====================================================
// DATABASE DESA
// =====================================================
(function () {
    /*
       URL GOOGLE APPS SCRIPT
       JANGAN DIUBAH
    */
    const API_URL =
        "https://script.google.com/macros/s/AKfycbzN1j6Bhyy8_RZTvsK-aPzVNxKlG0JPtqLNzhJueziXDvt0isxag3VrTkiwtzxn1fU/exec";
    /*
       TUNGGU HTML SELESAI
    */
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            const list =
                document.getElementById(
                    "publicDataList"
                );
            /*
               Kalau halaman tidak mempunyai
               bagian database, hentikan.
            */
            if (!list) {
                return;
            }
            loadPublicData(
                "Semua"
            );
            /*
               FILTER DATA
            */
            const filterButtons =
                document.querySelectorAll(
                    ".data-filter"
                );
            filterButtons.forEach(
                function (button) {
                    button.addEventListener(
                        "click",
                        function () {
                            filterButtons.forEach(
                                function (btn) {
                                    btn.classList.remove(
                                        "active"
                                    );
                                }
                            );
                            button.classList.add(
                                "active"
                            );
                            const category =
                                button.dataset.category ||
                                "Semua";
                            loadPublicData(
                                category
                            );
                        }
                    );
                }
            );
        }
    );
    // =================================================
    // FORMAT TANGGAL
    // =================================================
    function formatDate(value) {
        if (!value) {
            return "";
        }
        const parts =
            String(value).split("-");
        if (
            parts.length === 3 &&
            parts[0].length === 4
        ) {
            const year =
                parts[0];
            const month =
                parseInt(parts[1], 10);
            const day =
                parseInt(parts[2], 10);
            const bulan = [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember"
            ];
            if (
                month >= 1 &&
                month <= 12
            ) {
                return (
                    day +
                    " " +
                    bulan[month - 1] +
                    " " +
                    year
                );
            }
        }
        return String(value);
    }
    // =================================================
    // CEK URL GAMBAR
    // =================================================
    function safeUrl(value) {
        const url =
            String(
                value || ""
            ).trim();
        if (!url) {
            return "";
        }
        if (
            /^https?:\/\//i.test(url) ||
            /^\//.test(url) ||
            /^\.\//.test(url)
        ) {
            return url;
        }
        return "";
    }
    // =================================================
    // BUAT CARD DATA
    // =================================================
    function createCard(item) {
        const card =
            document.createElement(
                "article"
            );
        card.className =
            "public-data-card";
        const id =
            item.id ||
            item.ID ||
            "";
        const nama =
            item.nama ||
            item.NAMA ||
            "Admin Desa";
        const judul =
            item.judul ||
            item.JUDUL ||
            "Tanpa judul";
        const kategori =
            item.kategori ||
            item.KATEGORI ||
            "Beranda";
        const deskripsi =
            item.deskripsi ||
            item.DESKRIPSI ||
            "";
        const urlGambar =
            item.urlGambar ||
            item.URL_GAMBAR ||
            "";
        const tanggal =
            item.tanggal ||
            item.TANGGAL ||
            "";
        // =================================================
        // GAMBAR
        // =================================================
        const imageUrl =
            safeUrl(
                urlGambar
            );
        if (imageUrl) {
            const img =
                document.createElement(
                    "img"
                );
            img.className =
                "public-data-image";
            img.src =
                imageUrl;
            img.alt =
                judul;
            img.loading =
                "lazy";
            img.onerror =
                function () {
                    this.style.display =
                        "none";
                };
            card.appendChild(
                img
            );
        }
        // =================================================
        // BODY
        // =================================================
        const body =
            document.createElement(
                "div"
            );
        body.className =
            "public-data-body";
        // KATEGORI
        const category =
            document.createElement(
                "span"
            );
        category.className =
            "public-data-category";
        category.textContent =
            kategori;
        // JUDUL
        const title =
            document.createElement(
                "h3"
            );
        title.textContent =
            judul;
        // DESKRIPSI
        const desc =
            document.createElement(
                "p"
            );
        desc.textContent =
            deskripsi;
        // META
        const meta =
            document.createElement(
                "div"
            );
        meta.className =
            "public-data-meta";
        meta.textContent =
            "👤 " +
            nama +
            (
                tanggal
                    ? " • 📅 " +
                      formatDate(tanggal)
                    : ""
            );
        // MASUKKAN KE BODY
        body.appendChild(
            category
        );
        body.appendChild(
            title
        );
        body.appendChild(
            desc
        );
        body.appendChild(
            meta
        );
        // ID DATA
        if (id) {
            card.dataset.id =
                id;
        }
        // MASUKKAN BODY KE CARD
        card.appendChild(
            body
        );
        return card;
    }
    // =================================================
    // AMBIL DATA DARI GOOGLE APPS SCRIPT
    // =================================================
    async function loadPublicData(
        selectedCategory
    ) {
        const list =
            document.getElementById(
                "publicDataList"
            );
        if (!list) {
            return;
        }
        // Loading
        list.innerHTML =
            '<div class="data-loading">' +
            'Memuat data desa...' +
            '</div>';
        try {
            const requestUrl =
                API_URL +
                "?action=list&callback=desaData";
            const response =
                await fetch(
                    requestUrl,
                    {
                        method: "GET",
                        cache: "no-store",
                        redirect: "follow"
                    }
                );
            if (!response.ok) {
                throw new Error(
                    "HTTP " +
                    response.status
                );
            }
            const result =
                await response.json();
            console.log(
                "DATA DESA DARI API:",
                result
            );
            if (
                !result ||
                result.success !== true
            ) {
                throw new Error(
                    result &&
                    result.message
                        ? result.message
                        : "Data gagal dimuat."
                );
            }
            let data =
                Array.isArray(
                    result.data
                )
                    ? result.data
                    : [];
            // FILTER
            if (
                selectedCategory &&
                selectedCategory !==
                    "Semua"
            ) {
                data =
                    data.filter(
                        function (item) {
                            const kategori =
                                item.kategori ||
                                item.KATEGORI ||
                                "";
                            return (
                                kategori ===
                                selectedCategory
                            );
                        }
                    );
            }
            // TIDAK ADA DATA
            if (!data.length) {
                list.innerHTML =
                    '<div class="data-empty">' +
                    'Belum ada data untuk kategori ini.' +
                    '</div>';
                return;
            }
            // BERSIHKAN LIST
            list.innerHTML =
                "";
            // TAMPILKAN DATA
            data.forEach(
                function (item) {
                    const card =
                        createCard(
                            item
                        );
                    list.appendChild(
                        card
                    );
                }
            );
        } catch (error) {
            console.error(
                "Gagal mengambil DATA_DESA:",
                error
            );
            list.innerHTML =
                '<div class="data-error">' +
                '<strong>Data belum dapat dimuat.</strong><br>' +
                'Silakan refresh halaman beberapa saat lagi.' +
                '</div>';
        }
    }
})();
// =====================================================
// PESAN CONSOLE
// =====================================================
console.log(
    "🌾 Website Desa Sepinggan Gelik berhasil dijalankan!"
);
console.log(
    "📊 Database DATA_DESA terhubung."
);
