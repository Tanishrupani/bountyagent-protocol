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
      setOutput("Error connecting to Agent.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>BountyAgent Protocol</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-wrap">
          <div className="logo-icon"></div>
          <span className="logo-text">BountyAgent</span>
        </div>
        <div className="nav-section">
          <p className="label">Workspace</p>
          <div className="nav-item active">+ New Agent</div>
          <div className="nav-item">History</div>
        </div>
        <div className="status-footer">V1.2 // STABLE</div>
      </div>

      {/* Main UI */}
      <div className="main">
        <div className="hero">
          <h1>Build anything.</h1>
          <p>Describe your logic. The agent handles the execution.</p>
        </div>

        <div className="input-box">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Create a sleek dashboard for a fintech app..."
          />
          <div className="action-row">
            <button onClick={handleGenerate} disabled={loading}>
              {loading ? 'Processing...' : 'Generate Code'}
            </button>
          </div>
        </div>

        {output && (
          <div className="result-box">
            <div className="result-header">Output Stream</div>
            <pre>{output}</pre>
          </div>
        )}
      </div>

      <style jsx global>{`
        body, html { margin: 0; padding: 0; background: #FCFBF8; font-family: -apple-system, sans-serif; }
        .container { display: flex; height: 100vh; }
        
        .sidebar { 
          width: 260px; background: #F4F2ED; border-right: 1px solid #E8E6E0; 
          padding: 40px; display: flex; flex-direction: column; 
        }
        .logo-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 60px; }
        .logo-icon { width: 32px; height: 32px; background: #1A1A1A; border-radius: 8px; }
        .logo-text { font-weight: 800; font-size: 20px; letter-spacing: -1px; }
        
        .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; opacity: 0.3; margin-bottom: 20px; }
        .nav-item { padding: 12px; border-radius: 12px; font-size: 15px; cursor: pointer; transition: 0.2s; margin-bottom: 8px; }
        .nav-item.active { background: white; border: 1px solid #E8E6E0; font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .nav-item:hover { transform: translateY(-2px); }
        
        .main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
        .hero { width: 100%; max-width: 720px; margin-bottom: 40px; }
        h1 { font-size: 64px; font-weight: 900; margin: 0; letter-spacing: -3px; color: #1A1A1A; }
        .hero p { font-size: 22px; opacity: 0.4; margin-top: 10px; }
        
        .input-box { 
          width: 100%; max-width: 720px; background: white; border-radius: 32px; 
          padding: 24px; border: 1px solid #E8E6E0; box-shadow: 0 20px 50px rgba(0,0,0,0.03);
          transition: 0.3s;
        }
        .input-box:hover { transform: scale(1.01); }
        textarea { width: 100%; height: 140px; border: none; outline: none; font-size: 20px; resize: none; background: transparent; }
        
        .action-row { display: flex; justify-content: flex-end; padding-top: 20px; border-top: 1px solid #F4F2ED; }
        button { 
          background: #1A1A1A; color: white; padding: 14px 32px; border-radius: 16px; 
          font-weight: 700; border: none; cursor: pointer; transition: 0.2s;
        }
        button:hover { background: #000; transform: scale(1.05); }

        .result-box { margin-top: 32px; width: 100%; max-width: 720px; background: #F4F2ED; border-radius: 24px; padding: 24px; }
        .result-header { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.3; margin-bottom: 12px; }
        pre { font-family: monospace; white-space: pre-wrap; font-size: 14px; opacity: 0.7; }
        .status-footer { margin-top: auto; font-size: 10px; opacity: 0.2; font-family: monospace; }
      `}</style>
    </div>
  );
}
