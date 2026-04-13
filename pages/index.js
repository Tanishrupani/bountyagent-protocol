import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.code);
      } else {
        setOutput(`[Nexus Error]: ${data.message}`);
      }
    } catch (err) {
      setOutput("[Nexus Error]: Intelligence Stream Interrupted.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <Head><title>Nexus Protocol</title></Head>

      <aside className="sidebar">
        <div className="brand">
          <div className="avatar"></div>
          <span className="name">Nexus</span>
        </div>
        <div className="nav-group">
          <label>Workspace</label>
          <div className="nav-item active">New Project</div>
          <div className="nav-item">History</div>
        </div>
        <div className="version">V1.2 // STABLE</div>
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
              placeholder="What are we building today?"
            />
            <div className="card-footer">
              <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Consulting Nexus...' : 'Generate'}
              </button>
            </div>
          </div>
        </section>

        {output && (
          <div className="output-area">
            <div className="output-card">
              <div className="output-label">Nexus Intelligence Stream</div>
              <pre>{output}</pre>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        body, html { margin: 0; padding: 0; background: #FFF9F2; color: #1A1A1A; font-family: -apple-system, sans-serif; }
        .app-container { display: flex; height: 100vh; }
        .sidebar { width: 260px; background: #FAF5EF; border-right: 1px solid #EDE7DF; padding: 40px; display: flex; flex-direction: column; }
        .avatar { width: 40px; height: 40px; background: #1A1A1A; border-radius: 50%; }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 60px; }
        .name { font-weight: 900; font-size: 24px; letter-spacing: -1px; }
        .nav-group label { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.3; margin-bottom: 20px; display: block; }
        .nav-item { padding: 12px; border-radius: 12px; cursor: pointer; margin-bottom: 8px; font-size: 14px; }
        .nav-item.active { background: white; border: 1px solid #EDE7DF; font-weight: 700; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
        .canvas { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px; overflow-y: auto; }
        .hero { text-align: center; margin-bottom: 40px; }
        h1 { font-size: 88px; font-weight: 900; letter-spacing: -5px; margin: 0; line-height: 0.9; }
        .hero p { font-size: 22px; opacity: 0.4; margin-top: 15px; }
        .input-area { width: 100%; max-width: 900px; }
        .card { background: white; border-radius: 24px; padding: 24px; border: 1px solid #EDE7DF; box-shadow: 0 40px 80px rgba(0,0,0,0.05); }
        textarea { width: 100%; height: 80px; border: none; outline: none; font-size: 20px; resize: none; background: transparent; }
        .card-footer { display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid #FAF5EF; }
        button { background: #1A1A1A; color: white; padding: 12px 30px; border-radius: 12px; border: none; font-weight: 800; cursor: pointer; transition: 0.2s; }
        button:hover { background: #000; transform: scale(1.02); }
        .output-area { width: 100%; max-width: 900px; margin-top: 40px; padding-bottom: 100px; }
        .output-card { background: white; padding: 32px; border-radius: 28px; border: 1px solid #EDE7DF; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        pre { white-space: pre-wrap; font-family: monospace; font-size: 14px; line-height: 1.6; color: #333; }
        .version { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; }
      `}</style>
    </div>
  );
}
