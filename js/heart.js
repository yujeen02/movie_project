const heartContainer = document.querySelector(".heart-history");
const cartCount = document.getElementById("cartCount");
let purchaseHistory =
  JSON.parse(localStorage.getItem("purchase_history")) || [];

let heartHistory = JSON.parse(localStorage.getItem("heart_history")) || [];

//데이터 화면에 띄우기
const updateHeartHistory = () => {
  if (heartHistory.length === 0) {
    heartContainer.innerHTML = "<p>좋아요한 영화가 없습니다.</p>";
  } else {
    heartContainer.innerHTML = heartHistory
      .map((movie) => {
        const imagePath = movie.image.includes("/")
          ? movie.image
          : `img/${movie.image}`;

        return `
          <div class="movie-item" data-id="${movie.id}">
              <img src="${imagePath}" alt="${movie.name}" class="movie-img" width="200px" height="300px" onclick="goDetail(${movie.id})">  
            <div class="clickHeart1">
              <img
                src="./heartAll.png"
                alt="좋아요"
                class="heart-icon"
                onclick="removeHeart('${movie.id}')"
              />
            </div>
          </div>
        `;
      })
      .join("");
  }
};

// 상세 정보 클릭하면 상세페이지로 이동
const goDetail = (movieId) => {
  window.location.href = `detail.html?id=${movieId}`;
};

// 장바구니 개수 증가 감소
const updateCartCount = () => {
  let count = purchaseHistory.length;
  cartCount.innerText = count;
  cartCount.style.display = count > 0 ? "block" : "none";
};

// 좋아요 취소 -> heart.html에서도 없애기
const removeHeart = (movieid) => {
  heartHistory = heartHistory.filter((item) => item.id !== movieid);
  localStorage.setItem("heart_history", JSON.stringify(heartHistory));
  updateHeartHistory(); // 화면 업데이트
};

document.addEventListener("DOMContentLoaded", function () {
  updateHeartHistory();
  updateCartCount();
});
