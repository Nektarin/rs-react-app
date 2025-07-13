import React, { useState } from 'react';

const ErrorTrigger: React.FC = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const throwError = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('ERROR SIMULATION');
  }

  return (
    <div className="flex flex-row-reverse py-2 px-4">
      <button
        className="w-100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={throwError}
      >
        Throw Error
      </button>
    </div>
  );
};

export default ErrorTrigger;
