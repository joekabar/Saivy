// Hero section for SAIVY
const Hero = () => {
  const [savings, setSavings] = React.useState(0);

  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1800);
      const ease = 1 - Math.pow(1 - p, 3);
      setSavings(Math.floor(ease * 84));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
      </div>

      <nav className="nav">
        <div className="logo">
          <span className="logo-mark">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <path d="M16 2 L28 10 L28 22 L16 30 L4 22 L4 10 Z" stroke="url(#lg)" strokeWidth="2" />
              <path d="M11 13 L16 10 L21 13 L21 19 L16 22 L11 19 Z" fill="url(#lg)" opacity="0.9" />
              <defs>
                <linearGradient id="lg" x1="0" x2="32" y1="0" y2="32">
                  <stop offset="0" stopColor="#4DA8FF" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="logo-text">SAIVY</span>
        </div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#tools">Tools</a>
          <a href="#proof">Results</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#contact" className="nav-cta">Book a call →</a>
      </nav>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>AI co-workers that take the busywork off your team</span>
        </div>

        <h1 className="hero-title">
          Take the pressure off your <span className="grad-text">team</span>.<br />
          Keep the <span className="strike">overtime, the burnout, the bills</span>.
        </h1>

        <p className="hero-sub">
          Custom software & AI co-workers that handle the repetitive, draining work
          — so your people stop drowning, your overtime drops, and the hours come
          back to the work that actually matters.
        </p>

        <div className="hero-cta-row">
          <a href="#contact" className="btn-primary">
            Book a free strategy call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#tools" className="btn-ghost">See live demos</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{savings}%</div>
            <div className="stat-lbl">Less repetitive work</div>
          </div>
          <div className="stat">
            <div className="stat-num">22h</div>
            <div className="stat-lbl">/wk back per teammate</div>
          </div>
          <div className="stat">
            <div className="stat-num">$8k</div>
            <div className="stat-lbl">/mo avg. saved</div>
          </div>
        </div>
      </div>

      <div className="hero-demo">
        <HeroTerminal />
      </div>
    </section>);

};

const HeroTerminal = () => {
  const lines = [
  { t: "$ saivy deploy --agent support-assist", c: "cmd" },
  { t: "→ Provisioning AI co-worker...", c: "muted" },
  { t: "✓ Connected: Gmail, Slack, Stripe, Notion", c: "ok" },
  { t: "✓ Trained on 14 months of your team's replies", c: "ok" },
  { t: "✓ Ready to assist in 11 seconds", c: "ok" },
  { t: "", c: "" },
  { t: "Today, your team got back:", c: "muted" },
  { t: "  • 47 tickets pre-drafted (Sara reviewed in 12 min)", c: "out" },
  { t: "  • 12 invoices reconciled — zero human touch", c: "out" },
  { t: "  • 3 leads qualified before standup", c: "out" },
  { t: "  • Meeting notes summarized in Slack", c: "highlight" },
  { t: "", c: "" },
  { t: "Pressure off the team:", c: "muted" },
  { t: "  • 6.5 hours returned today", c: "ok" },
  { t: "  • 0 weekend pages", c: "ok" },
  { t: "  • $284 in overtime avoided", c: "highlight" }];


  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown < 5 ? 220 : 140);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="terminal-title">saivy.agent — customer-ops</span>
        <span className="terminal-status">
          <span className="pulse-dot" /> live
        </span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, shown).map((l, i) =>
        <div key={i} className={`tline tline-${l.c}`}>
            {l.t || "\u00A0"}
          </div>
        )}
        {shown < lines.length && <span className="cursor">▋</span>}
      </div>
    </div>);

};

window.Hero = Hero;