document.addEventListener("DOMContentLoaded", function () {
  const heartContainer = document.querySelector(".heart-history");
  let heartHistory = JSON.parse(localStorage.getItem("heart_history")) || [];

  // 좋아요한 영화 목록을 업데이트하는 함수
  function updateHeartHistory() {
    if (heartHistory.length === 0) {
      heartContainer.innerHTML = "<p>좋아요한 영화가 없습니다.</p>";
    } else {
      heartContainer.innerHTML = heartHistory
        .map((movie) => {
          const imagePath = movie.image.includes("/")
            ? movie.image
            : `img/${movie.image}`;

          return `
            <div class="movie-item">
              <div class="movieItemBox">
                  <img src="${imagePath}" alt="${movie.name}" class="movie-img" width="200px" height="300px">  
                  <h2>${movie.name}</h2>
                  <p><strong>러닝타임:</strong> ${movie.runningTime}</p>
                  <p><strong>장르:</strong> ${movie.genre}</p>
              </div>
              <div class="clickHeart1">
                <img
                  src="./heartAll.png"
                  alt="좋아요"
                  class="heart-icon"
                  data-name="${movie.name}"
                   onclick="removeHeart('${movie.id}')"
                />
                <button class="saveBtn" onclick="goDetail(${movie.id})">상세정보</button>
              </div>
            </div>
          `;
        })
        .join("");
    }
  }

  // 상세 정보 클릭하면 상세페이지로 이동
  window.goDetail = function (movieId) {
    window.location.href = `detail.html?id=${movieId}`;
  };

  // 좋아요 취소 -> heart.html에서도 없애기
  window.removeHeart = function (movieid) {
    heartHistory = heartHistory.filter((item) => item.id !== movieid);
    localStorage.setItem("heart_history", JSON.stringify(heartHistory));

    updateHeartHistory(); // 화면 업데이트
  };

  updateHeartHistory();
});
