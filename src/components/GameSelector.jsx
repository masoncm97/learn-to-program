import React from 'react';

const GameSelector = ({ selectedGame, onGameChange }) => {
  const games = [
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'Basic Movement',
      difficulty: 'Beginner',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-500',
      borderColor: 'border-green-400',
      shadowColor: 'shadow-green-500/25',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'ball',
      name: 'Bouncing Ball',
      description: 'Physics & Motion',
      difficulty: 'Intermediate',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-400',
      shadowColor: 'shadow-blue-500/25',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'drawing',
      name: 'Drawing Game',
      description: 'Creative Coding',
      difficulty: 'Advanced',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500',
      borderColor: 'border-purple-400',
      shadowColor: 'shadow-purple-500/25',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="mb-6">
      <div className="text-center mb-4">
        <p className="text-gray-400 text-sm md:text-base">Select a game to start coding and learning</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 px-4">
        {games.map((game, index) => (
          <button
            key={game.id}
            onClick={() => onGameChange(game.id)}
            className={`
              relative group flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex-1 max-w-xs
              ${selectedGame === game.id 
                ? `bg-gradient-to-br ${game.gradient} ${game.borderColor} shadow-lg ${game.shadowColor} ring-2 ring-white/20` 
                : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-700'
              }
            `}
            style={{
              zIndex: selectedGame === game.id ? 10 : 1
            }}
          >
            {/* Difficulty Badge */}
            <div className={`
              absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-bold
              ${selectedGame === game.id 
                ? 'bg-white text-gray-900 shadow-lg' 
                : 'bg-gray-600 text-gray-300'
              }
            `}>
              {game.difficulty}
            </div>
            
            {/* Game Name */}
            <h3 className={`
              font-bold text-sm sm:text-base mb-1 transition-colors duration-300 text-center mt-2
              ${selectedGame === game.id ? 'text-white' : 'text-gray-200'}
            `}>
              {game.name}
            </h3>
            
            {/* Description */}
            <p className={`
              text-xs transition-colors duration-300 text-center
              ${selectedGame === game.id ? 'text-gray-100' : 'text-gray-400'}
            `}>
              {game.description}
            </p>
            
            {/* Selection Indicator */}
            {selectedGame === game.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-2 border-white shadow-lg"></div>
            )}
            
            {/* Difficulty Level Indicator */}
            <div className={`
              absolute top-1 right-1 w-2 h-2 rounded-full
              ${index === 0 ? 'bg-green-400' : index === 1 ? 'bg-yellow-400' : 'bg-red-400'}
            `}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSelector; 