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
  `##########################`,
  `########################`,
  `#########################`,
  `#########################`
];
let maze4 = [
  `###########...#########`,
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
  `##########.##########!!!#`,
  `##########...........!!!##`,
  `#####################!!!#`
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

let levels = [maze1, maze2, maze3, maze4];
let currentLevel = levels[gamesSetup.levelIndex];
let body = document.querySelector("body");
let divTable = document.getElementById("cover");
let tableEl = document.querySelector("table");
let scoreBoard = document.querySelector(".score");
const time = document.querySelector(".time");
const rounded = document.querySelector(".rounded");
let min = 60;
let points = 0;
let endTimeforUser = 0;

let loadPage = () => {
  let getRideOfMenu = () => {
    scoreBoard.classList.remove("hide");
    scoreBoard.innerHTML = `Score: ${Number(gamesSetup.score)}`;
    body.style.flexDirection = "row";
    body.style.justifyContent = "flex-start";
    body.style.alignItems = "flex-start";
  };
  getRideOfMenu();
  rounded.classList.remove("hide");
  let lose = () => {
    scoreBoard.classList.add("hide");
    time.classList.add("hide");
    // let scaryAudio = document.createElement("audio");
    // scaryAudio.src = "/src/scream.mp3";
    // scaryAudio.autoplay = true;
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
    // body.append(scaryAudio);
    body.appendChild(looseP);
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
    rounded.style.transform = `translate3d(${gamesSetup.clientX}px, ${gamesSetup.clientY}px, 0)`;
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
              tdEl.setAttribute("id", "start");
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
    time.innerHTML = `Time: ${Number(gamesSetup.time)}s`;
  };
  // events
  window.addEventListener("pointermove", (e) => {
    console.log(e);
    e.preventDefault();
    let mouseY = e.clientY;
    let mouseX = e.clientX;
    rounded.addEventListener("pointerenter", (e) => {
      e.preventDefault();
      gamesSetup.inPlay = true;
      document.body.style.cursor = "none";
    });
    if (gamesSetup.inPlay)
      rounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    document.querySelectorAll(".wall ").forEach((wall) => {
      if (isCollided(rounded, wall)) lose();
    });

    document.querySelectorAll("#win").forEach((win) => {
      if (isCollided(rounded, win)) {
        let stopper = levels[(gamesSetup.levelIndex += 1)];
        currentLevel = stopper;
        clearTable(tableEl);
        drawMaze(currentLevel);
        clearInterval(timePoint);
        points += min - gamesSetup.time;
        gamesSetup.time = 0;
        scoreBoard.innerHTML = `Score: ${Number(points)}`;
        let finsihedTimeat = levels.length * 60;
        if (gamesSetup.levelIndex === 4) {
          endTimeforUser = `${finsihedTimeat - points}s`;
          time.innerHTML = `Done in: ${endTimeforUser}`;
          const restartBtn = document.createElement("button");
          restartBtn.innerHTML = "Restart Game";
          restartBtn.classList.add("restart-btn");
          rounded.classList.add("hide");
          document.querySelector(".score-holder").append(restartBtn);
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
