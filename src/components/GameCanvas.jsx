import React, { useEffect } from 'react';

const GameCanvas = ({ gameEngine, canvasRef }) => {
  useEffect(() => {
    if (gameEngine && canvasRef.current) {
      gameEngine.initialize();
    }

    return () => {
      if (gameEngine) {
        gameEngine.cleanup();
      }
    };
  }, [gameEngine, canvasRef]);

  return (
    <div className="h-full bg-gray-900 rounded-lg overflow-hidden flex flex-col">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <h3 className="text-white font-medium">Game Canvas</h3>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 h-full">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-600 rounded-lg shadow-lg"
          style={{
            width: '400px',
            height: '400px',
            backgroundColor: '#000000'
          }}
        />
      </div>
    </div>
  );
};

export default GameCanvas; 