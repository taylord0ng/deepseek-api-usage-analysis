/** 文件说明：DeepSeek API 定价计算器 SEO 落地页，包含交互式估算器、计费模型说明与竞品对比。 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n";
import { trackOutboundClick } from "@/lib/analytics";
import { buildLocalePath } from "@/lib/localeRouting";
import { getAffiliatesByIds } from "@/lib/affiliates";
import { buildPricingCalculatorSoftwareAppJsonLd } from "@/lib/schema";
import { formatTokens } from "@/lib/format";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";

/** DeepSeek V4 定价及其他模型价格 (USD, per 1M tokens) */
const PRICING = {
  v4Flash: { input: 0.1449, output: 0.2899, cacheHit: 0.0028 },
  v4Pro: { input: 0.4348, output: 0.8696, cacheHit: 0.0036 },
  gpt55: { input: 5.00, output: 30.00, cacheHit: 0.50 },
  gpt54: { input: 2.50, output: 15.00, cacheHit: 0.25 },
  gpt54Mini: { input: 0.75, output: 4.50, cacheHit: 0.07 },
  claudeFable5: { input: 10.00, output: 50.00, cacheHit: 1.00 },
  claudeOpus48: { input: 5.00, output: 25.00, cacheHit: 0.50 },
  claudeSonnet5: { input: 2.00, output: 10.00, cacheHit: 0.20 },
  claudeHaiku45: { input: 1.00, output: 5.00, cacheHit: 0.10 },
};

/**
 * 格式化成本显示 (支持 CNY/USD 切换)
 */
function formatCurrency(usd: number, currency: "USD" | "CNY", locale: string): string {
  const symbol = currency === "USD" ? "$" : "¥";
  const val = currency === "USD" ? usd : usd * 6.9;

  if (val === 0) return `${symbol}0.00`;
  if (val < 0.01) return `<${symbol}0.01`;

  if (locale === "zh") {
    if (val >= 100000000) {
      return `${symbol}${Number((val / 100000000).toFixed(2))}亿`;
    }
    if (val >= 10000) {
      return `${symbol}${Number((val / 10000).toFixed(2))}万`;
    }
    return `${symbol}${val.toFixed(2)}`;
  }

  if (val < 1000) return `${symbol}${val.toFixed(2)}`;
  if (val < 1000000) return `${symbol}${(val / 1000).toFixed(1)}K`;
  return `${symbol}${(val / 1000000).toFixed(1)}M`;
}

/**
 * DeepSeek API Pricing Calculator 落地页
 *
 * 独立 SEO 落地页，捕获 "deepseek api pricing calculator" 搜索意图。
 * 包含交互式计算器 + 竞品对比表 + Vultr 联盟导流 CTA。
 */
