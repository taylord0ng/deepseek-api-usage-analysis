import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DropZone from "@/components/DropZone";

// Mock dependencies
vi.mock("@/lib/DataContext", () => ({
  useData: () => ({
    loadFiles: vi.fn(),
    loading: false,
  }),
}));

vi.mock("@/i18n", () => ({
  useTranslation: () => ({
    t: {
      dropzone: {
        processing: "Processing CSVs…",
        title: "Drop your CSVs here",
        hint: "amount-*.csv + cost-*.csv",
        privacy: "Files stay in your browser",
        oversizedTitle: "File too large",
        oversizedHint: "File {name} is {size} MB",
        processingError: "Processing Error",
      },
    },
    locale: "en",
  }),
}));

// Mock concatFiles to throw — must be at top level for vitest hoisting
vi.mock("@/lib/concatFiles", () => ({
  MAX_UPLOAD_SIZE_BYTES: 50 * 1024 * 1024,
  extractZipCsvs: vi.fn().mockRejectedValue(new Error("ZIP extraction failed")),
  concatMonthlyCSVs: vi.fn(),
}));

describe("DropZone — error handling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the drop zone with title", () => {
    render(<DropZone />);
    expect(screen.getByText("Drop your CSVs here")).toBeDefined();
  });

  it("shows error banner when concatFiles throws during upload", async () => {
    render(<DropZone />);

    // Create a fake CSV file and trigger change on hidden input
    const file = new File(["dummy,csv,data"], "amount-2026-5.csv", { type: "text/csv" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeDefined();

    // Use fireEvent to simulate file selection
    Object.defineProperty(input, "files", {
      value: [file],
    });
    fireEvent.change(input);

    // Wait for the error banner to appear
    await waitFor(() => {
      expect(screen.getByText("Processing Error")).toBeDefined();
    }, { timeout: 3000 });
  });

  it("clears concatError when clicking the drop zone again", async () => {
    render(<DropZone />);

    // First trigger an error
    const file = new File(["dummy,csv,data"], "amount-2026-5.csv", { type: "text/csv" });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, "files", { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText("Processing Error")).toBeDefined();
    }, { timeout: 3000 });

    // Click the drop zone — should clear the error
    const dropZone = document.querySelector(".cursor-pointer") as HTMLElement;
    fireEvent.click(dropZone);

    await waitFor(() => {
      expect(screen.queryByText("Processing Error")).toBeNull();
    });
  });
});
