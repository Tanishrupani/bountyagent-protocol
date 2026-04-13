// pages/api/generate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;

  try {
    // This is the call to the AI model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // SECURE KEY
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are the BountyAgent. You provide high-quality, functional, and secure code scripts based on user prompts. Output ONLY the code, no conversational text."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    const generatedCode = data.choices[0].message.content;

    return res.status(200).json({ 
      success: true, 
      code: generatedCode 
    });

  } catch (error) {
    // If the key isn't set yet, it falls back to a demo message
    return res.status(200).json({ 
      success: true, 
      code: `// SYSTEM_NOTICE: AI_KEY_NOT_DETECTED\n// The Agent is ready, but needs an API key in Vercel settings to go live.\n// Input received: ${prompt}` 
    });
  }
}
