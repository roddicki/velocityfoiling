let startY = 0;
let isRefreshing = false;
const refreshContainer = document.getElementById("refreshContainer");
// Get the current slick slide
let $carousel = $(".screens-container");
let currentSlide = 0;

$carousel.on("afterChange", function(event, slick, slideIndex){
    console.log("Current slide is: " + (slideIndex));
    currentSlide = slideIndex;
});


document.addEventListener("touchstart", (e) => {
    if (window.scrollY === 0) {
        startY = e.touches[0].pageY;
    }
});

document.addEventListener("touchmove", (e) => {
    let moveY = e.touches[0].pageY;
    let diff = moveY - startY;
    console.log(currentSlide);
    if (diff > 150 && currentSlide == 0 && !isRefreshing && window.scrollY === 0) {
        refreshContainer.style.top = "0px"; // Show spinner
    }
});

document.addEventListener("touchend", () => {
    if (refreshContainer.style.top === "0px") {
        isRefreshing = true;
        setTimeout(() => {
            init(); // get data and refresh chart and live wind
            getWeather(); // get weather
            refreshContainer.style.top = "-60px"; // Hide spinner
            isRefreshing = false;
        }, 1000); // Simulate refresh delay
    } else {
        refreshContainer.style.top = "-60px"; // Hide spinner if not refreshing
    }
});