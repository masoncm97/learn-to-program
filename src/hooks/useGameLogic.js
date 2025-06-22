import { useState, useRef, useEffect, useCallback } from 'react';
import { GameEngine } from '../game/gameEngine';
import { Snake } from '../game/Snake';
import { BouncingBall } from '../game/BouncingBall';
import { Circle, Rectangle, Triangle, Particle } from '../game/DrawingGame';

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

const drawingCode = `// Welcome to Code Games - Drawing Edition!
// Create colorful shapes with p5.js!

// Create some circles with different colors
for (let i = 0; i < 5; i++) {
  const circle = new Circle(100 + i * 100, 100, 30);
  circle.setColor(\`hsl(\${i * 72}, 70%, 60%)\`);
  circle.setVelocity(2, 1);
  circle.setRotationSpeed(0.02);
}

// Create some rectangles
for (let i = 0; i < 3; i++) {
  const rect = new Rectangle(150 + i * 150, 200, 40, 60);
  rect.setColor(\`hsl(\${120 + i * 60}, 80%, 50%)\`);
  rect.setVelocity(-1, 2);
  rect.setRotationSpeed(0.03);
}

// Create some triangles
for (let i = 0; i < 4; i++) {
  const triangle = new Triangle(200 + i * 120, 300, 25);
  triangle.setColor(\`hsl(\${240 + i * 45}, 75%, 55%)\`);
  triangle.setVelocity(1.5, -1);
  triangle.setRotationSpeed(0.04);
}

// Create some particles with simple hex colors
for (let i = 0; i < 10; i++) {
  const particle = new Particle(400, 50, '#ff0080');
  particle.color = \`#\${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}\`;
}

console.log('Drawing game initialized with shapes and animations!');`;

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

    // Make all classes globally available
    window.Snake = Snake;
    window.BouncingBall = BouncingBall;
    window.Circle = Circle;
    window.Rectangle = Rectangle;
    window.Triangle = Triangle;
    window.Particle = Particle;

    return () => {
      engine.cleanup();
    };
  }, []);

  // Handle game selection change
  const handleGameChange = useCallback((gameType) => {
    setSelectedGame(gameType);
    
    // Update game engine type
    if (gameEngine) {
      gameEngine.setGameType(gameType);
    }
    
    // Set appropriate default code
    let newCode;
    switch (gameType) {
      case 'snake':
        newCode = snakeCode;
        break;
      case 'ball':
        newCode = ballCode;
        break;
      case 'drawing':
        newCode = drawingCode;
        break;
      default:
        newCode = snakeCode;
    }
    
    setCode(newCode);
    setDebouncedCode(newCode);
  }, [gameEngine]);

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
      // For drawing game, ensure it's initialized before executing code
      if (selectedGame === 'drawing' && gameEngine.drawingGame && !gameEngine.drawingGame.isInitialized) {
        console.log('Waiting for drawing game to initialize...');
        setTimeout(() => {
          gameEngine.executeCode(debouncedCode);
        }, 100);
      } else {
        gameEngine.executeCode(debouncedCode);
      }
    }
  }, [debouncedCode, gameEngine, selectedGame]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  const handleClearConsole = useCallback(() => {
    if (gameEngine) {
      gameEngine.clearConsole();
    }
  }, [gameEngine]);

  const getDefaultCode = useCallback(() => {
    switch (selectedGame) {
      case 'snake':
        return snakeCode;
      case 'ball':
        return ballCode;
      case 'drawing':
        return drawingCode;
      default:
        return snakeCode;
    }
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