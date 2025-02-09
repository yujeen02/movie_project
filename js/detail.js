const cartCount = document.getElementById("cartCount");
let data_map = JSON.parse(localStorage.getItem("data_map")) || []; // 모든 영화 정보 가져오기
let purchaseHistory =
  JSON.parse(localStorage.getItem("purchase_history")) || []; // 장바구니에 추가된 영화 정보 가져오기

//장바구니 숫자 카운트 하는 함수
const updateCartCount = () => {
  let count = purchaseHistory.length;
  cartCount.innerText = count;
  cartCount.style.display = count > 0 ? "flex" : "none";
};

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  // URL에서 영화 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  // 해당 ID에 맞는 영화 찾기
  let selectedMovie = data_map.find((movie) => String(movie.id) === movieId);
  const imagePath = `img/${selectedMovie.image}`;
  const subPath0 = `img/${selectedMovie.subimg0}`;
  const subPath1 = `img/${selectedMovie.subimg1}`;

  if (selectedMovie) {
    console.log(imagePath);
    document.getElementById("movieImage").src = imagePath;
    document.getElementById("movieImageSub1").src = subPath0;
    document.getElementById("movieImageSub2").src = subPath1;
    document.getElementById("movieTitle").innerText = selectedMovie.name;
    document.getElementById("movieTime").innerText = selectedMovie.runningTime;
    document.getElementById("movieGenre").innerText = selectedMovie.genre;
    document.getElementById("moviePlot").innerText = selectedMovie.plot;

    // 관람권 구매 버튼 기능 추가
    document.querySelector(".btn").addEventListener("click", function () {
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
