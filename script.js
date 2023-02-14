let maze1 = [
  `####################`,
  `####################`,
  `#.................!#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,
  `#.......#`,

  `#########`
];
let maze2 = [
  `#########################`,
  `#........................`,
  `#........................`,
  `#..#######################`,
  `#........................#`,
  `#........................`,
  `######################...`,
  `######################...`,
  `######################...`,
  `#........................`,
  `#........................`,
  `#..#######################`,
  `#........................#`,
  `#........................`,
  `#####################....`,
  `#####################....`,
  `#####################....`,
  `#!!......................`
];
let maze3 = [
  `####################!!!####`,
  `####################!!!####`,
  `#####################.#####`,
  `#####################.###`,
  `##################....####`,
  `##################.#####`,
  `##################....###`,
  `#####################.###`,
  `#####################.###`,
  `#.....................####`,
  `#....................#####`,
  `#..#######################`,
  `#..######################`,
  `#..######################`,
  `#..######################`,
  `#........................#`,
  `#######################..`,
  `#........................`,
  `#........................`,
  `########################`,
  `#########################`,
  `#########################`
];
let maze4 = [
  `###########..##########`,
  `###########............##`,
  `###########............##`,
  `######################.##`,
  `######################.###`,
  `######################.###`,
  `######################.###`,
  `###...............####.###`,
  `###.#############.####.###`,
  `###.#############......###`,
  `###.######################`,
  `###.######################`,
  `###.######################`,
  `###.######################`,
  `###........###############`,
  `##########.##########___##`,
  `##########...........!__##`,
  `#####################___##`
];
let maze5 = [
  `###!!#################`,
  `###.#####################`,
  `###.####################`,
  `###.#####################`,
  `###.######################`,
  `###.........##############`,
  `#######.###.##############`,
  `#######.....#####......###`,
  `##########.######.####.###`,
  `###...............####.###`,
  `###.#######..#########.###`,
  `###.#######........###.###`,
  `###.#######.#####......###`,
  `###.........#########.####`,
  `##########.##########.####`,
  `##########.##########.####`,
  `##########.########...####`,
  `##########............####`
];
let maze6 = [
  `###...#################`,
  `###..###............###`,
  `###.####.##########.###`,
  `###.####......#####.###`,
  `###.#########.#####.###`,
  `###.####......####_!_#####`,
  `###.####.#########___###`,
  `###.####.........########`,
  `###.############.#########`,
  `###.############.########`,
  `###.############.#########`,
  `###.####.........#########`,
  `###.####.#################`,
  `###.####.........#########`,
  `###.############.#########`,
  `###.############.#########`,
  `###.############.#########`,
  `###..............#########`,
  `##########################`,
  `##########################`
];
let maze7 = [
  `######################`,
  `########################`,
  `###!###################`,
  `###.##############.......`,
  `###.##############.....#.`,
  `###.##############.......`,
  `###.##############.#####`,
  `###............###.#####`,
  `##############.#...#######`,
  `###............#.########`,
  `###.############.#########`,
  `###.####.........#########`,
  `###.####.#################`,
  `###.####.........#########`,
  `###.############.#########`,
  `###.############.#########`,
  `###.############.#########`,
  `###..............#########`,
  `##########################`,
  `##########################`
];
let gamesSetup = {
  speed: 13,
  score: 0,
  clientX: 60,
  clientY: 500,
  inPlay: false,
  levelIndex: 0,
  time: 0
};

let levels = [maze1, maze2, maze3, maze4, maze5, maze6, maze7];
let currentLevel = levels[gamesSetup.levelIndex];
let body = document.querySelector("body");
let divTable = document.getElementById("cover");
let tableEl = document.querySelector("table");
let scoreBoard = document.querySelector(".score");
const level = document.querySelector(".level");
const time = document.querySelector(".time");
const rounded = document.querySelector(".rounded");
let min = 60;
let points = 0;
let endTimeforUser = 0;
let pointsHolder = [];

