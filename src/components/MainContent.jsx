import React from 'react';
import CodeEditor from './CodeEditor';
import GameCanvas from './GameCanvas';

const MainContent = ({ 
  gameEngine, 
  canvasRef, 
  onCodeChange, 
  defaultCode 
}) => {
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
        <GameCanvas gameEngine={gameEngine} canvasRef={canvasRef} />
      </div>
    </div>
  );
};

export default MainContent; 