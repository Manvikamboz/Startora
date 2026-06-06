import { useState, useEffect } from 'react';
import {
  Rocket,
  Brain,
  ShieldCheck,
  Vote,
  Cpu,
  Sparkles,
  CheckCircle2,
  Database,
  Layers,
  Network,
  ArrowRight,
  Play,
  Globe,
  Send,
  Mail
} from 'lucide-react';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import './styles/App.css';
import Dock from './components/Dock';
import InfiniteMenu from './components/InfiniteMenu';
import BorderGlow from './components/BorderGlow';
import LetterGlitch from './components/LetterGlitch';
import MagicBento from './components/MagicBento';
import ContributorConstellation from './components/ContributorConstellation';
import TerminalSimulator from './components/TerminalSimulator';
import DaoProposalSim from './components/DaoProposalSim';
import Galaxy from './components/Galaxy';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashMounted, setIsSplashMounted] = useState(true);

  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');

  const [showArchitecture, setShowArchitecture] = useState(false);
  const [communityTab, setCommunityTab] = useState('constellation');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuScale = windowWidth < 480 ? 0.8 : windowWidth < 768 ? 0.95 : windowWidth < 1024 ? 1.15 : 1.4;

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsSplashMounted(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);


  const networkItems = [
    {
      image: '/hub_sv.png',
      link: '#',
      title: 'Silicon Valley',
      description: 'Stanford, UC Berkeley & local innovators matching code & building fast.'
    },
    {
      image: '/hub_london.png',
      link: '#',
      title: 'London Tech',
      description: 'Imperial, Oxford & Cambridge talent running decentralized research.'
    },
    {
      image: '/hub_bangalore.png',
      link: '#',
      title: 'Bengaluru Hub',
      description: 'IITs & BITS pioneers driving next-gen Web3 scaling and DeFi.'
    },
    {
      image: '/hub_tokyo.png',
      link: '#',
      title: 'Tokyo Innovation',
      description: 'Todai developers building immersive AI interfaces and VR protocols.'
    }
  ];

  const dockItems = [
    {
      label: 'Home',
      icon: <Rocket className="w-5 h-5" />,
      onClick: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      label: 'Features',
      icon: <Layers className="w-5 h-5" />,
      onClick: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      label: 'Network',
      icon: <Globe className="w-5 h-5" />,
      onClick: () => document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' })
    },

    {
      label: 'System Flow',
      icon: <Cpu className="w-5 h-5" />,
      onClick: () => {
        setShowArchitecture(true);
        setTimeout(() => {
          document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },

    {
      label: 'Open Source',
      icon: <GithubIcon className="w-5 h-5" />,
      onClick: () => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })
    },
  ];




  return (
    <div className="app-container">
      {/* Glassmorphic Splash Screen Overlay */}
      {isSplashMounted && (
        <div className={`splash-overlay ${!showSplash ? 'hidden' : ''}`}>
          <div className="splash-galaxy-bg">
            <Galaxy
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1}
              glowIntensity={0.3}
              saturation={0}
              hueShift={140}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={0.5}
              speed={1}
            />
          </div>
          <div className="splash-glow-cyan" />
          <div className="splash-glow-violet" />
          <div className="splash-content">
            <h1 className="splash-title">Startora</h1>
            <p className="splash-tagline">Creating Startups before graduation</p>
            <div className="splash-divider" />
            <button
              className="splash-coming-soon cursor-target"
              onClick={() => setShowSplash(false)}
            >
              Enter Workspace
            </button>
          </div>
        </div>
      )}

      {/* Ambient Matrix Rain / LetterGlitch Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10, pointerEvents: 'none', opacity: 0.15 }}>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth
          colors={["#2b4539", "#61dca3", "#61b3dc"]}
          showCenterVignette
          showOuterVignette={false}
        />
      </div>

      {/* Background spotlights */}
      <div className="glow-spotlight animate-drift" style={{ width: '40vw', height: '40vw', top: '-10%', left: '-10%', background: 'var(--neon-teal)' }}></div>
      <div className="glow-spotlight animate-drift" style={{ width: '40vw', height: '40vw', bottom: '-10%', right: '-10%', background: 'var(--neon-violet)', animationDelay: '-5s' }}></div>



      <section id="hero" className="hero">
        <h1 className="hero-title">
          The Decentralized Workspace for <span className="text-gradient">Student Builders</span>
        </h1>
        <p className="hero-description">
          A premium virtual launchpad linking AI Feasibility Analysis, MetaMask Blockchain IP Registries, and DAO Governance to seed tomorrow&apos;s student startups.
        </p>
        <div className="hero-cta">
          <button
            onClick={() => {
              setShowArchitecture(true);
              setTimeout(() => {
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="btn-primary cursor-target"
          >
            Explore Architecture <Play className="w-4 h-4 fill-white" />
          </button>
          <a href="#features" className="btn-secondary cursor-target">
            Explore Features <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Core Features Overview */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Built with Cutting-Edge Sandbox Architecture</h2>
          <p className="section-description">A look inside the specialized building blocks enabling student co-founder matches and verified IP tracking.</p>
        </div>

        <div className="grid-showcase">
          {/* Feature 1 */}
          <BorderGlow
            className="feature-card glass-interactive"
            edgeSensitivity={25}
            glowColor="180 100 50"
            backgroundColor="var(--bg-card)"
            borderRadius={24}
            glowRadius={48}
            glowIntensity={1.6}
            coneSpread={28}
            animated={false}
            colors={['#06b6d4', '#3b82f6', '#10b981']}
          >
            <div className="feature-icon-box" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--neon-teal)' }}>
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="feature-title">AI Feasibility grading</h3>
            <p className="feature-text">
              Runs NLP tokenizers to compute feasibility scores, risk ratings, and technical milestones for startup descriptions.
            </p>
          </BorderGlow>

          {/* Feature 2 */}
          <BorderGlow
            className="feature-card glass-interactive"
            edgeSensitivity={25}
            glowColor="260 100 65"
            backgroundColor="var(--bg-card)"
            borderRadius={24}
            glowRadius={48}
            glowIntensity={1.6}
            coneSpread={28}
            animated={false}
            colors={['#8b5cf6', '#d946ef', '#6366f1']}
          >
            <div className="feature-icon-box" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--neon-violet)' }}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="feature-title">Blockchain IP Ownership</h3>
            <p className="feature-text">
              Generate SHA-256 fingerprints of startup proposals and post them on-chain with MetaMask to claim timestamped proof of invention.
            </p>
          </BorderGlow>

          {/* Feature 3 */}
          <BorderGlow
            className="feature-card glass-interactive"
            edgeSensitivity={25}
            glowColor="330 100 65"
            backgroundColor="var(--bg-card)"
            borderRadius={24}
            glowRadius={48}
            glowIntensity={1.6}
            coneSpread={28}
            animated={false}
            colors={['#ec4899', '#f43f5e', '#a855f7']}
          >
            <div className="feature-icon-box" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--neon-pink)' }}>
              <Vote className="w-6 h-6" />
            </div>
            <h3 className="feature-title">DAO Democratic Governance</h3>
            <p className="feature-text">
              Propose funding rounds and vote on proposals. Student voting weights are backed by sandbox coins earned from building.
            </p>
          </BorderGlow>
        </div>
      </section>

      {/* Build Global Student Founder Network Section */}
      <section id="network" className="network-section">
        <div className="network-grid">
          <div className="network-content">
            <div className="network-badge animate-float">
              <Sparkles className="w-3 h-3" /> Global Ecosystem
            </div>
            <h2 className="network-title">
              Build your Global <span className="text-gradient-teal">Student Founder Network</span>
            </h2>
            <p className="network-text">
              Launchpad Labs bridges university boundaries, allowing elite student developers, designers, and business operators to unite under a singular decentralized sandbox.
            </p>

          </div>
          <div className="network-visual glass">
            <div className="network-menu-container">
              <InfiniteMenu items={networkItems} scale={menuScale} />
            </div>
          </div>
        </div>
      </section>

      {/* System Flow Diagram Section */}
      {!showArchitecture ? (
        <section className="dev-cta-section" style={{ minHeight: 'auto', padding: '60px 24px', scrollSnapAlign: 'start', scrollMarginTop: '80px' }}>
          <div className="dev-cta-container glass" style={{ margin: '0 auto', padding: '40px', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', textAlign: 'left' }}>
            <div style={{ flex: '1 1 500px' }}>
              <div className="developer-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', color: 'var(--neon-teal)', padding: '4px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px' }}>
                <Cpu className="w-3 h-3" /> Developer Hub
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Explore Our Architecture</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.5' }}>Discover the technical design: how AI feasibility grading, local blockchain registries, and governance models connect across Launchpad Labs.</p>
            </div>
            <button
              onClick={() => {
                setShowArchitecture(true);
                setTimeout(() => {
                  document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="btn-primary cursor-target"
              style={{ whiteSpace: 'nowrap' }}
            >
              Check System Architecture <Cpu className="w-4 h-4" />
            </button>
          </div>
        </section>
      ) : (
        <section id="architecture" className="arch-section" style={{ animation: 'scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
          <div className="section-header">
            <h2 className="section-title">System Architecture</h2>
            <p className="section-description">How frontend inputs integrate with our distributed servers, AI networks, and smart contracts.</p>
          </div>

          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="139, 92, 246"
            disableAnimations={false}
          />
        </section>
      )}


      {/* Open Source Hub Section */}
      <section id="community" className="community-section">
        <div className="section-header">
          <h2 className="section-title text-gradient">Built for the Open-Source Future</h2>
          <p className="section-description">Interact with our codebase constellation, simulated developer activity stream, and community proposal board.</p>
        </div>

        {/* Tab Switch Controls */}
        <div className="community-tab-controls glass">
          <button
            onClick={() => setCommunityTab('constellation')}
            className={`community-tab-btn cursor-target ${communityTab === 'constellation' ? 'active' : ''}`}
          >
            Contributor Constellation
          </button>
          <button
            onClick={() => setCommunityTab('terminal')}
            className={`community-tab-btn cursor-target ${communityTab === 'terminal' ? 'active' : ''}`}
          >
            Live Activity Terminal
          </button>
          <button
            onClick={() => setCommunityTab('dao')}
            className={`community-tab-btn cursor-target ${communityTab === 'dao' ? 'active' : ''}`}
          >
            Governance Proposal Board
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="community-tab-content animate-scaleUp" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          {communityTab === 'constellation' && <ContributorConstellation />}
          {communityTab === 'terminal' && <TerminalSimulator />}
          {communityTab === 'dao' && <DaoProposalSim />}
        </div>
      </section>


      {/* What's Next Section */}
      <section id="whats-next" className="whats-next-section">
        <div className="section-header">
          <h2 className="section-title text-gradient">Be Part of What&apos;s Next</h2>
          <p className="section-description">What&apos;s Next</p>
        </div>

        <div className="whats-next-content glass">
          <div className="whats-next-badge">
            <Sparkles className="w-3 h-3" /> Coming Soon
          </div>
          <h3 className="whats-next-heading">Shape the Future of Student Startups</h3>
          <p className="whats-next-text">
            We are building a trustless, decentralized workspace for elite university builders. Get notified when we launch, get access to early developer testnets, and connect with global builders.
          </p>

          {isWaitlistSubmitted ? (
            <div className="waitlist-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: 'scaleUp 0.5s ease-out' }}>
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="whats-next-heading">You&apos;re on the list!</h3>
              <p className="whats-next-text" style={{ marginTop: '8px' }}>
                Thank you for joining. We&apos;ve registered your address (<strong>{waitlistEmail}</strong>) and will notify you as soon as early access opens.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsWaitlistSubmitted(true);
              }}
              className="waitlist-form"
            >
              <div className="waitlist-input-container">
                <Mail className="waitlist-icon w-5 h-5" />
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter your university email address"
                  required
                  className="waitlist-input"
                />
              </div>
              <button type="submit" className="btn-primary cursor-target waitlist-submit">
                Join Waitlist <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>


      </section>



      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <Rocket className="w-5 h-5 text-cyan-400" />
          <span>LAUNCHPAD LABS</span>
        </div>
        <div className="footer-links">
          <a href="#features" className="footer-link">Features</a>
          <a href="#network" className="footer-link">Network</a>
          <a href="#sandbox" className="footer-link">Sandbox</a>
          <a href="#architecture" className="footer-link">System Flow</a>
          <a href="#whats-next" className="footer-link">What's Next</a>
        </div>
        <p>© 2026 Startora. All right reserved.</p>
      </footer>

      <br />
      <br />
      <br />

      <Dock items={dockItems} />
    </div>
  );
}
