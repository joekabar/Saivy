// Testimonials & Contact sections
const Testimonials = () => {
  const items = [
    {
      quote: "My support lead used to spend 4 hours a day in the inbox. Now SAIVY's assistant pre-drafts the boring 80% — she just reviews and sends. She stopped doing weekends. We also dropped two SaaS tools we didn't need anymore.",
      name: "Daniela Rojas",
      role: "COO, LeadLight (12 people)",
      metric: "−20 hrs/wk",
      metricLbl: "+ $1,400/mo saved",
    },
    {
      quote: "They built us an internal tool that killed three context-switches my engineers were doing every day. Morale jump was honestly the bigger win — but the $1.2k/mo we stopped paying SaaS vendors didn't hurt.",
      name: "Marcus Chen",
      role: "Founder, Stackbench (8 people)",
      metric: "−3 tabs",
      metricLbl: "+ $1.2k/mo saved",
    },
    {
      quote: "My team stopped dreading Mondays. The weekly competitor digest lands in Slack already summarized — nobody compiles it manually anymore. Saved one full headcount we were about to hire just to keep up.",
      name: "Jen Whitlock",
      role: "Head of Marketing, ProofPing",
      metric: "+6 hrs/wk",
      metricLbl: "+ 1 hire avoided",
    },
  ];

  return (
    <section className="testi" id="proof">
      <div className="section-head">
        <div className="kicker">
          <span className="kicker-bar" />
          Solopreneurs & teams
        </div>
        <h2 className="section-title">
          Less burnout. <span className="grad-text">Lower bills.</span>
        </h2>
      </div>

      <div className="testi-grid">
        {items.map((t, i) => (
          <figure key={i} className="testi-card">
            <div className="testi-metric">
              <div className="testi-metric-num">{t.metric}</div>
              <div className="testi-metric-lbl">{t.metricLbl}</div>
            </div>
            <blockquote className="testi-quote">"{t.quote}"</blockquote>
            <figcaption className="testi-author">
              <div className="testi-avatar">{t.name[0]}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ name: "", email: "", what: "" });
  const [sent, setSent] = React.useState(false);

  const next = () => setStep((s) => Math.min(2, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const submit = () => setSent(true);

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div className="contact-left">
          <div className="kicker">
            <span className="kicker-bar" />
            Book a call
          </div>
          <h2 className="section-title">
            30 minutes. <br />
            <span className="grad-text">A plan to free up your team.</span>
          </h2>
          <p className="contact-sub">
            Tell us where your team is drowning. We'll come back with a scoped plan,
            an honest estimate, and a "don't build this" list — even if you never hire us.
          </p>

          <ul className="contact-bullets">
            <li><span className="check">✓</span> First call is free, always</li>
            <li><span className="check">✓</span> Average reply: under 4 hours</li>
            <li><span className="check">✓</span> Fixed-price quotes, no hourly games</li>
            <li><span className="check">✓</span> Most projects ship in 2–4 weeks</li>
          </ul>
        </div>

        <div className="contact-card">
          {sent ? (
            <div className="contact-sent">
              <div className="sent-glow">
                <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
                  <circle cx="32" cy="32" r="28" stroke="url(#sg)" strokeWidth="2" />
                  <path d="M20 32l8 8 16-16" stroke="url(#sg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="sg" x1="0" x2="64" y1="0" y2="64">
                      <stop offset="0" stopColor="#4DA8FF" />
                      <stop offset="1" stopColor="#22D3A0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3>You're on the list.</h3>
              <p>Check your inbox — calendar link is on the way. We reply from a real human (with help from a SAIVY agent, naturally).</p>
              <button className="btn-ghost" onClick={() => { setSent(false); setStep(0); setData({ name: "", email: "", what: "" }); }}>
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="contact-progress">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`prog-dot ${i <= step ? "is-on" : ""}`} />
                ))}
                <span className="contact-step">Step {step + 1} of 3</span>
              </div>

              {step === 0 && (
                <div className="contact-step-pane">
                  <label className="field">
                    <span>Your name</span>
                    <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Jane Founder" />
                  </label>
                  <label className="field">
                    <span>Email</span>
                    <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="jane@yourstartup.com" type="email" />
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="contact-step-pane">
                  <label className="field">
                    <span>What's eating up your team's time?</span>
                    <textarea
                      value={data.what}
                      onChange={(e) => setData({ ...data, what: e.target.value })}
                      placeholder="Be specific. e.g. 'My support team spends 4hrs/day in the inbox doing the same five replies. I want them to get that time back for harder tickets.'"
                      rows={5}
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="contact-step-pane">
                  <div className="confirm-block">
                    <div className="confirm-row"><span>Name</span><b>{data.name || "—"}</b></div>
                    <div className="confirm-row"><span>Email</span><b>{data.email || "—"}</b></div>
                    <div className="confirm-row confirm-multi"><span>Project</span><p>{data.what || "—"}</p></div>
                  </div>
                  <p className="confirm-hint">We'll reply within 4 hours with two call slots and a one-page scoped plan.</p>
                </div>
              )}

              <div className="contact-actions">
                {step > 0 && <button className="btn-ghost" onClick={prev}>Back</button>}
                {step < 2 && (
                  <button className="btn-primary" onClick={next} disabled={step === 0 ? !data.name || !data.email : !data.what}>
                    Continue
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                {step === 2 && (
                  <button className="btn-primary" onClick={submit}>
                    Send & book my slot
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="logo">
          <span className="logo-mark">
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <path d="M16 2 L28 10 L28 22 L16 30 L4 22 L4 10 Z" stroke="url(#fg)" strokeWidth="2" />
              <defs>
                <linearGradient id="fg" x1="0" x2="32" y1="0" y2="32">
                  <stop offset="0" stopColor="#4DA8FF" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="logo-text">SAIVY</span>
        </div>
        <div className="footer-meta">
          <span>© 2026 Saivy Labs</span>
          <span>·</span>
          <span>Built by humans + agents</span>
          <span>·</span>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </section>
  );
};

window.Testimonials = Testimonials;
window.Contact = Contact;
