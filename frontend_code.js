import React, { useState } from "react";

export default function IChingGenerator() {
  const dichotomies = [
    "Past and future", "Inner and outer", "Movement and standstill",
    "Life and death", "Bad and worse", "Young and old",
    "Born and unborn", "Enlightened and uninformed"
  ];

  const languages = {
    en: "English",
    no: "Norwegian",
    zh: "Chinese"
  };

  const [language, setLanguage] = useState("en"); // Default to English

  async function generateDivination() {
    const hexagram = Array.from({ length: 6 }, () => Math.random() > 0.5 ? '———' : '— —');
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hexagram, dichotomies, language }),
    });
    const data = await response.json();

    document.getElementById("hexagram").innerText = hexagram.join("\n");
    document.getElementById("lineInterpretations").innerText = data.lineInterpretations.join("\n\n");
    document.getElementById("propheticText").innerText = data.propheticText;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">I Ching Climate Oracle</h1>
      <div className="mt-2">
        <label htmlFor="language">Choose Language: </label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
          {Object.entries(languages).map(([key, label]) => (
            <option value={key} key={key}>{label}</option>
          ))}
        </select>
      </div>
      <pre id="hexagram" className="text-lg mt-4">Press the button to reveal</pre>
      <pre id="lineInterpretations" className="mt-4 text-sm"></pre>
      <p id="propheticText" className="mt-2 italic"></p>
      <button 
        onClick={generateDivination} 
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        Generate Divination
      </button>
    </div>
  );
}
