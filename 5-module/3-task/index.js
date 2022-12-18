function initCarousel() {
  let carousel = document.querySelector(".carousel");
  let carouselInner = document.querySelector(".carousel__inner");
  let slideWidth = document.querySelector(".carousel__slide").offsetWidth;
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let trans = 0;
  let maxTrans = -slideWidth * 3;

  arrowLeft.style.display = "none";

  carousel.addEventListener("click", (event) => {
    if (event.target.closest(".carousel__arrow_left") && trans < 0)
      trans += slideWidth;
    if (event.target.closest(".carousel__arrow_right") && trans > maxTrans)
      trans -= slideWidth;

    arrowRight.style.display = trans == maxTrans ? "none" : "";
    arrowLeft.style.display = trans == 0 ? "none" : "";

    carouselInner.style.transform = `translateX(${trans}px)`;
  });
}