let loadPage = () => {
  rounded.style.transform = `translate3d(${gamesSetup.clientX}px, ${gamesSetup.clientY}px, 0)`;
  let getRideOfMenu = () => {
    scoreBoard.classList.remove("hide");
    scoreBoard.innerHTML = `S ${Number(gamesSetup.score)}`;
    body.style.flexDirection = "row";
    body.style.justifyContent = "flex-start";
    body.style.alignItems = "flex-start";
  };
  getRideOfMenu();
  level.innerHTML = `L ${gamesSetup.levelIndex + 1}`;
  rounded.classList.remove("hide");
  let lose = () => {
    scoreBoard.classList.add("hide");
    time.classList.add("hide");
    let looseP = document.createElement("section");
    looseP.classList.add("lose-modal");
    let h1 = document.createElement("h1");
    h1.style.color = "white";
    let button = document.createElement("button");
    button.classList.add("restart-btn");
    clearTable(tableEl);
    h1.textContent = "GAME OVER";
    button.textContent = "Restart Game";
    button.setAttribute("onclick", "window.location.reload();");
    button.setAttribute("type", "button");
    divTable.appendChild(looseP);
    divTable.style.width = "100vw";
    looseP.style.width = "100vw";
    looseP.appendChild(h1);
    looseP.appendChild(button);
    rounded.style.opacity = 0;
    document.body.style.cursor = "default";
  };

  const clearTable = (tableEl) => {
    while (tableEl.firstChild) {
      tableEl.removeChild(tableEl.firstChild);
    }
  };

  const drawMaze = (maze) => {
    clearTable(tableEl);
    if (currentLevel) {
      for (let i = 0; i < currentLevel.length; i++) {
        let rowEl = document.createElement("tr");
        tableEl.appendChild(rowEl);
        for (let x = 0; x < currentLevel[i].length; x++) {
          let tdEl = document.createElement("td");
          rowEl.appendChild(tdEl);
          tdEl.innerHTML = maze[i].charAt(x);
          switch (maze[i].charAt(x)) {
            case "#":
              tdEl.setAttribute("class", "wall");
              break;
            case ".":
              tdEl.setAttribute("class", "freespace");
              break;
            case "_":
              tdEl.setAttribute("id", "behindwin");
              break;
            case "!":
              tdEl.setAttribute("id", "win");
              break;
          }
        }
      }
    } else {
      clearInterval(startTimer);
    }
  };
  const isCollided = (a, b) => {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
      aRect.bottom < bRect.top ||
      aRect.top > bRect.bottom ||
      aRect.right < bRect.left ||
      aRect.left > bRect.right
    );
  };

  drawMaze(currentLevel);
  // timer
  const timePoint = () => {
    gamesSetup.time++;
    time.innerHTML = `${Number(gamesSetup.time)}s`;
  };

  rounded.addEventListener("pointerenter", (e) => {
    e.preventDefault();
    tableEl.style.cursor = "none";
    gamesSetup.inPlay = true;
  });
  // events

  window.addEventListener("pointermove", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("freespace") ||
      e.target.classList.contains("rounded") ||
      e.target.id === "win"
    ) {
    } else {
      return;
    }

    let mouseY = e.clientY;
    let mouseX = e.clientX;
    if (
      (gamesSetup.inPlay && navigator.userAgent.match(/Android/i)) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      rounded.style.transform = `translate3d(${mouseX}px, ${mouseY - 70}px, 0)`;
    } else if (gamesSetup.inPlay) {
      rounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    document.querySelectorAll(".wall ").forEach((wall) => {
      if (isCollided(rounded, wall)) lose();
    });

    document.querySelectorAll("#win").forEach((win, i) => {
      if (isCollided(rounded, win)) {
        let stopper = levels[(gamesSetup.levelIndex += 1)];
        currentLevel = stopper;
        level.innerHTML = `L ${(gamesSetup.levelIndex += 1)}`;
        clearTable(tableEl);
        drawMaze(currentLevel);
        clearInterval(timePoint);
        points += min - gamesSetup.time;
        scoreBoard.innerHTML = `S ${Number(points)}`;
        gamesSetup.time = 0;
        let finsihedTimeat = levels.length * 60;
        if (gamesSetup.levelIndex === levels.length) {
          endTimeforUser = `${finsihedTimeat - points}s`;
          time.innerHTML = `Done in: ${endTimeforUser}`;
          const div = document.createElement("div");
          const h2 = document.createElement("h2");
          h2.style.color = "white";
          h2.textContent = "God job";
          const restartBtn = document.createElement("button");
          restartBtn.innerHTML = "Restart Game";
          restartBtn.classList.add("restart-btn");
          rounded.classList.add("hide");
          div.append(h2);
          div.append(restartBtn);
          document.body.append(div);
          restartBtn.addEventListener(
            "click",
            () => (window.location.href = "/")
          );
        }
      }
    });
  });
  const startTimer = setInterval(timePoint, 1000);
};
window.addEventListener("DOMContentLoaded", loadPage);
