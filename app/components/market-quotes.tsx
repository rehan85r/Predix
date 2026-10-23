"use client";

import { useEffect, useState } from "react";
import { Icon } from "./ui-icon";

type Quote = { usd: number; change24h: number; updatedAt: string };
type Quotes = Record<"BTC" | "ETH", Quote>;

function isQuotes(value: unknown): value is Quotes {
  if (!value || typeof value !== "object") return false;
  const prices = value as Record<string, Partial<Quote> | undefined>;
  return (["BTC", "ETH"] as const).every((symbol) => {
    const quote = prices[symbol];
    return (
      quote &&
      typeof quote.usd === "number" &&
      Number.isFinite(quote.usd) &&
      quote.usd > 0 &&
      typeof quote.change24h === "number" &&
      Number.isFinite(quote.change24h) &&
      typeof quote.updatedAt === "string" &&
      Number.isFinite(Date.parse(quote.updatedAt))
    );
  });
}

export default function MarketQuotes() {
  const [quotes, setQuotes] = useState<Quotes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function refresh() {
      setLoading(true);
      try {
        const response = await fetch("/api/market", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Market data unavailable");
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || !("prices" in payload) || !isQuotes(payload.prices)) {
          throw new Error("Invalid market data");
        }
        if (active) {
          setQuotes(payload.prices);
          setError(false);
        }
      } catch {
        if (active) {
          setQuotes(null);
          setError(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void refresh();
    const timer = setInterval(refresh, 60_000);
    return () => {
      active = false;
      controller.abort();
      clearInterval(timer);
    };
  }, [refreshKey]);

  return (
    <section className="market-section" aria-labelledby="market-prices-heading">
      <div className="panel-head">
        <div>
          <h2 id="market-prices-heading">Market overview</h2>
          <p className="muted">Spot prices from CoinGecko · Refreshes every minute</p>
        </div>
        <button
          className="secondary"
          type="button"
          onClick={() => setRefreshKey((key) => key + 1)}
          disabled={loading}
          aria-label={error ? "Retry loading market prices" : "Refresh market prices"}
        >
          <Icon name="refresh" size={15} />
          {loading ? "Refreshing" : error ? "Try again" : "Refresh"}
        </button>
      </div>

      <div className="market-strip" aria-busy={loading}>
        {(["BTC", "ETH"] as const).map((symbol) => {
          const quote = quotes?.[symbol];
          const name = symbol === "BTC" ? "Bitcoin" : "Ethereum";
          return (
            <article className="market-tile" key={symbol} aria-label={`${name} market quote`}>
              <div className="market-tile-heading row">
                <div className="row">
                  <span className={`asset-icon ${symbol === "BTC" ? "bitcoin" : "ethereum"}`} aria-hidden="true">
                    {symbol === "BTC" ? "₿" : "Ξ"}
                  </span>
                  <div>
                    <h3 className="asset-name">{name}</h3>
                    <span className="token-label">{symbol} / USD</span>
                  </div>
                </div>
                <span className="pill">Spot market</span>
              </div>
              <div className="quote-value-row row">
                <strong className="price">
                  {quote ? quote.usd.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "—"}
                </strong>
                <div className={quote ? `change ${quote.change24h >= 0 ? "up" : "down"}` : "muted"}>
                  {quote ? (
                    <>
                      <Icon name={quote.change24h >= 0 ? "arrow-up-right" : "arrow-down"} size={15} />
                      {quote.change24h >= 0 ? "+" : ""}{quote.change24h.toFixed(2)}%
                    </>
                  ) : loading ? "Loading quote" : "Unavailable"}
                </div>
              </div>
              <div className="market-tile-footer row">
                <span className="quote-status muted">
                  <span className={`quote-status-dot${quote ? " is-live" : ""}`} aria-hidden="true" />
                  {quote ? (
                    <time dateTime={quote.updatedAt}>Updated {new Date(quote.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
                  ) : "Awaiting market data"}
                </span>
                <span className="muted">24h change</span>
              </div>
            </article>
          );
        })}
      </div>

      <p className={error ? "callout" : "section-note"} role="status">
        {error ? (
          <><Icon name="info" size={17} /> Market data is temporarily unavailable. You can still research and record a forecast.</>
        ) : loading && !quotes ? (
          "Fetching the latest market context…"
        ) : (
          "Market quotes provide context, not investment advice or a forecast of future performance."
        )}
      </p>
    </section>
  );
}
