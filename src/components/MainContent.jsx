import React, { useRef } from 'react';
import CodeEditor from './CodeEditor';
import GameCanvas from './GameCanvas';

const MainContent = ({ 
  gameEngine, 
  canvasRef, 
  onCodeChange, 
  defaultCode,
  selectedGame,
  onReplay
}) => {
  const isDrawingGame = selectedGame === 'drawing';
  const codeEditorRef = useRef(null);

  const handleReplay = () => {
    if (onReplay && codeEditorRef.current) {
      const currentCode = codeEditorRef.current.getCurrentCode();
      onReplay(currentCode);
    }
  };

  if (isDrawingGame) {
    return (
      <div className="w-full space-y-6">
        {/* Full-width Canvas for Drawing Game */}
        <div className="w-full min-h-[450px]">
          <GameCanvas 
            gameEngine={gameEngine} 
            canvasRef={canvasRef} 
            selectedGame={selectedGame}
            onReplay={handleReplay}
          />
        </div>

        {/* Code Editor below canvas */}
        <div className="w-full h-[400px]">
          <CodeEditor 
            ref={codeEditorRef}
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
          ref={codeEditorRef}
          onCodeChange={onCodeChange}
          defaultCode={defaultCode}
        />
      </div>

      {/* Right Panel - Game Canvas */}
      <div className="w-1/2 h-full">
        <GameCanvas 
          gameEngine={gameEngine} 
          canvasRef={canvasRef} 
          selectedGame={selectedGame}
          onReplay={handleReplay}
        />
      </div>
    </div>
  );
};

export default MainContent; 