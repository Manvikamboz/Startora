import { useState, useEffect } from 'react';
import { Vote, Plus, Award, CheckCircle, XCircle } from 'lucide-react';

const PRESET_VOTERS = [
  { name: '@Manvikamboz', weight: 45.2, vote: 'YES' },
  { name: '@alex-chen-mit', weight: 24.5, vote: 'YES' },
  { name: '@yuki-tanaka-todai', weight: 19.8, vote: 'YES' },
  { name: '@sarahj-stanford', weight: 14.1, vote: 'NO' },
  { name: '@david-kim-snu', weight: 12.6, vote: 'YES' },
  { name: '@emily-sec-ox', weight: 8.5, vote: 'NO' }
];

export default function DaoProposalSim() {
  const [proposalTitle, setProposalTitle] = useState('');
  const [activeProposal, setActiveProposal] = useState(null);
  const [votingState, setVotingState] = useState('idle'); // idle, voting, ended
  const [votesYes, setVotesYes] = useState(0);
  const [votesNo, setVotesNo] = useState(0);
  const [voteLogs, setVoteLogs] = useState([]);

  const handleStartProposal = (e) => {
    e.preventDefault();
    if (!proposalTitle.trim()) return;

    setActiveProposal(proposalTitle);
    setVotingState('voting');
    setVotesYes(0);
    setVotesNo(0);
    setVoteLogs([]);

    // Run simulated voting sequence
    let voterIndex = 0;
    const runSim = () => {
      if (voterIndex >= PRESET_VOTERS.length) {
        setVotingState('ended');
        return;
      }

      const voter = PRESET_VOTERS[voterIndex];
      setTimeout(() => {
        if (voter.vote === 'YES') {
          setVotesYes((prev) => prev + voter.weight);
        } else {
          setVotesNo((prev) => prev + voter.weight);
        }

        setVoteLogs((prev) => [
          `Voter ${voter.name} voted ${voter.vote} (voting power: ${voter.weight.toFixed(1)} voting weight)`,
          ...prev
        ]);

        voterIndex++;
        runSim();
      }, 900);
    };

    runSim();
  };

  const totalVotes = votesYes + votesNo;
  const yesPercent = totalVotes > 0 ? (votesYes / totalVotes) * 100 : 0;
  const noPercent = totalVotes > 0 ? (votesNo / totalVotes) * 100 : 0;

  return (
    <div className="dao-sim-container glass">
      
      {/* Input panel / Proposal details */}
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', color: 'var(--neon-violet)', padding: '4px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '16px', alignSelf: 'flex-start' }}>
          <Vote className="w-3.5 h-3.5" /> DAO Governance Sim
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>Propose Community Upgrades</h3>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '24px' }}>
          Every feature added to our open-source codebase is decided democratically. Submit a mock upgrade proposal to see how token-weighted consensus voting validates changes.
        </p>

        {votingState === 'idle' ? (
          <form onSubmit={handleStartProposal} className="responsive-form-row">
            <input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              placeholder="e.g. Add Solana Web3 wallet support"
              required
              className="waitlist-input"
              style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff', fontSize: '14px' }}
            />
            <button type="submit" className="btn-primary cursor-target" style={{ padding: '12px 24px', fontSize: '13px' }}>
              Propose <Plus className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="proposal-active-details glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Vote</span>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginTop: '4px', marginBottom: '16px' }}>{activeProposal}</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--neon-teal)' }}>YES: {votesYes.toFixed(1)} weight</span>
                <span style={{ color: 'var(--neon-pink)' }}>NO: {votesNo.toFixed(1)} weight</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${yesPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--neon-teal), #61dca3)', transition: 'width 0.3s ease' }} />
                <div style={{ width: `${noPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--neon-pink), #ec4899)', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {votingState === 'ended' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', padding: '12px', borderRadius: '10px', background: yesPercent > 50 ? 'rgba(97,220,163,0.08)' : 'rgba(236,72,153,0.08)', border: yesPercent > 50 ? '1px solid rgba(97,220,163,0.2)' : '1px solid rgba(236,72,153,0.2)' }}>
                {yesPercent > 50 ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span style={{ fontSize: '12px', color: '#a7f3d0', fontWeight: '600' }}>Proposal Passed! Executing build changes on main network.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-pink-400" />
                    <span style={{ fontSize: '12px', color: '#fbcfe8', fontWeight: '600' }}>Proposal Rejected. Insufficient vote weights.</span>
                  </>
                )}
                <button onClick={() => setVotingState('idle')} className="cursor-target" style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#fff', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer' }}>Reset</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voting log history stream */}
      <div className="dao-vote-stream glass" style={{ border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', background: '#0a0b10', padding: '20px', display: 'flex', flexDirection: 'column', height: '320px', overflowY: 'hidden', textAlign: 'left' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award className="w-4 h-4 text-violet-400" /> Live Consensus Audit Logs
        </h4>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
          {voteLogs.length === 0 ? (
            <div style={{ margin: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontFamily: 'monospace' }}>
              Waiting for proposal submission...
            </div>
          ) : (
            voteLogs.map((log, idx) => (
              <div key={idx} style={{ fontSize: '11px', fontFamily: 'monospace', color: log.includes('YES') ? '#61dca3' : '#f472b6', animation: 'scaleUp 0.3s ease-out forwards' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
