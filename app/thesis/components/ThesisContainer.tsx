"use client";

import { useScrollProgress } from "../hooks/useScrollProgress";
import { OpportunityAct } from "./acts/OpportunityAct";
import { ProblemAct } from "./acts/ProblemAct";
import { OrganismAct } from "./acts/OrganismAct";
import { NetworkAct } from "./acts/NetworkAct";
import { MoatAct } from "./acts/MoatAct";
import { DeepDiveAct } from "./acts/DeepDiveAct";
import { AskAct } from "./acts/AskAct";
import { ScrollProgress } from "./shared/ScrollProgress";

export function ThesisContainer() {
  const scroll = useScrollProgress();

  return (
    <div className="bg-black text-white">
      {/* Fixed scroll progress indicator */}
      <ScrollProgress
        progress={scroll.progress}
        currentAct={scroll.currentAct}
      />

      {/* Scrollable content - 700vh total for 7 acts */}
      <div className="relative" style={{ height: "700vh" }}>
        {/* Act 1: The Opportunity */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 1 ? 10 : 1 }}
        >
          <OpportunityAct
            progress={
              scroll.currentAct === 1
                ? scroll.actProgress
                : scroll.currentAct > 1
                  ? 1
                  : 0
            }
          />
        </section>

        {/* Act 2: The Problem */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 2 ? 10 : 1 }}
        >
          <ProblemAct
            progress={
              scroll.currentAct === 2
                ? scroll.actProgress
                : scroll.currentAct > 2
                  ? 1
                  : 0
            }
          />
        </section>

        {/* Act 3: The Organism */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 3 ? 10 : 1 }}
        >
          <OrganismAct
            progress={
              scroll.currentAct === 3
                ? scroll.actProgress
                : scroll.currentAct > 3
                  ? 1
                  : 0
            }
          />
        </section>

        {/* Act 4: The Network */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 4 ? 10 : 1 }}
        >
          <NetworkAct
            progress={
              scroll.currentAct === 4
                ? scroll.actProgress
                : scroll.currentAct > 4
                  ? 1
                  : 0
            }
          />
        </section>

        {/* Act 5: The Moat */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 5 ? 10 : 1 }}
        >
          <MoatAct
            progress={
              scroll.currentAct === 5
                ? scroll.actProgress
                : scroll.currentAct > 5
                  ? 1
                  : 0
            }
          />
        </section>

        {/* Act 6: The Deep Dive */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 6 ? 10 : 1 }}
        >
          <DeepDiveAct
            progress={
              scroll.currentAct === 6
                ? scroll.actProgress
                : scroll.currentAct > 6
                  ? 1
                  : 0
            }
          />
        </section>

        {/* Act 7: The Ask */}
        <section
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: scroll.currentAct === 7 ? 10 : 1 }}
        >
          <AskAct progress={scroll.currentAct === 7 ? scroll.actProgress : 0} />
        </section>
      </div>
    </div>
  );
}
