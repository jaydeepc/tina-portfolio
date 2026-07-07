"use client";

/** Splits text into per-character spans (grouped by word) for kinetic type. */
export function SplitWords({ text }: { text: string }) {
  let charIndex = 0;
  return (
    <span aria-label={text} role="text">
      {text.split(" ").map((word, wi) => (
        <span className="word" key={wi} aria-hidden="true">
          {word.split("").map((ch) => {
            const i = charIndex++;
            return (
              <span className="ch" key={i} style={{ ["--i" as string]: i }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
