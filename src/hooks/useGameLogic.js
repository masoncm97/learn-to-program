import { useState, useRef, useEffect, useCallback } from 'react';
import { GameEngine } from '../game/gameEngine';
import { Snake } from '../game/Snake';
import { BouncingBall } from '../game/BouncingBall';

const snakeCode = `// Welcome to Code Games - Snake Edition!
const snake = new Snake(200, 200);
snake.setColor('green');
snake.move('right');
snake.setSpeed(3);

// Try changing the speed or direction!
console.log('Snake created successfully!');`;

const ballCode = `// Welcome to Code Games - Bouncing Ball Edition!
const ball = new BouncingBall(200, 100, 15);
ball.setColor('red');
ball.setVelocity(5, 0);
ball.setGravity(0.3);
ball.setBounce(0.8);

const ball2 = new BouncingBall(100, 150, 20);
ball2.setColor('blue');
ball2.setVelocity(-3, 2);
ball2.setGravity(0.4);
ball2.setBounce(0.9);

// Try changing the physics properties!
console.log('Multiple bouncing balls created successfully!');`;

export const useGameLogic = () => {
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [gameEngine, setGameEngine] = useState(null);
  const canvasRef = useRef(null);
  const [selectedGame, setSelectedGame] = useState('snake');
  const [code, setCode] = useState(snakeCode);
  const [debouncedCode, setDebouncedCode] = useState(snakeCode);

  // Initialize game engine
  useEffect(() => {
    const engine = new GameEngine(canvasRef, setConsoleOutput);
    setGameEngine(engine);

    // Make both classes globally available
    window.Snake = Snake;
    window.BouncingBall = BouncingBall;

    return () => {
      engine.cleanup();
    };
  }, []);

  // Handle game selection change
  const handleGameChange = useCallback((gameType) => {
    setSelectedGame(gameType);
    if (gameType === 'snake') {
      setCode(snakeCode);
      setDebouncedCode(snakeCode);
    } else {
      setCode(ballCode);
      setDebouncedCode(ballCode);
    }
  }, []);

  // Debounce code changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(code);
    }, 500);

    return () => clearTimeout(timer);
  }, [code]);

  // Execute code when it changes
  useEffect(() => {
    if (gameEngine && debouncedCode) {
      // Create modified classes that add themselves to the game engine
      const GameSnake = class extends Snake {
        constructor(x, y) {
          super(x, y);
          gameEngine.addSnake(this);
        }
      };
      
      const GameBouncingBall = class extends BouncingBall {
        constructor(x, y, radius) {
          super(x, y, radius);
          gameEngine.addBall(this);
        }
      };
      
      // Temporarily replace the global classes
      const originalSnake = window.Snake;
      const originalBall = window.BouncingBall;
      window.Snake = GameSnake;
      window.BouncingBall = GameBouncingBall;
      
      // Execute the code
      gameEngine.executeCode(debouncedCode);
      
      // Restore original classes
      window.Snake = originalSnake;
      window.BouncingBall = originalBall;
    }
  }, [debouncedCode, gameEngine]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  const handleClearConsole = useCallback(() => {
    if (gameEngine) {
      gameEngine.clearConsole();
    }
  }, [gameEngine]);

  const getDefaultCode = useCallback(() => {
    return selectedGame === 'snake' ? snakeCode : ballCode;
  }, [selectedGame]);

  return {
    consoleOutput,
    gameEngine,
    canvasRef,
    selectedGame,
    handleGameChange,
    handleCodeChange,
    handleClearConsole,
    getDefaultCode
  };
}; 