const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY",
}));

app.post("/api/generate", async (req, res) => {
  const { hexagram, dichotomies, language } = req.body;

  const prompt = `
    Generate poetic interpretations for the following hexagram:
    ${hexagram.join("\n")}

    Use the dichotomies: ${dichotomies.join(", ")}.
    Provide:
    1. A short interpretation for each line.
    2. A combined prophetic text with a tone similar to the I Ching, emphasizing climate destabilization.
    3. Translate the entire output into ${language === "zh" ? "Chinese" : language === "no" ? "Norwegian" : "English"}.
  `;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
    });

    const translations = response.data.choices[0].text.split("\n\n");
    res.json({
      lineInterpretations: translations.slice(0, 6), // Line-by-line interpretations
      propheticText: translations[6], // Combined prophetic text
    });
  } catch (err) {
    res.status(500).send("Error generating divination: " + err.message);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
