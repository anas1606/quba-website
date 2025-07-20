// Tech Stack Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techCards = document.querySelectorAll('.tech-card');
    const alphabetSections = document.querySelectorAll('.alphabet-section');

    // Function to filter technologies
    function filterTechnologies(category, clickedButton = null) {
        let hasVisibleCards = false;
        
        // First, hide all tech cards and check which ones should be visible
        techCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Then, check each alphabetical section
        alphabetSections.forEach(section => {
            const sectionCards = section.querySelectorAll('.tech-card');
            let sectionHasVisibleCards = false;
            
            // Check if this section has any visible cards
            sectionCards.forEach(card => {
                if (card.style.display !== 'none') {
                    sectionHasVisibleCards = true;
                }
            });
            
            // Show/hide the entire section based on whether it has visible cards
            if (sectionHasVisibleCards) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        // Update active button state
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // If a button was clicked, make it active, otherwise find the button with matching data-filter
        if (clickedButton) {
            clickedButton.classList.add('active');
        } else {
            const targetButton = document.querySelector(`[data-filter="${category}"]`);
            if (targetButton) {
                targetButton.classList.add('active');
            }
        }
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const category = this.getAttribute('data-filter');
            filterTechnologies(category, this);
        });
    });

    // Add keyboard navigation support
    filterButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const category = this.getAttribute('data-filter');
                filterTechnologies(category, this);
            }
        });
    });

    // Initialize with 'all' filter active
    filterTechnologies('all');

    // Add fade-in animation for cards
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .tech-card {
            animation: fadeIn 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Add hover effects for tech cards
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects for tech cards
    techCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

    // Smooth scrolling for navigation
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        techCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all tech cards
    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add accessibility improvements
    techCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Technology: ${card.querySelector('h3').textContent}`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add filter count display
    function updateFilterCount() {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        const visibleCards = Array.from(techCards).filter(card => {
            const category = card.getAttribute('data-category');
            return filter === 'all' || category === filter;
        });
        
        // You can add a count display here if needed
        console.log(`${visibleCards.length} technologies shown`);
    }

    // Update count when filters change
    filterButtons.forEach(button => {
        button.addEventListener('click', updateFilterCount);
    });

    // Initialize count
    updateFilterCount();
}); 