// Testimonials & Contact (NL)
const Testimonials = () => {
  const items = [
    {
      quote: "Mijn support-lead zat 4 uur per dag in de inbox. Nu schrijft SAIVY's assistent de saaie 80% voor — zij checkt en verstuurt. Ze werkt geen weekends meer. We schrapten ook twee SaaS-tools die we niet meer nodig hadden.",
      name: "Daniela Rojas",
      role: "COO, LeadLight (12 mensen)",
      metric: "−20 u/wk",
      metricLbl: "+ €1.300/mnd bespaard",
    },
    {
      quote: "Ze bouwden een interne tool die drie context-switches per dag van mijn engineers wegnam. De moraalboost was eerlijk gezegd de grootste winst — maar de €1.100/mnd die we niet meer aan SaaS uitgeven hielp ook.",
      name: "Marcus Chen",
      role: "Oprichter, Stackbench (8 mensen)",
      metric: "−3 tabs",
      metricLbl: "+ €1.100/mnd bespaard",
    },
    {
      quote: "Mijn team haat maandagen niet meer. Het wekelijkse concurrentie-overzicht ploft samengevat in Slack — niemand stelt het meer handmatig op. We bespaarden een hele FTE die we wilden aannemen om bij te houden.",
      name: "Jen Whitlock",
      role: "Hoofd Marketing, ProofPing",
      metric: "+6 u/wk",
      metricLbl: "+ 1 hire vermeden",
    },
  ];

  return (
    <section className="testi" id="proof">
      <div className="section-head">
        <div className="kicker">
          <span className="kicker-bar" />
          Teams & oprichters
        </div>
        <h2 className="section-title">
          Minder burn-out. <span className="grad-text">Lagere rekeningen.</span>
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

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

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
            Plan een gesprek
          </div>
          <h2 className="section-title">
            30 minuten. <br />
            <span className="grad-text">Een plan om je team te ontlasten.</span>
          </h2>
          <p className="contact-sub">
            Vertel ons waar je team in verzuipt. We komen terug met een concreet plan,
            een eerlijke schatting en een "dit niet bouwen"-lijst — ook als je ons nooit inhuurt.
          </p>

          <ul className="contact-bullets">
            <li><span className="check">✓</span> Eerste gesprek altijd gratis</li>
            <li><span className="check">✓</span> Reactie binnen 4 uur</li>
            <li><span className="check">✓</span> Vaste prijzen, geen uurtje-factuurtje</li>
            <li><span className="check">✓</span> De meeste projecten live in 2–4 weken</li>
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
              <h3>Je staat op de lijst.</h3>
              <p>Check je inbox — de agendalink komt eraan. We antwoorden vanuit een echt mens (met hulp van een SAIVY-assistent, uiteraard).</p>
              <button className="btn-ghost" onClick={() => { setSent(false); setStep(0); setData({ name: "", email: "", what: "" }); }}>
                Nog een sturen
              </button>
            </div>
          ) : (
            <>
              <div className="contact-progress">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`prog-dot ${i <= step ? "is-on" : ""}`} />
                ))}
                <span className="contact-step">Stap {step + 1} van 3</span>
              </div>

              {step === 0 && (
                <div className="contact-step-pane">
                  <label className="field">
                    <span>Je naam</span>
                    <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Jan Oprichter" />
                  </label>
                  <label className="field">
                    <span>E-mail</span>
                    <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="jan@jouwbedrijf.nl" type="email" />
                    {data.email && !isValidEmail(data.email) && (
                      <span style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>Vul een geldig e-mailadres in.</span>
                    )}
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="contact-step-pane">
                  <label className="field">
                    <span>Waar gaat de tijd van je team naartoe?</span>
                    <textarea
                      value={data.what}
                      onChange={(e) => setData({ ...data, what: e.target.value })}
                      placeholder="Wees concreet. Bijv. 'Mijn supportteam zit 4u/dag in de inbox met dezelfde vijf antwoorden. Ik wil dat ze die tijd terugkrijgen voor de moeilijkere tickets.'"
                      rows={5}
                    />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="contact-step-pane">
                  <div className="confirm-block">
                    <div className="confirm-row"><span>Naam</span><b>{data.name || "—"}</b></div>
                    <div className="confirm-row"><span>E-mail</span><b>{data.email || "—"}</b></div>
                    <div className="confirm-row confirm-multi"><span>Project</span><p>{data.what || "—"}</p></div>
                  </div>
                  <p className="confirm-hint">We reageren binnen 4 uur met twee gespreksopties en een plan op één pagina.</p>
                </div>
              )}

              <div className="contact-actions">
                {step > 0 && <button className="btn-ghost" onClick={prev}>Terug</button>}
                {step < 2 && (
                  <button className="btn-primary" onClick={next} disabled={step === 0 ? !data.name || !isValidEmail(data.email) : !data.what}>
                    Verder
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                {step === 2 && (
                  <button className="btn-primary" onClick={submit}>
                    Versturen & gesprek inplannen
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="logo logo-wordmark">
          <span className="logo-text-wm">Sai<span className="logo-dot">.</span>vy</span>
        </div>
        <div className="footer-meta">
          <span>© 2026 Saivy Labs</span>
          <span>·</span>
          <span>Gebouwd door mensen + assistenten</span>
          <span>·</span>
          <a href="#">Privacy</a>
          <a href="#">Voorwaarden</a>
        </div>
      </footer>
    </section>
  );
};

window.Testimonials = Testimonials;
window.Contact = Contact;
