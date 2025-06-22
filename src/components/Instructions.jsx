import React from 'react';

const Instructions = ({ selectedGame }) => {
  return (
    <div className="mt-6 bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">How to Play</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
        <div>
          <h4 className="font-medium text-white mb-1">
            {selectedGame === 'snake' ? 'Snake Methods:' : 'BouncingBall Methods:'}
          </h4>
          {selectedGame === 'snake' ? (
            <ul className="space-y-1">
              <li><code className="bg-gray-700 px-1 rounded">new Snake(x, y)</code> - Create snake at position</li>
              <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change snake color</li>
              <li><code className="bg-gray-700 px-1 rounded">move(direction)</code> - Move snake ('up', 'down', 'left', 'right')</li>
              <li><code className="bg-gray-700 px-1 rounded">setSpeed(speed)</code> - Set movement speed (0.1-10)</li>
            </ul>
          ) : (
            <ul className="space-y-1">
              <li><code className="bg-gray-700 px-1 rounded">new BouncingBall(x, y, radius)</code> - Create ball at position</li>
              <li><code className="bg-gray-700 px-1 rounded">setColor(color)</code> - Change ball color</li>
              <li><code className="bg-gray-700 px-1 rounded">setVelocity(vx, vy)</code> - Set x,y velocity</li>
              <li><code className="bg-gray-700 px-1 rounded">setBounce(bounciness)</code> - Set bounce factor (0-1)</li>
              <li><code className="bg-gray-700 px-1 rounded">setGravity(gravity)</code> - Set downward acceleration</li>
            </ul>
          )}
        </div>
        <div>
          <h4 className="font-medium text-white mb-1">Tips:</h4>
          <ul className="space-y-1">
            <li>• Code runs automatically when you type (500ms delay)</li>
            <li>• Use <code className="bg-gray-700 px-1 rounded">console.log()</code> to see output</li>
            {selectedGame === 'snake' ? (
              <li>• Snake wraps around canvas edges</li>
            ) : (
              <li>• Ball bounces off canvas edges with physics</li>
            )}
            <li>• Try creating multiple objects!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Instructions; 