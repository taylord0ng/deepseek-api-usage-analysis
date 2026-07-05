"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import { trackOutboundClick } from "@/lib/analytics";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";

/** DeepSeek V4 定价 (USD, per 1M tokens, as of July 2026) */
const PRICING = {
  v4Flash: { input: 0.27, output: 1.10, cacheHit: 0.07 },
  v4Pro: { input: 0.55, output: 2.19, cacheHit: 0.14 },
  openaiO3: { input: 10.00, output: 40.00, cacheHit: 2.50 },
  claudeOpus: { input: 15.00, output: 75.00, cacheHit: 3.75 },
};

function formatCost(usd: number): string {
  if (usd < 0.01) return "$0.01";
  if (usd < 1000) return `$${usd.toFixed(2)}`;
  return `$${(usd / 1000).toFixed(1)}K`;
}

/**
 * DeepSeek API Pricing Calculator 落地页
 *
 * 独立 SEO 落地页，捕获 "deepseek api pricing calculator" 搜索意图。
 * 包含交互式计算器 + 竞品对比表 + Vultr 联盟导流 CTA。
 */
export function PricingCalculatorPage() {
  const { t } = useTranslation();

  const [inputTokens, setInputTokens] = useState(10_000_000); // 10M
  const [outputTokens, setOutputTokens] = useState(1_000_000); // 1M
  const [cacheHitRate, setCacheHitRate] = useState(40); // 40%

  const inputM = inputTokens / 1_000_000;
  const outputM = outputTokens / 1_000_000;
  const cacheFraction = cacheHitRate / 100;

  const calcCost = (p: { input: number; output: number; cacheHit: number }) => {
    const cachedInput = inputM * cacheFraction * p.cacheHit;
    const uncachedInput = inputM * (1 - cacheFraction) * p.input;
    const outputCost = outputM * p.output;
    return cachedInput + uncachedInput + outputCost;
  };

  const v4FlashCost = calcCost(PRICING.v4Flash);
  const v4ProCost = calcCost(PRICING.v4Pro);
  const o3Cost = calcCost(PRICING.openaiO3);
  const claudeCost = calcCost(PRICING.claudeOpus);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <TitleBar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* 返回首页 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 mb-8 hover:opacity-80"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.pricingCalculator.backToHome}
        </Link>

        {/* Hero */}
        <section className="mb-12">
          <span
            className="inline-block text-[11px] font-semibold uppercase tracking-widest mb-4 px-2.5 py-1 rounded-full"
            style={{ color: "var(--accent)", border: "1px solid var(--border)" }}
          >
            {t.pricingCalculator.badge}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          >
            {t.pricingCalculator.heroTitle}
          </h1>
          <p
            className="text-base leading-relaxed text-pretty max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.pricingCalculator.heroDesc}
          </p>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "2.5rem" }} />

        {/* 交互式计算器 */}
        <section className="mb-16">
          <div
            className="p-6 rounded-subtle mb-8"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Input Tokens */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.pricingCalculator.inputTokensLabel}: {Math.round(inputM).toLocaleString()}M
              </label>
              <input
                type="range"
                min={1}
                max={500}
                value={inputM}
                onChange={(e) => setInputTokens(Number(e.target.value) * 1_000_000)}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: "var(--text-primary)", background: "var(--border)" }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>1M</span>
                <span>500M</span>
              </div>
            </div>

            {/* Output Tokens */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.pricingCalculator.outputTokensLabel}: {Math.round(outputM).toLocaleString()}M
              </label>
              <input
                type="range"
                min={0.1}
                max={100}
                step={0.1}
                value={outputM}
                onChange={(e) => setOutputTokens(Number(e.target.value) * 1_000_000)}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: "var(--text-primary)", background: "var(--border)" }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>0.1M</span>
                <span>100M</span>
              </div>
            </div>

            {/* Cache Hit Rate */}
            <div className="mb-5">
              <label
                className="block text-xs font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.pricingCalculator.cacheHitRateLabel}: {cacheHitRate}%
              </label>
              <input
                type="range"
                min={0}
                max={80}
                value={cacheHitRate}
                onChange={(e) => setCacheHitRate(Number(e.target.value))}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: "var(--text-primary)", background: "var(--border)" }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>0%</span>
                <span>80%</span>
              </div>
            </div>

            <p className="text-[11px] mt-2" style={{ color: "var(--text-tertiary)" }}>
              {t.pricingCalculator.cacheHitRateHint}
            </p>
          </div>

          {/* 预估结果 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-subtle text-center" style={{ border: "1px solid var(--border)" }}>
              <span className="block text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                {t.pricingCalculator.deepseekV4Flash}
              </span>
              <span className="text-lg font-bold" style={{ color: "var(--positive)" }}>
                {formatCost(v4FlashCost)}
              </span>
            </div>
            <div className="p-4 rounded-subtle text-center" style={{ border: "1px solid var(--border)" }}>
              <span className="block text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                {t.pricingCalculator.deepseekV4Pro}
              </span>
              <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {formatCost(v4ProCost)}
              </span>
            </div>
            <div className="p-4 rounded-subtle text-center" style={{ border: "1px solid var(--border)" }}>
              <span className="block text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                OpenAI o3
              </span>
              <span className="text-lg font-bold" style={{ color: "var(--danger)" }}>
                {formatCost(o3Cost)}
              </span>
            </div>
            <div className="p-4 rounded-subtle text-center" style={{ border: "1px solid var(--border)" }}>
              <span className="block text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                Claude Opus
              </span>
              <span className="text-lg font-bold" style={{ color: "var(--danger)" }}>
                {formatCost(claudeCost)}
              </span>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* 竞品对比表 */}
        <section className="mb-16">
          <h2
            className="text-lg font-bold tracking-tight mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.pricingCalculator.competitorComparison}
          </h2>
          <p className="text-xs mb-6" style={{ color: "var(--text-tertiary)" }}>
            {t.pricingCalculator.comparisonNote}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)" }}>
                  <th className="text-left py-2 pr-4" style={{ color: "var(--text-primary)" }}>
                    {t.pricingCalculator.compModelHeader}
                  </th>
                  <th className="text-right py-2 px-3" style={{ color: "var(--text-secondary)" }}>
                    {t.pricingCalculator.compInputPriceHeader}
                  </th>
                  <th className="text-right py-2 px-3" style={{ color: "var(--text-secondary)" }}>
                    {t.pricingCalculator.compOutputPriceHeader}
                  </th>
                  <th className="text-right py-2 px-3" style={{ color: "var(--text-secondary)" }}>
                    {t.pricingCalculator.compCacheHitHeader}
                  </th>
                  <th className="text-left py-2 pl-3" style={{ color: "var(--text-secondary)" }}>
                    {t.pricingCalculator.compNotesHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--positive)" }}>
                    {t.pricingCalculator.compDeepseekV4Flash}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$0.27</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$1.10</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--positive)" }}>$0.07</td>
                  <td className="py-2.5 pl-3" style={{ color: "var(--text-tertiary)" }}>—</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t.pricingCalculator.compDeepseekV4Pro}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$0.55</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$2.19</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$0.14</td>
                  <td className="py-2.5 pl-3" style={{ color: "var(--text-tertiary)" }}>—</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t.pricingCalculator.compOpenaiO3}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--danger)" }}>$10.00</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--danger)" }}>$40.00</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$2.50</td>
                  <td className="py-2.5 pl-3" style={{ color: "var(--text-tertiary)" }}>
                    {t.pricingCalculator.compOpenaiO3Notes}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t.pricingCalculator.compClaudeOpus}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--danger)" }}>$15.00</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--danger)" }}>$75.00</td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: "var(--text-primary)" }}>$3.75</td>
                  <td className="py-2.5 pl-3" style={{ color: "var(--text-tertiary)" }}>
                    {t.pricingCalculator.compClaudeOpusNotes}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* Vultr 联盟导流 CTA */}
        <section className="mb-16 text-center">
          <h2
            className="text-xl font-bold tracking-tight mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.pricingCalculator.deployCTA}
          </h2>
          <p
            className="text-sm leading-relaxed text-pretty mb-6 max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.pricingCalculator.deployCTADesc}
          </p>
          <a
            href="https://www.vultr.com/?ref=9726658"
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            onClick={() => trackOutboundClick("pricing_calculator", "vultr")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--text-primary)", color: "var(--accent-inverse)" }}
          >
            {t.pricingCalculator.deployCTALink}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7m10 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </section>
      </div>

      <FooterBar />
    </div>
  );
}
