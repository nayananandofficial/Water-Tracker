import { useEffect } from 'react';
import './App.css'
import { useState } from 'react'

function App() {
  const goal = 3000; // 3000 = 3L Set your goal here(in mL)
  // State to keep track of the water intake
  const [waterIntake, setWaterIntake] = useState(() => {

    // Get the water intake from local storage or set it to 0
    const storedIntake = localStorage.getItem('waterIntake');
    return storedIntake ? parseInt(storedIntake) : 0;
  });

  // Effect to save the water intake to local storage
  // This will run every time the water intake changes
  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
  }, [waterIntake]);

  const addWaterIntake = (amount) => {
    // Function to add water intake
    // This will add the amount of water intake to the current water intake
    setWaterIntake((prev) => Math.min(prev + amount, goal));
  };

  const resetWaterIntake = () => {
    // Function to reset water intake
    // This will set the water intake to 0
    if (confirm('Are you sure you want to reset your water intake?')) {
      setWaterIntake(0);
    }
  };

  return (
    // Flex container of the water intake tracker
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-300 via-blue-100 to-white">
       
    {/* Containner for all the contents */}
      <div className="text-center p-6 w-full max-w-md bg-white rounded-3xl shadow-2xl md:p-8 space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Water Intake Tracker</h1>

        {/* Shows your goal goal */}
        <p className="mb-1">Goal: {goal / 1000}L</p>

        {/* Shows your current water intake */}
        <p className="mb-4 font-semibold text-lg">Current: {waterIntake / 1000}L</p>

        {/* Here we have the progress bar */}
        <div className="bg-blue-100 h-4 rounded-full overflow-hidden mb-4">

          {/* The width of the inner div is set to the percentage of water intake over the goal */}
          {/* This will fill the progress bar based on the water intake */}
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${(waterIntake / goal) * 100}%` }}></div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[200, 250, 300, 500].map(amount => (
          // Map through the array of amounts to create buttons
          // Buttons to add water intake
          // Each button adds a different amount of water intake
          <button 
          key={amount}
          onClick={() => addWaterIntake(amount)}
          // When the button is clicked, it will call the addWaterIntake function with the amount
          // The amount is passed as an argument to the function
          // The button will add the amount of water intake to the current water intake
          // The button will also show the amount of water intake it will add
          className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600">
          +{amount}ml
          </button>
        ))}</div>
        <button 
        onClick={resetWaterIntake}
        // When the button is clicked, it will call the resetWaterIntake function
        // The button will reset the water intake to 0
        className="bg-red-500 text-white rounded-xl px-4 py-2 hover:bg-red-600">
          Reset Day
        </button>
      </div>
    </div>
  )
}

export default App
