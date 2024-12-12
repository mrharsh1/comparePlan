import React from 'react';

const GlassEffectGrid = () => {
  return (
    <div
      className="bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://jupiter.money/blog/wp-content/uploads/2024/06/What_is_Health_Insurance.jpg')`, // Replace with your image URL
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 w-full max-w-6xl">
        {/* Repeat the glass boxes 9 times */}
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[rgba(255,255,255,0.16)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.25)] p-6"
          >
            {/* <h3 className="text-lg font-semibold text-white">Box {index + 1}</h3> */}
            <p className="text-sm text-gray-200 text-center mt-2">
              {/* This is a description for box {index + 1}. Customize this as needed. */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlassEffectGrid;
