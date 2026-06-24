"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./not-found.module.css";

type GameStatus = "ready" | "playing" | "over";
type ObstacleKind = "cactus" | "bird";

type Obstacle = {
  id: number;
  x: number;
  width: number;
  height: number;
  y: number;
  kind: ObstacleKind;
};

type GameState = {
  status: GameStatus;
  score: number;
  best: number;
  playerY: number;
  playerVelocity: number;
  ducking: boolean;
  obstacles: Obstacle[];
  speed: number;
  nextSpawnIn: number;
};

const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 320;
const GROUND_Y = 36;
const PLAYER_X = 120;
const PLAYER_WIDTH = 52;
const PLAYER_HEIGHT = 54;
const DUCK_HEIGHT = 36;
const GRAVITY = 1800;
const JUMP_VELOCITY = -700;
const START_SPEED = 360;
const MAX_SPEED = 620;
const BASE_SPAWN_MIN = 0.95;
const BASE_SPAWN_MAX = 1.65;

function makeObstacle(id: number, difficulty: number): Obstacle {
  const birdChance = Math.min(0.24, 0.08 + difficulty * 0.01);
  const kind: ObstacleKind = Math.random() < birdChance ? "bird" : "cactus";

  if (kind === "bird") {
    return {
      id,
      kind,
      x: WORLD_WIDTH + 60,
      y: GROUND_Y + 82 + Math.round(Math.random() * 30),
      width: 54,
      height: 26,
    };
  }

  const wide = Math.random() > 0.55;

  return {
    id,
    kind,
    x: WORLD_WIDTH + 60,
    y: GROUND_Y,
    width: wide ? 28 : 20,
    height: wide ? 54 : 44,
  };
}

function createInitialState(): GameState {
  return {
    status: "ready",
    score: 0,
    best: 0,
    playerY: 0,
    playerVelocity: 0,
    ducking: false,
    obstacles: [],
    speed: START_SPEED,
    nextSpawnIn: 1.15,
  };
}

function formatScore(value: number) {
  return String(Math.floor(value)).padStart(5, "0");
}

function overlaps(aLeft: number, aTop: number, aRight: number, aBottom: number, bLeft: number, bTop: number, bRight: number, bBottom: number) {
  return aLeft < bRight && aRight > bLeft && aTop < bBottom && aBottom > bTop;
}

