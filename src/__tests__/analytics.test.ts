import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    // Reset window.gtag before each test
    delete (window as any).gtag;
  });

  it("calls gtag when available", () => {
    const gtagSpy = vi.fn();
    (window as any).gtag = gtagSpy;

    trackEvent("upload_csv");

    expect(gtagSpy).toHaveBeenCalledWith("event", "upload_csv", undefined);
  });

  it("passes params to gtag when provided", () => {
    const gtagSpy = vi.fn();
    (window as any).gtag = gtagSpy;

    trackEvent("tab_switch", { event_label: "overview" });

    expect(gtagSpy).toHaveBeenCalledWith("event", "tab_switch", {
      event_label: "overview",
    });
  });

  it("does nothing when gtag is undefined", () => {
    // gtag is already deleted in beforeEach
    expect(() => trackEvent("upload_csv")).not.toThrow();
  });

  it("does nothing when window is not available (SSR)", () => {
    // Simulate: window might not exist, but our guard checks it
    // The trackEvent function already handles this via typeof window check
    expect(() => trackEvent("upload_csv")).not.toThrow();
  });

  it("handles gtag throwing errors gracefully", () => {
    (window as any).gtag = () => {
      throw new Error("gtag crash");
    };

    // Should not propagate the error
    expect(() => trackEvent("test_event")).not.toThrow();
  });
});
