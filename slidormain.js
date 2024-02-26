//nav menu animation pour afficher les images de chaque service
$(document).ready(function() {
    // Lorsque la souris entre dans un .div-service
    $('.div-service').mouseenter(function() {
        // Récupère la classe de catégorie correspondante (ex: .sales, .event)
        var categoryClass = $(this).attr('class').split(' ')[1];
        // Assigne un z-index de 2 à l'image correspondante
        $('.service-dd_img_pic.' + categoryClass).css('z-index', 2);
    });

    // Lorsque la souris sort d'un .div-service
    $('.div-service').mouseleave(function() {
        // Récupère la classe de catégorie correspondante
        var categoryClass = $(this).attr('class').split(' ')[1];
        // Réinitialise le z-index de l'image correspondante
        $('.service-dd_img_pic.' + categoryClass).css('z-index', 0);
    });
});


//swiper derniers projets
const projectlistSlider = new Swiper(".swiper.is-project", {
  // Parameters
  loop: false,
  slidesPerView: "1.25",
  allowTouchMove: true,
  spaceBetween: 16,

  freeMode: {
    enabled: true,
    sticky: false,
    momentumBounce: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn.next.is-project",
    prevEl: ".swiper-btn.prev.is-project",
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 720px
    540: {
      slidesPerView: 1.25,
    },
    720: {
      slidesPerView: 2.5,
    },
    1280: {
      slidesPerView: 3.5,
    },
    2140: {
      slidesPerView: 4.5,
    },
  },
});

//swiper productions
const productionSlider = new Swiper(".swiper.is-productions", {
 // Parameters
  loop: false,
  slidesPerView: "1.15",
  allowTouchMove: true,
  spaceBetween: 16,

  freeMode: {
    enabled: false,
    sticky: false,
    momentumBounce: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn.next.is-project",
    prevEl: ".swiper-btn.prev.is-project",
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 720px
    540: {
      slidesPerView: 1.15,
    },
    720: {
      slidesPerView: 2.5,
    },
    1280: {
      slidesPerView: 3.5,
    },
    2140: {
      slidesPerView: 4.5,
    },
  },
});