export default function NotFoundClient() {
  const [game, setGame] = useState<GameState>(() => createInitialState());
  const gameRef = useRef(game);
  const lastTimeRef = useRef<number | null>(null);
  const nextIdRef = useRef(1);
  const flashTimeoutRef = useRef<number | null>(null);
  const [flash, setFlash] = useState(false);

  const obstacleCount = game.obstacles.length;

  useEffect(() => {
    gameRef.current = game;
  }, [game]);

  const pushFlash = useCallback(() => {
    setFlash(true);
    if (flashTimeoutRef.current !== null) {
      window.clearTimeout(flashTimeoutRef.current);
    }
    flashTimeoutRef.current = window.setTimeout(() => setFlash(false), 140);
  }, []);

  const resetGame = useCallback((autoStart = true) => {
    const initial: GameState = {
      ...createInitialState(),
      best: gameRef.current.best,
      status: autoStart ? "playing" : "ready",
    };
    gameRef.current = initial;
    lastTimeRef.current = null;
    setGame(initial);
    setFlash(false);
  }, []);

  const setDuck = useCallback((ducking: boolean) => {
    const current = gameRef.current;
    if (current.status !== "playing") return;
    if (ducking && current.playerY > 0) return;

    const next = { ...current, ducking };
    gameRef.current = next;
    setGame(next);
  }, []);

  const startOrJump = useCallback(
    (forceDuckOff = true) => {
      const current = gameRef.current;

      if (current.status === "over") {
        resetGame(true);
        return;
      }

      if (current.status === "ready") {
        const started: GameState = { ...current, status: "playing", ducking: false };
        gameRef.current = started;
        setGame(started);
        pushFlash();
        return;
      }

      if (current.playerY === 0) {
        const jumped: GameState = {
          ...current,
          status: "playing",
          ducking: forceDuckOff ? false : current.ducking,
          playerVelocity: JUMP_VELOCITY,
        };
        gameRef.current = jumped;
        setGame(jumped);
        pushFlash();
      }
    },
    [pushFlash, resetGame]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp" || event.code === "Enter") {
        event.preventDefault();
        startOrJump();
      }

      if (event.code === "ArrowDown") {
        event.preventDefault();
        setDuck(true);
      }

      if (event.code === "KeyR" && gameRef.current.status === "over") {
        event.preventDefault();
        resetGame(true);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code === "ArrowDown") {
        setDuck(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [resetGame, setDuck, startOrJump]);

  useEffect(() => {
    let animationFrame = 0;

    const tick = (time: number) => {
      const current = gameRef.current;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const dt = Math.min(0.032, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      if (current.status === "playing") {
        let playerVelocity = current.playerVelocity + GRAVITY * dt;
        let playerY = current.playerY + playerVelocity * dt;

        if (playerY <= 0) {
          playerY = 0;
          playerVelocity = 0;
        }

        const score = current.score + dt * 12;
        const speed = Math.min(MAX_SPEED, START_SPEED + score * 2.8);

        const movedObstacles = current.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - speed * dt }))
          .filter((obstacle) => obstacle.x + obstacle.width > -80);

        let nextSpawnIn = current.nextSpawnIn - dt;
        let obstacles = movedObstacles;
        const nextId = nextIdRef.current;
        const difficulty = Math.min(22, score / 120);

        if (nextSpawnIn <= 0) {
          obstacles = [...obstacles, makeObstacle(nextId, difficulty)];
          nextIdRef.current = nextId + 1;
          nextSpawnIn = BASE_SPAWN_MIN + Math.random() * (BASE_SPAWN_MAX - BASE_SPAWN_MIN) - Math.min(0.45, score / 1600);
          nextSpawnIn = Math.max(0.7, nextSpawnIn);
        }

        const ducking = current.ducking && playerY === 0;
        const playerHeight = ducking ? DUCK_HEIGHT : PLAYER_HEIGHT;
        const playerTop = playerY + playerHeight;
        const playerLeft = PLAYER_X;
        const playerRight = PLAYER_X + PLAYER_WIDTH;

        let collided = false;
        for (const obstacle of obstacles) {
          const obstacleLeft = obstacle.x;
          const obstacleRight = obstacle.x + obstacle.width;
          const obstacleBottom = obstacle.y;
          const obstacleTop = obstacle.y + obstacle.height;

          if (
            overlaps(
              playerLeft,
              playerY,
              playerRight,
              playerTop,
              obstacleLeft,
              obstacleBottom,
              obstacleRight,
              obstacleTop
            )
          ) {
            collided = true;
            break;
          }
        }

        const nextState: GameState = collided
          ? {
              ...current,
              status: "over",
              score,
              best: Math.max(current.best, Math.floor(score)),
              playerY,
              playerVelocity: 0,
              obstacles,
              speed,
              nextSpawnIn,
              ducking,
            }
          : {
              ...current,
              score,
              playerY,
              playerVelocity,
              obstacles,
              speed,
              nextSpawnIn,
              ducking,
            };

        gameRef.current = nextState;
        setGame(nextState);
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current !== null) {
        window.clearTimeout(flashTimeoutRef.current);
      }
    };
  }, []);

  const playerClassName = [
    styles.runner,
    game.status === "over" ? styles.runnerHit : "",
    game.ducking && game.playerY === 0 ? styles.runnerDuck : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>404 / runner mode</p>
          <h1>Esta página no existe</h1>
          <p className={styles.subtitle}>
            Un juego simple para seguir moviéndote mientras encuentras el camino correcto.
          </p>
        </div>
        <div className={styles.scoreboard} aria-label="Marcador">
          <div>
            <span>Puntaje</span>
            <strong>{formatScore(game.score)}</strong>
          </div>
          <div>
            <span>Récord</span>
            <strong>{formatScore(game.best)}</strong>
          </div>
        </div>
      </header>

      <div className={styles.stageWrap}>
        <div
          className={`${styles.stage} ${flash ? styles.stageFlash : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Juego 404"
          onPointerDown={() => startOrJump()}
          onKeyDown={(event) => {
            if (event.code === "Space" || event.code === "ArrowUp" || event.code === "Enter") {
              event.preventDefault();
              startOrJump();
            }
            if (event.code === "ArrowDown") {
              event.preventDefault();
              setDuck(true);
            }
          }}
          onKeyUp={(event) => {
            if (event.code === "ArrowDown") {
              setDuck(false);
            }
          }}
        >
          <div className={styles.sky} />
          <div className={styles.cloudA} />
          <div className={styles.cloudB} />
          <div className={styles.cloudC} />
          <div className={styles.horizon} />
          <div className={styles.ground} />

          <div
            className={playerClassName}
            style={{
              left: `${(PLAYER_X / WORLD_WIDTH) * 100}%`,
              bottom: `${((GROUND_Y + game.playerY) / WORLD_HEIGHT) * 100}%`,
            }}
          >
            <span className={styles.runnerHead} />
            <span className={styles.runnerEye} />
            <span className={styles.runnerTail} />
            <span className={styles.runnerLegA} />
            <span className={styles.runnerLegB} />
          </div>

          {game.obstacles.map((obstacle) => {
            const isBird = obstacle.kind === "bird";

            return (
              <div
                key={obstacle.id}
                className={isBird ? styles.bird : styles.cactus}
                style={{
                  left: `${(obstacle.x / WORLD_WIDTH) * 100}%`,
                  bottom: `${(obstacle.y / WORLD_HEIGHT) * 100}%`,
                  width: `${(obstacle.width / WORLD_WIDTH) * 100}%`,
                  height: `${(obstacle.height / WORLD_HEIGHT) * 100}%`,
                }}
                aria-hidden="true"
              >
                {isBird ? <span className={styles.birdWing} /> : <span className={styles.cactusArms} />}
              </div>
            );
          })}

          <div className={styles.overlay}>
            {game.status === "ready" ? (
              <>
                <strong>Presiona espacio o toca la pantalla</strong>
                <span>Salta para esquivar obstáculos. Flecha abajo para agacharte.</span>
              </>
            ) : game.status === "over" ? (
              <>
                <strong>Game over</strong>
                <span>Pulsa espacio, Enter o toca para reiniciar.</span>
              </>
            ) : (
              <>
                <strong>{obstacleCount > 0 ? "Sigue" : "Corre"}</strong>
                <span>Espacio para saltar. Flecha abajo para agacharte.</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.primaryButton} onClick={() => startOrJump()}>
          {game.status === "over" ? "Reintentar" : game.status === "ready" ? "Jugar" : "Saltar"}
        </button>
        <button type="button" className={styles.secondaryButton} onClick={() => resetGame(false)}>
          Reiniciar
        </button>
        <span className={styles.controlHint}>Espacio / Enter / toque: saltar. Abajo: agacharse.</span>
      </div>
    </section>
  );
}
