import { Snake } from './Snake.js';
import { BouncingBall } from './BouncingBall.js';
import { DrawingGame, Circle, Rectangle, Triangle, Particle } from './DrawingGame.js';

export class GameEngine {
  constructor(canvasRef, onConsoleOutput) {
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.snakes = [];
    this.balls = [];
    this.drawingGame = null;
    this.isRunning = false;
    this.animationId = null;
    this.onConsoleOutput = onConsoleOutput;
    this.consoleOutput = [];
    this.lastCodeExecution = '';
    this.currentGameType = 'snake';
    
    // Override console methods to capture output
    this.originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn
    };
  }

  initialize() {
    if (!this.canvasRef.current) return;
    
    this.ctx = this.canvasRef.current.getContext('2d');
    this.canvasRef.current.width = 400;
    this.canvasRef.current.height = 400;
    
    this.setupConsoleCapture();
    this.start();
  }

  // Initialize drawing game with larger canvas
  initializeDrawingGame() {
    console.log('Initializing drawing game...');
    if (!this.canvasRef.current) {
      console.error('Canvas ref not available');
      return;
    }
    
    // Set canvas size for drawing game
    this.canvasRef.current.width = 1200;
    this.canvasRef.current.height = 600;
    
    // Create drawing game instance if it doesn't exist
    if (!this.drawingGame) {
      this.drawingGame = new DrawingGame();
    }
    
    // Initialize the drawing game with the canvas ref
    this.drawingGame.initialize(this.canvasRef, this.onConsoleOutput);
    console.log('Drawing game initialization complete');
  }

  setupConsoleCapture() {
    const self = this;
    
    console.log = (...args) => {
      this.originalConsole.log(...args);
      this.addConsoleOutput('log', args.join(' '));
    };
    
    console.error = (...args) => {
      this.originalConsole.error(...args);
      this.addConsoleOutput('error', args.join(' '));
    };
    
    console.warn = (...args) => {
      this.originalConsole.warn(...args);
      this.addConsoleOutput('warn', args.join(' '));
    };
  }

  addConsoleOutput(type, message) {
    const timestamp = new Date().toLocaleTimeString();
    this.consoleOutput.push({ type, message, timestamp });
    
    // Keep only last 50 messages
    if (this.consoleOutput.length > 50) {
      this.consoleOutput.shift();
    }
    
    if (this.onConsoleOutput) {
      this.onConsoleOutput([...this.consoleOutput]);
    }
  }

  clearConsole() {
    this.consoleOutput = [];
    if (this.onConsoleOutput) {
      this.onConsoleOutput([]);
    }
  }

  setGameType(gameType) {
    console.log('Setting game type to:', gameType);
    console.log('Current canvas ref:', this.canvasRef.current);
    this.currentGameType = gameType;
    
    if (gameType === 'drawing') {
      console.log('Initializing drawing game...');
      this.initializeDrawingGame();
    } else {
      // Reset to standard canvas size for other games
      if (this.canvasRef.current) {
        this.canvasRef.current.width = 400;
        this.canvasRef.current.height = 400;
      }
      this.drawingGame = null;
    }
  }

  executeCode(code) {
    if (code === this.lastCodeExecution) return;
    this.lastCodeExecution = code;
    
    // Clear previous state based on game type
    if (this.currentGameType === 'drawing') {
      if (this.drawingGame) {
        this.drawingGame.clear();
      }
    } else {
      this.snakes = [];
      this.balls = [];
    }
    
    this.clearConsole();
    
    try {
      if (this.currentGameType === 'drawing') {
        this.executeDrawingCode(code);
      } else {
        this.executeGameCode(code);
      }
    } catch (error) {
      this.addConsoleOutput('error', `Execution Error: ${error.message}`);
    }
  }

  executeDrawingCode(code) {
    console.log('Executing drawing code:', code.substring(0, 100) + '...');
    if (!this.drawingGame) {
      console.error('Drawing game not initialized!');
      return;
    }

    // Create modified classes that add themselves to the drawing game
    const drawingGameInstance = this.drawingGame;
    
    const GameCircle = class extends Circle {
      constructor(x, y, radius, color) {
        super(x, y, radius, color);
        drawingGameInstance.addShape(this);
      }
    };
    
    const GameRectangle = class extends Rectangle {
      constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        drawingGameInstance.addShape(this);
      }
    };
    
    const GameTriangle = class extends Triangle {
      constructor(x, y, size, color) {
        super(x, y, size, color);
        drawingGameInstance.addShape(this);
      }
    };
    
    const GameParticle = class extends Particle {
      constructor(x, y, color) {
        super(x, y, color);
        drawingGameInstance.addAnimation(this);
      }
    };
    
    // Temporarily replace the global classes
    const originalCircle = window.Circle;
    const originalRectangle = window.Rectangle;
    const originalTriangle = window.Triangle;
    const originalParticle = window.Particle;
    
    window.Circle = GameCircle;
    window.Rectangle = GameRectangle;
    window.Triangle = GameTriangle;
    window.Particle = GameParticle;
    
    try {
      // Execute the code
      const func = new Function('Circle', 'Rectangle', 'Triangle', 'Particle', 'console', code);
      func(GameCircle, GameRectangle, GameTriangle, GameParticle, console);
      console.log('Drawing code executed successfully');
    } catch (error) {
      console.error('Error executing drawing code:', error);
    }
    
    // Restore original classes
    window.Circle = originalCircle;
    window.Rectangle = originalRectangle;
    window.Triangle = originalTriangle;
    window.Particle = originalParticle;
  }

  executeGameCode(code) {
    // Create modified classes that add themselves to the game engine
    const gameEngineInstance = this;
    
    const GameSnake = class extends Snake {
      constructor(x, y) {
        super(x, y);
        gameEngineInstance.addSnake(this);
      }
    };
    
    const GameBouncingBall = class extends BouncingBall {
      constructor(x, y, radius) {
        super(x, y, radius);
        gameEngineInstance.addBall(this);
      }
    };
    
    // Temporarily replace the global classes
    const originalSnake = window.Snake;
    const originalBall = window.BouncingBall;
    window.Snake = GameSnake;
    window.BouncingBall = GameBouncingBall;
    
    // Execute the code
    const func = new Function('Snake', 'BouncingBall', 'console', code);
    func(GameSnake, GameBouncingBall, console);
    
    // Restore original classes
    window.Snake = originalSnake;
    window.BouncingBall = originalBall;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    if (this.currentGameType === 'drawing') {
      // Drawing game uses p5.js animation loop
      return;
    }
    
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  gameLoop() {
    if (!this.isRunning) return;
    
    this.update();
    this.render();
    
    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    if (this.currentGameType === 'drawing') return;
    
    const canvasWidth = this.canvasRef.current?.width || 400;
    const canvasHeight = this.canvasRef.current?.height || 400;
    
    this.snakes.forEach(snake => {
      snake.update(canvasWidth, canvasHeight);
    });
    
    this.balls.forEach(ball => {
      ball.update(canvasWidth, canvasHeight);
    });
  }

  render() {
    if (this.currentGameType === 'drawing') return;
    if (!this.ctx) return;
    
    // Clear canvas
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, 400, 400);
    
    // Draw grid (optional)
    this.drawGrid();
    
    // Draw snakes
    this.snakes.forEach(snake => {
      snake.draw(this.ctx);
    });
    
    // Draw balls
    this.balls.forEach(ball => {
      ball.draw(this.ctx);
    });
  }

  drawGrid() {
    this.ctx.strokeStyle = '#333333';
    this.ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = 0; x <= 400; x += 20) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, 400);
      this.ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= 400; y += 20) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(400, y);
      this.ctx.stroke();
    }
  }

  // Method to add snakes from code execution
  addSnake(snake) {
    if (snake instanceof Snake) {
      this.snakes.push(snake);
    }
  }

  // Method to add balls from code execution
  addBall(ball) {
    if (ball instanceof BouncingBall) {
      this.balls.push(ball);
    }
  }

  // Cleanup method
  cleanup() {
    this.stop();
    
    if (this.drawingGame) {
      this.drawingGame.cleanup();
    }
    
    // Restore original console methods
    console.log = this.originalConsole.log;
    console.error = this.originalConsole.error;
    console.warn = this.originalConsole.warn;
  }
} 