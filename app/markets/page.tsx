import Link from "next/link";
import MarketQuotes from "../components/market-quotes";
import { Icon } from "../components/ui-icon";

export default function Markets() {
  return (
    <main id="main-content" className="workspace-page shell">
      <div className="intro">
        <div>
          <div className="eyebrow">Workspace / Markets</div>
          <h1>Market intelligence</h1>
          <p>A little context. A clearer thesis. Start your next forecast here.</p>
        </div>
        <Link className="primary" href="/prediction-lab">
          <Icon name="plus" size={17} /> New prediction
        </Link>
      </div>

      <MarketQuotes />

      <div className="grid-layout market-context">
        <section className="panel market-research" aria-labelledby="research-heading">
          <div className="panel-head">
            <div>
              <div className="eyebrow">Find your next question</div>
              <h2 id="research-heading">Research watchlist</h2>
            </div>
            <span className="pill"><Icon name="clock" size={13} /> 24-hour horizon</span>
          </div>
          {(["BTC", "ETH"] as const).map((asset) => (
            <div className="research-item" key={asset}>
              <div className="row">
                <span className={`asset-icon ${asset === "BTC" ? "bitcoin" : "ethereum"}`} aria-hidden="true">
                  {asset === "BTC" ? "₿" : "Ξ"}
                </span>
                <div>
                  <strong>{asset === "BTC" ? "Bitcoin" : "Ethereum"} <span className="token-label">{asset}</span></strong>
                  <p>Will {asset === "BTC" ? "Bitcoin" : "Ethereum"} rise in the next 24 hours?</p>
                </div>
              </div>
              <Link className="secondary" href={`/prediction-lab?asset=${asset}`}>
                Analyze {asset} <Icon name="arrow-up-right" size={16} />
              </Link>
            </div>
          ))}
          <p className="section-note">A starting point for your own research. These prompts are not AI recommendations.</p>
        </section>

        <aside className="panel methodology" aria-labelledby="better-forecast-heading">
          <span className="card-icon"><Icon name="target" size={22} /></span>
          <h2 id="better-forecast-heading">Make a considered call.</h2>
          <p>Turn market context into a hypothesis you can come back to.</p>
          <div className="feature-row">
            <span className="step-number">01</span>
            <div><h3>Look for evidence</h3><p>What supports your view—and what could change it?</p></div>
          </div>
          <div className="feature-row">
            <span className="step-number">02</span>
            <div><h3>Make uncertainty explicit</h3><p>Choose a direction and a confidence level that reflects your conviction.</p></div>
          </div>
          <div className="feature-row">
            <span className="step-number">03</span>
            <div><h3>Keep the reasoning</h3><p>Save your thesis so your future self has the full picture.</p></div>
          </div>
          <Link className="text-link" href="/history">Visit your research history <Icon name="arrow-right" size={16} /></Link>
        </aside>
      </div>
    </main>
  );
}
