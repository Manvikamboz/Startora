import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Check } from 'lucide-react';

const STATIC_RESPONSES = {
  '/help': [
    'Available commands:',
    '  /stats          Show GitHub repository statistics',
    '  /contributors   List active core builders',
    '  /contracts      Show deployed smart contract details',
    '  /clear          Clear terminal command history'
  ],
  '/stats': [
    'Fetching Launchpad Labs repo statistics...',
    '-----------------------------------------',
    '  Stars:         ★ 142 stargazers',
    '  Forks:         ⑂ 28 forks',
    '  Commits:       ➔ 2,841 commits (main branch)',
    '  Open Issues:   ✓ 3 active issues',
    '  License:       ■ MIT Open Source'
  ],
  '/contributors': [
    'Active Open-Source Contributors:',
    '-----------------------------------------',
    '  • @Manvikamboz (Founder, Lead Architect)',
    '  • @alex-chen-mit (AI Integration Dev)',
    '  • @yuki-tanaka-todai (Web3 Smart Contracts)',
    '  • @sarahj-stanford (UI/UX Architect)',
    '  • @david-kim-snu (DAO Developer)'
  ],
  '/contracts': [
    'Checking deployed smart contracts on local testnet...',
    '---------------------------------------------------',
    '  Contract:   IdeaOwnership.sol',
    '  Network:    Localhost Hardhat Testnet (chainId: 31337)',
    '  Address:    0x5FbDB2315678afecb367f032d93F642f64180aa3',
    '  ABI:        Verified & Indexed',
    '  Status:     Online & Accepting Handshakes'
  ]
};

const LIVE_EVENTS = [
  'git push origin main - f (Manvikamboz)',
  'PR #14 Approved: "MetaMask connection wrapper"',
  'smart contract compiled successfully (0.42s)',
  'AI feasibility scoring weights updated in config',
  'builder @yuki-tanaka-todai joined the Tokyo chapter'
];

export default function TerminalSimulator() {
  const [history, setHistory] = useState([
    { text: 'Welcome to Launchpad Labs Developer Console v1.0.4', type: 'system' },
    { text: "Type '/help' to inspect available console parameters.", type: 'system' },
    { text: '', type: 'spacer' }
  ]);
  const [input, setInput] = useState('');
  const [liveLog, setLiveLog] = useState([
    'Server status: Handshake listening on port 5173...',
    'IdeaOwnership smart contract deployed at 0x5FbDB...'
  ]);
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal history to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Periodically append live open source development events
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = LIVE_EVENTS[Math.floor(Math.random() * LIVE_EVENTS.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLiveLog((prev) => [
        `[${timestamp}] ${randomEvent}`,
        ...prev.slice(0, 4)
      ]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `dev-guest:~$ ${input}`, type: 'input' }];

    if (cmd === '/clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (STATIC_RESPONSES[cmd]) {
      STATIC_RESPONSES[cmd].forEach((line) => {
        newHistory.push({ text: line, type: 'output' });
      });
    } else {
      newHistory.push({ text: `bash: command parameters not recognized: '${input}'. Type '/help' for active commands.`, type: 'error' });
    }

    newHistory.push({ text: '', type: 'spacer' });
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="terminal-sim-grid">
      {/* Interactive Command Console */}
      <div className="terminal-box glass">
        {/* Terminal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>git@launchpad-labs: ~</span>
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
        </div>

        {/* Terminal History */}
        <div className="terminal-body" style={{ flex: 1, padding: '20px', overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.6' }}>
          {history.map((line, idx) => {
            if (line.type === 'spacer') return <div key={idx} style={{ height: '8px' }} />;
            let color = 'rgba(255, 255, 255, 0.85)';
            if (line.type === 'input') color = 'var(--neon-teal)';
            if (line.type === 'system') color = 'rgba(255,255,255,0.4)';
            if (line.type === 'error') color = '#f87171';
            return (
              <div key={idx} style={{ color, whiteSpace: 'pre-wrap' }}>
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)', padding: '10px 16px' }}>
          <span style={{ color: 'var(--neon-teal)', fontFamily: 'monospace', fontSize: '12px', marginRight: '8px', display: 'flex', alignItems: 'center' }}>dev-guest:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type /help..."
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', outline: 'none', fontFamily: 'monospace', fontSize: '12px' }}
          />
          <button type="submit" className="cursor-target" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
            <Send className="w-4 h-4 hover:text-cyan-400 transition-colors" />
          </button>
        </form>
      </div>

      {/* Live Active GitHub Stream */}
      <div className="terminal-live-feed glass">
        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span className="live-badge-glow" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f', display: 'inline-block', boxShadow: '0 0 8px #27c93f' }} />
          Live Repository Activity
        </h4>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'hidden' }}>
          {liveLog.map((log, idx) => (
            <div key={idx} className="glass" style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.7)', animation: 'scaleUp 0.3s ease-out forwards', background: 'rgba(255,255,255,0.01)' }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
