const idInput = document.getElementById("inputId");
const movieNameInput = document.getElementById("inputMovieName");
const runningTimeInput = document.getElementById("inputRunningTime");
const genreInput = document.getElementById("inputGenre");
const plotInput = document.getElementById("inputPlot");

let data_map = JSON.parse(localStorage.getItem("data_map")) || [];

// table 헤드
const tableWrap = document.querySelector(".main-wrap");
tableWrap.innerHTML = `
<table>
  <thead>
    <tr>
      <th>이미지</th>
      <th>영화명</th>
      <th>러닝타임</th>
      <th>장르</th>
      <th>줄거리</th>
      <th>관리</th>
    </tr>
  </thead>
  <tbody class="tBody"></tbody>
</table>
`;

// table 바디 생성
function dataPrint() {
  const tableBody = document.querySelector(".tBody");
  tableBody.innerHTML = data_map
    .map((item) => {
      return `
      <tr id="tr${item.id}">
        <td class="movieImg"><img src="img/${item.image}" alt="Movie Image" class="img${item.id}" width="200px" height="300px"></td>
        <td class="movieName"><div class="name${item.id}">${item.name}</div><span class="spanN${item.id}"></span></td>
        <td class="movieTime"><div class="time${item.id}">${item.runningTime}</div><span class="spanT${item.id}"></span></td>
        <td class="movieGenre"><div class="genre${item.id}">${item.genre}</div><span class="spanG${item.id}"></span></td>
        <td class="moviePlot"><div class="plot${item.id}">${item.plot}</div><span class="spanP${item.id}"></span></td>
        <td>
        <button class="btnCor saveB${item.id}" onclick="update(${item.id})">수정</button>
        <button class="btnDel" onclick="deleteMovie(${item.id})">삭제</button>
        </td>
      </tr>
      `;
    })
    .join("");
}

// 이미지 랜덤하게 저장
function getRandomImage() {
  const images = [
    {
      main: "1.png",
      sub: ["1-1.jpeg", "1-2.jpeg"],
    },
    {
      main: "2.png",
      sub: ["2-1.jpeg", "2-2.jpeg"],
    },
    {
      main: "3.png",
      sub: ["3-1.jpeg", "3-2.jpeg"],
    },
    {
      main: "4.png",
      sub: ["4-1.jpeg", "4-2.jpeg"],
    },
    {
      main: "5.png",
      sub: ["5-1.jpeg", "5-2.jpeg"],
    },
    {
      main: "6.png",
      sub: ["6-1.jpeg", "6-2.jpeg"],
    },
    {
      main: "7.png",
      sub: ["7-1.jpeg", "7-2.jpeg"],
    },
    {
      main: "8.png",
      sub: ["8-1.jpeg", "8-2.jpeg"],
    },
    {
      main: "9.png",
      sub: ["9-1.jpeg", "9-2.jpeg"],
    },
    {
      main: "10.png",
      sub: ["10-1.jpeg", "10-2.jpeg"],
    },
    {
      main: "11.png",
      sub: ["11-1.jpeg", "11-2.jpeg"],
    },
    {
      main: "12.png",
      sub: ["12-1.jpeg", "12-2.jpeg"],
    },
    {
      main: "13.png",
      sub: ["13-1.jpeg", "13-2.jpeg"],
    },
    {
      main: "14.png",
      sub: ["14-1.jpeg", "14-2.jpeg"],
    },
    {
      main: "15.png",
      sub: ["15-1.jpeg", "15-2.jpeg"],
    },
    {
      main: "16.png",
      sub: ["16-1.jpeg", "16-2.jpeg"],
    },
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];
  return {
    main: randomImage.main,
    sub: randomImage.sub,
  };
}
//input
// 유효성 검사 변수
let id_check = false;
let name_check = false;
let time_check = false;
let genre_check = false;
let plot_check = false;

// 저장 버튼 활성화
function btnDisabled() {
  const saveButton = document.querySelector(".saveBtn");
  saveButton.disabled = !(
    id_check &&
    name_check &&
    time_check &&
    genre_check &&
    plot_check
  );
}

