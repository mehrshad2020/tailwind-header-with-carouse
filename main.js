// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Destination cards background change functionality
    const header = document.getElementById('header');
    const destinationCards = document.querySelectorAll('.destination-card');
    const paginationElement = document.querySelector('.absolute.right-2.top-0.text-white.text-4xl');
    
    // Header text elements
    const headerTitle = document.getElementById('header-title');
    const headerSubtitle = document.getElementById('header-subtitle');
    const headerDescription = document.getElementById('header-description');
    
    // Current active card index
    let currentCardIndex = 0;
    
    // Function to update pagination
    const updatePagination = (index) => {
        if (paginationElement) {
            // Format the number with leading zero
            const pageNumber = (index + 1).toString().padStart(2, '0');
            paginationElement.textContent = pageNumber;
        }
    };
    
    // Function to update header text content
    const updateHeaderText = (card) => {
        if (headerTitle && headerSubtitle && headerDescription) {
            // Get text data from card attributes
            const title = card.getAttribute('data-title');
            const subtitle = card.getAttribute('data-subtitle');
            const description = card.getAttribute('data-description');
            
            // Elements to animate
            const elements = [headerTitle, headerSubtitle, headerDescription];
            
            // Apply fade out classes to all elements
            elements.forEach(element => {
                element.classList.add('opacity-0');
                element.classList.add('transition-opacity');
                element.classList.add('duration-500');
            });
            
            // Update text after a short delay
            setTimeout(() => {
                // Update the text content
                if (title) {
                    headerTitle.innerHTML = title;
                }
                if (subtitle) {
                    headerSubtitle.textContent = subtitle;
                }
                if (description) {
                    headerDescription.textContent = description;
                }
                
                // Remove fade out classes from all elements
                elements.forEach(element => {
                    element.classList.remove('opacity-0');
                    // Keep transition classes for smooth fade-in
                });
            }, 300);
        }
    };
    
    // Function to activate a card by index
    const activateCard = (index) => {
        if (index >= 0 && index < destinationCards.length) {
            const card = destinationCards[index];
            const bgImage = card.getAttribute('data-bg');
            
            if (bgImage && header) {
                // Apply smooth transition
                header.style.backgroundImage = `url('${bgImage}')`;
                
                // Update header text content
                updateHeaderText(card);
                
                // Update active card styling
                destinationCards.forEach(c => {
                    c.classList.remove('ring-2');
                    c.classList.remove('ring-yellow-500');
                    c.classList.remove('scale-105');
                    c.classList.add('scale-100');
                });
                card.classList.add('ring-2');
                card.classList.add('ring-yellow-500');
                card.classList.add('scale-105');
                card.classList.remove('scale-100');
                
                // Update pagination
                updatePagination(index);
                
                // Update current index
                currentCardIndex = index;
                
                // Scroll to make the active card visible
                const carousel = document.querySelector('.destination-carousel');
                if (carousel) {
                    // Get the scroll position
                    const cardRect = card.getBoundingClientRect();
                    const carouselRect = carousel.getBoundingClientRect();
                    
                    // Calculate the scroll amount to center the card
                    const scrollLeft = card.offsetLeft - (carouselRect.width / 2) + (cardRect.width / 2);
                    
                    // Scroll to the card with smooth animation
                    carousel.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                    });
                }
            }
        }
    };
    
    // Set initial header content
    const setInitialHeaderContent = () => {
        if (destinationCards.length > 0) {
            const firstCard = destinationCards[0];
            
            // Set header text from the first card's data
            if (headerTitle && headerSubtitle && headerDescription) {
                const title = firstCard.getAttribute('data-title') || 'SAINT ANTÖNIEN';
                const subtitle = firstCard.getAttribute('data-subtitle') || 'Switzerland Alps';
                const description = firstCard.getAttribute('data-description') || 
                    'Maecenas pulvinar dolor et malesuada faucibus. Maecenas vestibulum felis sit amet facilisis tincidunt.';
                
                headerTitle.innerHTML = title;
                headerSubtitle.textContent = subtitle;
                headerDescription.textContent = description;
            }
        }
    };
    
    if (header && destinationCards.length > 0) {
        // Set initial header content
        setInitialHeaderContent();
        
        // Initialize with the first card active
        activateCard(0);
        
        // Add click event listeners to cards
        destinationCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                activateCard(index);
            });
        });
    }
    
    // Carousel controls
    const carousel = document.querySelector('.destination-carousel');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    if (carousel && prevButton && nextButton) {
        // Card width plus margin
        const cardWidth = 250 + 16; // 250px card width + 16px margin
        
        prevButton.addEventListener('click', () => {
            // Move to previous card and update pagination
            if (currentCardIndex > 0) {
                activateCard(currentCardIndex - 1);
            } else {
                // Loop back to the last card
                activateCard(destinationCards.length - 1);
            }
        });
        
        nextButton.addEventListener('click', () => {
            // Move to next card and update pagination
            if (currentCardIndex < destinationCards.length - 1) {
                activateCard(currentCardIndex + 1);
            } else {
                // Loop back to the first card
                activateCard(0);
            }
        });
        
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            }
        });
        
        // Handle responsive layout changes
        window.addEventListener('resize', () => {
            // If there's an active card, ensure it's still visible after resize
            if (currentCardIndex >= 0 && currentCardIndex < destinationCards.length) {
                setTimeout(() => {
                    activateCard(currentCardIndex);
                }, 100);
            }
        });
    }
}); 