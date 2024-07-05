document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const images = carousel.getElementsByTagName('img');
    const imageTitle = document.getElementById('imageTitle');
    const imageCounter = document.getElementById('imageCounter');
    let currentIndex = 0;

    function showImage(index) {
        images[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        currentIndex = index;
        updateImageTitleAndCounter();
    }

    function updateImageTitleAndCounter() {
        const activeImage = images[currentIndex];
        const title = activeImage.getAttribute('data-title') || 'No title available';
        imageTitle.innerHTML = title;
        imageCounter.innerHTML = `${currentIndex + 1} / ${images.length}`;
    }

    function showNextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
    }

    function showPreviousImage() {
        const previousIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(previousIndex);
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

    // Initial title and counter update
    updateImageTitleAndCounter();
});