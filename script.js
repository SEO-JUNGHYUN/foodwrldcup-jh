// 8개의 점심 메뉴 이미지 경로와 이름
let menus = [
  { name: "김치찌개", img: "assets/menu1.jpg" },
  { name: "돈까스", img: "assets/menu2.jpg" },
  { name: "제육볶음", img: "assets/menu3.jpg" },
  { name: "비빔밥", img: "assets/menu4.jpg" },
  { name: "냉면", img: "assets/menu5.jpg" },
  { name: "햄버거", img: "assets/menu6.jpg" },
  { name: "짬뽕", img: "assets/menu7.jpg" },
  { name: "칼국수", img: "assets/menu8.jpg" }
];

// 메뉴를 랜덤하게 섞기 (Fisher–Yates shuffle)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 초기화
let round = 8;
let roundMenus = [];
let nextRoundMenus = [];
let currentPair = 0;

const roundInfo = document.getElementById("round-info");
const menu1El = document.getElementById("menu1");
const menu2El = document.getElementById("menu2");
const gameContainer = document.getElementById("game-container");
const resultSection = document.getElementById("result");
const winnerName = document.getElementById("winner-name");
const winnerImg = document.getElementById("winner-img");
const progressBar = document.getElementById("progress-bar");

// 시작 버튼 이벤트
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";

  // 초기화 및 시작
  menus = shuffle(menus);
  roundMenus = [...menus];
  nextRoundMenus = [];
  currentPair = 0;
  round = 8;

  updateRoundText();
  updateProgressBar();
  showNextPair();
});

function updateRoundText() {
  if (round === 8) roundInfo.textContent = "8강";
  else if (round === 4) roundInfo.textContent = "4강";
  else if (round === 2) roundInfo.textContent = "결승전";
}

function updateProgressBar() {
  const totalMatches = 7; // 8강(4)+4강(2)+결승(1)
  const played = totalMatches - (roundMenus.length / 2 + nextRoundMenus.length / 2);
  const percentage = Math.round((played / totalMatches) * 100);
  progressBar.style.width = `${percentage}%`;
}

function showNextPair() {
  if (currentPair * 2 >= roundMenus.length) {
    if (nextRoundMenus.length === 1) {
      showWinner(nextRoundMenus[0]);
    } else {
      round = nextRoundMenus.length;
      roundMenus = [...nextRoundMenus];
      nextRoundMenus = [];
      currentPair = 0;
      updateRoundText();
      showNextPair();
    }
    return;
  }

  const menu1 = roundMenus[currentPair * 2];
  const menu2 = roundMenus[currentPair * 2 + 1];

  updateMenuElement(menu1El, menu1);
  updateMenuElement(menu2El, menu2);
  updateProgressBar();
}

function updateMenuElement(menuEl, menuData) {
  const imgEl = menuEl.querySelector("img");
  const btnEl = menuEl.querySelector(".select-btn");
  const labelEl = menuEl.querySelector(".menu-name");

  imgEl.src = menuData.img;
  imgEl.alt = menuData.name;
  btnEl.textContent = "선택";
  labelEl.textContent = menuData.name;
}

function selectMenu(index) {
  const selected = roundMenus[currentPair * 2 + index];
  nextRoundMenus.push(selected);
  currentPair++;
  showNextPair();
}

function showWinner(menu) {
  gameContainer.style.display = "none";
  resultSection.style.display = "block";
  winnerName.textContent = menu.name;
  winnerImg.src = menu.img;
  winnerImg.alt = menu.name;
  progressBar.style.width = "100%";
}

function copyLink() {
  const dummy = document.createElement("input");
  dummy.value = window.location.href;
  document.body.appendChild(dummy);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  document.getElementById("copy-msg").textContent = "링크가 복사되었어요! 친구에게 보내보세요.";
}
