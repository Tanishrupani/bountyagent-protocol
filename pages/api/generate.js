export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // DEBUG: This checks if the key actually exists in Vercel's environment
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ 
      message: "API Key is missing. Check Vercel Settings > Environment Variables." 
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
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are the Nexus Protocol, a world-class Senior Software Architect. Provide high-end, production-ready code. No small talk."
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        message: data.error?.message || "Groq API refused the connection." 
      });
    }

    res.status(200).json({ code: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Network error. The connection was reset." });
  }
}
