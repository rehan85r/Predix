import Link from "next/link";
import { Icon } from "../components/ui-icon";

export default function Memory() {
  return (
    <main id="main-content" className="workspace-page shell">
      <div className="intro">
        <div>
          <div className="eyebrow">Workspace / Memory</div>
          <h1>Your prediction memory</h1>
          <p>The thinking behind a forecast is worth remembering.</p>
        </div>
        <Link className="secondary" href="/history">View local history <Icon name="arrow-up-right" size={16} /></Link>
      </div>

      <section className="panel memory-hero" aria-labelledby="memory-today-heading">
        <div className="memory-visual" aria-hidden="true">
          <div className="memory-visual-core"><Icon name="layers" size={44} /></div>
          <span className="memory-node memory-node-one"><Icon name="target" size={18} /></span>
          <span className="memory-node memory-node-two"><Icon name="book" size={18} /></span>
          <span className="memory-node memory-node-three"><Icon name="clock" size={18} /></span>
        </div>
        <div>
          <span className="status"><Icon name="check" size={14} /> Available today</span>
          <h2 id="memory-today-heading">A record of what you believed.{" "}<br />And why you believed it.</h2>
          <p>Every forecast you record keeps its direction, confidence, reasoning, and timestamp together. Revisit the original thesis whenever you need a fresh perspective.</p>
          <div className="button-row">
            <Link className="primary" href="/history">Explore your history <Icon name="arrow-right" size={16} /></Link>
            <Link className="text-link" href="/prediction-lab">Record a prediction <Icon name="plus" size={15} /></Link>
          </div>
        </div>
      </section>

      <div className="memory-grid">
        <section className="panel" aria-labelledby="local-memory-heading">
          <div className="panel-head">
            <h2 id="local-memory-heading">Your research, in this browser</h2>
            <span className="pill">Browser-local</span>
          </div>
          <p>A useful starting point for a more deliberate forecasting habit.</p>
          <div className="integration-list">
            <div className="integration-item">
              <span className="card-icon"><Icon name="book" size={19} /></span>
              <div className="integration-copy"><h3>The full thesis</h3><p>Asset, direction, conviction, and evidence saved as one record.</p></div>
              <Icon name="check" size={17} className="up" />
            </div>
            <div className="integration-item">
              <span className="card-icon"><Icon name="clock" size={19} /></span>
              <div className="integration-copy"><h3>A moment in time</h3><p>See when you recorded each forecast and revisit your reasoning.</p></div>
              <Icon name="check" size={17} className="up" />
            </div>
            <div className="integration-item">
              <span className="card-icon"><Icon name="shield" size={19} /></span>
              <div className="integration-copy"><h3>Local by default</h3><p>Your browser stores these records; they are not synced across devices.</p></div>
              <Icon name="check" size={17} className="up" />
            </div>
          </div>
          <p className="callout"><Icon name="info" size={17} /> Clearing this site’s browser data also clears your local history.</p>
        </section>

        <section className="panel memory-roadmap" aria-labelledby="durable-memory-heading">
          <div className="panel-head">
            <h2 id="durable-memory-heading">A longer memory, ahead</h2>
            <span className="pill"><Icon name="clock" size={13} /> Planned</span>
          </div>
          <p>Walrus-backed memory is on the roadmap. These capabilities are not connected yet.</p>
          <div className="feature-row">
            <span className="step-number">01</span>
            <div><h3>Durable research records</h3><p>Preserve a thesis with a verifiable reference beyond one browser.</p></div>
          </div>
          <div className="feature-row">
            <span className="step-number">02</span>
            <div><h3>Recall relevant context</h3><p>Bring past hypotheses and verified outcomes into future research.</p></div>
          </div>
          <div className="feature-row">
            <span className="step-number">03</span>
            <div><h3>Learn from the record</h3><p>Compare forecasts after enough independently verified outcomes exist.</p></div>
          </div>
          <p className="section-note">Browser-local forecasts are unresolved. Automated verification and accuracy analysis are not available for these records.</p>
        </section>
      </div>
    </main>
  );
}
