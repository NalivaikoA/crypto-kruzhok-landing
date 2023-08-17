const slidesContainer = document.querySelector(".products-list");
const slides = document.querySelectorAll(".product-item");
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50; // Минимальное расстояние, которое нужно пройти для считывания свайпа

function showSlide(index) {
  if (index === 2) {
    slidesContainer.insertBefore(slides[2], slides[0]);
  }

  if (index === 1) {
    slidesContainer.insertBefore(slides[1], slides[2]);
  }

  if (index === 0) {
    slidesContainer.insertBefore(slides[0], slides[1]);
  }

  slides.forEach((slide, i) => {
    if (i === index || i === (index + 1) % slides.length) {
      slide.style.display = 'inline-block';
    } else {
      slide.style.display = 'none';
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('dot-active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
  });
});

showSlide(currentIndex);

// Добавляем обработчики для свайпа
slidesContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', () => {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > SWIPE_THRESHOLD) {
    prevSlide(); // Свайп вправо - переключение к предыдущему слайду
  } else if (swipeDistance < -SWIPE_THRESHOLD) {
    nextSlide(); // Свайп влево - переключение к следующему слайду
  }
});




// Хэдэр при скролле становится полупрозрачным;
function updateScroll() {
    if (window.scrollY > 0) {
      let card = document.querySelector(".main-header");
      card.classList.add("header__scrolled");
    } else {
      let card = document.querySelector(".main-header");
      card.classList.remove("header__scrolled")
    }
  }

  window.addEventListener('scroll', updateScroll);