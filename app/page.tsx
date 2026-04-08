"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Page() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [entries, setEntries] = useState<any[]>([]);

  const [weight, setWeight] = useState(180);
  const [weightInput, setWeightInput] = useState("");
  const [weightLog, setWeightLog] = useState<any[]>([]);

  // Auto-calculations
  const calorieGoal = Math.round(weight * 14 - 500);
  const proteinGoal = Math.round(weight * 0.9);

  const addEntry = () => {
    if (!food || !calories || !protein) return;

    setEntries([
      ...entries,
      {
        food,
        calories: parseInt(calories),
        protein: parseInt(protein),
      },
    ]);

    setFood("");
    setCalories("");
    setProtein("");
  };

  const addWeightEntry = () => {
    if (!weightInput) return;

    const newEntry = {
      date: new Date().toLocaleDateString(),
      weight: parseFloat(weightInput),
    };

    setWeight(newEntry.weight);
    setWeightLog([...weightLog, newEntry]);
    setWeightInput("");
  };

  const totalCalories = entries.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = entries.reduce((sum, item) => sum + item.protein, 0);

  const calorieDiff = calorieGoal - totalCalories;
  const proteinDiff = proteinGoal - totalProtein;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "Arial" }}>
      <h1>Fitness Nutrition Dashboard</h1>

      {/* Weight Tracking */}
      <div style={{ marginBottom: 20 }}>
        <h3>Weight Tracking</h3>
        <input
          type="number"
          placeholder="Enter weight (lbs)"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
        />
        <button onClick={addWeightEntry}>Log Weight</button>

        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={weightLog}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="weight" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Goals */}
      <div style={{ marginBottom: 20 }}>
        <p>
          <strong>Auto Targets:</strong> {calorieGoal} calories | {proteinGoal}g protein
        </p>
      </div>

      {/* Food Input */}
      <div style={{ marginBottom: 20 }}>
        <h3>Add Food</h3>
        <input
          placeholder="Food item"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <br />
        <button onClick={addEntry}>Add Food</button>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 20 }}>
        <h3>Daily Summary</h3>
        <p>Calories: {totalCalories}</p>
        <p>
          {calorieDiff >= 0
            ? `Deficit: ${calorieDiff}`
            : `Over by: ${Math.abs(calorieDiff)}`}
        </p>

        <p>Protein: {totalProtein}g</p>
        <p>
          {proteinDiff <= 0
            ? `Goal Hit (+${Math.abs(proteinDiff)}g)`
            : `Remaining: ${proteinDiff}g`}
        </p>
      </div>

      {/* Food Log */}
      <div>
        <h3>Food Log</h3>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.food} — {entry.calories} cal — {entry.protein}g protein
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
