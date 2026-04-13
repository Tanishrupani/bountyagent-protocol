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
      setOutput("Error connecting to Agent.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#F9F8F3] text-[#2C2C2C] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#F1EFE7] border-r border-[#E5E2D5] p-6 flex flex-col">
        <h2 className="font-bold text-lg mb-8 tracking-tight">BountyAgent</h2>
        <nav className="space-y-4 flex-1">
          <div className="text-sm font-medium opacity-60">History</div>
          <div className="p-3 bg-white rounded-xl shadow-sm cursor-pointer hover:scale-105 transition-transform">
            New Project
          </div>
        </nav>
        <div className="text-xs opacity-40">v1.1 Modern Protocol</div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">What are we building today?</h1>
            <p className="opacity-50">Enter a prompt to generate professional code instantly.</p>
          </div>

          {/* Input Box */}
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-[#E5E2D5] hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col p-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Create a landing page for a pizza shop..."
                className="w-full h-32 resize-none outline-none text-lg placeholder:opacity-30"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-[#2C2C2C] text-white px-6 py-2 rounded-xl font-medium hover:bg-black transition-colors disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Code'}
                </button>
              </div>
            </div>
          </div>

          {/* Output Area */}
          {output && (
            <div className="bg-[#F1EFE7] p-6 rounded-2xl border border-[#E5E2D5] hover:scale-[1.01] transition-transform duration-300 overflow-auto max-h-96">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        body { font-family: 'Inter', sans-serif; margin: 0; }
      `}</style>
    </div>
  );
}
