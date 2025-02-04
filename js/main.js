document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.querySelector(".movie-container");
  const cartCount = document.getElementById("cartCount");
  // 모든 영화 정보
  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
  // 장바구니 영화 정보
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];
  // 찜한 영화 정보
  let heartHistory = JSON.parse(localStorage.getItem("heart_history")) || [];

  // 장바구니 개수 증가 감소, 0이면 숨김처리
  function updateCartCount() {
    let count = purchaseHistory.length;
    cartCount.innerText = count;
    cartCount.style.display = count > 0 ? "block" : "none";
  }

  // data_map에 저장된 내용 없을 때
  if (data_map.length === 0) {
    movieContainer.innerHTML = "<p>저장된 영화가 없습니다.</p>";
  } else {
    movieContainer.innerHTML = data_map
      .map((movie) => {
        // 이미지 경로
        const imagePath = `img/${movie.image}`;

        // 좋아요 눌린 영화인지 확인
        const isLiked = heartHistory.some((item) => item.id === movie.id);

        return `
          <div class="movie-item" data-id="${movie.id}">
              <img src="${imagePath}" alt="${
          movie.name
        }" class="movie-img" width="200px" height="300px" onclick="goDetail(${
          movie.id
        })">  
            <div class="clickHeart1">
              <img
                src="${isLiked ? "./heartAll.png" : "./heart.png"}"
                alt="좋아요"
                class="heart-icon"
                data-id="${movie.id}"
                onclick="heartClick(${movie.id})"
              />

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
    // 해당하는 영화의 하트 아이콘
    let heartIcon = document.querySelector(`.heart-icon[data-id="${movieId}"]`);
    // 현재 클릭한 영화 데이터
    let currentMovie = data_map.find((movie) => movie.id == movieId);
    // some: true or false, 이미 찜한 목록에 있는지 확인
    let isLiked = heartHistory.some((item) => item.id == movieId);
    // true: 이미 찜한 목록에 있으면 삭제
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
