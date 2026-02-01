# Quantum Capital: Full Platform Build

**Type:** Architecture
**Priority:** P0
**Estimated Scope:** Full platform implementation

---

## Context

Quantum Capital is building the intelligence layer for global finance. The current state is a Next.js marketing site with live market data integration and basic authentication. The vision is a fully operational AI-powered trading research platform with:

- Live market intelligence from multiple data sources
- Autonomous strategy generation and backtesting
- Real-time portfolio management and risk controls
- Investor/LP portal with reporting
- Self-improving AI models with explainability

The platform must feel like "Bloomberg terminal meets NYT Magazine" - editorial noir aesthetic with lime (#D0FF14) accents on pure black. Every component must maintain the existing design DNA while scaling to production-grade infrastructure.

---

## Requirements

### MUST - Foundation (Phase 1)

1. MUST implement complete authentication system
   - OAuth providers (GitHub, Google) with NextAuth.js v5
   - Credentials-based login with secure password handling
   - Role-based access control: admin, researcher, investor, viewer
   - Protected routes via middleware
   - Session management with JWT (30-day expiry)

2. MUST implement database layer
   - PostgreSQL with TimescaleDB for time-series data
   - Schema for: users, teams, api_keys, audit_logs
   - Schema for: price_ticks, candles (1m, 5m, 1h, 1d), order_book_snapshots
   - Schema for: hypotheses, backtests, strategies, live_tests
   - Schema for: positions, orders, fills, portfolio_snapshots
   - Schema for: model_versions, training_runs, predictions
   - Schema for: fund_entities, capital_accounts, documents

3. MUST implement real-time infrastructure
   - WebSocket connections for live market data
   - SWR/React Query for client-side data fetching
   - Server-side caching with appropriate TTLs
   - Supabase Realtime for database subscriptions

### MUST - Market Intelligence (Phase 2)

4. MUST implement data ingestion pipeline
   - Polygon.io integration for equities, options, forex
   - CoinGecko/Binance for crypto prices
   - FRED API for macro indicators (VIX, rates)
   - News aggregation from multiple sources
   - Sentiment analysis pipeline (Twitter, Reddit, news)

5. MUST implement live market dashboard at `/markets`
   - Real-time price tickers with flash animations
   - Cross-asset correlation heatmaps
   - Regime detection indicator (RISK_ON, RISK_OFF, TRANSITIONAL)
   - Anomaly alerts (IV spikes, volume surges, correlation breaks)
   - Custom watchlists with user preferences

6. MUST implement intelligence hub at `/intelligence`
   - Real-time news feed with AI summarization
   - Sentiment scores per asset
   - Earnings calendar with transcript analysis
   - Fed/FOMC statement parser
   - Custom alert rule builder

### MUST - Research Factory (Phase 3)

7. MUST implement hypothesis engine at `/research`
   - AI-generated trading hypotheses from market observations
   - Human-submitted hypothesis intake form
   - Hypothesis scoring (novelty, testability, expected edge)
   - Automatic backtest queuing

8. MUST implement strategy builder at `/research/strategies/[id]`
   - Visual strategy builder (drag-and-drop signals → logic → execution)
   - Code editor with Python/TypeScript DSL
   - Parameter optimization interface
   - Multi-asset support (equities, crypto, options, futures)
   - Constraint specification (max drawdown, position limits, turnover)

9. MUST implement backtesting engine at `/research/backtests/[id]`
   - High-fidelity historical simulation
   - Slippage & market impact modeling
   - Transaction cost analysis
   - Walk-forward validation
   - Monte Carlo stress testing
   - Regime-conditional performance breakdown
   - Output: Sharpe, Sortino, max drawdown, win rate, profit factor

10. MUST implement live testing at `/research/live-tests/[id]`
    - Paper trading with real market data
    - Position tracking & P&L calculation
    - Comparison to backtest expectations
    - Automatic promotion/rejection rules
    - Shadow mode alongside production

### MUST - Execution Layer (Phase 4)

11. MUST implement trading dashboard at `/trading`
    - Active strategy overview (upgraded Mission Control)
    - Real-time P&L, positions, and orders
    - Kill switches per strategy
    - Allocation management
    - Performance attribution

12. MUST implement order management at `/trading/orders`
    - Smart order routing
    - Order types: market, limit, TWAP, VWAP, iceberg
    - Multi-venue execution simulation
    - Real-time fill tracking
    - Slippage analysis

13. MUST implement risk management at `/risk`
    - Real-time risk dashboard
    - Position limits enforcement
    - Drawdown circuit breakers (5% reduce, 8% flatten)
    - Correlation-based exposure limits
    - Margin utilization tracking
    - Scenario analysis ("what if VIX +50%")

### MUST - AI/ML Layer (Phase 5)

14. MUST implement model management at `/models`
    - Model version registry
    - Training run tracking
    - A/B testing of model versions
    - Canary deployments with rollback
    - Drift detection and alerts

15. MUST implement explainability at `/models/explain`
    - Decision trace for every trade
    - Format: sources → signals → forecast → action → constraints → execution
    - Feature attribution (what drove the decision)
    - Counterfactual analysis
    - Audit log for compliance

16. MUST implement continuous learning pipeline
    - Automated retraining on new data
    - Shadow deployment for comparison
    - Gradual rollout with monitoring
    - Hard risk limits on new models

### MUST - Investor Portal (Phase 6)

17. MUST implement investor dashboard at `/investor`
    - NAV tracking with daily updates
    - Performance vs benchmarks
    - Quarterly letters and reports
    - Document vault (K-1s, statements)
    - Capital account summary

18. MUST implement due diligence room at `/investor/diligence`
    - Strategy overview (sanitized)
    - Risk management framework docs
    - Operational due diligence materials
    - Team bios and track record
    - FAQ and Q&A scheduling

19. MUST implement subscription management at `/investor/subscription`
    - Digital subscription docs
    - Accreditation verification workflow
    - Redemption request handling
    - Tax document portal

### MUST - Advanced Features (Phase 7)

20. MUST implement research lab at `/lab`
    - Jupyter-style notebooks in browser
    - Multi-agent market simulators
    - Adversarial training environments
    - Shared research workspaces

21. MUST implement AI assistant at `/assistant`
    - Natural language queries ("What's driving NVDA today?")
    - Strategy generation from prompts
    - Performance analysis requests
    - Alert configuration via chat

### SHOULD - Enhancements

22. SHOULD implement WebSocket-based real-time updates for all dashboards
23. SHOULD implement dark/light theme toggle (default dark)
24. SHOULD implement keyboard shortcuts for power users
25. SHOULD implement mobile-responsive layouts for all pages
26. SHOULD implement export functionality (CSV, PDF) for all reports
27. SHOULD implement notification system (email, in-app, Slack)
28. SHOULD implement API key management for programmatic access
29. SHOULD implement team collaboration features
30. SHOULD implement audit logging for all sensitive actions

### MAY - Future Considerations

31. MAY implement options chain visualization
32. MAY implement social trading / strategy marketplace
33. MAY implement automated report generation
34. MAY implement integration with external brokers
35. MAY implement mobile native apps

---

## Technical Constraints

### Stack Requirements

```yaml
Frontend:
  - Next.js 16 (App Router)
  - Tailwind CSS 4.x
  - Framer Motion for animations
  - D3.js + Recharts for charts
  - Zustand for client state
  - SWR/React Query for data fetching

Backend:
  - Next.js API Routes + tRPC
  - PostgreSQL + TimescaleDB
  - Redis for caching
  - BullMQ for job queues

Auth:
  - NextAuth.js v5
  - JWT sessions

ML/AI:
  - Modal.com for serverless GPU
  - OpenAI/Anthropic for LLM features
  - Pinecone for vector search
```

### Design System Requirements

```yaml
Colors:
  - Primary: #D0FF14 (lime)
  - Background: #000000 (black)
  - Foreground: #FFFFFF (white)
  - Card: #0A0A0A
  - Border: #262626

Typography:
  - Display: Instrument Serif
  - Body: Instrument Sans
  - Data: IBM Plex Mono

Aesthetic:
  - No border radius (sharp edges)
  - Editorial noir feel
  - Bloomberg terminal meets NYT Magazine
```

### Performance Requirements

```yaml
API Latency: p99 < 100ms
Real-time Lag: < 500ms
System Uptime: > 99.9%
Build Time: < 60 seconds
Lighthouse Score: > 90
```

---

## Acceptance Criteria

### Phase 1: Foundation

- [ ] User can sign up with email/password
- [ ] User can sign in with GitHub OAuth
- [ ] User can sign in with Google OAuth
- [ ] Protected routes redirect to login
- [ ] Role-based navigation shows correct menu items
- [ ] Database migrations run successfully
- [ ] All tables created with proper indexes
- [ ] Real-time subscriptions working

### Phase 2: Market Intelligence

- [ ] `/markets` displays live price tickers
- [ ] Prices update every 5 seconds
- [ ] Correlation heatmap renders correctly
- [ ] Regime indicator shows current market state
- [ ] Anomaly alerts appear when detected
- [ ] `/intelligence` shows aggregated news
- [ ] Sentiment scores display per asset
- [ ] Custom alerts can be created and triggered

### Phase 3: Research Factory

- [ ] Hypotheses can be created and scored
- [ ] Strategy builder saves configurations
- [ ] Backtests run and return metrics
- [ ] Backtest results show Sharpe, drawdown, win rate
- [ ] Live tests track P&L in real-time
- [ ] Strategies can be promoted or rejected

### Phase 4: Execution

- [ ] `/trading` shows all active strategies
- [ ] Kill switch stops strategy immediately
- [ ] Orders display with status updates
- [ ] Risk limits are enforced
- [ ] Circuit breakers trigger at thresholds
- [ ] Scenario analysis shows portfolio impact

### Phase 5: AI/ML

- [ ] Model versions are tracked
- [ ] Training runs log metrics
- [ ] Drift detection alerts fire
- [ ] Decision traces are generated
- [ ] Explainability UI renders traces

### Phase 6: Investor Portal

- [ ] Investors see NAV history
- [ ] Performance charts render
- [ ] Documents are accessible
- [ ] Subscription flow works end-to-end
- [ ] Due diligence room accessible to approved users

### Phase 7: Advanced

- [ ] Notebooks execute code
- [ ] Simulations run with multiple agents
- [ ] AI assistant responds to queries
- [ ] Natural language generates strategies

### Cross-Cutting

- [ ] All pages match design system
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests passing
- [ ] Build completes successfully
- [ ] Fitness score ≥ 95%

---

## File Structure

```
quantum_onepager/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── verify/page.tsx
│   ├── (protected)/
│   │   ├── dashboard/page.tsx
│   │   ├── markets/page.tsx
│   │   ├── intelligence/page.tsx
│   │   ├── research/
│   │   │   ├── page.tsx
│   │   │   ├── strategies/[id]/page.tsx
│   │   │   ├── backtests/[id]/page.tsx
│   │   │   └── live-tests/[id]/page.tsx
│   │   ├── trading/
│   │   │   ├── page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   └── positions/page.tsx
│   │   ├── risk/page.tsx
│   │   ├── models/
│   │   │   ├── page.tsx
│   │   │   ├── training/page.tsx
│   │   │   └── explain/page.tsx
│   │   ├── lab/
│   │   │   ├── notebooks/page.tsx
│   │   │   └── simulation/page.tsx
│   │   ├── investor/
│   │   │   ├── page.tsx
│   │   │   ├── diligence/page.tsx
│   │   │   └── subscription/page.tsx
│   │   ├── assistant/page.tsx
│   │   ├── settings/page.tsx
│   │   └── admin/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── market/route.ts
│   │   ├── trpc/[trpc]/route.ts
│   │   └── webhooks/route.ts
│   ├── lib/
│   │   ├── market-data.ts
│   │   ├── db.ts
│   │   ├── trpc.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useMarketData.ts
│   │   ├── useAuth.ts
│   │   └── useRealtime.ts
│   └── components/
│       ├── ui/
│       ├── charts/
│       ├── panels/
│       └── layouts/
├── prisma/
│   └── schema.prisma
├── specs/
│   └── 2026-02-01-arch-quantum-platform.md
├── auth.ts
├── middleware.ts
└── package.json
```

---

## Completion Promise

<promise>Quantum Capital platform fully operational. All 7 phases implemented. Authentication, market intelligence, research factory, execution layer, AI/ML pipeline, investor portal, and advanced features complete. Fitness score ≥ 95%. All acceptance criteria met. Ready for production deployment.</promise>
