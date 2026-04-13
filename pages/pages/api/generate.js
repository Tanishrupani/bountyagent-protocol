// pages/api/generate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    // Mock response for testing the UI
    const mockGeneratedCode = `// Generated Script for: ${prompt}\n\nfunction solve() {\n  console.log("Task fulfilled by BountyAgent.");\n}\n\nsolve();`;

    // Simulate a 2-second delay for "AI Thinking"
    await new Promise(resolve => setTimeout(resolve, 2000));

    return res.status(200).json({ 
      success: true, 
      code: mockGeneratedCode 
    });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
