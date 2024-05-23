document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const images = carousel.getElementsByTagName('img');
    let currentIndex = 0;
    let timer;

    function showImage(index) {
        images[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        currentIndex = index;
    }

    function showNextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function showPreviousImage() {
        const previousIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(previousIndex);
    }

    function startCarousel() {
        timer = setInterval(showNextImage, 6000); // Change image every 3 seconds
    }

    function stopCarousel() {
        clearInterval(timer);
    }

    function isToggleElement(element) {
        return element.closest('#menu') !== null;
    }

    // Click event for the entire document
    document.body.addEventListener('click', function(event) {
        if (isToggleElement(event.target)) {
            return; // Do nothing if the click is on a toggle or its children
        }

        const clickX = event.clientX;
        const middleX = window.innerWidth / 2;
        if (clickX < middleX) {
            showPreviousImage();
        } else {
            showNextImage();
        }
    });

    // Mouse move event for the carousel
    document.body.addEventListener('mousemove', function(event) {
        if (isToggleElement(event.target)) {
            return; // Do nothing if the mouse move is on a toggle or its children
        }

        const mouseX = event.clientX;
        const middleX = window.innerWidth / 2;
        if (mouseX < middleX) {
            document.body.style.cursor = 'w-resize';
        } else {
            document.body.style.cursor = 'e-resize';
        }
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
    });

    // Start the carousel
    startCarousel();

    // Optional: Stop the carousel on mouse over and resume on mouse out
    carousel.addEventListener('mouseover', stopCarousel);
    carousel.addEventListener('mouseout', startCarousel);
});
