# Quantum Capital Demo Page: Mission Control

## Implementation Steps (Todo)

1. Save this plan to project directory as `DEMO_PLAN.md`
2. Create directory structure: `app/demo/` with components, hooks, data folders
3. Build shared components: `TerminalText.tsx`, `DataStream.tsx`, `PulseIndicator.tsx`
4. Build custom hooks: `useAutoPlay.ts`, `useTypewriter.ts`, `usePausableTimer.ts`
5. Create data files: `researchStreams.ts`, `codeSnippets.ts`, `marketData.ts`
6. Build Research Pipeline panel (HERO)
7. Build Code Genesis panel
8. Build Recursive Loop panel
9. Build Market Analysis panel
10. Create MissionControl orchestrator
11. Wire up 90-second animation sequence
12. Add pause/resume interaction
13. Add responsive layouts (mobile/tablet)
14. Add mission control styles to `globals.css`
15. Test locally and verify all animations
16. Deploy to Vercel

---

## Overview

Build an **exemplary demo page** at `/demo` that shows the AI research process itself - "the machine building itself." A cinematic, interactive Mission Control view that makes billionaire investors feel FOMO and peer recognition ("these people get it").

**Target**: Hectamillionaires and billionaires considering $50M Series A
**Core emotions**: FOMO + "these people get it"
**Hero moment**: Research Streams - 4 parallel hypotheses being tested simultaneously

## Design Direction

**Aesthetic**: Editorial noir (matching main site)

