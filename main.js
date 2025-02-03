document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.querySelector(".movie-container");
  const cartCount = document.getElementById("cartCount");

  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];

  // 장바구니 개수 업데이트 함수
  function updateCartCount() {
    let count = purchaseHistory.length;
    cartCount.innerText = count;
    cartCount.style.display = count > 0 ? "block" : "none";
  }

  if (data_map.length === 0) {
    movieContainer.innerHTML = "<p>저장된 영화가 없습니다.</p>";
  } else {
    movieContainer.innerHTML = data_map
      .map((movie, index) => {
        const imagePath = movie.image.includes("/")
          ? movie.image
          : `img/${movie.image}`;

        return `
              <div class="movie-item" data-index="${index}">
                  <img src="${imagePath}" alt="${movie.name}" class="movie-img" width="200px" height="300px">  
                  <h2>${movie.name}</h2>
                  <p><strong>러닝타임:</strong> ${movie.runningTime}</p>
                  <p><strong>장르:</strong> ${movie.genre}</p>
                  <div class="clickHeart1">
                    <img
                      src="./heart.png"
                      alt="좋아요"
                      class="heart-icon"
                      data-index="${index}"
                    />
                  </div>
              </div>
          `;
      })
      .join("");
  }

  // 영화 목록에서 클릭하면 상세페이지로 이동
  document.querySelectorAll(".movie-item").forEach((movieItem) => {
    movieItem.addEventListener("click", function () {
      let index = this.getAttribute("data-index");
      window.location.href = `detail.html?id=${index}`;
    });
  });

  // 좋아요 버튼 클릭 이벤트
  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    heartIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      // 부모 div 클릭 방지 (상세페이지 이동 방지)

      let currentSrc = this.getAttribute("src");

      if (currentSrc.includes("heart.png")) {
        this.setAttribute("src", "./heartAll.png");
      } else {
        this.setAttribute("src", "./heart.png");
      }
    });
  });

  // 페이지 로드 시 장바구니 개수 업데이트
  updateCartCount();
});
