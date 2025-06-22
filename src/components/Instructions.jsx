import React from 'react';

const Instructions = ({ selectedGame }) => {
  const getGameTitle = () => {
    switch (selectedGame) {
      case 'snake':
        return 'Snake Methods:';
      case 'ball':
        return 'BouncingBall Methods:';
      case 'drawing':
        return 'Drawing Game Classes:';
      default:
        return 'Game Methods:';
    }
  };

  const getGameMethods = () => {
    switch (selectedGame) {
      case 'snake':
        return (
          <ul className="space-y-1">
            <li><code className="bg-gray-700 px-1 rounded">new Snake(x, y)</code> - Create snake at position</li>
            <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change snake color</li>
            <li><code className="bg-gray-700 px-1 rounded">move(direction)</code> - Move snake ('up', 'down', 'left', 'right')</li>
            <li><code className="bg-gray-700 px-1 rounded">setSpeed(speed)</code> - Set movement speed (0.1-10)</li>
          </ul>
        );
      case 'ball':
        return (
          <ul className="space-y-1">
            <li><code className="bg-gray-700 px-1 rounded">new BouncingBall(x, y, radius)</code> - Create ball at position</li>
            <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change ball color</li>
            <li><code className="bg-gray-700 px-1 rounded">setVelocity(vx, vy)</code> - Set x,y velocity</li>
            <li><code className="bg-gray-700 px-1 rounded">setBounce(bounciness)</code> - Set bounce factor (0-1)</li>
            <li><code className="bg-gray-700 px-1 rounded">setGravity(gravity)</code> - Set downward acceleration</li>
          </ul>
        );
      case 'drawing':
        return (
          <ul className="space-y-1">
            <li><code className="bg-gray-700 px-1 rounded">new Circle(x, y, radius, color)</code> - Create circle</li>
            <li><code className="bg-gray-700 px-1 rounded">new Rectangle(x, y, width, height, color)</code> - Create rectangle</li>
            <li><code className="bg-gray-700 px-1 rounded">new Triangle(x, y, size, color)</code> - Create triangle</li>
            <li><code className="bg-gray-700 px-1 rounded">new Particle(x, y, color)</code> - Create animated particle</li>
            <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change shape color</li>
            <li><code className="bg-gray-700 px-1 rounded">setVelocity(vx, vy)</code> - Set movement speed</li>
            <li><code className="bg-gray-700 px-1 rounded">setRotationSpeed(speed)</code> - Set rotation speed</li>
          </ul>
        );
      default:
        return null;
    }
  };

  const getGameTips = () => {
    switch (selectedGame) {
      case 'snake':
        return (
          <ul className="space-y-1">
            <li>• Code runs automatically when you type (500ms delay)</li>
            <li>• Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</li>
            <li>• Snake wraps around canvas edges</li>
            <li>• Try creating multiple objects!</li>
          </ul>
        );
      case 'ball':
        return (
          <ul className="space-y-1">
            <li>• Code runs automatically when you type (500ms delay)</li>
            <li>• Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</li>
            <li>• Ball bounces off canvas edges with physics</li>
            <li>• Try creating multiple objects!</li>
          </ul>
        );
      case 'drawing':
        return (
          <ul className="space-y-1">
            <li>• Code runs automatically when you type (500ms delay)</li>
            <li>• Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</li>
            <li>• Use loops to create many shapes: <code className="bg-gray-700 px-1 rounded">for (let i = 0; i &lt; 10; i++)</code></li>
            <li>• Try HSL colors: <code className="bg-gray-700 px-1 rounded">hsl(120, 70%, 60%)</code></li>
            <li>• Particles fade out over time</li>
            <li>• Shapes bounce off canvas edges</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-6 bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">How to Play</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <h4 className="font-medium text-white mb-1">
            {getGameTitle()}
          </h4>
          {getGameMethods()}
        </div>
        <div>
          <h4 className="font-medium text-white mb-1">Tips:</h4>
          {getGameTips()}
        </div>
      </div>
    </div>
  );
};

export default Instructions; 