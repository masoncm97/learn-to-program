import React from 'react';
import CodeEditor from './CodeEditor';
import GameCanvas from './GameCanvas';

const MainContent = ({ 
  gameEngine, 
  canvasRef, 
  onCodeChange, 
  defaultCode,
  selectedGame 
}) => {
  const isDrawingGame = selectedGame === 'drawing';

  if (isDrawingGame) {
    return (
      <div className="w-full space-y-6">
        {/* Full-width Canvas for Drawing Game */}
        <div className="w-full min-h-[450px]">
          <GameCanvas gameEngine={gameEngine} canvasRef={canvasRef} selectedGame={selectedGame} />
        </div>

        {/* Code Editor below canvas */}
        <div className="w-full h-[400px]">
          <CodeEditor 
            onCodeChange={onCodeChange}
            defaultCode={defaultCode}
          />
        </div>
      </div>
    );
  }

  // Original side-by-side layout for other games
  return (
    <div className="flex h-[600px] w-full gap-6">
      {/* Left Panel - Code Editor */}
      <div className="w-1/2 h-full">
        <CodeEditor 
          onCodeChange={onCodeChange}
          defaultCode={defaultCode}
        />
      </div>

      {/* Right Panel - Game Canvas */}
      <div className="w-1/2 h-full">
        <GameCanvas gameEngine={gameEngine} canvasRef={canvasRef} selectedGame={selectedGame} />
      </div>
    </div>
  );
};

export default MainContent; 