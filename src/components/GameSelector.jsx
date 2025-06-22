import React from 'react';

const GameSelector = ({ selectedGame, onGameChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="game-select" className="block text-sm font-medium text-gray-300 mb-2">
        Select Game:
      </label>
      <select
        id="game-select"
        value={selectedGame}
        onChange={(e) => onGameChange(e.target.value)}
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-3 pr-10 appearance-none bg-no-repeat bg-[length:16px_12px] bg-[right_12px_center]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`
        }}
      >
        <option value="snake">Snake Game</option>
        <option value="ball">Bouncing Ball Physics</option>
        <option value="drawing">Drawing Game</option>
      </select>
    </div>
  );
};

export default GameSelector; 