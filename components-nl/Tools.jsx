// Interactieve tools met werkende demo's (NL)
const Tools = () => {
  const [active, setActive] = React.useState("clickcheck");

  const tools = [
    { id: "clickcheck", name: "ClickCheck", tag: "Live demo", desc: "Eerste-indruk-analyse voor je homepage." },
    { id: "competitor", name: "RivalRadar", tag: "Live demo", desc: "Volgt concurrenten en signaleert strategische verschuivingen." },
    { id: "reviews", name: "ReviewLoop", tag: "Live demo", desc: "Beantwoordt Google reviews automatisch in jouw stem." },
    { id: "agent", name: "Inbox Assist", tag: "Live demo", desc: "Schrijft antwoorden voor en sorteert, zodat je team alleen het belangrijke raakt." },
  ];

  return (
    <section className="tools" id="tools">
      <div className="section-head">
        <div className="kicker">
          <span className="kicker-bar" />
          Tools die we gebouwd hebben
        </div>
        <h2 className="section-title">
          Probeer ze. Hier. <span className="grad-text">Geen aanmelding nodig.</span>
        </h2>
        <p className="section-sub">
          Echte werkende demo's van software die we voor klanten leveren. Hetzelfde
          soort tooling waarmee we de druk van jouw team halen.
        </p>
      </div>

      <div className="tools-tabs">
        {tools.map((t) => (
          <button
            key={t.id}
            className={`tool-tab ${active === t.id ? "is-active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            <span className="tool-tab-name">{t.name}</span>
            <span className="tool-tab-desc">{t.desc}</span>
          </button>
        ))}
      </div>

      <div className="tool-stage">
        {active === "clickcheck" && <ClickCheck />}
        {active === "competitor" && <RivalRadar />}
        {active === "reviews" && <ReviewLoop />}
        {active === "agent" && <InboxAgent />}
      </div>
    </section>
  );
};

// --- ClickCheck demo ---
const ClickCheck = () => {
  const [url, setUrl] = React.useState("stripe.com");
  const [audience, setAudience] = React.useState("indie SaaS-oprichters");
  const [state, setState] = React.useState("idle");
  const [step, setStep] = React.useState(0);

  const steps = [
    "Pagina ophalen…",
    "Lezen als een nieuwe bezoeker…",
    "Duidelijkheid, vertrouwen en CTA scoren…",
    "Aanbevelingen genereren…",
  ];

  const run = () => {
    setState("running");
    setStep(0);
    let i = 0;
    const tick = () => {
      i++;
      if (i < steps.length) {
        setStep(i);
        setTimeout(tick, 700);
      } else {
        setTimeout(() => setState("done"), 600);
      }
    };
    setTimeout(tick, 700);
  };

  return (
    <div className="demo-shell">
      <div className="demo-controls">
        <label className="field">
          <span>Website-URL</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="jouwsite.nl" />
        </label>
        <label className="field">
          <span>Doelgroep</span>
          <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="doelgroep" />
        </label>
        <button className="btn-primary demo-run" onClick={run} disabled={state === "running"}>
          {state === "running" ? "Bezig…" : state === "done" ? "Opnieuw analyseren" : "Analyseer"}
        </button>
      </div>

      <div className="demo-output">
        {state === "idle" && (
          <div className="demo-empty">
            <div className="demo-empty-glyph">
              <svg viewBox="0 0 64 64" fill="none">
                <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="2" />
                <path d="M42 42l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p>Leest je homepage als een vreemde. Vertelt wat ze begrepen, wat hen verwarde en wat je moet aanpassen.</p>
          </div>
        )}

        {state === "running" && (
          <div className="demo-running">
            {steps.map((s, i) => (
              <div key={i} className={`run-step ${i < step ? "is-done" : i === step ? "is-active" : ""}`}>
                <span className="run-dot" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}

        {state === "done" && (
          <div className="cc-result">
            <div className="cc-scores">
              <ScoreRing label="Duidelijkheid" value={72} color="#4DA8FF" />
              <ScoreRing label="Vertrouwen" value={88} color="#22D3A0" />
              <ScoreRing label="CTA" value={54} color="#F59E0B" />
            </div>
            <div className="cc-findings">
              <h4>Wat een vreemde zei</h4>
              <ul>
                <li><b>Begrepen:</b> "Betalingsinfrastructuur voor het internet." Duidelijk in 2 seconden.</li>
                <li><b>Verwarrend:</b> Drie concurrerende CTA's bovenaan — "Start nu", "Contact sales", "Inloggen".</li>
                <li><b>Wat ontbrak:</b> Een hint van de prijs. Indie founders haken af als ze geen prijs ruiken.</li>
              </ul>
              <div className="cc-fix">
                <div className="cc-fix-label">Belangrijkste aanpassing</div>
                <div className="cc-fix-text">Maak van "Contact sales" een textlink. Voeg "Vanaf €0/mnd voor de eerste €1M" toe onder de hero-CTA. Verwachte stijging: <b>+18% aanmeld-intentie.</b></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ScoreRing = ({ label, value, color }) => {
  const r = 32;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="ring">
      <svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={c} strokeDashoffset={off}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 800ms cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <div className="ring-num">{value}</div>
      <div className="ring-lbl">{label}</div>
    </div>
  );
};

// --- RivalRadar demo ---
const RivalRadar = () => {
  const [selected, setSelected] = React.useState(0);
  const [flash, setFlash] = React.useState("");
  const sevLabel = { high: "hoog", med: "med", low: "laag" };
  const competitors = [
    {
      name: "concurrent-a.nl",
      lastChange: "2u geleden",
      severity: "high",
      shift: "Hero veranderd van 'AI-assistent' → 'Autonome AI-werkkracht'",
      detail: "Ze hebben de consumentenfocus laten vallen. Nieuwe prijscategorie van €499/mnd voor agencies. Drie nieuwe logo's bij social proof: Notion, Vercel, Linear.",
    },
    {
      name: "rival-b.io",
      lastChange: "1d geleden",
      severity: "med",
      shift: "Gratis tier toegevoegd; geen creditcard meer nodig",
      detail: "Waarschijnlijk een zet voor meer top-of-funnel volume. Hun blog-cadans verdubbelde — 3 posts/week i.p.v. 1.",
    },
    {
      name: "challenger-c.ai",
      lastChange: "4d geleden",
      severity: "low",
      shift: "Homepage-tekst opgefrist; structuur ongewijzigd",
      detail: "Cosmetisch. Nieuwe testimonials maar geen positiewijziging. Hou in de gaten.",
    },
  ];

  const addCompetitor = () => {
    setFlash("add");
    setTimeout(() => setFlash(""), 1500);
  };

  const exportBrief = () => {
    const text = competitors.map(c => `${c.name} (${sevLabel[c.severity]}): ${c.shift}`).join('\n');
    try { navigator.clipboard.writeText(text); } catch (e) { /* silent */ }
    setFlash("export");
    setTimeout(() => setFlash(""), 1500);
  };

  return (
    <div className="demo-shell">
      <div className="rr-head">
        <div className="rr-title">
          <span className="pulse-dot" /> Volgt <b>3 concurrenten</b> · laatste check <b>14 min geleden</b>
        </div>
        <div className="rr-actions">
          <button className="btn-ghost-sm" onClick={addCompetitor}>
            {flash === "add" ? "✓ Toegevoegd" : "+ Voeg concurrent toe"}
          </button>
          <button className="btn-ghost-sm" onClick={exportBrief}>
            {flash === "export" ? "✓ Gekopieerd" : "Exporteer briefing"}
          </button>
        </div>
      </div>

      <div className="rr-body">
        <div className="rr-list">
          {competitors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`rr-row ${selected === i ? "is-active" : ""}`}
            >
              <div className="rr-row-top">
                <span className="rr-name">{c.name}</span>
                <span className={`rr-sev rr-sev-${c.severity}`}>{sevLabel[c.severity]}</span>
              </div>
              <div className="rr-shift">{c.shift}</div>
              <div className="rr-time">{c.lastChange}</div>
            </button>
          ))}
        </div>

        <div className="rr-detail">
          <div className="rr-detail-head">
            <h4>{competitors[selected].name}</h4>
            <span className={`rr-sev rr-sev-${competitors[selected].severity}`}>
              {sevLabel[competitors[selected].severity]} prioriteit
            </span>
          </div>
          <div className="rr-shift-big">{competitors[selected].shift}</div>
          <p className="rr-detail-text">{competitors[selected].detail}</p>
          <div className="rr-diff">
            <div className="rr-diff-row">
              <span className="rr-diff-minus">− "AI-assistent voor je team"</span>
            </div>
            <div className="rr-diff-row">
              <span className="rr-diff-plus">+ "Jouw autonome AI-werkkracht"</span>
            </div>
          </div>
          <div className="rr-rec">
            <div className="rr-rec-label">Aanbevolen reactie</div>
            <div className="rr-rec-text">Versterk je "human-in-the-loop"-positionering. Hun beweging naar autonomie creëert ruimte voor jouw vertrouwens-angle.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ReviewLoop demo ---
const ReviewLoop = () => {
  const [tone, setTone] = React.useState("warm");
  const [stars, setStars] = React.useState(2);
  const [typing, setTyping] = React.useState(false);
  const [reply, setReply] = React.useState("");
  const [posted, setPosted] = React.useState(false);
  const [seed, setSeed] = React.useState(0);

  const review = stars >= 4
    ? "Eerlijk, de beste pizza in de buurt. Snelle bediening en het personeel was zo vriendelijk. We komen zeker terug!"
    : stars === 3
    ? "Eten was prima maar we wachtten 40 minuten op een tafel ondanks reservering. Het personeel deed z'n best."
    : "Reservering om 19:00. Pas om 19:45 aan tafel. Pizza was koud toen die kwam. Teleurstellend voor een vrijdag-date.";

  const replies = {
    warm: {
      4: "Heel erg bedankt, Marcus — dit maakt onze week. Zeg tegen Tony dat het deeg de volgende keer van het huis is. 🍕",
      3: "Hoi Sarah, die 40 minuten wachten is niet wat we willen — zeker niet bij een reservering. Ik heb het al doorgegeven aan onze floor lead. Drankje van het huis volgende keer?",
      2: "Hoi Jen, dit is op ons. 45 minuten wachten én een koude pizza op een vrijdag-date is precies wat we willen voorkomen. Stuur je me even je nummer? Dan maken we het goed. — Marco, eigenaar",
    },
    professional: {
      4: "Bedankt voor de mooie woorden. We delen dit met het team — en kijken uit naar je volgende bezoek.",
      3: "Sarah, bedankt voor je feedback. 40 minuten wachten op een bevestigde reservering is onacceptabel. We bekijken ons reserveringsproces deze week. Neem gerust direct contact op zodat we het goed kunnen maken.",
      2: "Jen, onze excuses. Zowel de wachttijd als het koude eten vallen ver onder onze standaard. Mail ons op hello@example.com — we nodigen je graag opnieuw uit als onze gast.",
    },
  };

  React.useEffect(() => {
    setTyping(true);
    setReply("");
    const target = replies[tone][stars] || "";
    let i = 0;
    const id = setInterval(() => {
      i++;
      setReply(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTyping(false);
      }
    }, 14);
    return () => clearInterval(id);
  }, [tone, stars, seed]);

  const toneLabels = { warm: "warm", professional: "zakelijk" };

  return (
    <div className="demo-shell">
      <div className="rl-controls">
        <div className="rl-control">
          <span className="rl-label">Toon</span>
          <div className="seg">
            {["warm", "professional"].map((o) => (
              <button key={o} className={tone === o ? "is-active" : ""} onClick={() => setTone(o)}>
                {toneLabels[o]}
              </button>
            ))}
          </div>
        </div>
        <div className="rl-control">
          <span className="rl-label">Beoordeling</span>
          <div className="seg">
            {[2, 3, 4].map((s) => (
              <button key={s} className={stars === s ? "is-active" : ""} onClick={() => setStars(s)}>
                {"★".repeat(s) + "☆".repeat(5 - s)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rl-pair">
        <div className="rl-card rl-review">
          <div className="rl-head">
            <div className="rl-avatar">{stars >= 4 ? "M" : stars === 3 ? "S" : "J"}</div>
            <div>
              <div className="rl-name">{stars >= 4 ? "Marcus T." : stars === 3 ? "Sarah K." : "Jen R."}</div>
              <div className="rl-meta">
                <span className="rl-stars">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
                <span> · 2 dagen geleden · Google</span>
              </div>
            </div>
          </div>
          <p className="rl-text">{review}</p>
        </div>

        <div className="rl-arrow">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16h20m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>AI-antwoord</span>
        </div>

        <div className="rl-card rl-reply">
          <div className="rl-head">
            <div className="rl-avatar rl-avatar-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="rl-name">Reactie eigenaar · opgesteld door SAIVY</div>
              <div className="rl-meta">wacht op je goedkeuring</div>
            </div>
          </div>
          <p className="rl-text">{reply}{typing && <span className="cursor">▋</span>}</p>
          {!typing && (
            <div className="rl-actions">
              <button className="btn-primary-sm" onClick={() => { setPosted(true); setTimeout(() => setPosted(false), 2000); }}>
                {posted ? "✓ Geplaatst" : "Goedkeuren & plaatsen"}
              </button>
              <button className="btn-ghost-sm" onClick={() => { setPosted(false); setSeed((s) => s + 1); }}>
                Opnieuw
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Inbox Assist demo ---
const InboxAgent = () => {
  const [selected, setSelected] = React.useState(0);
  const [draftSent, setDraftSent] = React.useState(false);
  const [editingDraft, setEditingDraft] = React.useState(false);
  const [editedText, setEditedText] = React.useState("");

  React.useEffect(() => {
    setDraftSent(false);
    setEditingDraft(false);
    setEditedText("");
  }, [selected]);

  const emails = [
    {
      from: "Priya Shah",
      subject: "Korte vraag over prijzen voor 50 plekken",
      preview: "Hoi — we zijn een team van 50, kijken naar jullie jaarpakket…",
      tag: "lead",
      tagColor: "#22D3A0",
      action: "Antwoord opgesteld + intakegesprek ingepland",
      detail: "Herkend als warme lead (50 plekken, jaarabonnement). Persoonlijk antwoord opgesteld met volume-tier. Agenda gecheckt; 3 slots di/wo aangeboden. Priya gemarkeerd in HubSpot.",
      drafted: "Hoi Priya — klopt, 50 plekken valt onder onze Scale-tier (€13/plek/mnd jaarlijks). Ik loop graag de uitrol met je door — een paar momenten die mij schikken:\n\n• Di 10:30\n• Di 14:00\n• Wo 09:00\n\nGeen daarvan? Hier mijn volledige agenda: cal.com/saivy",
    },
    {
      from: "Stripe",
      subject: "Uitbetaling van €4.820,00 verzonden",
      preview: "Je uitbetaling is gestart en komt binnenkort aan…",
      tag: "auto-gefiled",
      tagColor: "#4DA8FF",
      action: "Gefiled → Financiën/Uitbetalingen. Geboekt in MoneyMonk.",
      detail: "Standaard uitbetalingsmelding. Geen actie nodig. Afgestemd met Stripe-grootboek. Opgeslagen in Financiën/Uitbetalingen/2026-04.",
    },
    {
      from: "Marcus (jouw klant)",
      subject: "URGENT — site offline??",
      preview: "Hé kun je kijken, de homepage geeft 500-fouten…",
      tag: "geëscaleerd",
      tagColor: "#EF4444",
      action: "Jou gepiept · logs opgehaald · holdingsantwoord opgesteld",
      detail: "Urgentie-keywords + bekende klant herkend. Laatste 30min Vercel-logs opgehaald (3 bijlagen). Holding-antwoord opgesteld. Jij om 12:51 via SMS geïnformeerd.",
    },
    {
      from: "newsletter@indiehackers.com",
      subject: "Top posts van deze week",
      preview: "De 5 meest geüpvote posts op Indie Hackers…",
      tag: "gearchiveerd",
      tagColor: "#71717A",
      action: "Auto-gearchiveerd (nieuwsbrief-regel)",
      detail: "Voldoet aan nieuwsbrief-patroon. Gearchiveerd volgens jouw regel. Komt terug in weekoverzicht bij engagement.",
    },
  ];

  const e = emails[selected];

  return (
    <div className="demo-shell">
      <div className="ia-head">
        <div>
          <div className="ia-title">Inbox · vandaag</div>
          <div className="ia-sub">12 voor-afgehandeld · 1 gemarkeerd voor Sara · ~6 uur teruggegeven deze week</div>
        </div>
        <div className="ia-stats">
          <div><b>97%</b> voorgeschreven</div>
          <div><b>+6 uur</b> terug naar het team</div>
          <div><b>€1,3k</b> /mnd bespaard</div>
        </div>
      </div>

      <div className="ia-body">
        <div className="ia-list">
          {emails.map((em, i) => (
            <button key={i} className={`ia-row ${selected === i ? "is-active" : ""}`} onClick={() => setSelected(i)}>
              <div className="ia-row-top">
                <span className="ia-from">{em.from}</span>
                <span className="ia-tag" style={{ background: `${em.tagColor}22`, color: em.tagColor }}>{em.tag}</span>
              </div>
              <div className="ia-subj">{em.subject}</div>
              <div className="ia-preview">{em.preview}</div>
            </button>
          ))}
        </div>

        <div className="ia-detail">
          <div className="ia-detail-head">
            <span className="ia-tag" style={{ background: `${e.tagColor}22`, color: e.tagColor }}>{e.tag}</span>
            <h4>{e.subject}</h4>
            <div className="ia-from-big">Van <b>{e.from}</b></div>
          </div>

          <div className="ia-action">
            <div className="ia-action-label">Wat de assistent deed</div>
            <div className="ia-action-text">{e.action}</div>
          </div>

          <p className="ia-detail-text">{e.detail}</p>

          {e.drafted && (
            <div className="ia-draft">
              <div className="ia-draft-label">
                {draftSent ? "Antwoord verzonden" : "Opgesteld antwoord — klaar voor review door je team"}
              </div>
              {editingDraft
                ? <textarea
                    className="ia-draft-body"
                    value={editedText}
                    onChange={(ev) => setEditedText(ev.target.value)}
                    rows={6}
                    style={{ width: "100%", resize: "vertical", fontFamily: "inherit", fontSize: "inherit", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", padding: "10px", color: "inherit", boxSizing: "border-box" }}
                  />
                : <pre className="ia-draft-body">{draftSent ? "✓ Verzonden." : (editedText || e.drafted)}</pre>
              }
              {!draftSent && (
                <div className="ia-draft-actions">
                  <button className="btn-primary-sm" onClick={() => { setDraftSent(true); setEditingDraft(false); }}>
                    {editingDraft ? "Bewerkt antwoord versturen" : "Versturen"}
                  </button>
                  {editingDraft
                    ? <button className="btn-ghost-sm" onClick={() => setEditingDraft(false)}>Annuleren</button>
                    : <button className="btn-ghost-sm" onClick={() => { setEditingDraft(true); setEditedText(e.drafted); }}>Bewerken</button>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.Tools = Tools;
