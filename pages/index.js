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
      setOutput("Error: Deployment active but API not responding.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <Head>
        <title>BountyAgent Protocol</title>
      </Head>

      {/* Sidebar Navigation */}
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

      {/* Main Interface */}
      <main className="canvas">
        <header className="hero">
          <h1>Build anything.</h1>
          <p>Type your requirements. The agent generates the code.</p>
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
                {loading ? 'Processing...' : 'Generate Code'}
              </button>
            </div>
          </div>
        </section>

        {output && (
          <section className="output-area">
            <div className="output-card">
              <div className="output-label">Generated Result</div>
              <pre>{output}</pre>
            </div>
          </section>
        )}
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body, html { 
          margin: 0; padding: 0; 
          background: #FCFBF8; 
          color: #1A1A1A;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .app-container { display: flex; height: 100vh; width: 100vw; overflow: hidden; }
        
        .sidebar { 
          width: 280px; background: #F4F2ED; border-right: 1px solid #E8E6E0; 
          padding: 40px; display: flex; flex-direction: column; 
        }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 60px; }
        .logo { width: 32px; height: 32px; background: #1A1A1A; border-radius: 10px; }
        .name { font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        
        .nav-group label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; opacity: 0.3; display: block; margin-bottom: 20px; }
        .nav-item { padding: 14px; border-radius: 14px; font-size: 15px; cursor: pointer; transition: all 0.2s ease; margin-bottom: 10px; }
        .nav-item.active { background: white; border: 1px solid #E8E6E0; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .nav-item:hover { transform: translateY(-2px); background: white; }
        
        .canvas { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; overflow-y: auto; }
        .hero { width: 100%; max-width: 760px; margin-bottom: 48px; }
        h1 { font-size: 72px; font-weight: 900; margin: 0; letter-spacing: -4px; line-height: 0.95; }
        .hero p { font-size: 24px; opacity: 0.4; margin-top: 16px; font-weight: 500; }
        
        .input-area { width: 100%; max-width: 760px; }
        .card { 
          background: white; border-radius: 36px; padding: 32px; 
          border: 1px solid #E8E6E0; box-shadow: 0 30px 60px rgba(0,0,0,0.03);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card:focus-within { transform: scale(1.02); border-color: #1A1A1A; }
        textarea { width: 100%; height: 160px; border: none; outline: none; font-size: 22px; resize: none; background: transparent; line-height: 1.4; }
        
        .card-footer { display: flex; justify-content: flex-end; padding-top: 24px; border-top: 1px solid #F4F2ED; }
        button { 
          background: #1A1A1A; color: white; padding: 16px 40px; border-radius: 18px; 
          font-weight: 800; border: none; cursor: pointer; transition: all 0.2s; font-size: 16px;
        }
        button:hover { background: #000; box-shadow: 0 10px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }
        button:active { transform: scale(0.95); }

        .output-area { width: 100%; max-width: 760px; margin-top: 32px; }
        .output-card { background: #F4F2ED; border-radius: 28px; padding: 32px; border: 1px solid #E8E6E0; }
        .output-label { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; opacity: 0.2; margin-bottom: 16px; }
        pre { font-family: "SF Mono", Menlo, monospace; white-space: pre-wrap; font-size: 15px; opacity: 0.8; line-height: 1.6; margin: 0; }
        .version-tag { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; letter-spacing: 1px; }
      `}</style>
    </div>
  );
}
