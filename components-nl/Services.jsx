// Wat we bouwen — diensten (NL)
const Services = () => {
  const items = [
    {
      n: "01",
      title: "AI-collega's",
      desc: "Slimme assistenten die de saaie 80% afhandelen — antwoorden voorschrijven, tickets sorteren, meetings samenvatten — zodat je team alleen nog raakt wat hen écht nodig heeft.",
      tags: ["Claude", "GPT-5", "Custom RAG"],
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="8" y="12" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="24" r="2" fill="currentColor" />
          <circle cx="30" cy="24" r="2" fill="currentColor" />
          <path d="M18 32h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="6" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      n: "02",
      title: "Automatiseringen",
      desc: "Workflows op de achtergrond die data verplaatsen, acties triggeren en de saaie stukken stilletjes afhandelen. Je team krijgt alleen een melding als het écht nodig is.",
      tags: ["n8n", "Make", "Zapier", "Custom"],
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <circle cx="10" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="38" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="34" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 17l9 14M35 17l-9 14M14 14h20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      n: "03",
      title: "Interne tools",
      desc: "Dashboards en beheertools, op maat van hoe jouw team echt werkt — minder tabs, minder copy-paste, minder 'waar vind ik dit ook alweer?'-Slacks.",
      tags: ["Next.js", "Supabase", "Vercel"],
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 18h36" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="22" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M24 24h14M24 30h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      n: "04",
      title: "Integraties & API's",
      desc: "Verbind tools die niet met elkaar praten — zodat niemand in je team nog de menselijke lijm hoeft te zijn tussen vijf SaaS-tabbladen.",
      tags: ["REST", "Webhooks", "OAuth"],
      icon: (
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M16 24l-6 6a4 4 0 105.66 5.66l6-6M32 24l6-6a4 4 0 10-5.66-5.66l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 30l12-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="services" id="services">
      <div className="section-head">
        <div className="kicker">
          <span className="kicker-bar" />
          Wat we bouwen
        </div>
        <h2 className="section-title">
          Software die <span className="grad-text">de druk van je team haalt</span>
          {" "}— en een paar nullen van je rekening.
        </h2>
        <p className="section-sub">
          Vier smaken. Allemaal op maat. Allemaal live in weken, niet kwartalen.
        </p>
      </div>

      <div className="services-grid">
        {items.map((it) => (
          <div key={it.n} className="service-card">
            <div className="service-num">{it.n}</div>
            <div className="service-icon">{it.icon}</div>
            <h3 className="service-title">{it.title}</h3>
            <p className="service-desc">{it.desc}</p>
            <div className="service-tags">
              {it.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="service-arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 10h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.Services = Services;
