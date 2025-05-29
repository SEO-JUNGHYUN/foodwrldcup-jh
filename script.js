const menuList = [
  { name: "김치찌개", img: "assets/menu1.jpg" },
  { name: "돈까스", img: "assets/menu2.jpg" },
  { name: "제육볶음", img: "assets/menu3.jpg" },
  { name: "비빔밥", img: "assets/menu4.jpg" },
  { name: "냉면", img: "assets/menu5.jpg" },
  { name: "햄버거", img: "assets/menu6.jpg" },
  { name: "짬뽕", img: "assets/menu7.jpg" },
  { name: "칼국수", img: "assets/menu8.jpg" }
];

let currentRound = [...menuList];
let nextRound = [];
let currentPairIndex = 0;

function showMenus() {
  const [menu1, menu2] = [currentRound[currentPairIndex], currentRound[currentPairIndex + 1]];

  document.querySelector("#menu1 img").src = menu1.img;
  document.querySelector("#menu1 img").alt = menu1.name;
  document.querySelector("#menu1 .select-btn").innerText = menu1.name;

  document.querySelector("#menu2 img").src = menu2.img;
  document.querySelector("#menu2 img").alt = menu2.name;
  document.querySelector("#menu2 .select-btn").innerText = menu2.name;
}

function selectMenu(selectedIndex) {
  const selectedMenu = currentRound[currentPairIndex + selectedIndex];
  nextRound.push(selectedMenu);
  currentPairIndex += 2;

  if (currentPairIndex >= currentRound.length) {
    if (nextRound.length === 1) {
      showResult(nextRound[0]);
      return;
    }
    currentRound = [...nextRound];
    nextRound = [];
    currentPairIndex = 0;
  }

  showMenus();
}

function showResult(winner) {
  document.querySelector("#game-container").style.display = "
