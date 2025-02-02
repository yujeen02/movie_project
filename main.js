document.addEventListener("DOMContentLoaded", function () {
  const movieContainer = document.querySelector(".movie-container");
  const cartCount = document.getElementById("cartCount");

  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];

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
              <div class="movie-item" onclick="goToDetail(${index})">
                  <img src="${imagePath}" alt="${movie.name}" class="movie-img" width="200px" height="300px">  
                  <h2>${movie.name}</h2>
                  <p><strong>러닝타임:</strong> ${movie.runningTime}</p>
                  <p><strong>장르:</strong> ${movie.genre}</p>
                  <p><strong>줄거리:</strong> ${movie.plot}</p>
                  <button onclick="event.stopPropagation(); purchaseTicket(${index})">관람권 구매</button>
              </div>
          `;
      })
      .join("");
  }

  // 관람권 구매 함수
  window.purchaseTicket = function (index) {
    const movie = data_map[index];
    purchaseHistory.push(movie);
    localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
    updateCartCount(); // 장바구니 개수 업데이트
  };

  // 상세페이지로 이동하는 함수
  window.goToDetail = function (index) {
    window.location.href = `detail.html?id=${index}`;
  };

  // 초기 장바구니 개수 업데이트
  updateCartCount();
});