// 유효성 검사 아이디 중복
function myIdFunction() {
  const userIdElement = document.querySelector("#idDuplication");
  const Id = idInput.value;

  let isduplication = data_map.some((item) => item.id === Id);
  if (isduplication) {
    userIdElement.innerText = "아이디 중복";
    id_check = false;
  } else {
    userIdElement.innerText = "";
    id_check = true;
  }
  btnDisabled();
}

// 유효성 검사 이름
function myNameFunction() {
  const userNameLengthElement = document.querySelector("#nameLength");
  const NameLength = movieNameInput.value;
  name_check = NameLength.length > 0;
  userNameLengthElement.innerText = name_check ? "" : "1자 이상 작성해주세요";
  btnDisabled();
}

// 유효성 검사 시간
function myTimeFunction() {
  const timeElement = document.querySelector("#timeLength");
  const timeShape = runningTimeInput.value;

  // "2시간" 또는 "2시간 30분" 형식의 정규식
  const timeRegex = /^\d{1,2}시간(\s\d{1,2}분)?$/;

  time_check = timeRegex.test(timeShape);

  timeElement.innerText = time_check
    ? ""
    : "형식이 올바르지 않습니다. 예: 2시간 또는 2시간 30분";

  btnDisabled();
}

// 유효성 검사 장르
function myGenreFunction() {
  const genreElement = document.querySelector("#genreLength");
  const genreLength = genreInput.value;
  genre_check = genreLength.length > 0;
  genreElement.innerText = genre_check ? "" : "1자 이상 작성해주세요";
  btnDisabled();
}

// 유효성 검사 줄거리
function myPlotFunction() {
  const plotElement = document.querySelector("#plotLength");
  const plotLength = plotInput.value;
  plot_check = plotLength.length >= 20;
  plotElement.innerText = plot_check ? "" : "20자 이상 작성해주세요";
  btnDisabled();
}

// 수정할때 유효성 검사

// 영화명 글자수 유효성
const inputNameChange = (id) => {
  const inputNValue = document.querySelector(`.inputN${id}`).value;
  const inputNSpan = document.querySelector(`.spanN${id}`);
  if (inputNValue.trim() === "") {
    inputNSpan.innerText = "내용을 채워주세요.";
  } else {
    inputNSpan.innerText = "";
  }
};

// 러닝타임 유효성
const inputTimeChange = (id) => {
  const inputTValue = document.querySelector(`.inputT${id}`).value;
  const inputTSpan = document.querySelector(`.spanT${id}`);
  if (inputTValue.trim() === "") {
    inputTSpan.innerText = "내용을 채워주세요.";
  } else if (inputTValue > 150) {
    inputTSpan.innerText = "150살 이상은 어려워요.";
  } else {
    inputTSpan.innerText = "";
  }
};

// 장르 글자수 유효성
const inputGenreChange = (id) => {
  const inputGValue = document.querySelector(`.inputG${id}`).value;
  const inputGSpan = document.querySelector(`.spanG${id}`);
  if (inputGValue.trim() === "") {
    inputGSpan.innerText = "내용을 채워주세요.";
  } else {
    inputGSpan.innerText = "";
  }
};

// 줄거리 글자수 유효성
const inputPlotChange = (id) => {
  const inputPValue = document.querySelector(`.inputP${id}`).value;
  const inputPSpan = document.querySelector(`.spanP${id}`);

  if (inputPValue.trim() === "") {
    inputPSpan.innerText = "내용을 채워주세요.";
  } else if (inputPValue.length < 15) {
    inputPSpan.innerText = "15자리 이상 작성해 주세요.";
  } else {
    inputPSpan.innerText = "";
  }
};

