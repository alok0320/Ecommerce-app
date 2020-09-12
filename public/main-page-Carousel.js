// **************************************************MAIN_CAROUSEL(Desktop)*********************************************
$("#Banner_Main_Desktop .owl-carousel").owlCarousel({
  loop: true,
  margin: 2,
  padding: 1,
  nav: false,
  autoplay: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    580: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

$("#Banner_Main_Mobile .owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    580: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

// var slideshows = document.querySelectorAll('[data-component="slideshow"]');
// slideshows.forEach(initSlideShow);

// function initSlideShow(slideshow) {
//   var slides = document.querySelectorAll(
//     `#${slideshow.id} [role="list"] .slide`
//   );

//   var index = 0,
//     time = 5000;
//   slides[index].classList.add("active");

//   setInterval(() => {
//     slides[index].classList.remove("active");

//     index++;
//     if (index === slides.length) index = 0;

//     slides[index].classList.add("active");
//   }, time);
// }

// **************************************************MAIN_CAROUSEL(MOBILE)*********************************************

// var slideIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > x.length) {
//     slideIndex = 1;
//   }
//   x[slideIndex - 1].style.display = "block";
//   setTimeout(carousel, 3000); // Change image every 2 seconds
// }

// *******************************************************************PRODUCT GRID SLIDE(DESKTOP)****************

$("#Desktop_Product .owl-carousel").owlCarousel({
  loop: false,
  margin: 10,
  nav: false,
  rewind: false,
  dots: false,

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});

var owl = $("#Desktop_Product .owl-carousel");
owl.owlCarousel();
// Go to the next item
$(".owl-next").click(function () {
  owl.trigger("next.owl.carousel");
});
// Go to the previous item
$(".owl-prev").click(function () {
  // With optional speed parameter
  // Parameters has to be in square bracket '[]'
  owl.trigger("prev.owl.carousel", [300]);
});