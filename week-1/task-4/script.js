const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

const favoriteBtn = document.getElementById("favorite-btn");
let isFavorited = false;

favoriteBtn.addEventListener("click", () => {
  isFavorited = !isFavorited;

  if (isFavorited) {
    favoriteBtn.classList.add("favorited");
    favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorilerde!';

    favoriteBtn.style.transform = "scale(1.1)";
    setTimeout(() => {
      favoriteBtn.style.transform = "scale(1)";
    }, 200);

    showNotification("Dark favorilere eklendi!");
  } else {
    favoriteBtn.classList.remove("favorited");
    favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorilere Ekle';
    showNotification("Dark favorilerden çıkarıldı!");
  }
});

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(39, 174, 96, 0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
