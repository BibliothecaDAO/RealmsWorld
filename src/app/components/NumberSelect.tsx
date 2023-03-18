import React, { useState } from 'react';

const NumberSelect = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');

  const handleNumber1Change = (event: any) => {
    setNumber1(event.target.value);
  };

  const handleNumber2Change = (event: any) => {
    setNumber2(event.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-xs">
        <label htmlFor="number1" className="block text-sm font-medium text-gray-700">
          Low
        </label>
        <input
          type="number"
          id="number1"
          value={number1}
          onChange={handleNumber1Change}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="w-full max-w-xs">
        <label htmlFor="number2" className="block text-sm font-medium text-gray-700">
          High
        </label>
        <input
          type="number"
          id="number2"
          value={number2}
          onChange={handleNumber2Change}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default NumberSelect;