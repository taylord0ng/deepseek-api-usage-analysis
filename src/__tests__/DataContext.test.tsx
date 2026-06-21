import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { DataProvider, useData } from "@/lib/DataContext";

// Mock the parser module
vi.mock("@/lib/parser", () => ({
  parseDeepSeekData: vi.fn(),
  computeKeyStats: vi.fn(() => []),
}));

import { parseDeepSeekData } from "@/lib/parser";

const mockParseDeepSeekData = parseDeepSeekData as ReturnType<typeof vi.fn>;

describe("DataContext — loadFiles error handling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockParseDeepSeekData.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DataProvider>{children}</DataProvider>
  );

  it("sets loading: true when loadFiles is called", () => {
    mockParseDeepSeekData.mockReturnValue({
      daily: [{ date: "2026-06-01", model: "deepseek-chat", apiKeyName: "test-key", apiKey: "sk-xxx", requestCount: 10, outputTokens: 100, inputCacheHitTokens: 0, inputCacheMissTokens: 0, pricePerOutputToken: 0.001, pricePerInputToken: null, cost: 0.1 }],
      keys: [],
      summary: {
        totalCost: 0.1,
        totalTokens: 100,
        totalCacheHitTokens: 0,
        totalCacheMissTokens: 0,
        cacheHitRate: 0,
        activeKeys: 1,
        dateRange: { start: "2026-06-01", end: "2026-06-01" },
        models: ["deepseek-chat"],
      },
      warnings: [],
    });

    const { result } = renderHook(() => useData(), { wrapper });

    act(() => {
      result.current.loadFiles("fake-amount", "fake-cost", "test.csv");
    });

    expect(result.current.loading).toBe(true);
  });

  it("sets result after successful parse and timer flush", () => {
    mockParseDeepSeekData.mockReturnValue({
      daily: [{ date: "2026-06-01", model: "deepseek-chat", apiKeyName: "test-key", apiKey: "sk-xxx", requestCount: 10, outputTokens: 100, inputCacheHitTokens: 0, inputCacheMissTokens: 0, pricePerOutputToken: 0.001, pricePerInputToken: null, cost: 0.1 }],
      keys: [],
      summary: {
        totalCost: 0.1,
        totalTokens: 100,
        totalCacheHitTokens: 0,
        totalCacheMissTokens: 0,
        cacheHitRate: 0,
        activeKeys: 1,
        dateRange: { start: "2026-06-01", end: "2026-06-01" },
        models: ["deepseek-chat"],
      },
      warnings: [],
    });

    const { result } = renderHook(() => useData(), { wrapper });

    act(() => {
      result.current.loadFiles("fake-amount", "fake-cost", "test.csv");
    });

    // Flush the setTimeout
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.result?.summary.totalCost).toBe(0.1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error state when parseDeepSeekData returns an error", () => {
    const parseError = { type: "empty_file" as const, message: "No data found" };
    mockParseDeepSeekData.mockReturnValue({ error: parseError });

    const { result } = renderHook(() => useData(), { wrapper });

    act(() => {
      result.current.loadFiles("", "", "empty.csv");
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toEqual(parseError);
    expect(result.current.loading).toBe(false);
  });

  it("catches synchronous throws from parseDeepSeekData and sets error", () => {
    mockParseDeepSeekData.mockImplementation(() => {
      throw new Error("Unexpected parser crash");
    });

    const { result } = renderHook(() => useData(), { wrapper });

    act(() => {
      result.current.loadFiles("bad-data", "bad-cost", "bad.csv");
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).not.toBeNull();
    expect(result.current.error!.type).toBe("malformed_row");
    expect(result.current.error!.message).toBe("Unexpected parser crash");
    expect(result.current.loading).toBe(false);
  });
});
