(function () {
  if (typeof jQuery === "undefined") {
    const script = document.createElement("script");
    script.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    script.onload = function () {
      loadFancybox();
    };
    document.head.appendChild(script);
  } else {
    loadFancybox();
  }

  function loadFancybox() {
    const fancyboxCSS = document.createElement("link");
    fancyboxCSS.rel = "stylesheet";
    fancyboxCSS.href =
      "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css";
    document.head.appendChild(fancyboxCSS);

    const fancyboxJS = document.createElement("script");
    fancyboxJS.src =
      "https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js";
    fancyboxJS.onload = function () {
      loadSlick();
    };
    document.head.appendChild(fancyboxJS);
  }

  function loadSlick() {
    const slickCSS = document.createElement("link");
    slickCSS.rel = "stylesheet";
    slickCSS.href =
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
    document.head.appendChild(slickCSS);

    const slickThemeCSS = document.createElement("link");
    slickThemeCSS.rel = "stylesheet";
    slickThemeCSS.href =
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
    document.head.appendChild(slickThemeCSS);

    const slickJS = document.createElement("script");
    slickJS.src =
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
    slickJS.onload = function () {
      loadFontAwesome();
    };
    document.head.appendChild(slickJS);
  }

  function loadFontAwesome() {
    const fontAwesome = document.createElement("link");
    fontAwesome.rel = "stylesheet";
    fontAwesome.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    document.head.appendChild(fontAwesome);

    setTimeout(initializeApp, 500);
  }

  function initializeApp() {
    document.body.innerHTML = "";

    const styles = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    overflow-x: hidden;
                    color: #333;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 20px;
                    margin-bottom: 30px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .logo {
                    font-size: 2rem;
                    font-weight: bold;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .search-container {
                    position: relative;
                    flex: 1;
                    max-width: 400px;
                }

                .search-input {
                    width: 100%;
                    padding: 12px 45px 12px 15px;
                    border: 2px solid #e1e1e1;
                    border-radius: 25px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .search-btn {
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    border: none;
                    padding: 8px 12px;
                    border-radius: 20px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .search-btn:hover {
                    transform: translateY(-50%) scale(1.05);
                }

                .cart-toggle {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .cart-toggle:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }

                .cart-count {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4757;
                    color: white;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                }

                .carousel-container {
                    margin-bottom: 40px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 30px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .carousel-title {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 30px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .carousel-item {
                    padding: 10px;
                }

                .carousel-card {
                    background: white;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .carousel-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                }

                .carousel-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .carousel-info {
                    padding: 20px;
                    text-align: center;
                }

                .carousel-title-item {
                    font-size: 1.1rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333;
                }

                .carousel-price {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #667eea;
                }

                .main-content {
                    display: flex;
                    gap: 30px;
                    flex-wrap: wrap;
                }

                .products-section {
                    flex: 1;
                    min-width: 300px;
                }

                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 25px;
                }

                .product-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .product-card.show {
                    opacity: 1;
                    transform: translateY(0);
                }

                .product-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
                }

                .product-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    cursor: pointer;
                }

                .product-info {
                    padding: 20px;
                }

                .product-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333;
                    line-height: 1.4;
                }

                .product-category {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    display: inline-block;
                    margin-bottom: 10px;
                }

                .product-description {
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    margin-bottom: 15px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .product-price {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #667eea;
                    margin-bottom: 15px;
                }

                .product-rating {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .stars {
                    color: #ffd700;
                }

                .rating-text {
                    color: #666;
                    font-size: 0.9rem;
                }

                .product-actions {
                    display: flex;
                    gap: 10px;
                }

                .btn {
                    padding: 12px 20px;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .btn-primary {
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    flex: 1;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
                }

                .btn-secondary {
                    background: transparent;
                    color: #667eea;
                    border: 2px solid #667eea;
                }

                .btn-secondary:hover {
                    background: #667eea;
                    color: white;
                    transform: translateY(-2px);
                }

                .cart-sidebar {
                    width: 350px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 25px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 20px;
                    height: fit-content;
                    max-height: calc(100vh - 40px);
                    overflow-y: auto;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                    
                }

                .cart-sidebar.show {
                    transform: translateX(0);
                }

                .cart-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #f0f0f0;
                }

                .cart-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .cart-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #999;
                    transition: color 0.3s ease;
                }

                .cart-close:hover {
                    color: #333;
                }

                .cart-items {
                    margin-bottom: 20px;
                }

                .cart-item {
                    display: flex;
                    gap: 15px;
                    padding: 15px;
                    border: 1px solid #f0f0f0;
                    border-radius: 10px;
                    margin-bottom: 15px;
                    transition: all 0.3s ease;
                }

                .cart-item:hover {
                    background: #f8f9fa;
                    transform: translateX(5px);
                }

                .cart-item-image {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                .cart-item-info {
                    flex: 1;
                }

                .cart-item-title {
                    font-weight: bold;
                    font-size: 0.9rem;
                    margin-bottom: 5px;
                    line-height: 1.3;
                }

                .cart-item-price {
                    color: #667eea;
                    font-weight: bold;
                    font-size: 1rem;
                }

                .cart-item-remove {
                    background: #ff4757;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.3s ease;
                }

                .cart-item-remove:hover {
                    background: #ff3742;
                    transform: scale(1.1);
                }

                .cart-total {
                    border-top: 2px solid #f0f0f0;
                    padding-top: 15px;
                    margin-bottom: 20px;
                }

                .total-text {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .total-amount {
                    color: #667eea;
                    font-size: 1.5rem;
                }

                .cart-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .empty-cart {
                    text-align: center;
                    padding: 40px 20px;
                    color: #999;
                }

                .empty-cart i {
                    font-size: 3rem;
                    margin-bottom: 15px;
                    opacity: 0.5;
                }

                .loading {
                    text-align: center;
                    padding: 50px;
                    font-size: 1.2rem;
                    color: #667eea;
                }

                .loading i {
                    animation: spin 1s linear infinite;
                    font-size: 2rem;
                    margin-bottom: 15px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .error {
                    text-align: center;
                    padding: 50px;
                    color: #ff4757;
                }

                .slick-prev, .slick-next {
                    z-index: 1;
                }

                .slick-prev {
                    left: 10px;
                }

                .slick-next {
                    right: 10px;
                }

                .slick-dots {
                    bottom: 20px;
                }

                .slick-dots li button:before {
                    color: #667eea;
                    font-size: 12px;
                }

                .slick-dots li.slick-active button:before {
                    color: #764ba2;
                }

                .slick-slider {
                    position: static !important;
                }

                .featured-carousel .slick-slider {
                    position: static !important;
                }

                @media (max-width: 768px) {
                    .container {
                        padding: 15px;
                    }

                    .header-content {
                        flex-direction: column;
                        text-align: center;
                    }

                    .main-content {
                        flex-direction: column;
                    }

                    .cart-sidebar {
                        width: 100%;
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        max-height: 100vh;
                        z-index: 1000;
                        border-radius: 0;
                    }

                    .products-grid {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 20px;
                    }

                    .logo {
                        font-size: 1.5rem;
                    }

                    .carousel-title {
                        font-size: 1.5rem;
                    }
                }

                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                    transform: translateX(400px);
                    transition: all 0.3s ease;
                }

                .notification.show {
                    transform: translateX(0);
                }

                .notification.success {
                    background: linear-gradient(45deg, #2ed573, #1e90ff);
                }

                .notification.error {
                    background: linear-gradient(45deg, #ff4757, #ff3742);
                }
            </style>
        `;

    const html = `
            ${styles}
            <div class="container">
                <div class="header">
                    <div class="header-content">
                        <div class="logo">
                            <i class="fas fa-shopping-bag"></i> MiniMart
                        </div>
                        <div class="search-container">
                            <input type="text" id="searchInput" class="search-input" placeholder="Ürün ID ile ara (1-20)">
                            <button id="searchBtn" class="search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <button id="cartToggle" class="cart-toggle">
                            <i class="fas fa-shopping-cart"></i>
                            Sepet
                            <span id="cartCount" class="cart-count">0</span>
                        </button>
                    </div>
                </div>

                <div class="carousel-container">
                    <h2 class="carousel-title">Öne Çıkan Ürünler</h2>
                    <div id="featuredCarousel" class="featured-carousel">
                    </div>
                </div>

                <div class="main-content">
                    <div class="products-section">
                        <div id="productsGrid" class="products-grid">
                            <div class="loading">
                                <i class="fas fa-spinner"></i>
                                <div>Ürünler yükleniyor...</div>
                            </div>
                        </div>
                    </div>

                    <div id="cartSidebar" class="cart-sidebar">
                        <div class="cart-header">
                            <h3 class="cart-title">
                                <i class="fas fa-shopping-cart"></i> Sepetim
                            </h3>
                            <button id="cartClose" class="cart-close">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div id="cartItems" class="cart-items">
                            <div class="empty-cart">
                                <i class="fas fa-shopping-cart"></i>
                                <div>Sepetiniz boş</div>
                            </div>
                        </div>
                        <div id="cartTotal" class="cart-total" style="display: none;">
                            <div class="total-text">
                                <span>Toplam:</span>
                                <span id="totalAmount" class="total-amount">$0.00</span>
                            </div>
                        </div>
                        <div class="cart-actions">
                            <button id="clearCart" class="btn btn-secondary" style="display: none;">
                                <i class="fas fa-trash"></i> Sepeti Temizle
                            </button>
                            <button id="checkout" class="btn btn-primary" style="display: none;">
                                <i class="fas fa-credit-card"></i> Satın Al
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.innerHTML = html;

    $(document).ready(function () {
      let products = [];
      let cart = JSON.parse(localStorage.getItem("minimart-cart")) || [];
      let searchTimeout;

      const ecommerceApp = {
        init() {
          this.setupEventListeners();
          this.loadProducts();
          this.updateCartUI();
          this.setupPlugins();
        },

        setupEventListeners() {
          $("#cartToggle").on("click", this.toggleCart);
          $("#cartClose").on("click", this.closeCart);
          $("#clearCart").on("click", this.clearCart.bind(this));
          $("#searchInput").on("input", this.handleSearch.bind(this));
          $("#searchBtn").on("click", this.performSearch.bind(this));
          $("#checkout").on("click", this.checkout.bind(this));

          $(document).on("click", ".add-to-cart", this.addToCart.bind(this));
          $(document).on(
            "click",
            ".remove-from-cart",
            this.removeFromCart.bind(this)
          );
          $(document).on(
            "click",
            ".product-image",
            this.showProductModal.bind(this)
          );
          $(document).on(
            "click",
            ".view-details",
            this.showProductModal.bind(this)
          );

          $(document).on("mouseenter", ".product-card", function () {
            $(this).find(".product-image").css({
              transform: "scale(1.05)",
              transition: "transform 0.2s ease",
            });
          });

          $(document).on("mouseleave", ".product-card", function () {
            $(this).find(".product-image").css({
              transform: "scale(1)",
              transition: "transform 0.2s ease",
            });
          });
        },

        loadProducts() {
          $.ajax({
            url: "https://fakestoreapi.com/products",
            method: "GET",
            success: (data) => {
              products = data;
              this.displayProducts(products);
              this.setupCarousel();
            },
            error: () => {
              $("#productsGrid").html(`
                                <div class="error">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <div>Ürünler yüklenirken hata oluştu</div>
                                </div>
                            `);
            },
          });
        },

        displayProducts(productsToShow) {
          const $grid = $("#productsGrid");
          $grid.empty();

          $.each(productsToShow, (index, product) => {
            const $card = this.createProductCard(product);
            $grid.append($card);

            setTimeout(() => {
              $card.addClass("show");
            }, index * 100);
          });
        },

        createProductCard(product) {
          const stars = this.generateStars(product.rating.rate);

          return $(`
                        <div class="product-card" data-product-id="${product.id}">
                            <img src="${product.image}" alt="${product.title}" class="product-image" data-fancybox="gallery" data-caption="${product.title}">
                            <div class="product-info">
                                <h3 class="product-title">${product.title}</h3>
                                <span class="product-category">${product.category}</span>
                                <p class="product-description">${product.description}</p>
                                <div class="product-rating">
                                    <div class="stars">${stars}</div>
                                    <span class="rating-text">(${product.rating.count} değerlendirme)</span>
                                </div>
                                <div class="product-price">$${product.price}</div>
                                <div class="product-actions">
                                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                                        <i class="fas fa-cart-plus"></i> Sepete Ekle
                                    </button>
                                    <button class="btn btn-secondary view-details" data-product-id="${product.id}">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `);
        },

        generateStars(rating) {
          const fullStars = Math.floor(rating);
          const hasHalfStar = rating % 1 !== 0;
          let stars = "";

          for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
          }

          if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
          }

          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
          for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
          }

          return stars;
        },

        setupCarousel() {
          const featuredProducts = products.slice(0, 8);
          const $carousel = $("#featuredCarousel");

          $.each(featuredProducts, (index, product) => {
            const $item = $(`
                            <div class="carousel-item">
                                <div class="carousel-card" data-product-id="${
                                  product.id
                                }">
                                    <img src="${product.image}" alt="${
              product.title
            }" class="carousel-image">
                                    <div class="carousel-info">
                                        <h4 class="carousel-title-item">${product.title.substring(
                                          0,
                                          50
                                        )}...</h4>
                                        <div class="carousel-price">$${
                                          product.price
                                        }</div>
                                    </div>
                                </div>
                            </div>
                        `);
            $carousel.append($item);
          });

          $carousel.slick({
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
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                },
              },
            ],
          });

          $(document).on("click", ".carousel-card", function () {
            const productId = $(this).data("product-id");
            const product = products.find((p) => p.id === productId);
            if (product) {
              ecommerceApp.showProductModal.call(this, { target: this });
            }
          });
        },

        addToCart(e) {
          const productId = parseInt(
            $(e.target).closest(".add-to-cart").data("product-id")
          );
          const product = products.find((p) => p.id === productId);

          if (!product) return;

          const existingItem = cart.find((item) => item.id === productId);

          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            });
          }

          this.saveCart();
          this.updateCartUI();
          this.showNotification(`${product.title} sepete eklendi!`, "success");

          $(e.target)
            .closest(".btn")
            .css("transform", "scale(0.95)")
            .delay(100)
            .queue(function (next) {
              $(this).css("transform", "scale(1)");
              next();
            });
        },

        removeFromCart(e) {
          const productId = parseInt(
            $(e.target).closest(".remove-from-cart").data("product-id")
          );
          const itemIndex = cart.findIndex((item) => item.id === productId);

          if (itemIndex > -1) {
            const removedItem = cart[itemIndex];
            cart.splice(itemIndex, 1);
            this.saveCart();
            this.updateCartUI();
            this.showNotification(
              `${removedItem.title} sepetten kaldırıldı!`,
              "success"
            );
          }
        },

        clearCart() {
          if (cart.length === 0) return;

          if (confirm("Sepeti temizlemek istediğinizden emin misiniz?")) {
            cart = [];
            this.saveCart();
            this.updateCartUI();
            this.showNotification("Sepet temizlendi!", "success");
          }
        },

        checkout() {
          if (cart.length === 0) return;

          const total = this.calculateTotal();
          if (
            confirm(
              `Toplam ${total.toFixed(
                2
              )} $ tutarındaki siparişi onaylıyor musunuz?`
            )
          ) {
            cart = [];
            this.saveCart();
            this.updateCartUI();
            this.showNotification("Siparişiniz başarıyla alındı!", "success");
            this.closeCart();
          }
        },

        updateCartUI() {
          const $cartItems = $("#cartItems");
          const $cartCount = $("#cartCount");
          const $cartTotal = $("#cartTotal");
          const $clearBtn = $("#clearCart");
          const $checkoutBtn = $("#checkout");
          const $totalAmount = $("#totalAmount");

          $cartCount.text(cart.length);

          if (cart.length === 0) {
            $cartItems.html(`
                            <div class="empty-cart">
                                <i class="fas fa-shopping-cart"></i>
                                <div>Sepetiniz boş</div>
                            </div>
                        `);
            $cartTotal.hide();
            $clearBtn.hide();
            $checkoutBtn.hide();
          } else {
            $cartItems.empty();

            $.each(cart, (index, item) => {
              const $cartItem = $(`
                                <div class="cart-item">
                                    <img src="${item.image}" alt="${
                item.title
              }" class="cart-item-image">
                                    <div class="cart-item-info">
                                        <div class="cart-item-title">${item.title.substring(
                                          0,
                                          50
                                        )}...</div>
                                        <div class="cart-item-price">$${
                                          item.price
                                        } x ${item.quantity}</div>
                                    </div>
                                    <button class="cart-item-remove remove-from-cart" data-product-id="${
                                      item.id
                                    }">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `);
              $cartItems.append($cartItem);
            });

            const total = this.calculateTotal();
            $totalAmount.text(`$${total.toFixed(2)}`);
            $cartTotal.show();
            $clearBtn.show();
            $checkoutBtn.show();
          }
        },

        calculateTotal() {
          return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },

        toggleCart() {
          $("#cartSidebar").toggleClass("show");
        },

        closeCart() {
          $("#cartSidebar").removeClass("show");
        },

        saveCart() {
          localStorage.setItem("minimart-cart", JSON.stringify(cart));
        },

        handleSearch(e) {
          clearTimeout(searchTimeout);
          const query = $(e.target).val().trim();

          searchTimeout = setTimeout(() => {
            if (query === "") {
              this.displayProducts(products);
            } else {
              this.performSearch();
            }
          }, 300);
        },

        performSearch() {
          const query = $("#searchInput").val().trim();

          if (query === "") {
            this.displayProducts(products);
            return;
          }

          if (/^\d+$/.test(query)) {
            const productId = parseInt(query);
            if (productId >= 1 && productId <= 20) {
              $.ajax({
                url: `https://fakestoreapi.com/products/${productId}`,
                method: "GET",
                success: (product) => {
                  this.displayProducts([product]);
                  this.showNotification(
                    `Ürün bulundu: ${product.title}`,
                    "success"
                  );
                },
                error: () => {
                  this.showNotification("Ürün bulunamadı!", "error");
                  this.displayProducts([]);
                },
              });
            } else {
              this.showNotification(
                "Geçerli bir ürün ID giriniz (1-20)",
                "error"
              );
            }
          } else {
            const filteredProducts = products.filter(
              (product) =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            );
            this.displayProducts(filteredProducts);

            if (filteredProducts.length === 0) {
              this.showNotification(
                "Arama kriterlerinize uygun ürün bulunamadı!",
                "error"
              );
            }
          }
        },

        showProductModal(e) {
          const productId = parseInt(
            $(e.target).closest("[data-product-id]").data("product-id")
          );
          const product = products.find((p) => p.id === productId);

          if (!product) return;

          const stars = this.generateStars(product.rating.rate);

          const modalContent = `
                        <div style="max-width: 600px; padding: 30px;">
                            <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                                <div style="flex: 1; min-width: 250px;">
                                    <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 300px; border-radius: 10px;">
                                </div>
                                <div style="flex: 1; min-width: 250px;">
                                    <h2 style="margin-bottom: 15px; color: #333;">${product.title}</h2>
                                    <span style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.9rem; margin-bottom: 15px; display: inline-block;">${product.category}</span>
                                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                                        <div style="color: #ffd700;">${stars}</div>
                                        <span style="color: #666;">(${product.rating.count} değerlendirme)</span>
                                    </div>
                                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${product.description}</p>
                                    <div style="font-size: 2rem; font-weight: bold; color: #667eea; margin-bottom: 25px;">$${product.price}</div>
                                    <button onclick="ecommerceApp.addToCartFromModal(${product.id})" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: bold; cursor: pointer; width: 100%; transition: all 0.3s ease;">
                                        <i class="fas fa-cart-plus" style="margin-right: 8px;"></i> Sepete Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;

          $.fancybox.open({
            src: modalContent,
            type: "html",
            opts: {
              width: "90%",
              height: "auto",
              autoFocus: false,
              touch: {
                vertical: true,
                momentum: true,
              },
            },
          });
        },

        addToCartFromModal(productId) {
          const product = products.find((p) => p.id === productId);
          if (!product) return;

          const existingItem = cart.find((item) => item.id === productId);

          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1,
            });
          }

          this.saveCart();
          this.updateCartUI();
          this.showNotification(`${product.title} sepete eklendi!`, "success");
          $.fancybox.close();
        },

        setupPlugins() {
          $.fn.extend({
            addToCartPlugin: function (productData) {
              return this.each(function () {
                const $btn = $(this);
                $btn.on("click", function () {
                  const existingItem = cart.find(
                    (item) => item.id === productData.id
                  );

                  if (existingItem) {
                    existingItem.quantity += 1;
                  } else {
                    cart.push({
                      id: productData.id,
                      title: productData.title,
                      price: productData.price,
                      image: productData.image,
                      quantity: 1,
                    });
                  }

                  ecommerceApp.saveCart();
                  ecommerceApp.updateCartUI();
                  ecommerceApp.showNotification(
                    `${productData.title} sepete eklendi!`,
                    "success"
                  );
                });
              });
            },
          });
        },

        showNotification(message, type = "success") {
          const $notification = $(`
                        <div class="notification ${type}">
                            <i class="fas fa-${
                              type === "success"
                                ? "check-circle"
                                : "exclamation-triangle"
                            }"></i>
                            ${message}
                        </div>
                    `);

          $("body").append($notification);

          setTimeout(() => {
            $notification.addClass("show");
          }, 100);

          setTimeout(() => {
            $notification.removeClass("show");
            setTimeout(() => {
              $notification.remove();
            }, 300);
          }, 3000);
        },
      };

      window.ecommerceApp = ecommerceApp;
      ecommerceApp.init();
    });
  }
})();
