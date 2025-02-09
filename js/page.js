//페이지네이션
const renderPagination = function (currentPage) {
  const pageWrap = document.querySelector(".pagination-wrapper");
  //총 페이지 수
  var totalPage = Math.ceil(16 / 10);
  //화면에 보여질 페이지 그룹
  var pageGroup = Math.ceil(currentPage / 2);
  // 화면에 그려질 마지막 페이지
  var last = pageGroup * 2;
  if (last > totalPage) last = totalPage;
  // 화면에 그려질 첫번째 페이지
  var first = last - (2 - 1) <= 0 ? 1 : last - (2 - 1);
  var next = last + 1;
  var prev = first - 1;

  const fragmentPage = document.createDocumentFragment();
  if (prev > 0) {
    var preDiv = document.createElement("div");
    preDiv.innerHTML = `<a href='#js-bottom' id='prev'>&lt;</a>`;
    fragmentPage.appendChild(preDiv);
  }
  for (var i = first; i <= last; i++) {
    const nextDiv = document.createElement("div");
    nextDiv.innerHTML = `<a href='#js-bottom' id='page-${i}' data-num='${i}'>${i}</a>`;

    fragmentPage.appendChild(nextDiv);
  }

  pageWrap.appendChild(fragmentPage);
  // 페이지 목록 생성
};

document.addEventListener("DOMContentLoaded", function () {
  renderPagination(1);
});
