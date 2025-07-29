document.addEventListener('DOMContentLoaded', () => {
    new Swiper(".swiper.what-we-do-swiper", {
        slidesPerView: 3,
        spaceBetween: 24,
        effect: "slide",
        // loop: true,
        navigation: {
            nextEl: ".nav-btn.next",
            prevEl: ".nav-btn.prev",
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 24
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 24
            },
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });

    new Swiper(".swiper-container.customer-feedback-swiper", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        effect: "slide",
        navigation: {
            nextEl: ".feedback-swiper-nav .next",
            prevEl: ".feedback-swiper-nav .prev",
        },
        pagination: {
            el: ".feedback-swiper-pagination",
            clickable: true,
        },
    });
    const links = document.querySelectorAll('.service-link');
    const sections = Array.from(links).map(link => document.getElementById(link.dataset.target));

    function onScroll() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let currentId = sections[0].id;

        for (let section of sections) {
            if (section.offsetTop <= scrollPos) {
                currentId = section.id;
            }
        }

        links.forEach(link => {
            if (link.dataset.target === currentId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initialize on load

    // Smooth scrolling (optional)
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.getElementById(this.dataset.target);
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const featureSwiper = new Swiper(".cs-feature-swiper", {
        loop: false,
        slidesPerView: 1,
        effect: "slide",
        duration: 500,
        fadeEffect: { crossFade: true },
        allowTouchMove: false, // only control via logo clicks
    });

    new Swiper(".cs-logo-swiper", {
        slidesPerView: 4,
        spaceBetween: 16,
        breakpoints: {
            768: { slidesPerView: 4 },
            480: { slidesPerView: 2.5 },
            320: { slidesPerView: 1.5 },
        },
    });

    document.querySelectorAll(".cs-logo-item").forEach((item, index) => {
        item.addEventListener("click", () => {
            console.log(`Logo clicked: ${item.dataset.feature}`);
            featureSwiper.slideTo(index);
            document.querySelectorAll(".cs-logo-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
        });
    });

});
