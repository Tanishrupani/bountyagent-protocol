export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      message: "Nexus Core Offline: API Key missing in Vercel settings." 
    });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // THIS IS THE FIX: Using the new versatile model
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are Nexus Protocol Intelligence. You are a world-class Senior Software Architect. Provide elite, production-ready code. No small talk."
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        message: data.error?.message || "Nexus link refused by Groq." 
      });
    }

    res.status(200).json({ code: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Neural Link Error: Connection reset." });
  }
}
