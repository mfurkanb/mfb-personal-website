/* =========================================================
   FURKAN BAYAZIT
   PERSONAL WEBSITE
   Main JavaScript
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(".rev");


    /*
     * IntersectionObserver destekleniyorsa
     * elementler ekrana girdikçe görünür hale gelir.
     */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("in");

                        /*
                         * Animasyon yalnızca bir defa çalışsın.
                         */
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.10,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /*
         * Çok eski browser fallback.
         */

        revealElements.forEach((element) => {

            element.classList.add("in");

        });

    }



    /* =====================================================
       HERO MOUSE MOVEMENT
       ===================================================== */

    const heroTitle = document.querySelector(".hero h1");


    if (heroTitle) {

        document.addEventListener("mousemove", (event) => {

            /*
             * Mobil / tablet cihazlarda mouse efekti kapalı.
             */

            if (window.innerWidth <= 800) {
                return;
            }


            const mouseX =
                event.clientX / window.innerWidth - 0.5;

            const mouseY =
                event.clientY / window.innerHeight - 0.5;


            /*
             * Hareketi özellikle küçük tutuyoruz.
             * Fazla hareket portfolio yerine demo sitesi
             * hissi verebilir.
             */

            const moveX = mouseX * 10;

            const moveY = mouseY * 7;


            heroTitle.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;

        });


        /*
         * Mouse browser alanından çıkınca
         * başlık normal pozisyonuna dönsün.
         */

        document.documentElement.addEventListener(
            "mouseleave",
            () => {

                heroTitle.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );

    }



    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            /*
             * Sadece "#" ise herhangi bir işlem yapma.
             */

            if (!targetId || targetId === "#") {
                return;
            }


            const targetSection =
                document.querySelector(targetId);


            if (!targetSection) {
                return;
            }


            event.preventDefault();


            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



    /* =====================================================
       TRAVEL MAP
       ===================================================== */

    const mapPins =
        document.querySelectorAll(".pin");


    mapPins.forEach((pin) => {

        /*
         * Accessibility açısından location ismini
         * aria-label olarak da garanti ediyoruz.
         */

        const placeName =
            pin.getAttribute("data-p");


        if (placeName && !pin.getAttribute("aria-label")) {

            pin.setAttribute(
                "aria-label",
                placeName
            );

        }


        /*
         * Keyboard ile de pin seçilebilsin.
         */

        pin.setAttribute(
            "tabindex",
            "0"
        );

    });



    /* =====================================================
       FOOTER YEAR
       ===================================================== */

    const footerYear =
        document.querySelector(".foot span:last-child");


    if (footerYear) {

        const currentYear =
            new Date().getFullYear();


        footerYear.textContent =
            `© ${currentYear}`;

    }



    /* =====================================================
       X / TWITTER EMBED
       ===================================================== */

    initializeTwitterEmbed();

});



/* =========================================================
   TWITTER / X EMBED
   ========================================================= */

function initializeTwitterEmbed() {

    const tweetContainer =
        document.getElementById("tweet-container");


    if (!tweetContainer) {
        return;
    }


    /*
     * X widgets.js bazen HTML'den daha geç yüklenebiliyor.
     *
     * Bu yüzden belirli aralıklarla twttr objesinin
     * hazır olup olmadığını kontrol ediyoruz.
     */

    let attempts = 0;

    const maxAttempts = 20;


    const twitterCheck =
        setInterval(() => {

            attempts++;


            if (
                window.twttr &&
                window.twttr.widgets
            ) {

                clearInterval(twitterCheck);


                window.twttr.widgets
                    .load(tweetContainer)
                    .catch(() => {

                        showTweetFallback(
                            tweetContainer
                        );

                    });

            }


            /*
             * Script hiç yüklenemezse fallback göster.
             */

            if (attempts >= maxAttempts) {

                clearInterval(twitterCheck);


                if (
                    !window.twttr ||
                    !window.twttr.widgets
                ) {

                    showTweetFallback(
                        tweetContainer
                    );

                }

            }

        }, 250);

}



/* =========================================================
   X EMBED FALLBACK
   ========================================================= */

function showTweetFallback(container) {

    /*
     * Embed zaten başarıyla oluşturulduysa
     * iframe bulunur. Bu durumda fallback gösterme.
     */

    const existingIframe =
        container.querySelector("iframe");


    if (existingIframe) {
        return;
    }


    const originalPost =
        "https://x.com/beINSPORTS_TR/status/1475151896730083328?s=20";


    container.innerHTML = `
        <div class="tweet-fallback">

            <span class="k">
                BEIN SPORTS TR · X
            </span>

            <p>
                The embedded post could not be loaded.
                You can still view the original post on X.
            </p>

            ${originalPost}
                View the original post ↗
            </a>

        </div>
    `;

}



/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener("resize", () => {

    const heroTitle =
        document.querySelector(".hero h1");


    /*
     * Desktop'tan mobile geçildiğinde hero üzerinde
     * transform kalmasını engelliyoruz.
     */

    if (
        heroTitle &&
        window.innerWidth <= 800
    ) {

        heroTitle.style.transform =
            "translate3d(0, 0, 0)";

    }

});