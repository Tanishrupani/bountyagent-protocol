import { useState } from 'react';

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
      setOutput("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo-box"></div>
          <span className="logo-text">BountyAgent</span>
        </div>
        <nav>
          <p className="nav-label">Workspace</p>
          <button className="nav-btn-active">+ New Agent</button>
          <button className="nav-btn">History</button>
        </nav>
        <div className="footer">SYSTEM_STABLE // V1.2</div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="header-text">
          <h1>Build anything.</h1>
          <p>Type your requirements. The agent generates the code.</p>
        </div>

        <div className="input-card">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your project..."
          />
          <div className="button-row">
            <button onClick={handleGenerate} className="gen-btn">
              {loading ? 'Thinking...' : 'Generate Code'}
            </button>
          </div>
        </div>

        {output && (
          <div className="output-card">
            <pre>{output}</pre>
          </div>
        )}
      </div>

      <style jsx>{`
        .main-container {
          display: flex;
          height: 100vh;
          background-color: #FCFBF8;
          color: #1A1A1A;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .sidebar {
          width: 280px;
          background-color: #F4F2ED;
          border-right: 1px solid #E8E6E0;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 50px;
        }
        .logo-box {
          width: 32px;
          height: 32px;
          background: #1A1A1A;
          border-radius: 8px;
        }
        .logo-text {
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -1px;
        }
        .nav-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.3;
          margin-bottom: 15px;
        }
        .nav-btn-active {
          width: 100%;
          padding: 12px;
          background: white;
          border: 1px solid #E8E6E0;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .nav-btn-active:hover { transform: scale(1.05); }
        .nav-btn {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          text-align: left;
          opacity: 0.5;
          cursor: pointer;
          margin-top: 10px;
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
        }
        .header-text {
          width: 100%;
          max-width: 700px;
          margin-bottom: 40px;
        }
        h1 { font-size: 64px; font-weight: 900; margin: 0; letter-spacing: -3px; }
        .header-text p { font-size: 20px; opacity: 0.4; margin-top: 10px; }
        .input-card {
          width: 100%;
          max-width: 700px;
          background: white;
          border-radius: 32px;
          padding: 24px;
          border: 1px solid #E8E6E0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.02);
          transition: transform 0.3s;
        }
        .input-card:hover { transform: scale(1.01); }
        textarea {
          width: 100%;
          height: 150px;
          border: none;
          outline: none;
          font-size: 20px;
          resize: none;
        }
        .button-row {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #F4F2ED;
          padding-top: 20px;
        }
        .gen-btn {
          background: #1A1A1A;
          color: white;
          padding: 12px 30px;
          border-radius: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }
        .output-card {
          margin-top: 30px;
          width: 100%;
          max-width: 700px;
          background: #F4F2ED;
          padding: 24px;
          border-radius: 24px;
          font-family: monospace;
          font-size: 14px;
        }
        .footer { margin-top: auto; font-size: 10px; opacity: 0.3; font-family: monospace; }
      `}</style>
    </div>
  );
}
