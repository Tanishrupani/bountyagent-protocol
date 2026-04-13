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
    <div className="nexus-layout">
      <Head><title>Nexus Protocol</title></Head>

      <aside className="nexus-sidebar">
        <div className="nexus-brand">
          <div className="nexus-avatar"></div>
          <span className="nexus-name">Nexus</span>
        </div>
        
        <div className="nexus-nav">
          <button className="nexus-new-btn" onClick={startNewProject}>
            + New Project
          </button>
          
          <div className="nexus-history">
            <label>HISTORY</label>
            <div className="nexus-history-list">
              {history.map(item => (
                <div key={item.id} className="nexus-history-item" onClick={() => { setOutput(item.code); setPrompt(item.prompt); }}>
                  {item.prompt.substring(0, 22)}...
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="nexus-footer">V1.2 // STABLE</div>
      </aside>

      <main className="nexus-canvas">
        <div className="nexus-content">
          <header className="nexus-hero">
            <h1>Build anything.</h1>
            <p>The autonomous engine for rapid development.</p>
          </header>

          <div className="nexus-command-bar">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the build..."
            />
            <div className="nexus-bar-footer">
              <button onClick={handleGenerate} disabled={loading} className="nexus-gen-btn">
                {loading ? 'Consulting Nexus...' : 'Generate'}
              </button>
            </div>
          </div>

          {output && (
            <div className="nexus-output-window">
              <div className="nexus-output-header">
                <span>INTELLIGENCE STREAM</span>
                <button onClick={() => navigator.clipboard.writeText(output)}>COPY CODE</button>
              </div>
              <div className="nexus-code-area">
                <pre>{output}</pre>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        body, html { margin: 0; padding: 0; background: #FFF9F2; color: #1A1A1A; font-family: -apple-system, sans-serif; height: 100%; width: 100%; overflow-x: hidden; }
        .nexus-layout { display: flex; width: 100vw; min-height: 100vh; }
        
        /* Sidebar Fix */
        .nexus-sidebar { width: 260px; background: #FAF5EF; border-right: 1px solid #EDE7DF; padding: 40px 24px; display: flex; flex-direction: column; position: fixed; height: 100vh; top: 0; left: 0; box-sizing: border-box; }
        .nexus-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
        .nexus-avatar { width: 32px; height: 32px; background: #1A1A1A; border-radius: 50%; }
        .nexus-name { font-weight: 900; font-size: 22px; letter-spacing: -1px; }
        
        .nexus-new-btn { width: 100%; padding: 14px; background: white; border: 1px solid #EDE7DF; border-radius: 12px; font-weight: 700; cursor: pointer; margin-bottom: 30px; text-align: center; }
        .nexus-history label { font-size: 10px; font-weight: 800; opacity: 0.3; letter-spacing: 1px; display: block; margin-bottom: 12px; }
        .nexus-history-list { overflow-y: auto; flex: 1; }
        .nexus-history-item { padding: 8px 12px; font-size: 13px; opacity: 0.6; cursor: pointer; border-radius: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .nexus-history-item:hover { background: white; opacity: 1; }

        /* Main Content Alignment */
        .nexus-canvas { flex: 1; margin-left: 260px; display: flex; justify-content: center; width: calc(100vw - 260px); min-height: 100vh; padding: 80px 0; }
        .nexus-content { width: 100%; max-width: 800px; padding: 0 40px; display: flex; flex-direction: column; align-items: center; }
        
        .nexus-hero { text-align: center; margin-bottom: 40px; }
        h1 { font-size: 72px; font-weight: 900; letter-spacing: -4px; margin: 0; }
        .nexus-hero p { opacity: 0.4; font-size: 18px; margin-top: 10px; font-weight: 500; }

        .nexus-command-bar { width: 100%; background: white; border-radius: 20px; padding: 24px; border: 1px solid #EDE7DF; box-shadow: 0 30px 60px rgba(180, 160, 140, 0.1); box-sizing: border-box; }
        textarea { width: 100%; height: 60px; border: none; outline: none; font-size: 18px; resize: none; background: transparent; }
        .nexus-bar-footer { display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid #FAF5EF; }
        
        /* Beige Code Window */
        .nexus-output-window { width: 100%; margin-top: 40px; background: #F7F1E9; border-radius: 20px; border: 1px solid #E5DED4; overflow: hidden; margin-bottom: 100px; }
        .nexus-output-header { padding: 12px 20px; background: #EDE7DF; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5DED4; }
        .nexus-output-header span { font-size: 10px; font-weight: 900; color: #9A9288; }
        .nexus-output-header button { background: white; border: 1px solid #DED7CE; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 10px; font-weight: 700; color: #7A7268; }
        
        .nexus-code-area { padding: 30px; }
        pre { margin: 0; color: #4A453E; font-family: 'SF Mono', monospace; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-break: break-all; }
        
        .nexus-gen-btn { background: #1A1A1A; color: white; padding: 12px 28px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; }
        .nexus-footer { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; padding-top: 20px; }
      `}</style>
    </div>
  );
}
