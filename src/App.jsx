import React, { useState, useRef, useEffect, useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import GameCanvas from './components/GameCanvas';
import Console from './components/Console';
import { GameEngine } from './game/gameEngine';
import { Snake } from './game/Snake';
import { BouncingBall } from './game/BouncingBall';

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

function App() {
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
  const handleGameChange = (gameType) => {
    setSelectedGame(gameType);
    if (gameType === 'snake') {
      setCode(snakeCode);
      setDebouncedCode(snakeCode);
    } else {
      setCode(ballCode);
      setDebouncedCode(ballCode);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Code Games - Learn Programming Visually
          </h1>
          <p className="text-gray-400 mt-1">
            Write JavaScript code to control games in real-time
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Game Selector */}
        <div className="mb-6">
          <label htmlFor="game-select" className="block text-sm font-medium text-gray-300 mb-2">
            Select Game:
          </label>
          <select
            id="game-select"
            value={selectedGame}
            onChange={(e) => handleGameChange(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option value="snake">Snake Game</option>
            <option value="ball">Bouncing Ball Physics</option>
          </select>
        </div>

        {/* Split Screen Layout */}
        <div className="flex h-[600px] w-full gap-6">
          {/* Left Panel - Code Editor */}
          <div className="w-1/2 h-full">
            <CodeEditor 
              onCodeChange={handleCodeChange}
              defaultCode={selectedGame === 'snake' ? snakeCode : ballCode}
            />
          </div>

          {/* Right Panel - Game Canvas */}
          <div className="w-1/2 h-full">
            <GameCanvas gameEngine={gameEngine} canvasRef={canvasRef} />
          </div>
        </div>

        {/* Bottom Panel - Console */}
        <div className="mt-6">
          <Console 
            output={consoleOutput}
            onClear={handleClearConsole}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-1">
                {selectedGame === 'snake' ? 'Snake Methods:' : 'BouncingBall Methods:'}
              </h4>
              {selectedGame === 'snake' ? (
                <ul className="space-y-1">
                  <li><code className="bg-gray-700 px-1 rounded">new Snake(x, y)</code> - Create snake at position</li>
                  <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change snake color</li>
                  <li><code className="bg-gray-700 px-1 rounded">move(direction)</code> - Move snake ('up', 'down', 'left', 'right')</li>
                  <li><code className="bg-gray-700 px-1 rounded">setSpeed(speed)</code> - Set movement speed (0.1-10)</li>
                </ul>
              ) : (
                <ul className="space-y-1">
                  <li><code className="bg-gray-700 px-1 rounded">new BouncingBall(x, y, radius)</code> - Create ball at position</li>
                  <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change ball color</li>
                  <li><code className="bg-gray-700 px-1 rounded">setVelocity(vx, vy)</code> - Set x,y velocity</li>
                  <li><code className="bg-gray-700 px-1 rounded">setBounce(bounciness)</code> - Set bounce factor (0-1)</li>
                  <li><code className="bg-gray-700 px-1 rounded">setGravity(gravity)</code> - Set downward acceleration</li>
                </ul>
              )}
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Tips:</h4>
              <ul className="space-y-1">
                <li>• Code runs automatically when you type (500ms delay)</li>
                <li>• Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</li>
                {selectedGame === 'snake' ? (
                  <li>• Snake wraps around canvas edges</li>
                ) : (
                  <li>• Ball bounces off canvas edges with physics</li>
                )}
                <li>• Try creating multiple objects!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
