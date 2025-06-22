import React, { useState, useRef, useEffect, useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import GameCanvas from './components/GameCanvas';
import Console from './components/Console';
import { GameEngine } from './game/gameEngine';
import { Snake } from './game/Snake';

const defaultCode = `// Welcome to Code Games!
const snake = new Snake(200, 200);
snake.setColor('green');
snake.move('right');
snake.setSpeed(3);

// Try changing the speed or direction!
console.log('Snake created successfully!');`;

function App() {
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [gameEngine, setGameEngine] = useState(null);
  const canvasRef = useRef(null);
  const [code, setCode] = useState(defaultCode);
  const [debouncedCode, setDebouncedCode] = useState(defaultCode);

  // Initialize game engine
  useEffect(() => {
    const engine = new GameEngine(canvasRef, setConsoleOutput);
    setGameEngine(engine);

    // Make Snake class globally available
    window.Snake = Snake;

    return () => {
      engine.cleanup();
    };
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
      // Create a modified Snake class that adds itself to the game engine
      const GameSnake = class extends Snake {
        constructor(x, y) {
          super(x, y);
          gameEngine.addSnake(this);
        }
      };
      
      // Temporarily replace the global Snake class
      const originalSnake = window.Snake;
      window.Snake = GameSnake;
      
      // Execute the code
      gameEngine.executeCode(debouncedCode);
      
      // Restore original Snake class
      window.Snake = originalSnake;
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
            Write JavaScript code to control the snake game in real-time
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Split Screen Layout */}
        <div className="flex h-[600px] w-full gap-6">
          {/* Left Panel - Code Editor */}
          <div className="w-1/2 h-full">
            <CodeEditor 
              onCodeChange={handleCodeChange}
              defaultCode={defaultCode}
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
              <h4 className="font-medium text-white mb-1">Snake Methods:</h4>
              <ul className="space-y-1">
                <li><code className="bg-gray-700 px-1 rounded">new Snake(x, y)</code> - Create snake at position</li>
                <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change snake color</li>
                <li><code className="bg-gray-700 px-1 rounded">move(direction)</code> - Move snake ('up', 'down', 'left', 'right')</li>
                <li><code className="bg-gray-700 px-1 rounded">setSpeed(speed)</code> - Set movement speed (0.1-10)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">Tips:</h4>
              <ul className="space-y-1">
                <li>• Code runs automatically when you type (500ms delay)</li>
                <li>• Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</li>
                <li>• Snake wraps around canvas edges</li>
                <li>• Try creating multiple snakes!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
