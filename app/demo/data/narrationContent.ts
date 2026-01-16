export type NarrationTrigger =
  | "stream_1"
  | "all_streams"
  | "code_generating"
  | "analysis"
  | "anomaly"
  | "resolution";

export interface NarrationPoint {
  id: string;
  trigger: NarrationTrigger;
  title: string;
  quote: string;
  body: string[];
  duration: number; // milliseconds
}

export const narrationPoints: NarrationPoint[] = [
  {
    id: "parallel-hypothesis",
    trigger: "stream_1",
    title: "PARALLEL HYPOTHESIS TESTING",
    quote: "Many savants, but no unified mind.",
    body: [
      "Quants, retail traders, and AI researchers from OpenAI, DeepMind, and Two Sigma\u2014all hunting alpha in isolation.",
      "We built the system that coordinates them: one unified intelligence testing hundreds of hypotheses in parallel.",
    ],
    duration: 4000,
  },
  {
    id: "research-factory",
    trigger: "all_streams",
    title: "THE RESEARCH FACTORY",
    quote: "Markets are a $100T+ intelligence problem.",
    body: [
      "While others hire more analysts, we built a system that generates, tests, and deploys strategies faster than any human team could review them.",
    ],
    duration: 5000,
  },
  {
    id: "ai-writes-strategies",
    trigger: "code_generating",
    title: "AI THAT WRITES ITS OWN STRATEGIES",
    quote: "The next OpenAI will be built in finance.",
    body: [
      "This isn't pre-written code. The AI reasons through market observations and generates novel trading logic\u2014then tests it before any human sees it.",
    ],
    duration: 5000,
  },
  {
    id: "self-improvement",
    trigger: "analysis",
    title: "CONTINUOUS SELF-IMPROVEMENT",
    quote: "AlphaGo learned by playing itself millions of times.",
    body: [
      "Our AI analyzes every trade it makes, identifies what worked and what didn't, then updates its own models.",
      "Cycle 847 is smarter than Cycle 1.",
    ],
    duration: 4000,
  },
  {
    id: "real-time-adaptation",
    trigger: "anomaly",
    title: "REAL-TIME ADAPTATION",
    quote: "Markets shift. Regimes change. Correlations break.",
    body: [
      "When our system detects an anomaly, it doesn't panic\u2014it adapts.",
      "This is what DeepMind tried to build for finance. We finished what they started.",
    ],
    duration: 5000,
  },
  {
    id: "flywheel-effect",
    trigger: "resolution",
    title: "THE FLYWHEEL EFFECT",
    quote: "Every trade teaches. Every cycle compounds.",
    body: [
      "This is what $190B in AI finance capital is chasing: systems that get better autonomously.",
      "We're not building a fund. We're building the mind.",
    ],
    duration: 4000,
  },
];

export const getNarrationByTrigger = (
  trigger: NarrationTrigger,
): NarrationPoint | undefined =>
  narrationPoints.find((n) => n.trigger === trigger);
