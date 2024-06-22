import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTime((time) => time + 10);
    }, 10);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      clearInterval(countRef.current);
    } else {
      countRef.current = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    }
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setFinalTime(time);
    setShowModal(true);
    setTime(0);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
        <div className="text-6xl font-mono mb-8">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="space-x-4">
          {!isActive && !isPaused ? (
            <button onClick={handleStart} className="bg-blue-500 px-6 py-3 rounded-full text-white hover:bg-blue-600 transition">
              Start
            </button>
          ) : (
            <button onClick={handlePauseResume} className="bg-yellow-500 px-6 py-3 rounded-full text-white hover:bg-yellow-600 transition">
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
          <button onClick={handleStop} className="bg-red-500 px-6 py-3 rounded-full text-white hover:bg-red-600 transition">
            Stop
          </button>
          <button onClick={handleReset} className="bg-green-500 px-6 py-3 rounded-full text-white hover:bg-green-600 transition">
            Reset
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Final Time</h2>
            <div className="text-4xl font-mono mb-4 text-gray-900">
              <span>{("0" + Math.floor((finalTime / 60000) % 60)).slice(-2)}:</span>
              <span>{("0" + Math.floor((finalTime / 1000) % 60)).slice(-2)}:</span>
              <span>{("0" + ((finalTime / 10) % 100)).slice(-2)}</span>
            </div>
            <button onClick={closeModal} className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
