let totalSliders = document.querySelectorAll(".slider--item").length;
let currentSlider = 0;

document.querySelector(".slider--width").style.width =
    `calc(100vw * ${totalSliders})`
document.querySelector(".slider--controls").style.height =
    `${document.querySelector(".slider").clientHeight}px`

function goPrev() {
    currentSlider--;
    if (currentSlider < 0) {
        currentSlider = totalSliders - 1;
    }
    updateMargin();
}

function goNext() {
    currentSlider++;
    if (currentSlider > (totalSliders - 1)) {
        currentSlider = 0;
    }
    updateMargin();
}

function updateMargin() {
    let sliderItemWidth = document.querySelector(".slider--item").clientWidth;
    let newMargin = (currentSlider * sliderItemWidth);
    document.querySelector(".slider--width").style.marginLeft =
        `-${newMargin}px`
}

setInterval(goNext, 5000);