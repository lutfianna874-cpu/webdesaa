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