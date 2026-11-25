// Fortune Cookie for the Liquidated Trader — make.fun entry.
//
// Writes one original fortune-cookie line for a crypto trader who has
// just been liquidated to <output>/entry.txt.
//
// The line is a fixed, hand-written string: no randomness, no network,
// no input files, no secrets. The program only clears the output
// directory's contents (never the directory itself, which the grader
// mounts) and writes the single line.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original fortune, 17 words, written for this bounty.
const FORTUNE =
  "Your lucky numbers are 0, 0, 0, 0 — the exchange has already played them for you.";

// The sealed gate only accepts 1–160 characters of non-whitespace text
// on a single line, so refuse to write anything that would fail it.
if (FORTUNE.length < 1 || FORTUNE.length > 160 || FORTUNE.trim() === "" || FORTUNE.includes("\n")) {
  throw new Error("fortune does not satisfy the entry gate");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Make sure the mounted output directory exists, then empty only its
// contents so a stale entry.txt from an earlier run can never linger.
mkdirSync(outputDir, { recursive: true });
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}

writeFileSync(join(outputDir, "entry.txt"), FORTUNE + "\n", "utf8");
