//swiper project
const projectlistSlider = new Swiper(".swiper.is-project", {
  // Parameters
  loop: false,
  slidesPerView: "1.5",
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
      slidesPerView: 1.5,
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

//swiper inhouse
const projectsSlider = new Swiper(".swiper.is-productions", {
  // Parameters
  loop: false,
  slidesPerView: "auto",
  allowTouchMove: true,
  spaceBetween: 16,

  freeMode: {
    enabled: true,
    sticky: false,
    momentumBounce: true,
  },

  mousewheel: {
    eventsTarget: ".main-wrapper.is-web-project",
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-btn-next.is-inhouse",
    prevEl: ".swiper-btn-prev.is-inhouse",
  },
});

// Fonction pour animer les éléments, changer l'image correspondante et gérer les icônes, executee >992px
function animateFeature(feature, index, restart = false) {
  // Arrêtez toutes les animations en cours si restart est vrai
  if (window.matchMedia("(min-width: 992px)").matches) {
    if (restart) {
      gsap.killTweensOf(
        ".web_feature-text, .web_feature_line, .web_feature_progress, .web_feature-icon"
      );
      gsap.set(".web_feature_line", {
        display: "none",
        autoAlpha: 0,
      });
      gsap.set(".web_feature_progress", {
        display: "none",
        width: "0",
        opacity: 0,
      });

      gsap.to(".web_feature_title", { opacity: 0.5, duration: 0 });
      gsap.to(".web_feature-icon.orange", { autoAlpha: 0, duration: 0 });
      gsap.to(".web_feature-icon.grey", { autoAlpha: 1, duration: 0 });
      gsap.to(".web_feature-text", {
        height: 0,
        autoAlpha: 0,
        duration: 0,
        marginTop: 0,
      });
    }
  }

  // Animer le fond vers #121212 au début de l'animation
  gsap.to(feature, { backgroundColor: "#0a0a0a", duration: 0.5 });

  // Sélectionnez les éléments du bloc actuel
  let text = feature.querySelector(".web_feature-text");
  let line = feature.querySelector(".web_feature_line");
  let title = feature.querySelector(".web_feature_title");
  let progressBar = feature.querySelector(".web_feature_progress");
  let allImages = document.querySelectorAll(".web_feature-img-wrap img");
  let orangeIcon = feature.querySelector(".web_feature-icon.orange");
  let greyIcon = feature.querySelector(".web_feature-icon.grey");

  // Masquez toutes les images avec opacité et affichez uniquement l'image correspondante
  allImages.forEach((img, imgIndex) => {
    if (imgIndex === index) {
      gsap.to(img, { opacity: 1, duration: 0.5 }); // Affiche l'image avec une transition d'opacité
    } else {
      gsap.to(img, { opacity: 0, duration: 0.5 }); // Masque l'image avec une transition d'opacité
    }
  });

  // Affichez le texte et la ligne
  gsap.to(text, {
    height: "auto",
    display: "block",
    autoAlpha: 0.5,
    duration: 0.5,
    marginTop: 32,
  });
  gsap.to(line, { duration: 0.5, display: "block", autoAlpha: 1 });

  // Affichez l'icône orange et cachez l'icône grise pour le bloc en cours
  // Transition des icônes avec l'opacité
  gsap.to(orangeIcon, { autoAlpha: 1, duration: 0.5 });
  gsap.to(greyIcon, { autoAlpha: 0, duration: 0.5 });
  gsap.to(title, { opacity: 1, duration: 0.5 });

  // Animer la barre de progression de 0% à 100% en largeur pendant 5 secondes
  gsap.to(progressBar, {
    duration: 5,
    display: "block",
    ease: "linear",
    width: "100%",
    opacity: 100,
    onComplete: () => {
      console.log("Animation completed for feature", index);

      // Remettez les éléments du bloc actuel en display: none après l'animation
      gsap.to(text, {
        height: 0,
        autoAlpha: 0,
        duration: 0.5,
        display: "none",
      });
      gsap.set(line, { display: "none", autoAlpha: 0 });
      gsap.set(progressBar, { display: "none", width: "0", opacity: 0 });
      gsap.to(title, { opacity: 0.7, duration: 0.5 });

      // Remettez les icônes dans leur état initial après l'animation
      gsap.to(orangeIcon, { autoAlpha: 0, duration: 0.5 });
      gsap.to(greyIcon, { autoAlpha: 1, duration: 0.5 });

      // Animer le fond vers transparent à la fin de l'animation
      gsap.to(feature, {
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.5,
      });

      // Déterminez si nous avons un autre bloc à animer, sinon revenez au premier
      let nextIndex = (index + 1) % features.length;
      animateFeature(features[nextIndex], nextIndex);
    },
  });
}

// Fonction pour démarrer l'animation à partir d'un bloc cliqué et réinitialiser les autres
function startFromFeature(event) {
  if (window.matchMedia("(min-width: 992px)").matches) {
    // Obtenez le bloc sur lequel on a cliqué et son indice
    let featureClicked = event.currentTarget;
    let indexClicked = Array.from(features).indexOf(featureClicked);

    // Réinitialisez les affichages de tous les blocs
    features.forEach((feature, index) => {
      let text = feature.querySelector(".web_feature-text");
      let line = feature.querySelector(".web_feature_line");
      let progressBar = feature.querySelector(".web_feature_progress");
      let orangeIcon = feature.querySelector(".web_feature-icon.orange");
      let greyIcon = feature.querySelector(".web_feature-icon.grey");
      let title = feature.querySelector(".web_feature_title");

      // Masquez les textes et les lignes, réinitialisez les progress bars
      gsap.to(text, {
        height: "0",
        autoAlpha: 0,
        duration: 0.5,
        marginTop: 0,
      });
      gsap.set(line, { autoAlpha: 0, display: "none" });
      gsap.set(progressBar, { opacity: 0, width: 0, display: "none" });
      gsap.to(title, { opacity: 0.7, duration: 0.5 });

      // Réinitialisez les icônes
      gsap.to(".web_feature-icon.orange", { autoAlpha: 0, duration: 0 });
      gsap.to(".web_feature-icon.grey", { autoAlpha: 1, duration: 0 });

      // Réinitialisez le fond si le bloc n'est pas celui cliqué
      if (index !== indexClicked) {
        gsap.to(feature, {
          backgroundColor: "rgba(0, 0, 7, 0)",
          duration: 0.5,
        });
      }
    });

    // Démarrez l'animation pour le bloc cliqué
    animateFeature(featureClicked, indexClicked, true);
  }
}

// Sélectionnez tous les blocs
let features = document.querySelectorAll(".web_feature");

// Ajoutez des écouteurs d'événements pour démarrer l'animation lors du clic sur un bloc
features.forEach((feature, index) => {
  feature.addEventListener("click", startFromFeature);
});

// Lancez l'animation pour le premier élément au chargement de la page
// GSAP ScrollTrigger pour déclencher l'animation du premier élément
if (window.matchMedia("(min-width: 992px)").matches) {
  gsap.to(
    {},
    {
      // Un objet vide car nous n'animons rien directement avec cette timeline
      scrollTrigger: {
        trigger: ".section_home-methodo", // La classe de votre section
        start: "top center", // Commence lorsque le haut de la section atteint le centre de la fenêtre de visualisation
        onEnter: () => animateFeature(features[0], 0, true), // Déclenchez l'animation pour le premier élément
      },
    }
  );
}
