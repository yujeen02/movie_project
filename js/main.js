document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.querySelector(".movie-container");
  const cartCount = document.getElementById("cartCount");

  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];
  let heartHistory = JSON.parse(localStorage.getItem("heart_history")) || []; // ❤️ 저장된 좋아요 목록 불러오기

  // 장바구니 개수 증가 감소, 0이면 숨김처리
  function updateCartCount() {
    let count = purchaseHistory.length;
    cartCount.innerText = count;
    cartCount.style.display = count > 0 ? "block" : "none";
  }

  if (data_map.length === 0) {
    movieContainer.innerHTML = "<p>저장된 영화가 없습니다.</p>";
  } else {
    movieContainer.innerHTML = data_map
      .map((movie) => {
        const imagePath = movie.image.includes("/")
          ? movie.image
          : `img/${movie.image}`;
        const isLiked = heartHistory.some((item) => item.id === movie.id);
        // 좋아요 눌린 영화인지 확인

        return `
          <div class="movie-item" data-id="${movie.id}">
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
                data-id="${movie.id}"
                onclick="heartClick(${movie.id})"
              />
              <button class="saveBtn" data-id="${movie.id}" onclick="goDetail(${
          movie.id
        })">상세정보</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // 상세 정보 페이지로 이동하는 함수
  window.goDetail = function (movieId) {
    window.location.href = `detail.html?id=${movieId}`;
  };
  // 버튼 클릭하면 해당 영화의 id 값을 URL의 쿼리스트링인 ?id=영화번호에 추가하여 detail.html 페이지로 이동

  // 좋아요 버튼 클릭 시 영화 추가/삭제
  window.heartClick = function (movieId) {
    let heartIcon = document.querySelector(`.heart-icon[data-id="${movieId}"]`);
    let currentMovie = data_map.find((movie) => movie.id == movieId);
    // 숫자로 변환하여 비교

    if (!currentMovie) return;

    let isLiked = heartHistory.some((item) => item.id == movieId);
    // 숫자로 비교

    if (isLiked) {
      heartHistory = heartHistory.filter((item) => item.id != movieId);
      heartIcon.src = "./heart.png"; // 좋아요 취소
    } else {
      heartHistory.push(currentMovie);
      heartIcon.src = "./heartAll.png"; // 좋아요 및 local에 저장
    }

    localStorage.setItem("heart_history", JSON.stringify(heartHistory));
  };

  updateCartCount();
});
