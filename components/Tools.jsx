// Interactive tools grid with working demos
const Tools = () => {
  const [active, setActive] = React.useState("clickcheck");

  const tools = [
    { id: "clickcheck", name: "ClickCheck", tag: "Live demo", desc: "First-impression analyzer for landing pages." },
    { id: "competitor", name: "RivalRadar", tag: "Live demo", desc: "Watches competitor sites & flags strategic shifts." },
    { id: "reviews", name: "ReviewLoop", tag: "Live demo", desc: "Auto-replies to Google reviews in your voice." },
    { id: "agent", name: "Inbox Assist", tag: "Live demo", desc: "Pre-drafts replies & triages so your team only handles what needs them." },
  ];

  return (
    <section className="tools" id="tools">
      <div className="section-head">
        <div className="kicker">
          <span className="kicker-bar" />
          Tools we've built
        </div>
        <h2 className="section-title">
          Try them. Right here. <span className="grad-text">No signup.</span>
        </h2>
        <p className="section-sub">
          Real working demos of software we ship to clients. The same kind of tooling
          we'd build to take pressure off your team.
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
  const [audience, setAudience] = React.useState("indie SaaS founders");
  const [state, setState] = React.useState("idle"); // idle | running | done
  const [step, setStep] = React.useState(0);

  const steps = [
    "Fetching page…",
    "Reading like a first-time visitor…",
    "Scoring clarity, trust, and CTA strength…",
    "Generating recommendations…",
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
          <span>Website URL</span>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="yoursite.com" />
        </label>
        <label className="field">
          <span>Built for</span>
          <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="audience" />
        </label>
        <button className="btn-primary demo-run" onClick={run} disabled={state === "running"}>
          {state === "running" ? "Analyzing…" : state === "done" ? "Re-analyze" : "Analyze"}
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
            <p>Reads your homepage like a stranger. Tells you what they understood, what confused them, and what to change.</p>
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
              <ScoreRing label="Clarity" value={72} color="#4DA8FF" />
              <ScoreRing label="Trust" value={88} color="#22D3A0" />
              <ScoreRing label="CTA" value={54} color="#F59E0B" />
            </div>
            <div className="cc-findings">
              <h4>What a stranger said</h4>
              <ul>
                <li><b>Got it:</b> "Payments infrastructure for the internet." Clear in 2 seconds.</li>
                <li><b>Confused by:</b> Three competing CTAs above the fold — "Start now", "Contact sales", "Sign in".</li>
                <li><b>Needed but missing:</b> Pricing teaser. Indie founders bounce when they can't sniff the price.</li>
              </ul>
              <div className="cc-fix">
                <div className="cc-fix-label">Highest-leverage fix</div>
                <div className="cc-fix-text">Demote "Contact sales" to text-link. Add "From $0/mo for first $1M" under hero CTA. Expected lift: <b>+18% signup-intent.</b></div>
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
  const competitors = [
    {
      name: "competitor-a.com",
      lastChange: "2h ago",
      severity: "high",
      shift: "Repositioned hero from 'AI assistant' → 'Autonomous AI workforce'",
      detail: "They dropped the consumer angle. New pricing tier appeared at $499/mo aimed at agencies. Three new logos in social proof: Notion, Vercel, Linear.",
    },
    {
      name: "rival-b.io",
      lastChange: "1d ago",
      severity: "med",
      shift: "Added a free tier; removed credit-card requirement",
      detail: "Likely play for top-of-funnel volume. Their blog cadence doubled — 3 posts/week vs 1.",
    },
    {
      name: "challenger-c.ai",
      lastChange: "4d ago",
      severity: "low",
      shift: "Refreshed homepage copy; structure unchanged",
      detail: "Cosmetic. New testimonials but no positioning shift. Watch for follow-up.",
    },
  ];

  return (
    <div className="demo-shell">
      <div className="rr-head">
        <div className="rr-title">
          <span className="pulse-dot" /> Watching <b>3 competitors</b> · last sweep <b>14 min ago</b>
        </div>
        <div className="rr-actions">
          <button className="btn-ghost-sm">+ Add competitor</button>
          <button className="btn-ghost-sm">Export brief</button>
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
                <span className={`rr-sev rr-sev-${c.severity}`}>{c.severity}</span>
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
              {competitors[selected].severity} priority
            </span>
          </div>
          <div className="rr-shift-big">{competitors[selected].shift}</div>
          <p className="rr-detail-text">{competitors[selected].detail}</p>
          <div className="rr-diff">
            <div className="rr-diff-row">
              <span className="rr-diff-minus">− "AI assistant for your team"</span>
            </div>
            <div className="rr-diff-row">
              <span className="rr-diff-plus">+ "Your autonomous AI workforce"</span>
            </div>
          </div>
          <div className="rr-rec">
            <div className="rr-rec-label">Recommended response</div>
            <div className="rr-rec-text">Sharpen your "human-in-the-loop" angle. Their move toward autonomy creates room for your trust positioning.</div>
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

  const review = stars >= 4
    ? "Honestly the best pizza in the neighborhood. Service was quick and the staff was so friendly. Will be back!"
    : stars === 3
    ? "Food was decent but we waited 40 minutes for a table even with a reservation. The staff did their best."
    : "Reservation at 7. Seated at 7:45. Pizza was cold when it arrived. Disappointing for a Friday date night.";

  const replies = {
    warm: {
      4: "Thanks so much, Marcus — this made our week. Tell Tony you got the dough on the house next visit. 🍕",
      3: "Hi Sarah, that 40-minute wait isn't the experience we want for anyone — especially not our reservation guests. I've already flagged it with our floor lead. Drinks on us next time?",
      2: "Hi Jen, this one's on us. A 45-minute delay AND cold pizza on a Friday date night is exactly what we work to prevent. I'd love to make it right — would you DM me your number? — Marco, Owner",
    },
    professional: {
      4: "Thank you for the kind words. We'll share this with the team — and we look forward to welcoming you back.",
      3: "Sarah, thank you for the feedback. A 40-minute delay on a confirmed reservation is unacceptable. We're reviewing our seating process this week. Please reach out directly so we can make this right.",
      2: "Jen, we sincerely apologize. The wait and the cold food both fall short of our standards. Please contact us at hello@example.com — we'd like to invite you back as our guests.",
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
  }, [tone, stars]);

  return (
    <div className="demo-shell">
      <div className="rl-controls">
        <div className="rl-control">
          <span className="rl-label">Tone</span>
          <div className="seg">
            {["warm", "professional"].map((o) => (
              <button key={o} className={tone === o ? "is-active" : ""} onClick={() => setTone(o)}>
                {o}
              </button>
            ))}
          </div>
        </div>
        <div className="rl-control">
          <span className="rl-label">Review rating</span>
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
                <span> · 2 days ago · Google</span>
              </div>
            </div>
          </div>
          <p className="rl-text">{review}</p>
        </div>

        <div className="rl-arrow">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16h20m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>AI reply</span>
        </div>

        <div className="rl-card rl-reply">
          <div className="rl-head">
            <div className="rl-avatar rl-avatar-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="rl-name">Owner reply · drafted by SAIVY</div>
              <div className="rl-meta">awaiting your approval</div>
            </div>
          </div>
          <p className="rl-text">{reply}{typing && <span className="cursor">▋</span>}</p>
          {!typing && (
            <div className="rl-actions">
              <button className="btn-primary-sm">Approve & post</button>
              <button className="btn-ghost-sm">Regenerate</button>
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
  const emails = [
    {
      from: "Priya Shah",
      subject: "Quick Q about pricing for 50 seats",
      preview: "Hey — we're a 50-person team looking at your annual plan…",
      tag: "lead",
      tagColor: "#22D3A0",
      action: "Drafted reply + booked discovery call",
      detail: "Identified as warm lead (50 seats, evaluating annual). Drafted personalized reply citing volume tier. Pulled calendar; offered 3 slots Tue/Wed. Tagged Priya in HubSpot.",
      drafted: "Hi Priya — yes, 50 seats lands you on our Scale tier ($14/seat/mo annual). I'd love to walk through the rollout — grabbed a few times that work my end:\n\n• Tue 10:30 PT\n• Tue 2:00 PT\n• Wed 9:00 PT\n\nNone work? Here's my full calendar: cal.com/saivy",
    },
    {
      from: "Stripe",
      subject: "Payout of $4,820.00 sent to your account",
      preview: "Your payout has been initiated and will arrive…",
      tag: "auto-filed",
      tagColor: "#4DA8FF",
      action: "Filed → Finance/Payouts. Logged to QuickBooks.",
      detail: "Routine payout notification. No human action needed. Reconciled against Stripe ledger. Filed in Finance/Payouts/2026-04.",
    },
    {
      from: "Marcus (your client)",
      subject: "URGENT — site down??",
      preview: "Hey can you check, the homepage is throwing 500s…",
      tag: "escalated",
      tagColor: "#EF4444",
      action: "Paged you · pulled error logs · drafted status reply",
      detail: "Detected urgency keywords + known client. Pulled last 30min of Vercel logs (3 attached). Drafted holding reply. Notified you via SMS at 12:51 PT.",
    },
    {
      from: "newsletter@indiehackers.com",
      subject: "This week's top posts",
      preview: "The 5 most-upvoted posts on Indie Hackers…",
      tag: "archived",
      tagColor: "#71717A",
      action: "Auto-archived (newsletter rule)",
      detail: "Matches newsletter pattern. Archived per your rule. Will surface in weekly digest if engagement signals appear.",
    },
  ];

  const e = emails[selected];

  return (
    <div className="demo-shell">
      <div className="ia-head">
        <div>
          <div className="ia-title">Inbox · today</div>
          <div className="ia-sub">12 pre-handled · 1 flagged for Sara · ~6 hrs returned this week</div>
        </div>
        <div className="ia-stats">
          <div><b>97%</b> pre-drafted</div>
          <div><b>+6 hrs</b> back to the team</div>
          <div><b>$1.4k</b> /mo saved</div>
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
            <div className="ia-from-big">From <b>{e.from}</b></div>
          </div>

          <div className="ia-action">
            <div className="ia-action-label">What the assistant did</div>
            <div className="ia-action-text">{e.action}</div>
          </div>

          <p className="ia-detail-text">{e.detail}</p>

          {e.drafted && (
            <div className="ia-draft">
              <div className="ia-draft-label">Drafted reply — ready for your team to review</div>
              <pre className="ia-draft-body">{e.drafted}</pre>
              <div className="ia-draft-actions">
                <button className="btn-primary-sm">Send</button>
                <button className="btn-ghost-sm">Edit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.Tools = Tools;
