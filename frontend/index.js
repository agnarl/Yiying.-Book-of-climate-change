import React, { useState } from "react";

const App = () => {
    const [hexagram, setHexagram] = useState([]);
    const [result, setResult] = useState("");

    const generateHexagram = () => {
        const newHexagram = Array.from({ length: 6 }, () => (Math.random() > 0.5 ? "———" : "— —"));
        setHexagram(newHexagram);
    };

    const fetchResult = async () => {
        const response = await fetch("/api/backend_code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hexagram }),
        });
        const data = await response.json();
        setResult(data.result);
    };

    return (
        <div>
            <h1>I Ching Generator</h1>
            <button onClick={generateHexagram}>Generate Hexagram</button>
            <pre>{hexagram.join("\n")}</pre>
            <button onClick={fetchResult}>Get Prophecy</button>
            <pre>{result}</pre>
        </div>
    );
};

export default App;
