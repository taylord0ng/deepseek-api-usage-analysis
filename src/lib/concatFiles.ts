/**
 * Pair DeepSeek CSV files by month and concatenate them for multi-month analysis.
 *
 * Filename pattern: amount-{year}-{month}.csv / cost-{year}-{month}.csv
 * Example: amount-2026-5.csv + cost-2026-5.csv → month key "2026-5"
 */

interface MonthPair {
  month: string;
  amountFile: File;
  costFile: File;
}

interface ConcatResult {
  /** Concatenated amount CSV text (headers only in the first chunk) */
  amountText: string;
  /** Concatenated cost CSV text (headers only in the first chunk) */
  costText: string;
  /** Human-readable label like "2026-5 ~ 2026-6" or just "2026-6" */
  label: string;
  /** Number of months successfully paired */
  monthCount: number;
}

/**
 * Strip the CSV header line from a chunk of CSV text.
 * Returns everything after the first newline.
 */
function stripHeader(text: string): string {
  const idx = text.indexOf("\n");
  if (idx === -1) return "";
  return text.slice(idx + 1);
}

/**
 * Parse year-month from a DeepSeek CSV filename.
 * Expects: amount-2026-6.csv, cost-2026-06.csv, etc.
 */
function extractMonth(filename: string): string | null {
  const match = filename.match(/(?:amount|cost)-(\d{4})-(\d{1,2})\.csv$/i);
  if (!match) return null;
  const year = match[1];
  const month = match[2].padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Group files into (amount, cost) pairs by month.
 * Files that don't match the naming pattern are ignored.
 */
function pairFiles(files: File[]): MonthPair[] {
  const byMonth = new Map<string, { amount?: File; cost?: File }>();

  for (const f of files) {
    const month = extractMonth(f.name);
    if (!month) continue;
    let entry = byMonth.get(month);
    if (!entry) {
      entry = {};
      byMonth.set(month, entry);
    }
    if (f.name.startsWith("amount-")) {
      entry.amount = f;
    } else if (f.name.startsWith("cost-")) {
      entry.cost = f;
    }
  }

  // Only include months that have BOTH files
  const pairs: MonthPair[] = [];
  for (const [month, entry] of byMonth) {
    if (entry.amount && entry.cost) {
      pairs.push({ month, amountFile: entry.amount, costFile: entry.cost });
    }
  }

  // Sort by month ascending
  pairs.sort((a, b) => a.month.localeCompare(b.month));
  return pairs;
}

/**
 * Given a list of File objects (from drag-and-drop or file picker),
 * pair them by month, read all files, and return concatenated CSV text.
 *
 * If only one month is found, behaves like the original single-month flow.
 * If no valid pairs are found, falls back to concatenating all CSVs as-is.
 */
export async function concatMonthlyCSVs(files: File[]): Promise<ConcatResult> {
  const pairs = pairFiles(files);

  // If we found paired months, use those
  if (pairs.length > 0) {
    const amountChunks: string[] = [];
    const costChunks: string[] = [];

    for (let i = 0; i < pairs.length; i++) {
      const p = pairs[i];
      const [amountText, costText] = await Promise.all([
        readFileAsText(p.amountFile),
        readFileAsText(p.costFile),
      ]);

      // First file keeps its header; subsequent files have headers stripped
      amountChunks.push(i === 0 ? amountText : stripHeader(amountText));
      costChunks.push(i === 0 ? costText : stripHeader(costText));
    }

    const months = pairs.map((p) => p.month).sort();
    const label =
      months.length === 1
        ? months[0]
        : `${months[0]} ~ ${months[months.length - 1]}`;

    return {
      amountText: amountChunks.join(""),
      costText: costChunks.join(""),
      label,
      monthCount: pairs.length,
    };
  }

  // Fallback: no filename-pattern pairs found.
  // Try concatenating all CSVs (first of each prefix wins)
  const amountFiles = files.filter((f) => f.name.startsWith("amount-"));
  const costFiles = files.filter((f) => f.name.startsWith("cost-"));
  const otherCSVs = files.filter(
    (f) => f.name.endsWith(".csv") && !f.name.startsWith("amount-") && !f.name.startsWith("cost-")
  );

  const amountTexts = await Promise.all(amountFiles.map((f) => readFileAsText(f)));
  const costTexts = await Promise.all(costFiles.map((f) => readFileAsText(f)));
  const otherTexts = await Promise.all(otherCSVs.map((f) => readFileAsText(f)));

  const amountText = amountTexts
    .map((t, i) => (i === 0 ? t : stripHeader(t)))
    .join("");
  const costText =
    costTexts.length > 0
      ? costTexts.map((t, i) => (i === 0 ? t : stripHeader(t))).join("")
      : otherTexts.map((t, i) => (i === 0 ? t : stripHeader(t))).join("");

  const label = files.find((f) => f.name.includes("amount-"))?.name ?? files[0]?.name ?? "unknown";

  return {
    amountText,
    costText,
    label: label.replace(/^amount-/, "").replace(/\.csv$/i, ""),
    monthCount: amountFiles.length || 1,
  };
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) ?? "");
    reader.readAsText(file);
  });
}
