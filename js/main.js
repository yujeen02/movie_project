document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.querySelector(".movie-container");
  const cartCount = document.getElementById("cartCount");

  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];
  let heartHistory = JSON.parse(localStorage.getItem("heart_history")) || [];

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
        const isLiked = heartHistory.some((item) => item.name === movie.name); // ❤️ 저장된 영화인지 확인

        return `
              <div class="movie-item" data-index="${index}">
                <div class="movieItemBox">
                    <img src="${imagePath}" alt="${
          movie.name
        }" class="movie-img" width="200px" height="300px">  
                    <h2>${movie.name}</h2>
                    <p><strong>러닝타임:</strong> ${movie.runningTime}</p>
                    <p><strong>장르:</strong> ${movie.genre}</p>
                </div>
                <div class="clickHeart1">
                  <img
                    src="${isLiked ? "./heartAll.png" : "./heart.png"}"
                    alt="좋아요"
                    class="heart-icon"
                    data-index="${index}"
                  />
                  <button class="saveBtn" data-index="${index}">상세정보</button>
                </div>
              </div>
          `;
      })
      .join("");
  }

  // 상세 정보 클릭하면 상세페이지로 이동
  document.querySelectorAll(".saveBtn").forEach((movieItem) => {
    movieItem.addEventListener("click", function () {
      let index = this.getAttribute("data-index");
      window.location.href = `detail.html?id=${index}`;
    });
  });

  // 좋아요 버튼 클릭 이벤트 (❤️ localStorage 저장)
  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    heartIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      let index = this.getAttribute("data-index");
      let currentMovie = data_map[index];

      let currentSrc = this.getAttribute("src");
      if (currentSrc.includes("heart.png")) {
        this.setAttribute("src", "./heartAll.png");

        // 좋아요한 영화 저장
        heartHistory.push(currentMovie);
        localStorage.setItem("heart_history", JSON.stringify(heartHistory));
      } else {
        this.setAttribute("src", "./heart.png");

        // 좋아요 취소 (localStorage에서 제거)
        heartHistory = heartHistory.filter(
          (item) => item.name !== currentMovie.name
        );
        localStorage.setItem("heart_history", JSON.stringify(heartHistory));
      }
    });
  });

  updateCartCount();
});
