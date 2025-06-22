import React, { useEffect } from 'react';

const GameCanvas = ({ gameEngine, canvasRef, selectedGame, onReplay }) => {
  const isDrawingGame = selectedGame === 'drawing';

  useEffect(() => {
    console.log('GameCanvas useEffect triggered');
    console.log('gameEngine:', gameEngine);
    console.log('canvasRef.current:', canvasRef.current);
    console.log('selectedGame:', selectedGame);
    console.log('isDrawingGame:', isDrawingGame);
    
    if (gameEngine && canvasRef.current) {
      if (isDrawingGame) {
        // For drawing game, initialize the drawing game specifically
        // Add a small delay to ensure the canvas is properly mounted
        console.log('Setting up drawing game initialization');
        setTimeout(() => {
          console.log('Drawing game timeout triggered');
          console.log('gameEngine.drawingGame:', gameEngine.drawingGame);
          console.log('gameEngine.drawingGame.isInitialized:', gameEngine.drawingGame?.isInitialized);
          
          if (gameEngine.drawingGame && !gameEngine.drawingGame.isInitialized) {
            console.log('Initializing drawing game in GameCanvas');
            gameEngine.drawingGame.initialize(canvasRef, gameEngine.onConsoleOutput);
          } else {
            console.log('Drawing game already initialized or not available');
          }
        }, 100);
      } else {
        // For other games, use the standard initialization
        console.log('Initializing standard game');
        gameEngine.initialize();
      }
    } else {
      console.log('GameEngine or canvasRef not available');
    }

    return () => {
      console.log('GameCanvas cleanup');
      if (gameEngine) {
        gameEngine.cleanup();
      }
    };
  }, [gameEngine, canvasRef, selectedGame, isDrawingGame]);

  const getCanvasStyle = () => {
    if (isDrawingGame) {
      return {
        width: '100%',
        maxWidth: '1200px',
        height: '600px',
        backgroundColor: '#ffffff',
        border: '2px solid #e5e7eb',
        display: 'block'
      };
    }
    
    return {
      width: '400px',
      height: '400px',
      backgroundColor: '#000000',
      border: '2px solid #4b5563'
    };
  };

  const handleReplay = () => {
    if (onReplay) {
      onReplay();
    }
  };

  return (
    <div className={`${isDrawingGame ? 'w-full' : 'h-full'} bg-gray-900 rounded-lg flex flex-col`}>
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <h3 className="text-white font-medium">
          {isDrawingGame ? 'Drawing Canvas' : 'Game Canvas'}
        </h3>
      </div>
      <div className={`${isDrawingGame ? 'w-full' : 'flex-1'} flex items-center justify-center p-4 ${isDrawingGame ? 'min-h-[620px]' : 'h-full'} relative`}>
        <canvas
          ref={canvasRef}
          className="rounded-lg shadow-lg"
          style={getCanvasStyle()}
        />
        {isDrawingGame && (
          <button
            onClick={handleReplay}
            className="absolute top-6 right-6 z-20 px-3 py-2 bg-gray-200 bg-opacity-30 hover:bg-opacity-50 text-gray-700 text-sm font-medium rounded-md transition-all duration-200 backdrop-blur-sm border border-gray-300 border-opacity-30 hover:border-opacity-50"
            title="Replay drawing from code"
          >
            ↻ Replay
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCanvas; 