const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Sørg for at denne er satt på Vercel
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
    try {
        const hexagram = req.body?.hexagram || ["———", "— —", "———", "— —", "———", "— —"];
        const prompt = `
            Generate poetic interpretations for the following hexagram:
            ${hexagram.join("\n")}

            Provide:
            1. A short interpretation for each line.
            2. A combined prophetic text with a tone similar to the I Ching.
        `;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 1000,
        });

        res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};