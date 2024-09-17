document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const images = carousel.getElementsByTagName('img');
    let currentIndex = 0;
    let timer = null;
    let isUserInteracting = false; // To handle user interaction and avoid skipping

    // Show image function
    function showImage(index) {
        images[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        currentIndex = index;
    }

    // Show next image
    function showNextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    // Show previous image
    function showPreviousImage() {
        const previousIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(previousIndex);
    }

    // Start automatic carousel
    function startCarousel() {
        timer = setInterval(() => {
            if (!isUserInteracting) {
                showNextImage();
            }
        }, 3000); // Change image every 3 seconds
    }

    // Stop the carousel
    function stopCarousel() {
        clearInterval(timer);
        timer = null;
    }

    // Reset the timer (stop and start)
    function resetCarouselTimer() {
        if (timer) {
            stopCarousel();
        }
        startCarousel();
    }

    // Event listeners for user interaction
    function handleUserInteraction() {
        isUserInteracting = true;  // User is interacting, stop automatic changes
        resetCarouselTimer();      // Reset the timer
        setTimeout(() => isUserInteracting = false, 500); // Allow a short delay before resuming auto-play
    }

    // Click event for next/previous image
    document.body.addEventListener('click', function(event) {
        const clickX = event.clientX;
        const middleX = window.innerWidth / 2;
        
        if (clickX < middleX) {
            showPreviousImage();
        } else {
            showNextImage();
        }

        handleUserInteraction();
    });

    // Mouse move event for the carousel (indicate navigation direction)
    document.body.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const middleX = window.innerWidth / 2;
        document.body.style.cursor = (mouseX < middleX) ? 'w-resize' : 'e-resize';
    });

    // Touch event listeners for mobile devices
    let touchStartX = 0;

    carousel.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', function(event) {
        const touchEndX = event.changedTouches[0].screenX;
        if (touchEndX < touchStartX) {
            showNextImage();
        } else {
            showPreviousImage();
        }

        handleUserInteraction();
    });

    // Start the carousel automatically
    startCarousel();

    // Optional: Stop and resume carousel on mouse over/out
    carousel.addEventListener('mouseover', stopCarousel);
    carousel.addEventListener('mouseout', resetCarouselTimer);
});
