document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const images = carousel.getElementsByTagName('img');
    let currentIndex = 0;

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

    document.body.addEventListener('click', function(event) {
        const clickX = event.clientX;
        const middleX = window.innerWidth / 2;
        if (clickX < middleX) {
            showPreviousImage();
        } else {
            showNextImage();
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
});
