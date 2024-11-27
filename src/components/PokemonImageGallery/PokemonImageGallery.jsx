'use client';

import React, { useState, useEffect } from 'react';

const PokemonImageGallery = ({ sprites, name }) => {
  const [selectedImage, setSelectedImage] = useState('official');

  const imageTypes = [
    { key: 'official', label: 'Official Artwork' },
    { key: 'home', label: 'Home' },
    { key: 'dreamWorld', label: 'Dream World' },
    { key: 'default', label: 'Default' },
    { key: 'shiny', label: 'Shiny' }
  ].filter(type => sprites[type.key]); //Only show available sprites

  useEffect(() => {
    //Fall back useEffect for image to display official artwork
    if (!sprites[selectedImage] && imageTypes.length > 0) {
      setSelectedImage(imageTypes[0].key);
    }
  }, [sprites, selectedImage, imageTypes]);

  if (imageTypes.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={sprites[selectedImage]}
          alt={`${name} - ${selectedImage}`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnail Selection */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {imageTypes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedImage(key)}
            className={`p-2 rounded-lg border-2 transition-all ${
              selectedImage === key 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="aspect-square relative">
              <img
                src={sprites[key]}
                alt={`${name} - ${label}`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs mt-1 block text-center truncate">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokemonImageGallery;
