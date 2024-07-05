document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const images = carousel.getElementsByTagName('img');
    const imageTitle = document.getElementById('imageTitle');
    let currentIndex = 0;
    let autoSwitchTimer;

    function showImage(index) {
        images[currentIndex].classList.remove('active');
        images[index].classList.add('active');
        imageTitle.textContent = images[index].getAttribute('data-title');
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

    function resetAutoSwitchTimer() {
        clearInterval(autoSwitchTimer);
        autoSwitchTimer = setInterval(showNextImage, 5000);
    }

    document.body.addEventListener('click', function(event) {
        if (event.target === document.body || event.target === carousel) {
            const clickX = event.clientX;
            const middleX = window.innerWidth / 2;
            if (clickX < middleX) {
                showPreviousImage();
            } else {
                showNextImage();
            }
            resetAutoSwitchTimer(); // Reset timer after manual change
        }
    });

    document.body.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const middleX = window.innerWidth / 2;
        if (mouseX < middleX) {
            document.body.style.cursor = 'w-resize';
        } else {
            document.body.style.cursor = 'e-resize';
        }
    });

    // Set the initial timer to automatically switch images every 5 seconds
    autoSwitchTimer = setInterval(showNextImage, 5000);

    // Example toggle button action
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() {
        alert('Toggle button clicked');
        // Add your toggle action here
    });
});