export function PricingCalculatorPage() {
  const { locale, t } = useTranslation();
  const homeHref = buildLocalePath("/", locale);

  const [inputTokens, setInputTokens] = useState(10_000_000); // 10M
  const [outputTokens, setOutputTokens] = useState(1_000_000); // 1M
  const [cacheHitRate, setCacheHitRate] = useState(40); // 40%
  const [currency, setCurrency] = useState<"CNY" | "USD">("CNY");

  const inputM = inputTokens / 1_000_000;
  const outputM = outputTokens / 1_000_000;
  const cacheFraction = cacheHitRate / 100;

  /** 根据输入、输出和缓存命中率估算某个模型的月度成本。 */
  const calcCost = (p: { input: number; output: number; cacheHit: number }) => {
    const cachedInput = inputM * cacheFraction * p.cacheHit;
    const uncachedInput = inputM * (1 - cacheFraction) * p.input;
    const outputCost = outputM * p.output;
    return cachedInput + uncachedInput + outputCost;
  };

  const modelsData = [
    { key: "v4Flash", name: t.pricingCalculator.deepseekV4Flash, pricing: PRICING.v4Flash, color: "var(--positive)", notes: "—" },
    { key: "v4Pro", name: t.pricingCalculator.deepseekV4Pro, pricing: PRICING.v4Pro, color: "var(--positive)", notes: "—" },
    { key: "gpt55", name: "GPT-5.5", pricing: PRICING.gpt55, color: "var(--danger)", notes: "—" },
    { key: "gpt54", name: "GPT-5.4", pricing: PRICING.gpt54, color: "var(--danger)", notes: "—" },
    { key: "gpt54Mini", name: "GPT-5.4 mini", pricing: PRICING.gpt54Mini, color: "var(--text-primary)", notes: "—" },
    { key: "claudeFable5", name: "Claude Fable 5", pricing: PRICING.claudeFable5, color: "var(--danger)", notes: "—" },
    { key: "claudeOpus48", name: "Claude Opus 4.8", pricing: PRICING.claudeOpus48, color: "var(--danger)", notes: "—" },
    { key: "claudeSonnet5", name: "Claude Sonnet 5", pricing: PRICING.claudeSonnet5, color: "var(--text-primary)", notes: "—" },
    { key: "claudeHaiku45", name: "Claude Haiku 4.5", pricing: PRICING.claudeHaiku45, color: "var(--positive)", notes: "—" },
  ];

  const vultrAffiliate = getAffiliatesByIds(["vultr"])[0];
  const estimateSteps = [
    { title: t.pricingCalculator.estimateStep1Title, desc: t.pricingCalculator.estimateStep1Desc },
    { title: t.pricingCalculator.estimateStep2Title, desc: t.pricingCalculator.estimateStep2Desc },
    { title: t.pricingCalculator.estimateStep3Title, desc: t.pricingCalculator.estimateStep3Desc },
  ];
  const billingItems = [
    { title: t.pricingCalculator.billingModelInputTitle, desc: t.pricingCalculator.billingModelInputDesc },
    { title: t.pricingCalculator.billingModelCacheTitle, desc: t.pricingCalculator.billingModelCacheDesc },
    { title: t.pricingCalculator.billingModelOutputTitle, desc: t.pricingCalculator.billingModelOutputDesc },
  ];
  const resultGuides = [
    { title: t.pricingCalculator.resultGuide1Title, desc: t.pricingCalculator.resultGuide1Desc },
    { title: t.pricingCalculator.resultGuide2Title, desc: t.pricingCalculator.resultGuide2Desc },
    { title: t.pricingCalculator.resultGuide3Title, desc: t.pricingCalculator.resultGuide3Desc },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* 注入页面专属结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildPricingCalculatorSoftwareAppJsonLd(locale)),
        }}
      />
      <TitleBar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* 返回首页 */}
        <Link
          href={homeHref}
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="sr-only">{t.pricingCalculator.estimationGuideTitle}</h2>
            {/* 货币切换 */}
            <div className="flex bg-[var(--border)] rounded-full p-1 w-fit ml-auto">
              <button
                onClick={() => setCurrency("CNY")}
                className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${currency === "CNY" ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
              >
                {t.pricingCalculator.currencyCNY}
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${currency === "USD" ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
              >
                {t.pricingCalculator.currencyUSD}
              </button>
            </div>
          </div>
          <div
            className="p-6 rounded-subtle mb-8"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Input Tokens */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="input-tokens-range"
                  className="block text-xs font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.pricingCalculator.inputTokensLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputTokens.toLocaleString("en-US")}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/,/g, "");
                      const num = parseInt(raw, 10);
                      if (!isNaN(num)) setInputTokens(Math.min(num, 50000000000));
                      else if (raw === "") setInputTokens(0);
                    }}
                    className="text-xs px-2 py-1 rounded border outline-none w-32 text-right font-mono"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>
              <input
                id="input-tokens-range"
                type="range"
                min={1}
                max={50000}
                value={inputM}
                onChange={(e) => setInputTokens(Number(e.target.value) * 1_000_000)}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: "var(--text-primary)", background: "var(--border)" }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>{formatTokens(1_000_000, locale)}</span>
                <span>{formatTokens(50_000_000_000, locale)}</span>
              </div>
            </div>

            {/* Output Tokens */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="output-tokens-range"
                  className="block text-xs font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.pricingCalculator.outputTokensLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={outputTokens.toLocaleString("en-US")}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/,/g, "");
                      const num = parseInt(raw, 10);
                      if (!isNaN(num)) setOutputTokens(Math.min(num, 5000000000));
                      else if (raw === "") setOutputTokens(0);
                    }}
                    className="text-xs px-2 py-1 rounded border outline-none w-32 text-right font-mono"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>
              <input
                id="output-tokens-range"
                type="range"
                min={0.1}
                max={5000}
                step={0.1}
                value={outputM}
                onChange={(e) => setOutputTokens(Number(e.target.value) * 1_000_000)}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: "var(--text-primary)", background: "var(--border)" }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>{formatTokens(100_000, locale)}</span>
                <span>{formatTokens(5_000_000_000, locale)}</span>
              </div>
            </div>

            {/* Cache Hit Rate */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="cache-hit-rate-range"
                  className="block text-xs font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.pricingCalculator.cacheHitRateLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={cacheHitRate}
                    onChange={(e) => setCacheHitRate(Number(e.target.value))}
                    className="text-xs px-2 py-1 rounded border outline-none w-16 text-right font-mono"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  />
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">%</span>
                </div>
              </div>
              <input
                id="cache-hit-rate-range"
                type="range"
                min={0}
                max={100}
                value={cacheHitRate}
                onChange={(e) => setCacheHitRate(Number(e.target.value))}
                className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                style={{ accentColor: "var(--text-primary)", background: "var(--border)" }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <p className="text-[11px] mt-2" style={{ color: "var(--text-tertiary)" }}>
              {t.pricingCalculator.cacheHitRateHint}
            </p>
          </div>

          {/* 预估结果 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {modelsData.map((item) => {
              const currentCost = calcCost(item.pricing);
              const isBaseModel = item.key === "v4Flash" || item.key === "v4Pro";
              const multiplierFlash = currentCost > 0 ? (currentCost / calcCost(PRICING.v4Flash)).toFixed(1) : "0";
              const multiplierPro = currentCost > 0 ? (currentCost / calcCost(PRICING.v4Pro)).toFixed(1) : "0";

              return (
                <div key={item.key} className="p-4 rounded-subtle text-center flex flex-col justify-center" style={{ border: "1px solid var(--border)" }}>
                  <span className="block text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-tertiary)" }}>
                    {item.name}
                  </span>
                  <span className="text-lg font-bold" style={{ color: item.color }}>
                    {formatCurrency(currentCost, currency, locale)}
                  </span>
                  {!isBaseModel && currentCost > 0 && (
                    <div className="text-[10px] mt-1.5 flex justify-center gap-2" style={{ color: "var(--text-tertiary)" }}>
                      <span>Flash ×{multiplierFlash}</span>
                      <span>Pro ×{multiplierPro}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* 月用量估算方法 */}
        <section className="mb-16">
          <h2
            className="text-lg font-bold tracking-tight mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.pricingCalculator.estimationGuideTitle}
          </h2>
          <p
            className="text-sm leading-relaxed text-pretty mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.pricingCalculator.estimationGuideDesc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {estimateSteps.map((item, idx) => (
              <div
                key={item.title}
                className="p-5 rounded-subtle"
                style={{ border: "1px solid var(--border)" }}
              >
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mb-3"
                  style={{ background: "var(--text-primary)", color: "var(--accent-inverse)" }}
                >
                  {idx + 1}
                </span>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* 计费模型说明 */}
        <section className="mb-16">
          <h2
            className="text-lg font-bold tracking-tight mb-5"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.pricingCalculator.billingModelTitle}
          </h2>
          <div className="grid grid-cols-1 gap-5">
            {billingItems.map((item) => (
              <div key={item.title}>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* 竞品对比表 */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              {t.pricingCalculator.competitorComparison}
            </h2>
            <div className="flex items-center gap-4">
              {/* 货币切换 */}
              <div className="flex bg-[var(--border)] rounded-full p-1 w-fit">
                <button
                  onClick={() => setCurrency("CNY")}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${currency === "CNY" ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  {t.pricingCalculator.currencyCNY}
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-colors ${currency === "USD" ? "bg-[var(--text-primary)] text-[var(--bg)] shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  {t.pricingCalculator.currencyUSD}
                </button>
              </div>
              <Link
                href={buildLocalePath("/blog/openai-vs-deepseek-cost-comparison", locale)}
                className="text-xs font-medium hover:underline inline-flex items-center gap-1"
                style={{ color: "var(--accent)" }}
              >
                {locale === "zh" ? "阅读深度对比报告" : "Read the deep-dive comparison"}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
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
                {modelsData.map((item) => (
                  <tr key={item.key} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2.5 pr-4 font-semibold" style={{ color: item.color }}>
                      {item.name}
                    </td>
                    <td className="text-right py-2.5 px-3 font-mono" style={{ color: item.color === "var(--positive)" || item.color === "var(--text-primary)" ? item.color : "var(--danger)" }}>
                      {formatCurrency(item.pricing.input, currency, locale)}
                    </td>
                    <td className="text-right py-2.5 px-3 font-mono" style={{ color: item.color === "var(--positive)" || item.color === "var(--text-primary)" ? item.color : "var(--danger)" }}>
                      {formatCurrency(item.pricing.output, currency, locale)}
                    </td>
                    <td className="text-right py-2.5 px-3 font-mono" style={{ color: item.color === "var(--danger)" ? "var(--text-primary)" : item.color }}>
                      {formatCurrency(item.pricing.cacheHit, currency, locale)}
                    </td>
                    <td className="py-2.5 pl-3" style={{ color: "var(--text-tertiary)" }}>
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* 结果解读 */}
        <section className="mb-16">
          <h2
            className="text-lg font-bold tracking-tight mb-5"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.pricingCalculator.resultGuideTitle}
          </h2>
          <div className="space-y-5">
            {resultGuides.map((item) => (
              <div key={item.title}>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* Vultr 联盟导流 CTA */}
        {vultrAffiliate && (
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
              href={vultrAffiliate.url}
              target="_blank"
              rel={vultrAffiliate.rel}
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
        )}
      </div>

      <FooterBar />
    </div>
  );
}
