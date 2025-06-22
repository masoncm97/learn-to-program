import React from 'react';
import Header from './components/Header';
import GameSelector from './components/GameSelector';
import MainContent from './components/MainContent';
import Console from './components/Console';
import Instructions from './components/Instructions';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    consoleOutput,
    gameEngine,
    canvasRef,
    selectedGame,
    handleGameChange,
    handleCodeChange,
    handleClearConsole,
    getDefaultCode
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6">
        <GameSelector selectedGame={selectedGame} onGameChange={handleGameChange} />
        <MainContent 
          gameEngine={gameEngine}
          canvasRef={canvasRef}
          onCodeChange={handleCodeChange}
          defaultCode={getDefaultCode()}
        />
        <div className="mt-6">
          <Console 
            output={consoleOutput}
            onClear={handleClearConsole}
          />
        </div>
        <Instructions selectedGame={selectedGame} />
      </main>
    </div>
  );
}

export default App;
