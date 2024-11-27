import React from 'react';

const Loading = () => {
  return (
    <div 
      data-testid="loading-container"
      className="flex flex-col items-center justify-center min-h-[400px]"
    >
      <div 
        data-testid="loading-spinner"
        className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4 text-lg text-gray-600">Loading Pokémon...</p>
    </div>
  );
};

export default Loading;
