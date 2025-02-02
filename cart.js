document.addEventListener("DOMContentLoaded", function () {
  const purchaseHistoryContainer = document.querySelector(".purchase-history");

  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];

  // 장바구니 개수 업데이트 함수 (main.html의 숫자도 업데이트)
  function updateCartCount() {
    localStorage.setItem("cart_count", purchaseHistory.length);
  }

  // 구매 내역 업데이트
  function updatePurchaseHistory() {
    if (purchaseHistory.length === 0) {
      purchaseHistoryContainer.innerHTML = "<p>구매한 영화가 없습니다.</p>";
    } else {
      purchaseHistoryContainer.innerHTML = purchaseHistory
        .map((movie, index) => {
          const imagePath = movie.image.includes("/")
            ? movie.image
            : `img/${movie.image}`;

          return `
                  <div class="purchase-item">
                      <img src="${imagePath}" alt="${movie.name}" width="200px" height="300px">
                      <span>${movie.name}</span>
                      <button class="delete-btn" onclick="removeFromCart(${index})">삭제</button>
                  </div>
              `;
        })
        .join("");
    }
    updateCartCount();
  }

  window.removeFromCart = function (index) {
    purchaseHistory.splice(index, 1);
    localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
    updatePurchaseHistory();
  };

  updatePurchaseHistory();
});
