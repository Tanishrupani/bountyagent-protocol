import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

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

  const startNewProject = () => {
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
        
        <div className="nav-content">
          <button className="new-btn" onClick={startNewProject}>+ New Project</button>
          
          <div className="history-section">
            <label>History</label>
            <div className="history-list">
              {history.map(item => (
                <div key={item.id} className="history-item" onClick={() => { setOutput(item.code); setPrompt(item.prompt); }}>
                  {item.prompt.substring(0, 25)}...
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="version">V1.2 // STABLE</div>
      </aside>

      <main className="canvas">
        <div className="content-inner">
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
              <button onClick={handleGenerate} disabled={loading} className="gen-button">
                {loading ? 'Thinking...' : 'Generate'}
              </button>
            </div>
          </div>

          {output && (
            <div className="output-container">
              <div className="output-header">
                <span>Intelligence Stream</span>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(output)}>Copy Code</button>
              </div>
              <div className="code-window">
                <pre>{output}</pre>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        body, html { margin: 0; padding: 0; background: #FFF9F2; color: #1A1A1A; font-family: -apple-system, sans-serif; height: 100%; width: 100%; }
        .container { display: flex; min-height: 100vh; width: 100vw; }
        .sidebar { width: 260px; background: #FAF5EF; border-right: 1px solid #EDE7DF; padding: 40px 24px; display: flex; flex-direction: column; flex-shrink: 0; position: fixed; height: 100vh; z-index: 10; }
        .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
        .avatar { width: 32px; height: 32px; background: #1A1A1A; border-radius: 50%; }
        .name { font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        .new-btn { width: 100%; padding: 14px; background: white; border: 1px solid #EDE7DF; border-radius: 12px; font-weight: 700; cursor: pointer; margin-bottom: 30px; transition: 0.2s; }
        .history-section label { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.3; letter-spacing: 1px; display: block; margin-bottom: 12px; }
        .history-list { overflow-y: auto; flex: 1; }
        .history-item { padding: 8px 12px; font-size: 13px; opacity: 0.6; cursor: pointer; border-radius: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
        .history-item:hover { background: white; opacity: 1; }
        .canvas { flex: 1; margin-left: 260px; display: flex; justify-content: center; width: calc(100vw - 260px); }
        .content-inner { width: 100%; max-width: 800px; padding: 80px 20px; display: flex; flex-direction: column; align-items: center; }
        .hero { text-align: center; margin-bottom: 40px; width: 100%; }
        h1 { font-size: 72px; font-weight: 900; letter-spacing: -4px; margin: 0; }
        .hero p { opacity: 0.4; font-size: 18px; margin-top: 10px; font-weight: 500; }
        .command-bar { width: 100%; background: white; border-radius: 20px; padding: 24px; border: 1px solid #EDE7DF; box-shadow: 0 30px 60px rgba(180, 160, 140, 0.1); }
        textarea { width: 100%; height: 60px; border: none; outline: none; font-size: 18px; resize: none; background: transparent; font-family: inherit; }
        .bar-footer { display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid #FAF5EF; }
        .output-container { width: 100%; margin-top: 40px; background: #F7F1E9; border-radius: 20px; border: 1px solid #E5DED4; overflow: hidden; }
        .output-header { padding: 12px 20px; background: #EDE7DF; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5DED4; }
        .output-header span { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #9A9288; }
        .copy-btn { background: white; border: 1px solid #DED7CE; color: #7A7268; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 10px; font-weight: 700; }
        .code-window { padding: 30px; min-height: 100px; }
        pre { margin: 0; color: #4A453E; font-family: 'SF Mono', monospace; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-break: break-all; }
        .gen-button { background: #1A1A1A; color: white; padding: 12px 28px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .version { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; padding-top: 20px; }
      `}</style>
    </div>
  );
}
