import React from 'react';

const ExampleSelector = ({ 
  selectedGame, 
  currentDrawingExample, 
  drawingExamples, 
  onNext, 
  onPrevious 
}) => {
  if (selectedGame !== 'drawing') return null;

  const currentExample = drawingExamples[currentDrawingExample];

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium mb-1">Drawing Examples</h3>
          <p className="text-gray-300 text-sm">
            {currentExample.name} ({currentDrawingExample + 1} of {drawingExamples.length})
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExampleSelector; 