export interface CodeBlock {
  id: string;
  reasoning: string[];
  code: string;
  language: string;
}

export const codeSnippets: CodeBlock[] = [
  {
    id: "volatility-arbitrage",
    reasoning: [
      "[REASONING ENGINE v4.2.1]",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Analyzing NVDA options chain...",
      "",
      "Observation: IV at 45.2% exceeds",
      "30-day historical vol (38.1%)",
      "",
      "Hypothesis: Market pricing elevated",
      "uncertainty ahead of earnings",
      "",
      "Strategy: Construct iron condor to",
      "harvest vol premium with defined risk",
      "",
      "Confidence: 87.3%",
      "",
      "Generating execution code...",
    ],
    code: `class VolSurfaceTransformer(nn.Module):
    """
    Transformer-based implied volatility
    surface forecaster with cross-asset
    attention and regime conditioning.
    """
    def __init__(self, cfg: VolConfig):
        super().__init__()
        self.strike_encoder = RotaryEmbedding(
            dim=cfg.d_model // cfg.n_heads
        )
        self.tenor_encoder = SinusoidalPE(
            max_len=365, d_model=cfg.d_model
        )
        self.cross_asset_attn = FlashAttention(
            d_model=cfg.d_model,
            n_heads=cfg.n_heads,
            dropout=0.1,
            causal=False
        )
        self.regime_gate = nn.Sequential(
            nn.Linear(cfg.n_regimes, cfg.d_model),
            nn.Sigmoid()
        )
        self.surface_decoder = nn.ModuleList([
            TransformerBlock(cfg) for _ in range(6)
        ])

    def forward(
        self,
        options_grid: Tensor,      # (B, K, T, 5)
        underlying: Tensor,        # (B, L, D)
        regime_probs: Tensor,      # (B, R)
        market_context: Tensor     # (B, N, D)
    ) -> VolSurfacePrediction:
        # Encode strike/tenor structure
        K, T = options_grid.shape[1:3]
        pos_enc = self.strike_encoder(K)
        tenor_enc = self.tenor_encoder(T)

        # Apply regime-conditional gating
        gate = self.regime_gate(regime_probs)
        h = options_grid * gate.unsqueeze(-1)

        # Cross-asset attention w/ flash
        h = self.cross_asset_attn(
            q=h.flatten(1, 2),
            k=market_context,
            v=market_context
        )

        # Decode volatility surface
        for block in self.surface_decoder:
            h = block(h, tenor_enc)

        iv_surface = h.view(-1, K, T)
        rv_forecast = self.rv_head(underlying)

        # Compute tradeable edge
        edge = iv_surface - rv_forecast
        position = self.kelly_sizing(
            edge=edge,
            confidence=0.873,
            max_risk_pct=0.02
        )

        return VolSurfacePrediction(
            iv_surface=iv_surface,
            rv_forecast=rv_forecast,
            edge=edge,
            position=position
        )`,
    language: "python",
  },
  {
    id: "sentiment-alpha",
    reasoning: [
      "[REASONING ENGINE v4.2.1]",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Scanning social sentiment...",
      "",
      "Signal detected: AAPL sentiment",
      "divergence +2.3σ vs price action",
      "",
      "Historical pattern match: 78.4%",
      "correlation with 4h forward returns",
      "",
      "Risk check: Liquidity OK, no earnings",
      "",
      "Confidence: 71.2%",
    ],
    code: `class AlphaExtractor(nn.Module):
    """
    Multi-source alpha signal extraction
    using contrastive learning + causal
    discovery for lead-lag relationships.
    """
    def __init__(self, cfg: AlphaConfig):
        super().__init__()
        self.text_encoder = LlamaEncoder(
            model="llama-3-8b-instruct",
            lora_rank=16,
            quantization="int4"
        )
        self.price_encoder = TemporalFusionNet(
            input_dim=cfg.price_features,
            hidden_dim=256,
            num_heads=8
        )
        self.causal_discovery = PCMCIPlus(
            cond_ind_test="ParCorr",
            max_lag=24
        )
        self.contrastive_head = InfoNCE(
            temperature=0.07,
            negative_mode="debiased"
        )

    @torch.compile(mode="reduce-overhead")
    def forward(
        self,
        text_batch: List[str],
        price_tensor: Tensor,
        timestamps: Tensor
    ) -> AlphaSignal:
        # Extract semantic embeddings
        with torch.autocast("cuda", torch.bfloat16):
            text_emb = self.text_encoder(
                text_batch,
                pooling="last_hidden"
            )

        # Encode price dynamics
        price_emb = self.price_encoder(
            price_tensor,
            time_features=timestamps
        )

        # Discover causal lead-lag
        causal_graph = self.causal_discovery(
            torch.cat([text_emb, price_emb], -1)
        )

        # Contrastive alignment
        alpha = self.contrastive_head(
            anchor=text_emb,
            positive=price_emb[causal_graph.lags],
            negative=price_emb[~causal_graph.lags]
        )

        return AlphaSignal(
            raw_alpha=alpha,
            zscore=self.normalize(alpha),
            causal_strength=causal_graph.strength,
            decay_halflife=self.estimate_decay(alpha)
        )`,
    language: "python",
  },
  {
    id: "regime-detection",
    reasoning: [
      "[REASONING ENGINE v4.2.1]",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Regime shift detected...",
      "",
      "Previous: RISK-ON (p=0.89)",
      "Current: TRANSITIONAL (p=0.67)",
      "",
      "Trigger: VIX spike +18% in 2h",
      "Correlations: Breaking down",
      "",
      "Reducing gross exposure by 40%",
      "",
      "Confidence: 94.1%",
    ],
    code: `class RegimeAwareExecutor(nn.Module):
    """
    Neural regime detection with HMM-SSM
    hybrid + adaptive position management
    using PPO-tuned execution policy.
    """
    def __init__(self, cfg: ExecutorConfig):
        super().__init__()
        self.regime_ssm = MambaBlock(
            d_model=256,
            d_state=64,
            d_conv=4,
            expand=2
        )
        self.hmm_prior = nn.Parameter(
            torch.randn(cfg.n_regimes, cfg.n_regimes)
        )
        self.execution_policy = PPOAgent(
            state_dim=cfg.state_dim,
            action_dim=cfg.action_dim,
            hidden_dims=[512, 256, 128],
            activation=nn.SiLU()
        )
        self.risk_controller = ConvexOptimizer(
            constraints=["max_drawdown", "var_95"]
        )

    def detect_and_execute(
        self,
        market_state: MarketState,
        portfolio: Portfolio,
        target_positions: Dict[str, float]
    ) -> ExecutionPlan:
        # SSM-based regime inference
        regime_logits = self.regime_ssm(
            market_state.features.unsqueeze(0)
        )

        # HMM smoothing for stability
        transition = F.softmax(self.hmm_prior, -1)
        regime_probs = self.forward_backward(
            regime_logits, transition
        )

        # Detect regime change
        current = regime_probs.argmax(-1)
        prev = self.prev_regime
        regime_changed = current != prev

        if regime_changed:
            # Trigger risk reduction
            scale = self.risk_controller.solve(
                portfolio=portfolio,
                regime_probs=regime_probs,
                target_var=0.02
            )
            target_positions = {
                k: v * scale
                for k, v in target_positions.items()
            }

        # Generate optimal execution
        exec_plan = self.execution_policy(
            state=self.encode_state(
                market_state, portfolio
            ),
            targets=target_positions
        )

        self.prev_regime = current

        return ExecutionPlan(
            orders=exec_plan.orders,
            regime=REGIME_NAMES[current],
            regime_prob=regime_probs.max(),
            risk_scale=scale if regime_changed else 1.0
        )`,
    language: "python",
  },
  {
    id: "market-making",
    reasoning: [
      "[REASONING ENGINE v4.2.1]",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "Order flow analysis complete...",
      "",
      "Detecting: Toxic flow on bid side",
      "Adverse selection prob: 23.4%",
      "",
      "Adjusting quotes asymmetrically",
      "Bid: -2 ticks, Ask: +1 tick",
      "",
      "Expected P&L: +$847/hour",
      "",
      "Confidence: 82.7%",
    ],
    code: `class AdaptiveMarketMaker(nn.Module):
    """
    Deep reinforcement learning market maker
    with order flow toxicity detection and
    inventory-aware quote optimization.
    """
    def __init__(self, cfg: MMConfig):
        super().__init__()
        self.flow_classifier = nn.TransformerEncoder(
            encoder_layer=nn.TransformerEncoderLayer(
                d_model=128, nhead=4, batch_first=True
            ),
            num_layers=3
        )
        self.toxicity_head = nn.Sequential(
            nn.Linear(128, 64),
            nn.GELU(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
        self.quote_policy = SACAgent(
            obs_dim=cfg.obs_dim,
            act_dim=4,  # bid_px, bid_sz, ask_px, ask_sz
            hidden_dims=[256, 256],
            auto_entropy=True
        )
        self.inventory_penalty = AvellanedaStoikov(
            gamma=cfg.risk_aversion,
            sigma=cfg.volatility
        )

    def generate_quotes(
        self,
        order_book: OrderBook,
        recent_trades: Tensor,
        inventory: float,
        fair_value: float
    ) -> QuoteUpdate:
        # Encode recent order flow
        flow_emb = self.flow_classifier(
            recent_trades.unsqueeze(0)
        )

        # Detect adverse selection
        toxicity = self.toxicity_head(
            flow_emb[:, -1]
        ).item()

        # Compute inventory adjustment
        inv_adj = self.inventory_penalty(
            q=inventory,
            s=fair_value,
            T=self.time_to_close
        )

        # Generate optimal quotes via SAC
        state = torch.cat([
            flow_emb.mean(1),
            torch.tensor([inventory, toxicity])
        ])
        action = self.quote_policy.act(state)

        bid_offset, bid_size, ask_offset, ask_size = (
            action.chunk(4)
        )

        return QuoteUpdate(
            bid_px=fair_value + inv_adj + bid_offset,
            bid_sz=bid_size * (1 - toxicity),
            ask_px=fair_value + inv_adj + ask_offset,
            ask_sz=ask_size,
            toxicity_score=toxicity,
            expected_pnl=self.estimate_pnl(action)
        )`,
    language: "python",
  },
];

export const getCodeById = (id: string) =>
  codeSnippets.find((c) => c.id === id);
