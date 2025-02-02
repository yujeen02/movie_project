document.addEventListener("DOMContentLoaded", function () {
  // URL에서 영화 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const movieIndex = urlParams.get("id");

  let data_map = JSON.parse(localStorage.getItem("data_map")) || [];

  // 영화 정보 가져와서 화면에 표시
  if (movieIndex !== null && data_map[movieIndex]) {
    const movie = data_map[movieIndex];

    // 이미지 경로 보정 (상대경로일 경우 "img/" 추가)
    const imagePath = movie.image.includes("/")
      ? movie.image
      : `img/${movie.image}`;

    document.getElementById("movieImage").src = imagePath;
    document.getElementById("movieTitle").innerText = movie.name;
    document.getElementById("movieTime").innerText = movie.runningTime;
    document.getElementById("movieGenre").innerText = movie.genre;
    document.getElementById("moviePlot").innerText = movie.plot;
  } else {
    document.querySelector("main").innerHTML =
      "<p>영화 정보를 찾을 수 없습니다.</p>";
  }
});
