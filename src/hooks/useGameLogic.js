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

// Enable trails for marker-like effect
// This will make shapes leave trails behind them
// You can disable trails by setting this to false
const enableTrails = true;

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

console.log('Drawing game initialized with shapes and animations!');`;

const particleCode = `// Create some particles with simple hex colors
console.log('Creating particles...');
for (let i = 0; i < 30; i++) {
  const particle = new Particle(600, 300, '#ff0080');
  
  // Set random color for each particle
  particle.color = \`hsl(\${i * 12}, 80%, 60%)\`;
  
  // Make particles explode outward with random arcing paths
  const baseAngle = (i / 30) * Math.PI * 2;
  const angleVariation = (Math.random() - 0.5) * 0.5; // Add some randomness to angle
  const angle = baseAngle + angleVariation;
  const speed = Math.random() * 5 + 2; // Varied speed range
  
  // Add some randomness to create arcing paths
  const arcFactor = Math.random() * 0.3; // How much the path curves
  const arcDirection = Math.random() > 0.5 ? 1 : -1; // Random arc direction
  
  // Apply arcing motion by adding perpendicular velocity component
  const baseVx = Math.cos(angle) * speed;
  const baseVy = Math.sin(angle) * speed;
  const arcVx = Math.cos(angle + Math.PI/2) * speed * arcFactor * arcDirection;
  const arcVy = Math.sin(angle + Math.PI/2) * speed * arcFactor * arcDirection;
  
  particle.vx = baseVx + arcVx + (Math.random() - 0.5) * 2;
  particle.vy = baseVy + arcVy + (Math.random() - 0.5) * 2;
  particle.size = Math.random() * 10 + 2;
  particle.setGravity(0.02); // Light gravity for natural arcing
  particle.life = 255; // Make them permanent
  particle.decay = 0; // No decay
  
  console.log(\`Particle \${i}: angle=\${angle.toFixed(2)}, vx=\${particle.vx.toFixed(2)}, vy=\${particle.vy.toFixed(2)}, arcFactor=\${arcFactor.toFixed(2)}, arcDirection=\${arcDirection}, color=\${particle.color}, size=\${particle.size}\`);
}
console.log('Finished creating particles');`

const mathematicalPatternsCode = `// Mathematical Patterns
// Create beautiful mathematical patterns using sin/cos

// Enable trails for marker-like effect
// This will make shapes leave trails behind them
// You can disable trails by setting this to false
const enableTrails = false;

// Spiral pattern
for (let i = 0; i < 100; i++) {
  const angle = i * 0.1;
  const radius = i * 2;
  const x = 600 + Math.cos(angle) * radius;
  const y = 300 + Math.sin(angle) * radius;
  
  const circle = new Circle(x, y, 8);
  circle.setColor(\`hsl(\${i * 3.6}, 70%, 60%)\`);
  circle.setRotationSpeed(0.05);
}

// Wave pattern
for (let i = 0; i < 50; i++) {
  const x = 200 + i * 20;
  const y = 200 + Math.sin(i * 0.3) * 50;
  
  const rect = new Rectangle(x, y, 15, 15);
  rect.setColor(\`hsl(\${i * 7.2}, 80%, 50%)\`);
  rect.setVelocity(0, Math.cos(i * 0.3) * 2);
  rect.setRotationSpeed(0.02);
}

// Lissajous curves
for (let i = 0; i < 80; i++) {
  const t = i * 0.1;
  const x = 400 + Math.sin(t * 2) * 100;
  const y = 500 + Math.sin(t * 3) * 80;
  
  const triangle = new Triangle(x, y, 12);
  triangle.setColor(\`hsl(\${i * 4.5}, 75%, 55%)\`);
  triangle.setRotationSpeed(0.03);
}

console.log('Mathematical patterns created!');`;

const radialSpinnerCode = `// Radial Spinner Animation
// Create spinning radial patterns

// Enable trails for marker-like effect
// This will make shapes leave trails behind them
// You can disable trails by setting this to false
const enableTrails = false;

const centerX = 600;
const centerY = 300;

// Create multiple rotating rings
for (let ring = 0; ring < 3; ring++) {
  const ringRadius = 80 + ring * 60;
  const numShapes = 12 + ring * 4;
  
  for (let i = 0; i < numShapes; i++) {
    const angle = (i / numShapes) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * ringRadius;
    const y = centerY + Math.sin(angle) * ringRadius;
    
    if (ring === 0) {
      const circle = new Circle(x, y, 15);
      circle.setColor(\`hsl(\${i * 30}, 80%, 60%)\`);
      circle.setRotationSpeed(0.02 + ring * 0.01);
    } else if (ring === 1) {
      const rect = new Rectangle(x - 10, y - 10, 20, 20);
      rect.setColor(\`hsl(\${i * 30 + 120}, 75%, 55%)\`);
      rect.setRotationSpeed(0.03 + ring * 0.01);
    } else {
      const triangle = new Triangle(x, y, 12);
      triangle.setColor(\`hsl(\${i * 30 + 240}, 70%, 50%)\`);
      triangle.setRotationSpeed(0.04 + ring * 0.01);
    }
  }
}

// Add some orbiting particles
for (let i = 0; i < 15; i++) {
  const angle = (i / 15) * Math.PI * 2;
  const radius = 150;
  const x = centerX + Math.cos(angle) * radius;
  const y = centerY + Math.sin(angle) * radius;
  
  const particle = new Particle(x, y, '#ff6b35');
  particle.vx = Math.cos(angle + Math.PI/2) * 3;
  particle.vy = Math.sin(angle + Math.PI/2) * 3;
  particle.size = Math.random() * 10 + 5;
  particle.color = \`hsl(\${i * 24}, 85%, 65%)\`;
}

console.log('Radial spinner animation created!');`;

const chaosGameCode = `// Chaos Game - Sierpinski Triangle
// Create fractal-like patterns using chaos game algorithm

// Enable trails for marker-like effect
// This will make shapes leave trails behind them
// You can disable trails by setting this to false
const enableTrails = false;

const vertices = [
  {x: 600, y: 100},  // Top vertex
  {x: 400, y: 500},  // Bottom left
  {x: 800, y: 500}   // Bottom right
];

let currentX = 600;
let currentY = 300;

// Create points using chaos game algorithm
for (let i = 0; i < 5000; i++) {
  // Pick a random vertex
  const vertex = vertices[Math.floor(Math.random() * 3)];
  
  // Move halfway towards the vertex
  currentX = (currentX + vertex.x) / 2;
  currentY = (currentY + vertex.y) / 2;
  
  // Create a particle at the new position
  const particle = new Particle(currentX, currentY, '#00ff88');
  particle.size = 3;
  particle.vx = 0;
  particle.vy = 0;
  particle.life = 255; // Make them permanent
  particle.decay = 0;
  particle.setGravity(0); // Disable gravity for static particles
  particle.color = \`hsl(\${i * 1.8}, 70%, 60%)\`;
}

// Add some moving particles around the edges with controlled velocities
for (let i = 0; i < 20; i++) {
  const angle = (i / 20) * Math.PI * 2;
  const radius = 150;
  const x = 600 + Math.cos(angle) * radius;
  const y = 300 + Math.sin(angle) * radius;
  
  const particle = new Particle(x, y, '#ff0080');
  // Use much smaller velocities to keep particles on screen
  particle.vx = Math.cos(angle + Math.PI/2) * 0.5;
  particle.vy = Math.sin(angle + Math.PI/2) * 0.5;
  particle.size = Math.random() * 6 + 2;
  particle.life = 255; // Make them permanent
  particle.decay = 0;
  particle.setGravity(0); // Disable gravity for controlled movement
}

console.log('Chaos game pattern created!');`;

const waveFieldCode = `// Wave Field Animation
// Create flowing wave patterns

// Enable trails for marker-like effect
// This will make shapes leave trails behind them
// You can disable trails by setting this to false
const enableTrails = false;

// Create a grid of particles that move in wave patterns
for (let x = 0; x < 20; x++) {
  for (let y = 0; y < 12; y++) {
    const posX = 200 + x * 50;
    const posY = 100 + y * 40;
    
    const particle = new Particle(posX, posY, '#4a90e2');
    particle.size = 8;
    particle.vx = Math.sin(y * 0.5) * 2;
    particle.vy = Math.cos(x * 0.3) * 2;
    particle.life = 255;
    particle.decay = 0;
    particle.setGravity(0); // Disable gravity for wave patterns
    particle.color = \`hsl(\${(x + y) * 10}, 80%, 60%)\`;
  }
}

// Add some floating shapes that follow wave patterns
for (let i = 0; i < 15; i++) {
  const x = 400 + Math.sin(i * 0.5) * 300;
  const y = 300 + Math.cos(i * 0.3) * 200;
  
  if (i % 3 === 0) {
    const circle = new Circle(x, y, 20);
    circle.setColor(\`hsl(\${i * 24}, 75%, 65%)\`);
    circle.setVelocity(Math.cos(i * 0.2) * 3, Math.sin(i * 0.2) * 3);
  } else if (i % 3 === 1) {
    const rect = new Rectangle(x - 15, y - 15, 30, 30);
    rect.setColor(\`hsl(\${i * 24 + 120}, 70%, 55%)\`);
    rect.setVelocity(Math.sin(i * 0.3) * 2, Math.cos(i * 0.3) * 2);
  } else {
    const triangle = new Triangle(x, y, 18);
    triangle.setColor(\`hsl(\${i * 24 + 240}, 80%, 60%)\`);
    triangle.setVelocity(Math.cos(i * 0.4) * 2.5, Math.sin(i * 0.4) * 2.5);
  }
}

console.log('Wave field animation created!');`;

export const useGameLogic = () => {
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [gameEngine, setGameEngine] = useState(null);
  const canvasRef = useRef(null);
  const [selectedGame, setSelectedGame] = useState('snake');
  const [code, setCode] = useState(snakeCode);
  const [debouncedCode, setDebouncedCode] = useState(snakeCode);
  const [currentDrawingExample, setCurrentDrawingExample] = useState(0);

  // Array of drawing examples
  const drawingExamples = [
    { name: 'Basic Shapes', code: drawingCode },
    { name: 'Particle Code', code: particleCode },
    { name: 'Mathematical Patterns', code: mathematicalPatternsCode },
    { name: 'Radial Spinner', code: radialSpinnerCode },
    { name: 'Chaos Game', code: chaosGameCode },
    { name: 'Wave Field', code: waveFieldCode }
  ];

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
        newCode = drawingExamples[currentDrawingExample].code;
        break;
      default:
        newCode = snakeCode;
    }
    
    setCode(newCode);
    setDebouncedCode(newCode);
  }, [gameEngine, currentDrawingExample, drawingExamples]);

  // Cycle through drawing examples
  const nextDrawingExample = useCallback(() => {
    if (selectedGame === 'drawing') {
      const nextIndex = (currentDrawingExample + 1) % drawingExamples.length;
      setCurrentDrawingExample(nextIndex);
      const newCode = drawingExamples[nextIndex].code;
      setCode(newCode);
      setDebouncedCode(newCode);
    }
  }, [selectedGame, currentDrawingExample, drawingExamples]);

  const previousDrawingExample = useCallback(() => {
    if (selectedGame === 'drawing') {
      const prevIndex = (currentDrawingExample - 1 + drawingExamples.length) % drawingExamples.length;
      setCurrentDrawingExample(prevIndex);
      const newCode = drawingExamples[prevIndex].code;
      setCode(newCode);
      setDebouncedCode(newCode);
    }
  }, [selectedGame, currentDrawingExample, drawingExamples]);

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

  const handleReplay = useCallback((currentCode) => {
    if (gameEngine && selectedGame === 'drawing') {
      console.log('Replaying drawing game with current code');
      console.log('Current code length:', currentCode.length);
      
      // Clear the current drawing
      if (gameEngine.drawingGame) {
        console.log('Clearing drawing game...');
        gameEngine.drawingGame.clear();
        console.log('Drawing game cleared');
      }
      
      // Small delay to ensure clearing is complete
      setTimeout(() => {
        console.log('Executing code after clear...');
        // Execute the current code to reload the canvas (force execution)
        gameEngine.executeCodeForce(currentCode);
        console.log('Code execution complete');
      }, 50);
    }
  }, [gameEngine, selectedGame]);

  const getDefaultCode = useCallback(() => {
    switch (selectedGame) {
      case 'snake':
        return snakeCode;
      case 'ball':
        return ballCode;
      case 'drawing':
        return drawingExamples[currentDrawingExample].code;
      default:
        return snakeCode;
    }
  }, [selectedGame, currentDrawingExample, drawingExamples]);

  return {
    consoleOutput,
    gameEngine,
    canvasRef,
    selectedGame,
    handleGameChange,
    handleCodeChange,
    handleClearConsole,
    handleReplay,
    getDefaultCode,
    nextDrawingExample,
    previousDrawingExample,
    currentDrawingExample,
    drawingExamples
  };
}; 