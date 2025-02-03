document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieIndex = urlParams.get("id");
  const cartCount = document.getElementById("cartCount");

  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];
  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];

  function updateCartCount() {
    let count = purchaseHistory.length;
    cartCount.innerText = count;
    cartCount.style.display = count > 0 ? "block" : "none";
  }

  if (movieIndex !== null && data_map[movieIndex]) {
    const movie = data_map[movieIndex];

    const imagePath = movie.image.includes("/")
      ? movie.image
      : `img/${movie.image}`;

    document.getElementById("movieImage").src = imagePath;
    document.getElementById("movieTitle").innerText = movie.name;
    document.getElementById("movieTime").innerText = movie.runningTime;
    document.getElementById("movieGenre").innerText = movie.genre;
    document.getElementById("moviePlot").innerText = movie.plot;

    const purchaseButton = document.createElement("button");
    purchaseButton.innerText = "관람권 구매";
    purchaseButton.addEventListener("click", function () {
      purchaseHistory.push(movie);
      localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
      updateCartCount(); // 장바구니 개수 업데이트
      alert("영화가 장바구니에 추가되었습니다!");
    });
    document.querySelector(".detail-container").appendChild(purchaseButton);
  } else {
    document.querySelector("main").innerHTML =
      "<p>영화 정보를 찾을 수 없습니다.</p>";
  }

  updateCartCount();
});
