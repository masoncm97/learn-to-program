import { Snake } from './Snake.js';
import { BouncingBall } from './BouncingBall.js';

export class GameEngine {
  constructor(canvasRef, onConsoleOutput) {
    this.canvasRef = canvasRef;
    this.ctx = null;
    this.snakes = [];
    this.balls = [];
    this.isRunning = false;
    this.animationId = null;
    this.onConsoleOutput = onConsoleOutput;
    this.consoleOutput = [];
    this.lastCodeExecution = '';
    
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

  executeCode(code) {
    if (code === this.lastCodeExecution) return;
    this.lastCodeExecution = code;
    
    // Clear previous state
    this.snakes = [];
    this.balls = [];
    this.clearConsole();
    
    try {
      // Create execution context with both classes available
      const Snake = window.Snake || this.Snake;
      const BouncingBall = window.BouncingBall || this.BouncingBall;
      const executionContext = {
        Snake,
        BouncingBall,
        console: console,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval
      };
      
      // Execute the code
      const func = new Function('Snake', 'BouncingBall', 'console', code);
      func(Snake, BouncingBall, console);
      
    } catch (error) {
      this.addConsoleOutput('error', `Execution Error: ${error.message}`);
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
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
    
    // Restore original console methods
    console.log = this.originalConsole.log;
    console.error = this.originalConsole.error;
    console.warn = this.originalConsole.warn;
  }
} 