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
        return 'text-green-400';
    }
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden border border-green-500/30 shadow-lg">
      <div className="bg-gray-900 px-4 py-3 border-b border-green-500/30 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h3 className="text-green-400 font-mono text-sm font-medium">Terminal</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClear}
            className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs rounded border border-red-500/30 transition-colors font-mono"
          >
            CLEAR
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-3 py-1 bg-gray-700/20 hover:bg-gray-700/30 text-green-400 text-xs rounded border border-green-500/30 transition-colors font-mono"
          >
            {isCollapsed ? 'EXPAND' : 'COLLAPSE'}
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="h-48 overflow-y-auto p-4 font-mono text-sm bg-black">
          {output.length === 0 ? (
            <div className="text-green-600/60 italic">
              &gt; Console output will appear here...
            </div>
          ) : (
            <div className="space-y-1">
              {output.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600/80 text-xs mr-4 min-w-[80px] font-mono">
                    [{item.timestamp}]
                  </span>
                  <span className={`${getOutputColor(item.type)} flex-1 leading-relaxed`}>
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