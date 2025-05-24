const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 5001;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyC7hyWcE2D3noSjkafEJZUjy3l4cBKeKao');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Product title is required' });
  }

  try {
    // Create a prompt for Gemini API to evaluate sustainability
    const prompt = `Evaluate the sustainability of a product with the title "${title}". Consider materials, environmental impact, and eco-friendliness. Return a numerical eco-score from 0 to 10 (where 0 is least sustainable and 10 is most sustainable). Respond with only the number (e.g., 3).`;
    
    const result = await model.generateContent(prompt);
    const scoreText = result.response.text().trim();
    const score = parseInt(scoreText, 10);

    // Validate the score
    if (isNaN(score) || score < 0 || score > 10) {
      return res.status(500).json({ error: 'Invalid eco-score from Gemini API' });
    }

    res.json({ score });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Failed to analyze product sustainability' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});