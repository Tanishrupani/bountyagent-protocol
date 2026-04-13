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
      setOutput("Connection error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#FCFBF8] text-[#1A1A1A] font-sans">
      {/* Sidebar - Pro Layout */}
      <div className="w-80 bg-[#F4F2ED] border-r border-[#E8E6E0] p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl shadow-lg"></div>
          <h2 className="font-bold text-2xl tracking-tighter italic">BountyAgent</h2>
        </div>
        
        <nav className="flex-1 space-y-4">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] opacity-30 px-2">Workspace</div>
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#E8E6E0] cursor-pointer hover:scale-[1.05] transition-all duration-300 font-semibold text-base text-center">
            + New Agent
          </div>
          <div className="p-4 rounded-2xl cursor-pointer hover:bg-[#E8E6E0] transition-colors text-base font-medium opacity-60">
            History
          </div>
        </nav>
        
        <div className="pt-8 border-t border-[#E8E6E0] text-xs font-mono opacity-30">
          SYSTEM_STABLE // V1.2
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-4xl space-y-12">
          
          <div className="space-y-4">
            <h1 className="text-7xl font-black tracking-tighter text-[#1A1A1A] leading-none">Build anything.</h1>
            <p className="text-2xl text-[#1A1A1A] opacity-40 font-medium">Type your requirements. The agent generates the code.</p>
          </div>

          {/* Input Box - Rounded & Zooming */}
          <div className="bg-white p-8 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-[#E8E6E0] hover:scale-[1.01] transition-transform duration-500">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your project..."
              className="w-full h-48 resize-none outline-none text-2xl placeholder:opacity-20 bg-transparent leading-tight"
            />
            <div className="flex justify-end pt-6 border-t border-[#F4F2ED]">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-[#1A1A1A] text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-black hover:shadow-2xl transition-all active:scale-95 disabled:opacity-30"
              >
                {loading ? 'Thinking...' : 'Generate Code'}
              </button>
            </div>
          </div>

          {/* Results Area */}
          {output && (
            <div className="bg-[#F4F2ED] p-10 rounded-[32px] border border-[#E8E6E0] animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black uppercase tracking-[0.3em] opacity-20">Generated Output</span>
              </div>
              <pre className="text-base font-mono leading-relaxed opacity-70 whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        body { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          margin: 0; 
          background: #FCFBF8;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
}
