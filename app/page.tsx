import Link from "next/link";
import { Icon } from "./components/ui-icon";

const workflow = [
  { number: "01", icon: "target" as const, title: "Make your call.", description: "Choose a market, take a position, and put a number on your conviction.", link: "Create a forecast", href: "/prediction-lab" },
  { number: "02", icon: "book" as const, title: "Keep the context.", description: "Capture the evidence behind your thinking. Your reasoning is part of the record.", link: "Explore memory", href: "/memory" },
  { number: "03", icon: "activity" as const, title: "Return with perspective.", description: "Revisit what you believed and why. Build a more deliberate research practice.", link: "View your history", href: "/history" },
];

function ForecastPreview() {
  return (
    <div className="preview-scene" role="img" aria-label="Illustrative example: a Bitcoin forecast with 65 percent bullish conviction, a reasoning note, and browser-local research storage. This is example data.">
      <div className="preview-orbit orbit-one" /><div className="preview-orbit orbit-two" />
      <div className="preview-card">
        <div className="preview-topline"><span className="preview-label"><span className="tiny-dot" /> YOUR RESEARCH WORKSPACE</span><span className="preview-dots" aria-hidden="true">•••</span></div>
        <div className="preview-asset"><div className="asset-icon bitcoin">₿</div><div><strong>Bitcoin</strong><span>BTC / USD</span></div><span className="preview-horizon"><Icon name="clock" size={12} />24h outlook</span></div>
        <div className="preview-question">Where conviction<br />meets a clear thesis.</div>
        <div className="preview-chart" aria-hidden="true">
          <div className="chart-labels"><span>MARKET CONTEXT</span><span>ILLUSTRATIVE</span></div>
          <svg viewBox="0 0 420 130" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7761e8" stopOpacity=".22" /><stop offset="100%" stopColor="#7761e8" stopOpacity="0" /></linearGradient></defs><path d="M0 100 16 106 32 87 49 94 65 69 81 77 98 58 114 71 131 66 147 82 164 55 180 62 196 40 212 52 229 37 245 48 262 23 278 32 295 20 311 39 328 25 344 32 361 12 377 21 395 5 420 13V130H0Z" fill="url(#chartFill)" /><path d="M0 100 16 106 32 87 49 94 65 69 81 77 98 58 114 71 131 66 147 82 164 55 180 62 196 40 212 52 229 37 245 48 262 23 278 32 295 20 311 39 328 25 344 32 361 12 377 21 395 5 420 13" fill="none" stroke="#7860df" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="preview-forecast"><div><span className="preview-caption">YOUR FORECAST</span><div className="preview-conviction">65<span>%</span><span className="preview-bullish"><Icon name="arrow-up-right" size={15} />Bullish</span></div></div><div className="preview-probability"><div><span>Confidence</span><strong>65 / 100</strong></div><div className="confidence-track"><span /></div><small>A hypothesis. Ready to revisit.</small></div></div>
        <div className="preview-reasoning"><span className="preview-caption"><Icon name="book" size={13} /> THE THINKING BEHIND IT</span><p>“Momentum is building. I’m watching whether support holds before revisiting my thesis.”</p></div>
        <div className="preview-bottom"><span><Icon name="shield" size={13} />Browser-local research</span><span>Example forecast</span></div>
      </div>
      <div className="saved-float"><span className="saved-float-icon"><Icon name="check" size={17} /></span><div><strong>A little more intentional.</strong><span>Your thesis, kept with your forecast.</span></div></div>
      <div className="preview-corner-label"><span /> A BETTER RECORD OF YOUR THINKING</div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="home-hero shell">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="tiny-dot" /> CLARITY. CONVICTION. CONTEXT.</div>
          <h1>A sharper way<br />to <span>think ahead.</span></h1>
          <p className="hero-lede">Turn a market opinion into a thoughtful forecast. Capture your conviction, keep the evidence, and build a record worth coming back to.</p>
          <div className="hero-actions"><Link href="/prediction-lab" className="primary hero-button">Start your first forecast<Icon name="arrow-up-right" size={18} /></Link><Link href="/markets" className="hero-link">Explore markets<Icon name="arrow-right" size={17} /></Link></div>
          <div className="hero-benefits"><span><Icon name="check" size={14} />No account needed</span><span><Icon name="check" size={14} />Your research, your browser</span></div>
          <div className="hero-principle"><span className="principle-line" /><p>Less noise.<br /><strong>More intentional decisions.</strong></p></div>
        </div>
        <ForecastPreview />
      </section>

      <section className="context-bar shell" aria-label="Built for considered research"><span className="context-label">DESIGNED FOR<br /><strong>THE LONGER VIEW</strong></span><div><Icon name="target" size={21} /><span>Clear hypotheses</span></div><div><Icon name="layers" size={21} /><span>Evidence with context</span></div><div><Icon name="book" size={21} /><span>A lasting research habit</span></div><span className="context-end">Think clearly.<br />Come back wiser.</span></section>

      <section className="home-workflow shell" aria-labelledby="workflow-heading">
        <div className="section-heading"><div><div className="eyebrow">FROM INSTINCT TO INTENTION</div><h2 id="workflow-heading">A better process.<br />One forecast at a time.</h2></div><p>You don’t need another signal.<br />You need a place to make sense of it.</p></div>
        <div className="workflow-grid">{workflow.map(step => <article className="workflow-card" key={step.number}><div className="workflow-card-top"><span className="workflow-icon"><Icon name={step.icon} size={22} /></span><span className="workflow-number">{step.number}</span></div><h3>{step.title}</h3><p>{step.description}</p><Link className="text-link" href={step.href}>{step.link}<Icon name="arrow-right" size={16} /></Link></article>)}</div>
      </section>

      <section className="research-section shell" aria-labelledby="research-heading"><div className="research-panel"><div className="research-copy"><div className="eyebrow">BUILT ON TRANSPARENCY</div><h2 id="research-heading">Conviction is useful.<br /><span>Context makes it better.</span></h2><p>Predix keeps what you believed alongside why you believed it. No manufactured certainty. Just a clearer trail of your own thinking.</p><Link className="text-link" href="/memory">See how research is preserved<Icon name="arrow-up-right" size={17} /></Link></div><div className="research-principles"><div><span className="principle-icon"><Icon name="shield" size={20} /></span><div><h3>Private by default</h3><p>Your manual forecasts stay in this browser. No sign-up or connected wallet required.</p></div></div><div><span className="principle-icon"><Icon name="target" size={20} /></span><div><h3>Your view, clearly recorded</h3><p>Direction, confidence, and reasoning. The essentials, in one place.</p></div></div><div><span className="principle-icon"><Icon name="clock" size={20} /></span><div><h3>An honest view of what’s next</h3><p>Automated verification and Walrus-backed memory are planned. Today, start with a thoughtful record.</p></div></div></div></div></section>

      <section className="home-end shell"><div className="end-copy"><div className="eyebrow">YOUR NEXT GOOD QUESTION STARTS HERE</div><h2>What do you believe<br />happens next?</h2><p>Give your next forecast a little more thought.</p></div><Link className="primary" href="/prediction-lab">Make your first prediction<Icon name="arrow-up-right" size={18} /></Link><Icon name="arrow-up-right" size={220} className="end-decoration" /></section>

      <footer className="site-footer"><div className="shell footer-inner"><Link href="/" className="footer-brand">predix<span>.</span></Link><span>A clearer view of your own thinking.</span><span className="footer-disclaimer">Research tools. Not financial advice.</span><a href="#main-content" className="back-top" aria-label="Back to top"><Icon name="arrow-up" size={16} /></a></div></footer>
    </main>
  );
}
