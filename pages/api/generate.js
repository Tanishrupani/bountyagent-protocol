// pages/api/generate.js

export default async function handler(req, res) {
  // Only allow POST requests (sending data)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'No prompt provided.' });
  }

  try {
    // This connects to the AI. 
    // It uses an Environment Variable for the key so it stays hidden from hackers.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are the BountyAgent. Provide ONLY raw, functional code based on the user request. No explanations."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    // If you haven't set an API key yet, the AI will return an error.
    // We catch that here so the site doesn't crash.
    if (!data.choices) {
      return res.status(200).json({ 
        success: true, 
        code: `// SYSTEM_OFFLINE: AI_KEY_REQUIRED\n// Visit Vercel settings to add your OPENAI_API_KEY.\n// Prompt received: ${prompt}` 
      });
    }

    const generatedCode = data.choices[0].message.content;

    return res.status(200).json({ 
      success: true, 
      code: generatedCode 
    });

  } catch (error) {
    return res.status(500).json({ message: 'Agent Error', error: error.message });
  }
}