- Black (#000), lime (#D0FF14), white
- Instrument Serif (display), IBM Plex Mono (code/data)
- Zero border radius
- Bloomberg terminal meets sci-fi mission control

**Interaction Model**:

- Auto-plays for 60-120 seconds
- Hybrid: can pause and interact at key moments
- Clickable elements to explore deeper when paused

**Content**: Highly realistic fake data

- Real ticker symbols (NVDA, BTC, SPY, etc.)
- Realistic Python/PyTorch code snippets
- Plausible financial reasoning

---

## Page Structure

### Route: `/app/demo/page.tsx`

```
+------------------------------------------------------------------+
|  QUANTUM CAPITAL          MISSION CONTROL         [PAUSE] 01:23  |
+------------------------------------------------------------------+
|                              |                                    |
|     RESEARCH PIPELINE        |         CODE GENESIS               |
|     (HERO - 50% width)       |         (50% width)                |
|                              |                                    |
|  Stream 1: Mean Reversion    |   +-----------+  +-----------+    |
|  ├─ HYPOTHESIS ──────────►   |   | Reasoning |  | Code      |    |
|  ├─ BACKTEST ────────────►   |   | Panel     |  | Output    |    |
|  ├─ LIVE TEST ───────────►   |   +-----------+  +-----------+    |
|  └─ DEPLOY ──────────────►   |                                    |
|                              |                                    |
|  Stream 2: Sentiment Alpha   |                                    |
|  Stream 3: Vol Arbitrage     |                                    |
|  Stream 4: Cross-Asset       |                                    |
|                              |                                    |
+------------------------------------------------------------------+
|  RECURSIVE LOOP                    |  MARKET ANALYSIS             |
|  Cycle 847 | Learning...           |  NVDA +2.34% | BTC $67,432   |
|  Decision → Analysis → Update      |  REGIME: RISK-ON | σ=0.82    |
+------------------------------------------------------------------+
```

---

## Component Architecture

### Files to Create

```
app/demo/
├── page.tsx                      # Route entry point
├── components/
│   ├── MissionControl.tsx        # Main orchestrator
│   ├── panels/
│   │   ├── ResearchPipeline.tsx  # HERO: 4 parallel hypothesis streams
│   │   ├── CodeGenesisPanel.tsx  # AI reasoning + code generation
│   │   ├── RecursiveLoop.tsx     # Self-improvement visualization
│   │   └── MarketAnalysis.tsx    # Bottom ticker bar
│   └── shared/
│       ├── TerminalText.tsx      # Typewriter effect
│       ├── DataStream.tsx        # Animated numbers
│       └── PulseIndicator.tsx    # Status lights
├── hooks/
│   ├── useAutoPlay.ts            # 90-second sequence orchestration
│   ├── useTypewriter.ts          # Character-by-character text
│   └── usePausableTimer.ts       # Pause/resume
└── data/
    ├── researchStreams.ts        # Hypothesis content
    ├── codeSnippets.ts           # Python/PyTorch code
    └── marketData.ts             # Ticker data
```

---

## Panel Details

### 1. Research Pipeline (HERO - Primary Impact)

Four horizontal streams showing parallel research:

```typescript
interface ResearchStream {
  name: string; // "Mean Reversion (Crypto)"
  hypothesis: string; // "BTC/ETH ratio reverts to 20-day MA"
  backtest: {
    sharpe: number; // 2.1
    winRate: number; // 67%
    maxDrawdown: number; // -8.2%
  };
  liveTest: {
    pnl: string; // "+3.4%"
    duration: string; // "72h"
    trades: number; // 12
  };
  deployStatus: "STAGED" | "ACTIVE" | "PENDING" | "REJECTED";
}
```

**Content Examples**:

- Stream 1: Mean Reversion (Crypto) - STAGED
- Stream 2: Sentiment Alpha (Equities) - ACTIVE
- Stream 3: Volatility Arbitrage (Options) - PENDING REVIEW
- Stream 4: Cross-Asset Momentum - REJECTED (insufficient edge)

**Animation**: Streams appear staggered, progress bars animate left-to-right, status badges pulse on state change.

### 2. Code Genesis Panel

Split view showing AI reasoning transforming into code:

**Left (Reasoning)**:

```
[REASONING ENGINE v4.2.1]
Analyzing NVDA options chain...
Observation: IV at 45.2% > 30d HV (38.1%)
Hypothesis: Market pricing elevated uncertainty
Strategy: Iron condor to harvest vol premium
Confidence: 87.3%
Generating execution code...
```

**Right (Code Output)**:

```python
class VolatilityArbitrage(nn.Module):
    def __init__(self, lookback: int = 30):
        super().__init__()
        self.encoder = TransformerEncoder(
            d_model=256, nhead=8, num_layers=6
        )
        self.vol_head = nn.Sequential(
            nn.Linear(256, 128),
            nn.GELU(),
            nn.Linear(128, 1)
        )
```

**Animation**: Typewriter effect, syntax highlighting with lime for keywords.

### 3. Recursive Loop

Shows AI analyzing its own past decisions:

```
CYCLE 847
├─ Trade #12,847: BUY NVDA @ 892.34
├─ Confidence: 78% → Outcome: +2.1%
├─ ANALYSIS:
│   - Entry timing: OPTIMAL
│   - Position size: +12% ADJ NEEDED
│   - Exit: EARLY (-0.4% left on table)
├─ Model Update: encoder.layer[4]
├─ Weight delta: 0.0023
└─ New confidence: 81%

CUMULATIVE IMPROVEMENT: ████████████░░░░ 72.4%
```

### 4. Market Analysis (Bottom Bar)

Live ticker display:

```
NVDA +2.34% ▲ | BTC $67,432 | SPY 478.23 | VIX 14.2
REGIME: RISK-ON | ANOMALIES: 3 | UNCERTAINTY: LOW (σ=0.82)
```

---

## Animation Choreography (90 seconds)

### Act 1: Awakening (0-15s)

- Fade in header, grid lines draw
- Market ticker starts streaming
- First research stream appears

### Act 2: Intelligence at Work (15-50s)

- All 4 research streams animate in (staggered)
- Code genesis begins reasoning → code cycle
- Recursive loop shows analysis

### Act 3: Climax (50-70s)

- Market ticker highlights anomaly
- All panels briefly sync on same ticker (NVDA)
- Code genesis shows strategy generation
- "EXECUTING TRADE" flash

### Act 4: Resolution (70-90s)

- Trade result: +2.1%
- Recursive loop shows learning from trade
- Cycle counter increments
- "CYCLE COMPLETE" → loop restarts

### Interaction Points (Pause Moments)

- 15s: After first research stream (explore hypothesis)
- 35s: All streams visible (explore pipeline)
- 55s: Anomaly detected (explore market data)
- 70s: Trade executed (explore result)

---

## Styling

```css
/* Panel base */
.mission-panel {
  background: #0a0a0a;
  border: 1px solid #262626;
  border-radius: 0;
}

/* Active panel indicator */
.mission-panel.active {
  border-left: 3px solid #d0ff14;
}

/* Code syntax */
.code-keyword {
  color: #d0ff14;
}
.code-string {
  color: rgba(255, 255, 255, 0.8);
}
.code-comment {
  color: rgba(255, 255, 255, 0.3);
}

/* Status badges */
.status-active {
  color: #d0ff14;
}
.status-staged {
  color: #ffffff;
}
.status-rejected {
  color: rgba(255, 100, 100, 0.6);
}

/* Animations */
@keyframes pulse-glow {
  50% {
    box-shadow: 0 0 20px 2px rgba(208, 255, 20, 0.3);
  }
}
```

---

## Responsive Behavior

- **Desktop (1440px+)**: Full 4-panel Mission Control
- **Tablet (768-1439px)**: 2x2 grid
- **Mobile (<768px)**: Single column, swipe between panels

---

## Files to Modify

- `app/globals.css` - Add mission control specific styles

---

## Verification

1. `npm run dev` - Start dev server
2. Navigate to `http://localhost:3000/demo`
3. Verify:
   - Auto-play sequence runs smoothly (60-90s)
   - Research Pipeline is visually dominant (hero)
   - All 4 panels render correctly
   - Pause/resume works (click or SPACE)
   - Interactive states work when paused
   - Mobile responsive layout
   - Numbers animate smoothly
   - Code typewriter effect works
   - Matches editorial noir aesthetic

4. Deploy to Vercel: `npx vercel --prod`
5. Test at https://quantumonepager.vercel.app/demo
