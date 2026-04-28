// Hero section voor SAIVY (NL)
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
        <div className="logo logo-wordmark">
          <span className="logo-text-wm">Sai<span className="logo-dot">.</span>vy</span>
        </div>
        <div className="nav-links">
          <a href="#services">Diensten</a>
          <a href="#tools">Cases</a>
          <a href="#contact">Over ons</a>
        </div>
        <a href="#contact" className="nav-cta">Gratis gesprek</a>
      </nav>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>PRIVATE AI FOR SMES · BASED IN BELGIUM</span>
        </div>

        <h1 className="hero-title hero-title-mono">
          <span className="grad-text">Less</span> staff.<br />
          <span className="grad-text">Lower</span> costs.<br />
          <span className="grad-text">Locked</span> data.<br />
          <span className="grad-text">Let's</span> build.
        </h1>

        <p className="hero-sub">
          We deploy <b>private AI systems inside your business</b> — no cloud,
          no SaaS subscriptions, no data exposure. Your team gets faster.
          Your overhead drops.
        </p>

        <div className="hero-cta-row">
          <a href="#tools" className="btn-primary">
            Bekijk wat we bouwen
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost">Gratis demo aanvragen</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">0%</div>
            <div className="stat-lbl">Data leaves your network</div>
          </div>
          <div className="stat">
            <div className="stat-num">€500</div>
            <div className="stat-lbl">Starting price, one-time</div>
          </div>
          <div className="stat">
            <div className="stat-num">&lt;2w</div>
            <div className="stat-lbl">Deployment time</div>
          </div>
        </div>

        <ul className="hero-trust">
          <li><span className="trust-dot" /> GDPR compliant by design</li>
          <li><span className="trust-dot" /> On-premise deployment</li>
          <li><span className="trust-dot" /> No ongoing API costs</li>
        </ul>
      </div>

      <div className="hero-demo">
        <HeroTerminal />
      </div>
    </section>);

};

const HeroTerminal = () => {
  const lines = [
  { t: "$ saivy deploy --agent support-assist", c: "cmd" },
  { t: "→ AI-collega aan het opzetten...", c: "muted" },
  { t: "✓ Verbonden: Gmail, Slack, Stripe, Notion", c: "ok" },
  { t: "✓ Getraind op 14 maanden teamberichten", c: "ok" },
  { t: "✓ Klaar om te helpen in 11 seconden", c: "ok" },
  { t: "", c: "" },
  { t: "Vandaag kreeg je team terug:", c: "muted" },
  { t: "  • 47 tickets voorgeschreven (Sara checkte in 12 min)", c: "out" },
  { t: "  • 12 facturen automatisch verwerkt", c: "out" },
  { t: "  • 3 leads gekwalificeerd vóór de standup", c: "out" },
  { t: "  • Meeting notes samengevat in Slack", c: "highlight" },
  { t: "", c: "" },
  { t: "Druk eraf:", c: "muted" },
  { t: "  • 6,5 uur teruggegeven vandaag", c: "ok" },
  { t: "  • 0 weekendmeldingen", c: "ok" },
  { t: "  • €260 aan overuren voorkomen", c: "highlight" }];


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
