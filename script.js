// 8개의 점심 메뉴 이미지 경로와 이름
const menus = [
  { name: "김치찌개", img: "assets/menu1.jpg" },
  { name: "돈까스", img: "assets/menu2.jpg" },
  { name: "제육볶음", img: "assets/menu3.jpg" },
  { name: "비빔밥", img: "assets/menu4.jpg" },
  { name: "냉면", img: "assets/menu5.jpg" },
  { name: "햄버거", img: "assets/menu6.jpg" },
  { name: "짬뽕", img: "assets/menu7.jpg" },
  { name: "칼국수", img: "assets/menu8.jpg" }
];

let round = 8;
let roundMenus = [...menus];
let nextRoundMenus = [];
let currentPair = 0;

const roundInfo = document.getElementById("round-info");
const menu1El = document.getElementById("menu1");
const menu2El = document.getElementById("menu2");
const gameContainer = document.getElementById("game-container");
const resultSection = document.getElementById("result");
const winnerName = document.getElementById("winner-name");
const winnerImg = document.getElementById("winner-img");

function updateRoundText() {
  if (round === 8) roundInfo.textContent = "8강";
  else if (round === 4) roundInfo.textContent = "4강";
  else if (round === 2) roundInfo.textContent = "결승전";
}

function showNextPair() {
  if (currentPair * 2 >= roundMenus.length) {
    // 다음 라운드로 넘어가기
    if (nextRoundMenus.length === 1) {
      // 최종 우승자 결정
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

  menu1El.querySelector("img").src = menu1.img;
  menu1El.querySelector("img").alt = menu1.name;
  menu1El.querySelector(".select-btn").textContent = `${menu1.name} 선택`;

  menu2El.querySelector("img").src = menu2.img;
  menu2El.querySelector("img").alt = menu2.name;
  menu2El.querySelector(".select-btn").textContent = `${menu2.name} 선택`;
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

updateRoundText();
showNextPair();