// 에러 지우기
const clearError = (id) => {
  const inputTSpan = document.querySelector(`.spanT${id}`);
  const inputNSpan = document.querySelector(`.spanN${id}`);
  const inputGSpan = document.querySelector(`.spanG${id}`);
  const inputPSpan = document.querySelector(`.spanP${id}`);

  inputTSpan.innerText = "";
  inputNSpan.innerText = "";
  inputGSpan.innerText = "";
  inputPSpan.innerText = "";
};

//수정
const update = (id) => {
  // 경력 이름 나이 div
  const timeDiv = document.querySelector(`.time${id}`);
  const nameDiv = document.querySelector(`.name${id}`);
  const plotDiv = document.querySelector(`.plot${id}`);
  const genreDiv = document.querySelector(`.genre${id}`);

  // 경력 이름 나이 value
  const timeValue = timeDiv.textContent;
  const nameValue = nameDiv.textContent;
  const plotValue = plotDiv.textContent;
  const genreValue = genreDiv.textContent;

  // 버튼
  const btn = document.querySelector(`.saveB${id}`);
  if (btn.textContent === "수정") {
    timeDiv.innerHTML = `<input oninput="inputTimeChange(${id})" class="inputT${id}" value="${timeValue}" />`;
    nameDiv.innerHTML = `<input oninput="inputNameChange(${id})" class="inputN${id}" value="${nameValue}" />`;
    plotDiv.innerHTML = `<input oninput="inputPlotChange(${id})" class="inputP${id}" value="${plotValue}" />`;
    genreDiv.innerHTML = `<input oninput="inputGenreChange(${id})" class="inputG${id}" value="${genreValue}" />`;
    btn.textContent = "수정완료";
  } else {
    const inputTValue = document.querySelector(`.inputT${id}`).value;
    const inputNValue = document.querySelector(`.inputN${id}`).value;
    const inputPValue = document.querySelector(`.inputP${id}`).value;
    const inputGValue = document.querySelector(`.inputG${id}`).value;

    inputTimeChange(id);
    inputNameChange(id);
    inputPlotChange(id);
    inputGenreChange(id);

    const inputTSpan = document.querySelector(`.spanT${id}`);
    const inputPSpan = document.querySelector(`.spanP${id}`);
    const inputNSpan = document.querySelector(`.spanN${id}`);
    const inputGSpan = document.querySelector(`.spanG${id}`);

    if (
      inputTSpan.innerText ||
      inputNSpan.innerText ||
      inputPSpan.innerText ||
      inputGSpan.innerText
    ) {
      return;
    }

    timeDiv.innerText = inputTValue;
    nameDiv.innerText = inputNValue;
    plotDiv.innerText = inputPValue;
    genreDiv.innerText = inputGValue;

    btn.textContent = "수정";

    const update_data = data_map.map((item) => {
      if (Number(item.id) === id) {
        return {
          ...item,
          time: inputTValue,
          name: inputNValue,
          plot: inputPValue,
          genre: inputGValue,
        };
      } else {
        return item;
      }
    });
    localStorage.setItem("data_map", JSON.stringify(update_data));
  }
};

//삭제
function deleteMovie(id) {
  data_map = data_map.filter((item) => Number(item.id) !== Number(id));
  localStorage.setItem("data_map", JSON.stringify(data_map));
  dataPrint();
}

// 데이터 생성
document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".saveBtn");
  saveButton.addEventListener("click", function () {
    const random_Image = getRandomImage();

    let movieInfo = {
      image: random_Image.main,
      subimg0: random_Image.sub[0],
      subimg1: random_Image.sub[1],
      id: idInput.value,
      name: movieNameInput.value,
      runningTime: runningTimeInput.value,
      genre: genreInput.value,
      plot: plotInput.value,
    };

    data_map.push(movieInfo);
    localStorage.setItem("data_map", JSON.stringify(data_map));
    dataPrint();

    // 입력값 초기화
    idInput.value = "";
    movieNameInput.value = "";
    runningTimeInput.value = "";
    genreInput.value = "";
    plotInput.value = "";

    // 유효성 검사 초기화
    id_check = name_check = time_check = genre_check = plot_check = false;
    btnDisabled();
  });

  dataPrint();
});
