import "./style.css";
import {
  canvas,
  canvasHeight,
  canvasWidth,
  ctx,
  customgrid,
  grid,
  keys,
  scoreSpan,
} from "./constants.ts";
import { Wall } from "./class/wall.ts";
import { Position } from "./class/position.ts";
import { Player } from "./class/player.ts";
import { Ghost } from "./class/Ghost.ts";
import {
  checkCollision,
  checkCollisionCircleToCircle,
} from "./utils/checkCollision.ts";
import { drawWall } from "./utils/drawWall.ts";
import { Pallets } from "./class/Pallets.ts";
import { drawStartScreen } from "./screen.ts";
import { customMapBuilder } from "./Pages/customMap.ts";

canvas.width = canvasWidth;
canvas.height = canvasHeight;
let gameState: String = "start";
const walls: Wall[] = [];
let player: Player;

let customLevel: boolean = false;
const pallets: Pallets[] = [];
const ghosts: Ghost[] = [];
const elements: (Wall | Player | Pallets)[] = [];
const toolbar: (Wall | Player | Pallets)[] = [];
let ghost: Ghost = new Ghost({
  position: new Position(300, 75),
  radius: 20,
  imgSrc: "./image/pac-man.png",
  color: "green",
});
ghost.vx = 5;
ghosts.push(ghost);
let score: number = 0;
player = new Player({
  position: new Position(76, 75),
  radius: 20,
  imgSrc: "./image/pac-man.png",
});

function drawBoundary() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (customLevel) {
    walls.length = 0;
    pallets.length = 0;
    //	console.log(customgrid)
    drawWall(walls, pallets, customgrid);
    customLevel = false;
  } else {
    drawWall(walls, pallets, grid);
  }
}

drawBoundary();

function animate(): void {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  /**
   * based on gameState , respective function will be called
   * if gameState==='start', it will load starting screen
   * else it will load the main game screen
   */

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "custom") {
    customMapBuilder(elements, toolbar);
    elements.forEach((ele) => {
      ele.draw();
    });
    toolbar.forEach((ele) => {
      ele.draw();
    });
  } else {
    //ghost.update()

    if (customLevel) {
      drawBoundary();
    }

    // we need to use lastKey as when clicking two keys at once, we need to find the lastKey pressed
    // suppose I am clicking w , then I pressed s with keeping w pressed ,as w is already pressed,it won't reach to elseif "s" block
    // checking collision in next frame in advanced

    if (keys.w.pressed && keys.lastKey === "w") {
      for (let i = 0; i < walls.length; i++) {
        const wall: Wall = walls[i];
        if (checkCollision({ ...player, vy: -5 }, wall)) {
          player.vy = 0;
          break;
        } else {
          player.vy = -5;
        }
      }
    } else if (keys.s.pressed && keys.lastKey === "s") {
      for (let i = 0; i < walls.length; i++) {
        const wall: Wall = walls[i];
        if (checkCollision({ ...player, vy: 5 }, wall)) {
          player.vy = 0;
          break;
        } else {
          player.vy = 5;
        }
      }
    } else if (keys.a.pressed && keys.lastKey === "a") {
      for (let i = 0; i < walls.length; i++) {
        const wall: Wall = walls[i];
        if (checkCollision({ ...player, vx: -5 }, wall)) {
          player.vx = 0;
          break;
        } else {
          player.vx = -5;
        }
      }
    } else if (keys.d.pressed && keys.lastKey === "d") {
      for (let i = 0; i < walls.length; i++) {
        const wall: Wall = walls[i];
        if (checkCollision({ ...player, vx: 5 }, wall)) {
          player.vx = 0;
          break;
        } else {
          player.vx = 5;
        }
      }
    }

    for (let i = pallets.length - 1; i >= 0; i--) {
      let pallet: Pallets = pallets[i];
      pallet.draw();
      if (checkCollisionCircleToCircle(player, pallet)) {
        score += 10;
        scoreSpan.innerHTML = score + "";
        // console.log("collision  occurred")
        pallets.splice(i, 1);
      }
    }

    walls.forEach((wall: Wall) => {
      wall.draw();
      // checking collision in current frame
      if (checkCollision(player, wall)) {
        // console.log("collision  occurred")
        player.vx = 0;
        player.vy = 0;
      }
    });

    player.update();
    player.draw();

    ghosts.forEach((ghost: Ghost) => {
      ghost.update();
      ghost.draw();

      let collision: string[] = [];

      walls.forEach((wall: Wall) => {
        if (
          !collision.includes("left") &&
          checkCollision({ ...ghost, vx: -5 }, wall)
        ) {
          collision.push("left");
        }
        if (
          !collision.includes("right") &&
          checkCollision({ ...ghost, vx: 5 }, wall)
        ) {
          collision.push("right");
        }
        if (
          !collision.includes("bottom") &&
          checkCollision({ ...ghost, vy: 5 }, wall)
        ) {
          collision.push("bottom");
        }
        if (
          !collision.includes("top") &&
          checkCollision({ ...ghost, vy: -5 }, wall)
        ) {
          collision.push("top");
        }
      });

      if (collision.length > ghost.prevCollision.length) {
        ghost.prevCollision = collision;
      }
      let pathways = [];
      if (JSON.stringify(collision) != JSON.stringify(ghost.prevCollision)) {
        console.log(
          "move to the previous position where collision hasn't been occured"
        );
        console.log("ghost.prevcollision", ghost.prevCollision);
        if (ghost.vx > 0) {
          ghost.prevCollision.push("right");
        } else if (ghost.vx < 0) {
          ghost.prevCollision.push("left");
        } else if (ghost.vy > 0) {
          ghost.prevCollision.push("bottom");
        } else if (ghost.vy < 0) {
          ghost.prevCollision.push("top");
        }

        console.log("ghost.prevcollision", ghost.prevCollision);
        pathways = ghost.prevCollision.filter((each_collision) => {
          return !collision.includes(each_collision);
        });
        console.log(pathways);

        // creating a random move
        let randomMove = pathways[Math.floor(Math.random() * pathways.length)];
        console.log("random_Move", randomMove);
        //ghost.vx = 0;

        switch (randomMove) {
          case "top":
            ghost.vy = -5;
            ghost.vx = 0;
            break;
          case "bottom":
            ghost.vy = 5;
            ghost.vx = 0;
            break;
          case "left":
            ghost.vx = -5;
            ghost.vy = 0;
            break;
          case "right":
            ghost.vx = 5;
            ghost.vy = 0;

            break;
        }
        console.log(ghost.vx, ghost.vy);
      }
      ghost.prevCollision = [];
    });
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("keydown", ({ key }) => {
  if (key === " " && gameState === "start") {
    gameState = "play";
  }
  if (key === "c" && gameState === "start") {
    gameState = "custom";
  }
  if (key === "l" && gameState === "custom") {
    customLevel = true;
    gameState = "play";
  }
});
