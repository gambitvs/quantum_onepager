"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TerminalText } from "../shared/TerminalText";
import { codeSnippets } from "../../data/codeSnippets";

interface CodeGenesisPanelProps {
  isActive: boolean;
  progress: number;
  currentSnippetIndex: number;
}

export function CodeGenesisPanel({
  isActive,
  progress,
  currentSnippetIndex,
}: CodeGenesisPanelProps) {
  const [reasoningLineIndex, setReasoningLineIndex] = useState(0);
  const [codeLineIndex, setCodeLineIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const currentSnippet =
    codeSnippets[currentSnippetIndex % codeSnippets.length];
  const reasoningLines = currentSnippet.reasoning;
  const codeLines = currentSnippet.code.split("\n");

  // Reset when snippet changes
  useEffect(() => {
    setReasoningLineIndex(0);
    setCodeLineIndex(0);
    setShowCode(false);
  }, [currentSnippetIndex]);

  // Animate reasoning lines
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setReasoningLineIndex((prev) => {
        if (prev < reasoningLines.length - 1) {
          return prev + 1;
        }
        setShowCode(true);
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isActive, reasoningLines.length]);

  // Animate code lines
  useEffect(() => {
    if (!showCode || !isActive) return;

    const interval = setInterval(() => {
      setCodeLineIndex((prev) => {
        if (prev < codeLines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 160);

    return () => clearInterval(interval);
  }, [showCode, isActive, codeLines.length]);

  const highlightCode = (line: string) => {
    // Build highlighted line piece by piece
    const tokens: { text: string; type: string }[] = [];
    let remaining = line;

    // Simple tokenizer - just highlight keywords
    const keywords =
      /\b(class|def|return|import|from|if|else|for|in|self|None|True|False|async|await|with|as|try|except|super)\b/g;

    let match;
    let lastIndex = 0;

    while ((match = keywords.exec(line)) !== null) {
      // Add text before keyword
      if (match.index > lastIndex) {
        tokens.push({
          text: line.slice(lastIndex, match.index),
          type: "normal",
        });
      }
      // Add keyword
      tokens.push({ text: match[0], type: "keyword" });
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < line.length) {
      tokens.push({ text: line.slice(lastIndex), type: "normal" });
    }

    // Build HTML
    return tokens
      .map((t) =>
        t.type === "keyword"
          ? `<span class="text-lime-400">${t.text}</span>`
          : t.text
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;"),
      )
      .join("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="stat-label text-white/40">Code Genesis</h3>
        <span className="font-data text-xs text-[#D0FF14]">
          {showCode ? "GENERATING" : "REASONING"}
        </span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Reasoning Panel */}
        <motion.div
          className="mission-panel p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-data text-xs leading-relaxed space-y-0">
            {reasoningLines.slice(0, reasoningLineIndex + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.startsWith("[")
                    ? "text-[#D0FF14] mb-1"
                    : line.startsWith("━")
                      ? "text-white/20 mb-2"
                      : line.startsWith("Confidence")
                        ? "text-[#D0FF14] mt-2"
                        : line === ""
                          ? "h-2"
                          : "text-white/60"
                }
              >
                {line}
              </motion.div>
            ))}
            {reasoningLineIndex < reasoningLines.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-3 bg-[#D0FF14] ml-1"
              />
            )}
          </div>
        </motion.div>

        {/* Code Panel */}
        <motion.div
          className="mission-panel p-4 overflow-hidden bg-[#050505]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showCode ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          {/* Line numbers and code */}
          <div className="font-data text-[11px] leading-[1.6] overflow-hidden">
            {showCode ? (
              codeLines.slice(0, codeLineIndex + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05 }}
                  className="flex"
                >
                  <span className="text-white/20 w-6 text-right mr-3 select-none">
                    {i + 1}
                  </span>
                  <span
                    className="text-white/80 whitespace-pre"
                    dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                  />
                </motion.div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-white/20">
                <span>Awaiting reasoning output...</span>
              </div>
            )}
            {showCode && codeLineIndex < codeLines.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-3 bg-[#D0FF14] ml-9"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
