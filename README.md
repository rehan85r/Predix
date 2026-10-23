# Predix

**Predict. Remember. Improve.**

Prediction intelligence MVP for the Tatum × Walrus Memory hackathon.

## Status

Next.js dashboard with browser-local history and a server-side Supabase prediction API. The API requires secrets in Vercel; it returns 503 until configured. **The UI does not yet use the backend.** Live AI, Tatum, Walrus, market-price verification and accuracy scoring are not implemented.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Backend setup

Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `PREDIX_WRITE_TOKEN` as encrypted **server-only** environment variables in Vercel. Never commit secrets or expose them via `NEXT_PUBLIC_`. The service-role key bypasses RLS and must stay server-side.

`GET /api/predictions` returns up to 100 records and `POST /api/predictions` accepts `{ "asset":"BTC", "direction":"UP", "probability":60, "reasoning":"..." }`. Both require `Authorization: Bearer <PREDIX_WRITE_TOKEN>`. This shared-token API is for private development only; implement user authentication and rate limiting before exposing to public clients. The frontend intentionally remains local until proper authentication is in place.

## Roadmap

1. User authentication and server-side persistence wired into the dashboard.
2. Trusted market prices, reference-price capture, outcome verification and calibration metrics.
3. Walrus Memory persistence and historical recall.
4. Tatum onchain context.
5. AI forecasts and source trust evaluation.

No financial advice.

## Outcome verification (implemented, not yet scheduled)

Predictions created through the protected API now capture a fresh CoinGecko reference price and a 24-hour target timestamp. The protected `GET /api/verify` endpoint uses `Authorization: Bearer <CRON_SECRET>` to evaluate pending predictions against a fresh price observed between the target time and 65 minutes afterward. It stores verified outcomes and Brier scores, and marks records invalid if that observation window has passed. It must be invoked at least hourly to cover the verification window; no cron schedule is installed yet. Existing browser-local forecasts cannot be verified this way, and old API records without a reference price remain ineligible. A production-grade system should capture an exact historical target-time quote, persist source timestamps, and add audit events and retries. CoinGecko rate limits may affect verification.
