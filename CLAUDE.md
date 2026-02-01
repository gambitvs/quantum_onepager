# Quantum Capital - AI Development Context

## Project Overview

Quantum Capital is an AI-powered trading research platform. Think "Bloomberg terminal meets NYT Magazine" - editorial noir aesthetic with institutional-grade functionality.

## Current State

- **Phase 1.1 Complete**: Authentication with NextAuth v5 (OAuth + credentials)
- **Live Market Data**: Real integrations with Polygon.io, CoinGecko, FRED
- **Design System**: Black (#000), White (#FFF), Lime (#D0FF14), no border radius

## Active Spec

See `specs/2026-02-01-arch-quantum-platform.md` for the full platform build spec.

## Tech Stack

```yaml
Frontend: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
Backend: Next.js API Routes, NextAuth v5
Data: Polygon.io, CoinGecko, FRED APIs
Planned: PostgreSQL + TimescaleDB, Redis, BullMQ
```

## Key Files

- `auth.ts` - NextAuth configuration
- `middleware.ts` - Route protection with RBAC
- `app/lib/market-data.ts` - Live market data service
- `app/hooks/useMarketData.ts` - SWR data hooks

## Design Constraints

1. **No border radius** - Sharp edges only
2. **Fonts**: Instrument Serif (display), Instrument Sans (body), IBM Plex Mono (data)
3. **Colors**: Pure black bg, white text, lime accents
4. **Animations**: Subtle, performant (Framer Motion)

## TDD Requirements

All new features must:

1. Have tests written FIRST
2. Follow acceptance criteria from spec
3. Use conventional commits

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm test         # Run tests
npm run lint     # Lint check
```

## Guardrails

- Never force push to main
- Never skip tests
- Never exceed spec scope
- Always use conventional commits
