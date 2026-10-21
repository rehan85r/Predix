# Predix

**Predict. Remember. Improve.**

Prediction intelligence MVP for the Tatum × Walrus Memory hackathon.

## Current status

This is a frontend-only prototype with a responsive dashboard, BTC/ETH forecast entry and browser-local prediction history. **It does not yet connect to AI, Tatum, Walrus Memory, live market prices, or automatic outcome verification.** Forecasts are manually entered and remain unresolved. No financial advice.

## Local setup

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Roadmap

1. Implement server-side prediction API and persistence.
2. Add trusted market price feeds and time-bounded outcome verification.
3. Integrate Walrus Memory for durable historical records.
4. Integrate Tatum for meaningful onchain data.
5. Add AI analysis, evaluation and source reliability scoring.

Never commit real API keys. Use environment variables on the server.
