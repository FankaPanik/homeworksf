let slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
let plusSlide = () => (showSlides(slideIndex += 1));

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
let minusSlide = () => (showSlides(slideIndex -= 1));  

/* Устанавливает текущий слайд */
let currentSlide = (n) => (showSlides(slideIndex = n));


/* Основная функция слайдера */
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("projects__item");
    let dots = document.getElementsByClassName("slider-dots_item");
    let title = document.getElementsByClassName("title pr__tab");
    
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    for (i = 0; i < title.length; i++) {
        title[i].className = title[i].className.replace(" active-title", "");
    }
    
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " active";
    title[slideIndex - 1].className += " active-title";
}