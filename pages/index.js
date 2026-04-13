import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from local storage so it doesn't vanish on refresh
  useEffect(() => {
    const saved = localStorage.getItem('nexus_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        const newEntry = { prompt, code: data.code, id: Date.now() };
        const updatedHistory = [newEntry, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('nexus_history', JSON.stringify(updatedHistory));
        setOutput(data.code);
      } else {
        setOutput(`[Error]: ${data.message}`);
      }
    } catch (err) {
      setOutput("[Error]: Link Failure.");
    }
    setLoading(false);
  };

  const startNew = () => {
    setPrompt('');
    setOutput('');
  };

  return (
    <div className="container">
      <Head><title>Nexus Protocol</title></Head>

      <aside className="sidebar">
        <div className="brand">
          <div className="avatar"></div>
          <span className="name">Nexus</span>
        </div>
        
        <div className="nav">
          <button className="new-btn" onClick={startNew}>+ New Project</button>
          
          <div className="history-section">
            <label>History</label>
            <div className="history-list">
              {history.map(item => (
                <div key={item.id} className="history-item" onClick={() => setOutput(item.code)}>
                  {item.prompt.substring(0, 25)}...
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="version">V1.2 // STABLE</div>
      </aside>

      <main className="canvas">
        <div className="scroll-wrapper">
          <header className="hero">
            <h1>Build anything.</h1>
            <p>The autonomous engine for rapid development.</p>
          </header>

          <div className="command-bar">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the build..."
            />
            <div className="bar-footer">
              <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Thinking...' : 'Generate'}
              </button>
            </div>
          </div>

          {output && (
            <div className="output-container">
              <div className="output-header">
                <span>Intelligence Stream</span>
                <button onClick={() => navigator.clipboard.writeText(output)}>Copy Code</button>
              </div>
              <div className="code-window">
                <pre>{output}</pre>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        body { margin: 0; background: #FFF9F2; color: #1A1A1A; font-family: -apple-system, sans-serif; overflow: hidden; }
        .container { display: flex; height: 100vh; width: 100vw; }
        
        /* Sidebar */
        .sidebar { width: 280px; background: #FAF5EF; border-right: 1px solid #EDE7DF; padding: 30px; display: flex; flex-direction: column; }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
        .avatar { width: 36px; height: 36px; background: #1A1A1A; border-radius: 50%; }
        .name { font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        
        .new-btn { width: 100%; padding: 12px; background: white; border: 1px solid #EDE7DF; border-radius: 12px; font-weight: 700; cursor: pointer; margin-bottom: 30px; }
        .history-section label { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.3; letter-spacing: 1px; display: block; margin-bottom: 15px; }
        .history-list { overflow-y: auto; max-height: 50vh; }
        .history-item { padding: 10px; font-size: 13px; opacity: 0.6; cursor: pointer; border-radius: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .history-item:hover { background: white; opacity: 1; }

        /* Main Canvas */
        .canvas { flex: 1; position: relative; height: 100vh; }
        .scroll-wrapper { width: 100%; height: 100%; overflow-y: auto; display: flex; flex-direction: column; align-items: center; padding: 80px 40px; }
        
        .hero { text-align: center; margin-bottom: 40px; }
        h1 { font-size: 72px; font-weight: 900; letter-spacing: -4px; margin: 0; }
        .hero p { opacity: 0.4; font-size: 18px; margin-top: 10px; }

        .command-bar { width: 100%; max-width: 800px; background: white; border-radius: 20px; padding: 20px; border: 1px solid #EDE7DF; box-shadow: 0 30px 60px rgba(0,0,0,0.05); }
        textarea { width: 100%; height: 50px; border: none; outline: none; font-size: 18px; resize: none; background: transparent; }
        .bar-footer { display: flex; justify-content: flex-end; padding-top: 15px; border-top: 1px solid #FAF5EF; }
        
        /* Output Window Fix */
        .output-container { width: 100%; max-width: 800px; margin-top: 40px; background: #1A1A1A; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .output-header { padding: 12px 20px; background: #2A2A2A; display: flex; justify-content: space-between; align-items: center; color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .output-header button { background: transparent; border: 1px solid #444; color: #AAA; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 10px; }
        
        .code-window { max-height: 500px; overflow-y: auto; padding: 25px; }
        pre { margin: 0; color: #E0E0E0; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
        
        button { background: #1A1A1A; color: white; padding: 10px 24px; border-radius: 10px; border: none; font-weight: 700; cursor: pointer; }
        .version { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; }
      `}</style>
    </div>
  );
}
