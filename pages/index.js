import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.code || data.message);
    } catch (err) {
      setOutput("Error: Agent synchronization failed.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <Head>
        <title>BountyAgent Protocol</title>
      </Head>

      <aside className="sidebar">
        <div className="brand">
          <div className="logo"></div>
          <span className="name">BountyAgent</span>
        </div>
        <div className="nav-group">
          <label>Workspace</label>
          <div className="nav-item active">+ New Agent</div>
          <div className="nav-item">History</div>
        </div>
        <div className="version-tag">SYSTEM_STABLE // V1.2</div>
      </aside>

      <main className="canvas">
        <header className="hero">
          <h1>Build anything.</h1>
          <p>The autonomous engine for rapid development.</p>
        </header>

        <section className="input-area">
          <div className="card">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to build..."
            />
            <div className="card-footer">
              <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Analyzing...' : 'Generate Code'}
              </button>
            </div>
          </div>
        </section>

        {output && (
          <section className="output-area">
            <div className="output-card">
              <div className="output-label">Output Stream</div>
              <pre>{output}</pre>
            </div>
          </section>
        )}
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body, html { 
          margin: 0; padding: 0; 
          background: #FFF9F2; /* Creamy Peach Background */
          color: #1A1A1A;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .app-container { display: flex; height: 100vh; width: 100vw; overflow: hidden; }
        
        .sidebar { 
          width: 280px; background: #FAF5EF; border-right: 1px solid #EDE7DF; 
          padding: 40px; display: flex; flex-direction: column; 
        }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 60px; }
        .logo { width: 32px; height: 32px; background: #1A1A1A; border-radius: 10px; }
        .name { font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        
        .nav-group label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; opacity: 0.3; display: block; margin-bottom: 20px; }
        .nav-item { padding: 14px; border-radius: 14px; font-size: 15px; cursor: pointer; transition: all 0.2s ease; margin-bottom: 10px; }
        .nav-item.active { background: white; border: 1px solid #EDE7DF; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .nav-item:hover { transform: translateY(-2px); background: white; }
        
        .canvas { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; overflow-y: auto; }
        .hero { width: 100%; max-width: 850px; margin-bottom: 48px; }
        h1 { font-size: 82px; font-weight: 900; margin: 0; letter-spacing: -4px; line-height: 0.95; }
        .hero p { font-size: 24px; opacity: 0.4; margin-top: 16px; font-weight: 500; }
        
        .input-area { width: 100%; max-width: 850px; } /* Increased width from 760px */
        .card { 
          background: white; border-radius: 28px; padding: 28px; 
          border: 1px solid #EDE7DF; box-shadow: 0 30px 60px rgba(180, 160, 140, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card:focus-within { transform: translateY(-4px); border-color: #D6C7B8; }
        
        textarea { 
          width: 100%; 
          height: 100px; /* Lowered height from 160px */
          border: none; outline: none; font-size: 22px; resize: none; background: transparent; line-height: 1.4; 
        }
        
        .card-footer { display: flex; justify-content: flex-end; padding-top: 20px; border-top: 1px solid #FAF5EF; }
        button { 
          background: #1A1A1A; color: white; padding: 14px 36px; border-radius: 14px; 
          font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; font-size: 15px;
        }
        button:hover { background: #000; box-shadow: 0 8px 20px rgba(0,0,0,0.15); }

        .output-area { width: 100%; max-width: 850px; margin-top: 32px; }
        .output-card { background: white; border-radius: 24px; padding: 32px; border: 1px solid #EDE7DF; }
        .output-label { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; opacity: 0.3; margin-bottom: 16px; }
        pre { font-family: "SF Mono", Menlo, monospace; white-space: pre-wrap; font-size: 14px; color: #4A4A4A; line-height: 1.6; margin: 0; }
        .version-tag { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; letter-spacing: 1px; }
      `}</style>
    </div>
  );
}
