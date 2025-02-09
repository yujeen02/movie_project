const purchaseHistoryContainer = document.querySelector(".purchase-history");

let purchaseHistory =
  JSON.parse(localStorage.getItem("purchase_history")) || [];

// 장바구니 개수 업데이트
const updateCartCount = () => {
  let count = purchaseHistory.length;
  cartCount.innerText = count;
  cartCount.style.display = count > 0 ? "block" : "none";
};

// 영화 정보를 객체로 만들고 개수 계산
// 장바구니에 영화 중복 -> 수량 체크
const groupMovies = () => {
  const group = {};
  //Id별로 그룹화할 객체
  purchaseHistory.forEach((movie) => {
    if (group[movie.id]) {
      group[movie.id].quantity += 1;
      //이미 Id 있으면 수량 증가
    } else {
      group[movie.id] = { ...movie, quantity: 1 };
      //처음 추가하면 수량 1
    }
  });
  return Object.values(group); // 배열 형태로 변환
};

// 장바구니 업데이트
const updatePurchaseHistory = () => {
  const groupedMovies = groupMovies();

  if (groupedMovies.length === 0) {
    purchaseHistoryContainer.innerHTML = "<p>구매한 영화가 없습니다.</p>";
  } else {
    purchaseHistoryContainer.innerHTML = `
      <table class="purchase-table">
        <thead>
          <tr>
            <th>포스터</th>
            <th>영화명</th>
            <th>러닝타임</th>
            <th>장르</th>
            <th>줄거리</th>
            <th>수량</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          ${groupedMovies
            .map((movie) => {
              const imagePath = movie.image.includes("/")
                ? movie.image
                : `img/${movie.image}`;

              return `
                <tr>
                  <td><img src="${imagePath}" alt="${movie.name}" width="100px" height="150px" onclick="goDetail(${movie.id})"></td>
                  <td>${movie.name}</td>
                  <td>${movie.runningTime}</td>
                  <td>${movie.genre}</td>
                  <td class="moviePlot">${movie.plot}</td>
                  <td>
                    <button onclick="updateQuantity('${movie.id}', -1)">➖</button>
                    <span>${movie.quantity}</span>
                    <button onclick="updateQuantity('${movie.id}', 1)">➕</button>
                  </td>
                  <td>
                    <button class="delete-btn" onclick="deletemovie('${movie.id}')">삭제</button>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
      <button class="clear-cart-btn" onclick="clearCart()">🗑 장바구니 모두 비우기</button>
    `;
  }
  updateCartCount();
};

//버튼 클릭 수량 증가/감소 기능
const updateQuantity = (movieId, change) => {
  const index = purchaseHistory.findIndex((movie) => movie.id === movieId);
  if (index !== -1) {
    if (change === -1) {
      // - 버튼 눌릴때
      purchaseHistory.splice(index, 1);
    } else {
      purchaseHistory.push(purchaseHistory[index]);
      // 같은 영화 추가
    }
    localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
    updatePurchaseHistory();
  }
};

// 세부사항 페이지로 이동
const goDetail = (movieId) => {
  window.location.href = `detail.html?id=${movieId}`;
};

// 개별 영화 삭제
const deletemovie = (Id) => {
  purchaseHistory = purchaseHistory.filter(
    (movie) => Number(movie.id) !== Number(Id)
  );
  localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
  updatePurchaseHistory();
};

// 장바구니 전체 삭제
const clearCart = () => {
  if (confirm("장바구니를 모두 비우시겠습니까?")) {
    localStorage.removeItem("purchase_history");
    purchaseHistory = [];
    updatePurchaseHistory();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  groupMovies();
  updatePurchaseHistory();
  updateQuantity(movieId, change);
  goDetail(movieId);
  deletemovie(Id);
  clearCart();
  updatePurchaseHistory();
});
