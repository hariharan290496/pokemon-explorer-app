import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600"></div>
      <p className="mt-4 text-lg text-gray-600">Loading Pokémon...</p>
    </div>
  );
};

export default Loading;
