# Quantum Capital - Ralph Loop Implementation

## Current Spec

Implement the Quantum Capital platform as defined in `specs/2026-02-01-arch-quantum-platform.md`

## Implementation Order

Work through the spec phases in order. For each acceptance criterion:

1. **Write failing test first** (TDD)
2. **Implement minimum code to pass**
3. **Refactor if needed**
4. **Commit with conventional format**

### Phase 1: Foundation (Priority)

Current progress:

- [x] OAuth providers (GitHub, Google) with NextAuth.js v5
- [x] Credentials-based login
- [x] Role-based navigation
- [ ] Protected routes via middleware (needs verification)
- [ ] Session management with JWT (30-day expiry)

Next items:

- [ ] Database layer (PostgreSQL + TimescaleDB schema)
- [ ] Real-time infrastructure (WebSocket, Supabase)

### Phase 2: Market Intelligence

- [ ] Live market dashboard at `/markets`
- [ ] Intelligence hub at `/intelligence`
- [ ] Data ingestion pipeline improvements

## Design Requirements

- Background: #000000 (black)
- Foreground: #FFFFFF (white)
- Accent: #D0FF14 (lime)
- Card: #0A0A0A
- Border: #262626
- No border radius (sharp edges)
- Fonts: Instrument Serif, Instrument Sans, IBM Plex Mono

## Instructions

1. Read `specs/2026-02-01-arch-quantum-platform.md` for full requirements
2. Check acceptance criteria checkboxes
3. Write tests BEFORE implementation
4. Use conventional commits: `feat(scope): description`
5. Maintain existing design system
6. When ALL Phase 1 acceptance criteria are met, output:

<stuck>Phase 1 complete. Moving to Phase 2.</stuck>

7. When ALL spec acceptance criteria are met, output:

<promise>All acceptance criteria met. Tests passing. Fitness ≥ 95%.</promise>

## If Stuck (3+ iterations same issue)

1. Re-read the specific requirement in the spec
2. Check test output carefully
3. Simplify the approach - break into smaller steps
4. Check if the issue is environmental (missing deps, config)
5. If truly blocked, output:

<stuck>Blocked on: [specific issue]. Need: [what would help].</stuck>

## Critical Rules

- NEVER output false `<promise>` - only when truly complete
- NEVER skip writing tests first
- NEVER exceed spec scope (no gold plating)
- NEVER force push
- ALWAYS run `npm test` before committing
- ALWAYS maintain the editorial noir aesthetic
