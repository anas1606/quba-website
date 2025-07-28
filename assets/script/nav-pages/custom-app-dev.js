// Custom Application Development Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Custom App Dev JS loaded successfully!');
    
    // Get all navigation links and content sections
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    console.log('Found nav links:', navLinks.length);
    console.log('Found content sections:', contentSections.length);
    
    // Function to update active state in navigation
    function updateActiveLink(sectionId) {
        console.log('Updating active link:', sectionId);
        
        // Update active state in navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log('Link activated:', sectionId);
        } else {
            console.log('Link not found for:', sectionId);
        }
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach((link, index) => {
        console.log(`Adding click listener to link ${index}:`, link.textContent);
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Link clicked:', this.textContent, this.getAttribute('href'));
            
            const targetId = this.getAttribute('href').substring(1);
            updateActiveLink(targetId);
            
            // Smooth scroll to the section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('Scrolled to section:', targetId);
            }
        });
    });
    
    // Service Cards Carousel Functionality
    const servicesContainer = document.querySelector('.services-container');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const serviceCards = document.querySelectorAll('.service-card');
    
    console.log('Carousel debugging:', {
        servicesContainer: servicesContainer,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        serviceCards: serviceCards.length
    });
    
    if (servicesContainer && prevArrow && nextArrow) {
        let currentIndex = 0;
        const cardWidth = 280 + 16; // card width + gap (updated to match new reduced gap)
        
        console.log('Carousel elements found:', {
            container: !!servicesContainer,
            prevArrow: !!prevArrow,
            nextArrow: !!nextArrow,
            cards: serviceCards.length,
            cardWidth: cardWidth
        });
        
        // Update arrow states
        function updateArrows() {
            prevArrow.disabled = currentIndex === 0;
            nextArrow.disabled = currentIndex >= serviceCards.length - 1;
            
            console.log('Arrow states updated:', {
                currentIndex,
                prevDisabled: prevArrow.disabled,
                nextDisabled: nextArrow.disabled,
                totalCards: serviceCards.length
            });
        }
        
        // Scroll to specific card
        function scrollToCard(index) {
            currentIndex = index;
            const cardWidth = 280 + 16; // card width + gap (updated to match new reduced gap)
            const containerWidth = servicesContainer.clientWidth;
            
            // Calculate scroll position to show exactly one complete card at a time
            let scrollPosition;
            if (index === 0) {
                // For the first card, scroll to the beginning
                scrollPosition = 0;
            } else if (index === serviceCards.length - 1) {
                // For the last card, calculate position to show it fully
                const totalWidth = serviceCards.length * cardWidth;
                // Position the last card so it's fully visible at the end
                scrollPosition = totalWidth - cardWidth;
            } else {
                // For other cards, scroll to show exactly one card
                scrollPosition = index * cardWidth;
            }
            
            console.log('Scrolling to card:', {
                index,
                scrollPosition,
                cardWidth,
                containerWidth,
                totalWidth: serviceCards.length * cardWidth,
                totalCards: serviceCards.length,
                isFirstCard: index === 0,
                isLastCard: index === serviceCards.length - 1
            });
            
            servicesContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            updateArrows();
            
            // Update active card
            serviceCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
        }
        
        // Event listeners for arrows
        prevArrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev arrow clicked, current index:', currentIndex);
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            }
        });
        
        nextArrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next arrow clicked, current index:', currentIndex);
            if (currentIndex < serviceCards.length - 1) {
                scrollToCard(currentIndex + 1);
            }
        });
        
        // Add click event listeners to arrows with debugging
        console.log('Adding event listeners to arrows...');
        
        // Test if arrows are clickable
        prevArrow.addEventListener('mousedown', () => {
            console.log('Prev arrow mousedown detected');
        });
        
        nextArrow.addEventListener('mousedown', () => {
            console.log('Next arrow mousedown detected');
        });
        
        // Initialize
        updateArrows();
        scrollToCard(0);
        
        console.log('Carousel initialized successfully');
        
        // Test scroll functionality
        setTimeout(() => {
            console.log('Testing scroll functionality...');
            console.log('Container scroll properties:', {
                scrollLeft: servicesContainer.scrollLeft,
                scrollWidth: servicesContainer.scrollWidth,
                clientWidth: servicesContainer.clientWidth
            });
        }, 1000);
        
    } else {
        console.error('Carousel elements not found:', {
            container: !!servicesContainer,
            prevArrow: !!prevArrow,
            nextArrow: !!nextArrow
        });
    }
    
    // Initialize with first section active
    if (contentSections.length > 0) {
        updateActiveLink('what-we-do');
    }
}); 