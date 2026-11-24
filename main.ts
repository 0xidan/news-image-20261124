// News image entry for Tuesday 24 November 2026: the repository holds the
// finished front-page image as entry.png, and this program's whole job is to
// place those exact bytes at /output/entry.png for the gate and the judge.
// The source path is resolved from this file's own directory, never from the
// caller's working directory, so the copy lands identically on every run.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });

const source = new URL('./entry.png', import.meta.url);
const target = join(outputDir, 'entry.png');
copyFileSync(source, target);

// The judge sees exactly the bytes in the output file, so a bad copy must
// never pass silently: fail the run unless the copy is byte-for-byte equal.
const expected = readFileSync(source);
const written = readFileSync(target);
if (!written.equals(expected)) {
  throw new Error(`entry.png copy differs: wrote ${written.length} of ${expected.length} bytes`);
}
