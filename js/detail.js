document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cartCount");

  let purchaseHistory =
    JSON.parse(localStorage.getItem("purchase_history")) || [];
  let selectedMovie = JSON.parse(localStorage.getItem("selected_movie")); // 저장된 영화 정보 가져오기

  function updateCartCount() {
    let count = purchaseHistory.length;
    cartCount.innerText = count;

    if (count > 0) {
      cartCount.style.display = "flex";
    } else {
      cartCount.style.display = "none";
    }
  }

  // 선택한 영화 정보가 있을 경우 화면에 표시
  if (selectedMovie) {
    const imagePath = selectedMovie.image.includes("/")
      ? selectedMovie.image
      : `img/${selectedMovie.image}`;

    document.getElementById("movieImage").src = imagePath;
    document.getElementById("movieTitle").innerText = selectedMovie.name;
    document.getElementById("movieTime").innerText = selectedMovie.runningTime;
    document.getElementById("movieGenre").innerText = selectedMovie.genre;
    document.getElementById("moviePlot").innerText = selectedMovie.plot;

    // 관람권 구매 버튼 기능 추가
    const purchaseButton = document.querySelector(".btn");
    purchaseButton.addEventListener("click", function () {
      purchaseHistory.push(selectedMovie);
      localStorage.setItem("purchase_history", JSON.stringify(purchaseHistory));
      updateCartCount();
      alert("영화가 장바구니에 추가되었습니다!");
    });
  } else {
    document.querySelector("main").innerHTML =
      "<p>영화 정보를 찾을 수 없습니다.</p>";
  }

  updateCartCount(); // 페이지 로드 시 장바구니 개수 업데이트
});
