$(document).ready(function () {
  let profiles = [];
  let stats = {
    total: 0,
    countries: new Set(),
    maleCount: 0,
    femaleCount: 0,
    totalAge: 0,
  };

  init();

  function init() {
    setupEventListeners();
    loadInitialProfiles();
    initializeSlider();
    setupFancybox();
  }

  function setupEventListeners() {
    $("#loadProfiles").on("click", function () {
      $(this).addClass("shake");
      setTimeout(() => $(this).removeClass("shake"), 500);
      loadProfiles();
    });

    $(document).on("mouseenter", ".profile-card", function () {
      $(this).find(".profile-avatar").addClass("bounce");
    });

    $(document).on("mouseleave", ".profile-card", function () {
      $(this).find(".profile-avatar").removeClass("bounce");
    });

    $(".stat-item").on("mouseenter", function () {
      $(this).find(".counter").addClass("pulse");
    });

    $(".stat-item").on("mouseleave", function () {
      $(this).find(".counter").removeClass("pulse");
    });
  }

  function loadInitialProfiles() {
    loadProfiles();
  }

  function loadProfiles() {
    showLoading();

    $("#profileContainer").empty();

    stats = {
      total: 0,
      countries: new Set(),
      maleCount: 0,
      femaleCount: 0,
      totalAge: 0,
    };

    $.ajax({
      url: "https://randomuser.me/api/?results=12&inc=name,email,picture,location,dob,gender,phone,login",
      method: "GET",
      success: function (data) {
        profiles = data.results;
        hideLoading();
        displayProfiles();
        updateSlider();
        updateStatistics();
        animateStatistics();
      },
      error: function () {
        hideLoading();
        showError();
      },
    });
  }

  function showLoading() {
    $("#loadingSpinner").fadeIn(300);
    $("#loadProfiles")
      .prop("disabled", true)
      .html('<i class="fas fa-spinner fa-spin me-2"></i>Yükleniyor...');
  }

  function hideLoading() {
    $("#loadingSpinner").fadeOut(300);
    $("#loadProfiles")
      .prop("disabled", false)
      .html('<i class="fas fa-refresh me-2"></i>Yeni Profiller Yükle');
  }

  function showError() {
    const errorHtml = `
            <div class="col-12 text-center">
                <div class="alert alert-danger d-inline-block">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Profiller yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
                </div>
            </div>
        `;
    $("#profileContainer").html(errorHtml);
  }

  function displayProfiles() {
    const container = $("#profileContainer");

    profiles.forEach((user, index) => {
      const profileCard = createProfileCard(user, index);
      container.append(profileCard);

      setTimeout(() => {
        $(`#profile-${index}`)
          .addClass("animate-in")
          .css("animation-delay", `${index * 100}ms`);
      }, 100);
    });
  }

  function createProfileCard(user, index) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const location = `${user.location.city}, ${user.location.country}`;
    const age = user.dob.age;
    const phone = user.phone;

    updateStats(user);

    return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="profile-card" id="profile-${index}" data-profile-index="${index}">
                    <div class="profile-header">
                        <img src="${
                          user.picture.large
                        }" alt="${fullName}" class="profile-avatar">
                    </div>
                    <div class="profile-body">
                        <h3 class="profile-name">${fullName}</h3>
                        <p class="profile-email">${user.email}</p>
                        
                        <div class="profile-info">
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div class="info-value">${
                                  user.location.city
                                }</div>
                                <div class="info-label">Şehir</div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-birthday-cake"></i>
                                <div class="info-value">${age}</div>
                                <div class="info-label">Yaş</div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-${
                                  user.gender === "male" ? "mars" : "venus"
                                }"></i>
                                <div class="info-value">${
                                  user.gender === "male" ? "Erkek" : "Kadın"
                                }</div>
                                <div class="info-label">Cinsiyet</div>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="btn btn-profile" onclick="openProfileModal(${index})">
                                <i class="fas fa-eye me-2"></i>Detayları Gör
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  function updateStats(user) {
    stats.total++;
    stats.countries.add(user.location.country);
    if (user.gender === "male") {
      stats.maleCount++;
    } else {
      stats.femaleCount++;
    }
    stats.totalAge += user.dob.age;
  }

  function updateStatistics() {
    const averageAge = Math.round(stats.totalAge / stats.total);
    const malePercentage = Math.round((stats.maleCount / stats.total) * 100);
    const femalePercentage = Math.round(
      (stats.femaleCount / stats.total) * 100
    );

    $("#totalProfiles").text(stats.total);
    $("#totalCountries").text(stats.countries.size);
    $("#genderRatio").text(`${malePercentage}/${femalePercentage}`);
    $("#averageAge").text(averageAge);
  }

  function animateStatistics() {
    $(".counter").each(function () {
      const $this = $(this);
      const countTo = parseInt($this.text()) || 0;

      if (countTo > 0) {
        $this.prop("Counter", 0).animate(
          {
            Counter: countTo,
          },
          {
            duration: 2000,
            easing: "swing",
            step: function (now) {
              if ($this.attr("id") === "genderRatio") {
                return;
              }
              $this.text(Math.ceil(now));
            },
          }
        );
      }
    });
  }

  function initializeSlider() {
    $("#profileSlider").slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  function updateSlider() {
    $("#profileSlider").slick("unslick");
    $("#profileSlider").empty();

    const featuredProfiles = profiles.slice(0, 6);

    featuredProfiles.forEach((user, index) => {
      const sliderItem = createSliderItem(user, index);
      $("#profileSlider").append(sliderItem);
    });

    initializeSlider();
  }

  function createSliderItem(user, index) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const location = `${user.location.city}, ${user.location.country}`;

    return `
            <div class="slider-item">
                <div class="slider-card" onclick="openProfileModal(${index})">
                    <img src="${user.picture.large}" alt="${fullName}" class="slider-avatar">
                    <h4 class="slider-name">${fullName}</h4>
                    <p class="slider-location">
                        <i class="fas fa-map-marker-alt me-1"></i>${location}
                    </p>
                </div>
            </div>
        `;
  }

  function setupFancybox() {
    Fancybox.bind("[data-fancybox]", {});
  }

  window.openProfileModal = function (index) {
    const user = profiles[index];
    if (!user) return;

    const modalContent = createModalContent(user);

    Fancybox.show([
      {
        src: modalContent,
        type: "html",
        opts: {
          width: 600,
          height: "auto",
          autoFocus: false,
          touch: {
            vertical: true,
            momentum: true,
          },
          buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close",
          ],
        },
      },
    ]);
  };

  function createModalContent(user) {
    const fullName = `${user.name.first} ${user.name.last}`;
    const location = `${user.location.city}, ${user.location.country}`;
    const birthDate = new Date(user.dob.date).toLocaleDateString("tr-TR");
    const address = `${user.location.street.number} ${user.location.street.name}`;

    return `
            <div class="profile-modal">
                <div class="modal-content">
                    <img src="${
                      user.picture.large
                    }" alt="${fullName}" class="modal-avatar">
                    <h2 class="modal-name">${fullName}</h2>
                    <p class="modal-email">
                        <i class="fas fa-envelope me-2"></i>${user.email}
                    </p>
                    
                    <div class="modal-details">
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div class="detail-value">${location}</div>
                            <div class="detail-label">Konum</div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-birthday-cake"></i>
                            <div class="detail-value">${user.dob.age} yaş</div>
                            <div class="detail-label">Yaş</div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <div class="detail-value">${birthDate}</div>
                            <div class="detail-label">Doğum Tarihi</div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-phone"></i>
                            <div class="detail-value">${user.phone}</div>
                            <div class="detail-label">Telefon</div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-${
                              user.gender === "male" ? "mars" : "venus"
                            }"></i>
                            <div class="detail-value">${
                              user.gender === "male" ? "Erkek" : "Kadın"
                            }</div>
                            <div class="detail-label">Cinsiyet</div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-home"></i>
                            <div class="detail-value">${address}</div>
                            <div class="detail-label">Adres</div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-4">
                        <button class="btn btn-profile" onclick="Fancybox.close()">
                            <i class="fas fa-times me-2"></i>Kapat
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  function addCustomAnimations() {
    $(".btn").on("click", function () {
      $(this).addClass("shake");
      setTimeout(() => $(this).removeClass("shake"), 500);
    });

    $(window).scroll(function () {
      $(".stat-item").each(function () {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          $(this).addClass("fade-in");
        }
      });
    });

    $(".profile-card").hover(
      function () {
        $(this).addClass("shadow-lg").removeClass("shadow");
      },
      function () {
        $(this).addClass("shadow").removeClass("shadow-lg");
      }
    );

    $(".profile-card").on("mouseenter", function () {
      $(this).find(".profile-name").fadeTo(200, 0.7);
      $(this).find(".profile-email").fadeTo(200, 0.7);
    });

    $(".profile-card").on("mouseleave", function () {
      $(this).find(".profile-name").fadeTo(200, 1);
      $(this).find(".profile-email").fadeTo(200, 1);
    });
  }

  addCustomAnimations();

  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();
    const target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 100,
        },
        1000
      );
    }
  });

  $(window).on("load", function () {
    $("body").addClass("loaded");
    $(".profile-card").each(function (index) {
      $(this)
        .delay(index * 100)
        .queue(function () {
          $(this).addClass("slide-down").dequeue();
        });
    });
  });

  $(document).on("error", "img", function () {
    $(this).attr(
      "src",
      "https://via.placeholder.com/150x150/667eea/ffffff?text=User"
    );
  });

  $(document).on("keydown", ".profile-card", function (e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      const index = $(this).data("profile-index");
      openProfileModal(index);
    }
  });

  $(".profile-card").attr("tabindex", "0");

  function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  lazyLoadImages();

  $(document)
    .ajaxStart(function () {
      $("body").addClass("loading");
    })
    .ajaxStop(function () {
      $("body").removeClass("loading");
    });

  console.log(
    "%c🎉 Rastgele Profil Kartları Uygulaması Yüklendi!",
    "color: #667eea; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%c✨ Random User API ile güçlendirilmiştir.",
    "color: #764ba2; font-size: 12px;"
  );
});
