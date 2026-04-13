export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are the BountyAgent Protocol, a world-class Senior Software Architect. Your goal is to provide high-end, production-ready code solutions. Do not engage in small talk. Provide only the most efficient and powerful code possible."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    res.status(200).json({ code: aiResponse });
  } catch (error) {
    res.status(500).json({ message: "The Agent is currently recalibrating. Try again shortly." });
  }
}
