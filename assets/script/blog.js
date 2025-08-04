document.addEventListener('DOMContentLoaded', () => {

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Toggle current item
            item.classList.toggle('active');

            // Optional: Close other open items
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
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

});