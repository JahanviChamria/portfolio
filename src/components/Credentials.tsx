import { CERTIFICATIONS, HONORS } from "@/lib/content";

export default function Credentials() {
  return (
    <section className="credentials" id="credentials" data-reveal>
      <div className="section-head mono">
        <span>Honors & certifications</span>
      </div>

      <div className="cred-grid">
        <div className="cred-col">
          <h3 className="cred-label mono">Honors & awards</h3>
          <ul className="honor-list">
            {HONORS.map((h) => (
              <li key={h.title}>
                <span className="honor-title">{h.title}</span>
                <span className="honor-detail mono">{h.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cred-col">
          <h3 className="cred-label mono">Certifications</h3>
          <ul className="cert-list mono">
            {CERTIFICATIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
