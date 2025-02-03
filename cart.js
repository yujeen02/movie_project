document.addEventListener("DOMContentLoaded", function () {
  const purchaseHistoryContainer = document.querySelector(".purchase-history");

  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];

  // 장바구니 개수 업데이트
  function updateCartCount() {
    localStorage.setItem("cart_count", purchaseHistory.length);
  }

  // 영화 데이터를 { 영화 ID: {영화 정보, 수량} } 형태로 변환
  function aggregateMovies() {
    const aggregated = {};
    purchaseHistory.forEach((movie) => {
      if (aggregated[movie.name]) {
        aggregated[movie.name].quantity += 1;
      } else {
        aggregated[movie.name] = { ...movie, quantity: 1 };
      }
    });
    return Object.values(aggregated);
  }

  // 장바구니 업데이트
  function updatePurchaseHistory() {
    const aggregatedMovies = aggregateMovies();

    if (aggregatedMovies.length === 0) {
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
            ${aggregatedMovies
              .map((movie, index) => {
                const imagePath = movie.image.includes("/")
                  ? movie.image
                  : `img/${movie.image}`;

                return `
                  <tr>
                    <td><img src="${imagePath}" alt="${movie.name}" width="100px" height="150px"></td>
                    <td>${movie.name}</td>
                    <td>${movie.runningTime}</td>
                    <td>${movie.genre}</td>
                    <td>${movie.plot}</td>
                    <td>
                      <button onclick="updateQuantity('${movie.name}', -1)">➖</button>
                      <span>${movie.quantity}</span>
                      <button onclick="updateQuantity('${movie.name}', 1)">➕</button>
                    </td>
                    <td>
                      <button class="delete-btn" onclick="removeFromCart('${movie.name}')">삭제</button>
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
  }

  // 수량 증가/감소 기능
  window.updateQuantity = function (movieName, change) {
    const index = purchaseHistory.findIndex(
      (movie) => movie.name === movieName
    );
    if (index !== -1) {
      if (change === -1) {
        purchaseHistory.splice(index, 1);
      } else {
        purchaseHistory.push(purchaseHistory[index]); // 같은 영화 추가
      }
      localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
      updatePurchaseHistory();
    }
  };

  // 개별 영화 삭제
  window.removeFromCart = function (movieName) {
    purchaseHistory = purchaseHistory.filter(
      (movie) => movie.name !== movieName
    );
    localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
    updatePurchaseHistory();
  };

  // 장바구니 전체 삭제
  window.clearCart = function () {
    if (confirm("정말 장바구니를 모두 비우시겠습니까?")) {
      localStorage.removeItem("purchase_history");
      purchaseHistory = [];
      updatePurchaseHistory();
    }
  };

  updatePurchaseHistory();
});
