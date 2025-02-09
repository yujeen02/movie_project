const movieContainer = document.querySelector(".movie-container");
const cartCount = document.getElementById("cartCount");
const paginationWrapper = document.getElementById("pagination-wrapper");

// 모든 영화 정보
let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
// 장바구니 영화 정보
let purchaseHistory =
  JSON.parse(localStorage.getItem("purchase_history")) || [];
// 찜한 영화 정보
let heartHistory = JSON.parse(localStorage.getItem("heart_history")) || [];

let currentPage = 1;
let itemsPerPage = 10;

// 장바구니 개수 증가 감소, 0이면 숨김처리
function updateCartCount() {
  let count = purchaseHistory.length;
  cartCount.innerText = count;
  cartCount.style.display = count > 0 ? "block" : "none";
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

//페이지네이션
window.paginate = function (items, currentPage, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  return { currentPage, totalPages, paginatedItems };
};

// 페이지네이션 UI 생성 함수
window.renderPagination = function (totalPages) {
  paginationWrapper.innerHTML = ""; // 기존 페이지네이션 초기화

  // 이전 버튼
  const prevPage = document.createElement("li");
  prevPage.textContent = "<";
  prevPage.className = currentPage === 1 ? "disabled" : "";
  prevPage.addEventListener("click", () => {
    if (currentPage > 1) changePage(currentPage - 1);
  });
  paginationWrapper.appendChild(prevPage);

  // 페이지 번호 생성 (특정 범위만 표시)
  const maxPageNumbersToShow = 10;
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPageNumbersToShow) {
    const half = Math.floor(maxPageNumbersToShow / 2);
    if (currentPage <= half + 1) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    } else if (currentPage + half >= totalPages) {
      startPage = totalPages - maxPageNumbersToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - half;
      endPage = currentPage + half - (maxPageNumbersToShow % 2 === 0 ? 1 : 0);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.textContent = i;
    pageItem.className = i === currentPage ? "active" : "";
    pageItem.addEventListener("click", () => changePage(i));
    paginationWrapper.appendChild(pageItem);
  }

  // 다음 버튼
  const nextPage = document.createElement("li");
  nextPage.textContent = ">";
  nextPage.className = currentPage === totalPages ? "disabled" : "";
  nextPage.addEventListener("click", () => {
    if (currentPage < totalPages) changePage(currentPage + 1);
  });
  paginationWrapper.appendChild(nextPage);
};

// 페이지 변경 함수
window.changePage = function (page) {
  const totalPages = Math.ceil(data_map.length / itemsPerPage);
  if (page < 1 || page > totalPages) return; // 범위를 넘어가면 리턴
  currentPage = page;
  displayItems(page);
};

// 요소 display 함수
const displayItems = (page) => {
  const { paginatedItems } = paginate(data_map, page, itemsPerPage);
  movieContainer.innerHTML = paginatedItems
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
  renderPagination(Math.ceil(data_map.length / itemsPerPage));
};

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  displayItems(currentPage);
});
