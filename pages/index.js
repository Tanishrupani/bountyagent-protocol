import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="container">
      <Head>
        <title>BountyAgent | Autonomous Code Fulfillment</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <nav>
        <div className="logo">BOUNTY_AGENT_v1.0</div>
        <div className="status-blink">SYSTEM_ACTIVE</div>
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
            />
            <button onClick={() => alert('Agent initializing...')}>INITIALIZE_GEN</button>
          </div>
        </section>
      </main>

      <style jsx global>{`
        body {
          background-color: #050505;
          color: #00ff41;
          font-family: 'Space Mono', monospace;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        nav {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid #1a1a1a;
        }
        .logo { font-weight: bold; letter-spacing: 2px; }
        .status-blink { color: #00ff41; animation: blink 1s infinite; }
        @keyframes blink { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
        
        .hero { margin-top: 100px; text-align: center; }
        h1 { font-size: 2.5rem; line-height: 1.2; }
        .highlight { background: #00ff41; color: #000; padding: 0 10px; }
        p { color: #888; margin-top: 20px; }

        .terminal-box {
          margin-top: 50px;
          border: 1px solid #333;
          border-radius: 5px;
          overflow: hidden;
        }
        .terminal-header {
          background: #1a1a1a;
          padding: 10px;
          font-size: 0.8rem;
          color: #888;
        }
        .terminal-body {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        input {
          background: transparent;
          border: none;
          color: #00ff41;
          font-family: 'Space Mono', monospace;
          flex-grow: 1;
          outline: none;
          font-size: 1.1rem;
        }
        button {
          background: #00ff41;
          border: none;
          color: #000;
          font-family: 'Space Mono', monospace;
          font-weight: bold;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
