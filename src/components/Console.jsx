import React, { useState } from 'react';

const Console = ({ output, onClear }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getOutputColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-yellow-400';
      default:
        return 'text-gray-200';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-white font-medium">Console Output</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClear}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="h-48 overflow-y-auto p-4 font-mono text-sm">
          {output.length === 0 ? (
            <div className="text-gray-500 italic">
              Console output will appear here...
            </div>
          ) : (
            <div className="space-y-1">
              {output.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-gray-500 text-xs min-w-[60px]">
                    {item.timestamp}
                  </span>
                  <span className={`${getOutputColor(item.type)} flex-1`}>
                    {item.message}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Console; 