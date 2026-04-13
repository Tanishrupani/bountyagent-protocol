import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInitialize = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.code);
    } catch (error) {
      setResult('// ERROR: Connection to Agent failed. System offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>BountyAgent | Autonomous Code Fulfillment</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <nav>
        <div className="logo">BOUNTY_AGENT_v1.0</div>
        <div className="status-blink">{loading ? 'AGENT_PROCESSING...' : 'SYSTEM_READY'}</div>
      </nav>

      <main>
        <section className="hero">
          <h1>THE WORLD'S FIRST <span className="highlight">AUTONOMOUS</span> CODE MARKETPLACE.</h1>
          <p>Don't hire a developer. Deploy an Agent. Get your code in seconds.</p>
        </section>

        <section className="terminal-box">
          <div className="terminal-header">terminal.exe — New Task</div>
          <div className="terminal-body">
            <span className="prompt">root@bountyagent:~$</span>
            <input 
              type="text" 
              placeholder="Describe the script or tool you need built..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleInitialize()}
            />
            <button onClick={handleInitialize} disabled={loading}>
              {loading ? 'EXECUTING...' : 'INITIALIZE_GEN'}
            </button>
          </div>
        </section>

        {result && (
          <section className="output-box">
            <div className="terminal-header">output_stream.log</div>
            <pre className="output-body"><code>{result}</code></pre>
            <div className="terminal-footer">
                <button className="secondary-btn" onClick={() => navigator.clipboard.writeText(result)}>COPY_CODE</button>
            </div>
          </section>
        )}
      </main>

      <style jsx global>{`
        body { background-color: #050505; color: #00ff41; font-family: 'Space Mono', monospace; margin: 0; padding: 0; }
        .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
        nav { display: flex; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid #1a1a1a; }
        .logo { font-weight: bold; letter-spacing: 2px; }
        .status-blink { color: #00ff41; animation: blink 1s infinite; }
        @keyframes blink { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        
        .hero { margin-top: 80px; text-align: center; }
        h1 { font-size: 2.5rem; line-height: 1.2; font-weight: 700; }
        .highlight { background: #00ff41; color: #000; padding: 0 10px; }
        p { color: #888; margin-top: 20px; font-size: 1.1rem; }

        .terminal-box, .output-box { margin-top: 40px; border: 1px solid #333; border-radius: 5px; overflow: hidden; background: #0a0a0a; }
        .terminal-header { background: #1a1a1a; padding: 10px; font-size: 0.8rem; color: #888; border-bottom: 1px solid #333; }
        .terminal-body { padding: 20px; display: flex; align-items: center; gap: 10px; }
        .output-body { padding: 20px; color: #fff; white-space: pre-wrap; margin: 0; font-size: 0.9rem; border-bottom: 1px solid #333; line-height: 1.5; }
        .terminal-footer { padding: 10px; background: #0a0a0a; display: flex; justify-content: flex-end; }
        
        input { background: transparent; border: none; color: #00ff41; font-family: 'Space Mono', monospace; flex-grow: 1; outline: none; font-size: 1.1rem; }
        button { background: #00ff41; border: none; color: #000; font-family: 'Space Mono', monospace; font-weight: bold; padding: 10px 20px; cursor: pointer; transition: 0.2s; }
        button:hover { background: #fff; }
        button:disabled { background: #004411; color: #888; cursor: not-allowed; }
        .secondary-btn { background: transparent; border: 1px solid #00ff41; color: #00ff41; font-size: 0.8rem; padding: 5px 10px; }
        .secondary-btn:hover { background: #00ff41; color: #000; }
        
        .prompt { color: #00ff41; font-weight: bold; }
      `}</style>
    </div>
  );
}
