const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.controls.prev');
const nextButton = document.querySelector('.controls.next');
const dots = document.querySelector('.dots');
const slideCount = slides.children.length;
let currentSlide = 0;
let previosSlide;
let isAnimating = false;
let intervalId;
let direction;



// Функция для создания точек
function createDots() {
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.dataset.slideIndex = i;
        dots.appendChild(dot);
    }
    dots.children[currentSlide].classList.add('active');
    slides.children[currentSlide].style.display = 'block';
}

// Функция для переключения на следующий слайд
function nextSlide() {
    if (!isAnimating) {
        direction = 'right';
        previosSlide = currentSlide;
        if (currentSlide == slideCount - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        animateSlide(currentSlide);
    }
}

// Функция для переключения на предыдущий слайд
function prevSlide() {
    if (!isAnimating) {
        direction = 'left';
        previosSlide = currentSlide;
        if (currentSlide == 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide--;
        }
        animateSlide(currentSlide);
    }
}

// Функция для анимации слайда
function animateSlide(n) {
    if (isAnimating) return;
    isAnimating = true;
    let current = slides.children[previosSlide];
    let next = slides.children[n];
    let isForward = (previosSlide < n || ((previosSlide == slideCount - 1) && (n == 0)));

    let increment = 0;
    const duration = 500;
    const fps = 60;
    const interval = duration / fps;
    if (isForward && direction == 'right') {
        next.style.left = '100%';
    } else {
        next.style.left = '0';
    }
    next.style.display = 'block';

    intervalId = setInterval(function () {
        increment += 100 / (duration / interval);
        if (isForward && direction == 'right') {
            next.style.left = (100 - increment) + '%';
            current.style.left = (-increment) + '%';
        } else {
            next.style.left = (increment - 100) + '%';
            current.style.left = (increment) + '%';
        }

        if (increment >= 100) {
            clearInterval(intervalId);
            isAnimating = false;
            current.style.display = 'none';
            current.style.left = '0';
            next.style.left = '0';
        }
    }, interval);
    const activeDot = dots.querySelector('.dot.active');
    if (activeDot) {
        dots.querySelector('.dot.active').classList.remove('active');
    }
    dots.children[currentSlide].classList.add('active');

}



// Обработчики событий
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

dots.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        const slideIndex = e.target.dataset.slideIndex;

        if (currentSlide == slideIndex) {
            return;
        }
        previosSlide = currentSlide;
        currentSlide = slideIndex;
        direction = currentSlide > previosSlide ? 'right' : 'left';
        animateSlide(currentSlide);

    }
});

createDots();
