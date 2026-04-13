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
        setOutput(`System Error: ${data.message || 'Check Environment Variables'}`);
      }
    } catch (err) {
      setOutput("Connection lost. Ensure the Groq API key is active in Vercel.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <Head>
        <title>Nexus Protocol</title>
      </Head>

      <aside className="sidebar">
        <div className="brand">
          <div className="profile-wrapper">
             <div className="placeholder-avatar"></div> 
          </div>
          <span className="name">Nexus</span>
        </div>
        <div className="nav-group">
          <label>Workspace</label>
          <div className="nav-item active">+ New Project</div>
          <div className="nav-item">Archive</div>
        </div>
        <div className="version-tag">STABLE // V1.2</div>
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
                {loading ? 'Consulting Nexus...' : 'Generate Code'}
              </button>
            </div>
          </div>
        </section>

        {output && (
          <section className="output-area">
            <div className="output-card">
              <div className="output-label">Nexus Intelligence Stream</div>
              <pre>{output}</pre>
            </div>
          </section>
        )}
      </main>

      <style jsx global>{`
        * { box-sizing: border-box; }
        body, html { 
          margin: 0; padding: 0; 
          background: #FFF9F2; 
          color: #1A1A1A;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .app-container { display: flex; height: 100vh; width: 100vw; overflow: hidden; }
        
        .sidebar { 
          width: 260px; background: #FAF5EF; border-right: 1px solid #EDE7DF; 
          padding: 40px; display: flex; flex-direction: column; 
        }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 60px; }
        .placeholder-avatar { 
          width: 40px; height: 40px; background: #1A1A1A; border-radius: 50%; 
        }
        .name { font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        
        .nav-group label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; opacity: 0.3; display: block; margin-bottom: 20px; }
        .nav-item { padding: 14px; border-radius: 14px; font-size: 15px; cursor: pointer; transition: 0.2s; margin-bottom: 10px; }
        .nav-item.active { background: white; border: 1px solid #EDE7DF; font-weight: 700; }
        
        .canvas { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; overflow-y: auto; }
        .hero { width: 100%; max-width: 900px; text-align: center; margin-bottom: 50px; }
        h1 { font-size: 88px; font-weight: 900; margin: 0; letter-spacing: -5px; line-height: 0.9; }
        .hero p { font-size: 22px; opacity: 0.4; margin-top: 20px; font-weight: 500; }
        
        .input-area { width: 100%; max-width: 900px; } 
        .card { 
          background: white; border-radius: 24px; padding: 24px; 
          border: 1px solid #EDE7DF; box-shadow: 0 40px 80px rgba(180, 160, 140, 0.12);
        }
        textarea { width: 100%; height: 80px; border: none; outline: none; font-size: 20px; resize: none; background: transparent; }
        
        .card-footer { display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid #FAF5EF; }
        button { 
          background: #1A1A1A; color: white; padding: 12px 32px; border-radius: 12px; 
          font-weight: 800; border: none; cursor: pointer; font-size: 14px;
        }

        .output-area { width: 100%; max-width: 900px; margin-top: 40px; }
        .output-card { background: white; border-radius: 24px; padding: 32px; border: 1px solid #EDE7DF; }
        .output-label { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; opacity: 0.3; margin-bottom: 16px; }
        pre { font-family: monospace; white-space: pre-wrap; font-size: 14px; color: #4A4A4A; line-height: 1.6; }
        .version-tag { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; }
      `}</style>
    </div>
  );
}
