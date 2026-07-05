"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import { trackLandingCTA, trackOutboundClick } from "@/lib/analytics";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";

/** UTM 参数：将落地页 CTA 转化归因到本页面 */
const UTM =
  "utm_source=deepseek-usage.xyz&utm_medium=referral&utm_campaign=landing_cost_tracker";
const HOME_CTA = `/?${UTM}`;

/**
 * DeepSeek API Cost Tracker 落地页
 *
 * 独立 SEO 落地页，捕获 "deepseek api cost tracker" 等搜索意图。
 * Apple 极简风格，与主应用一致。含商业化推荐模块占位（Portkey/Helicone 联盟链接）。
 */
export function CostTrackerPage() {
  const { t } = useTranslation();

  const features = [
    { title: t.costTracker.feature1Title, desc: t.costTracker.feature1Desc },
    { title: t.costTracker.feature2Title, desc: t.costTracker.feature2Desc },
    { title: t.costTracker.feature3Title, desc: t.costTracker.feature3Desc },
    { title: t.costTracker.feature4Title, desc: t.costTracker.feature4Desc },
  ];

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
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t.costTracker.backToHome}
        </Link>

        {/* Hero */}
        <section className="mb-16">
          <span
            className="inline-block text-[11px] font-semibold uppercase tracking-widest mb-4 px-2.5 py-1 rounded-full"
            style={{
              color: "var(--accent)",
              border: "1px solid var(--border)",
            }}
          >
            {t.costTracker.badge}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            {t.costTracker.heroTitle}
          </h1>
          <p
            className="text-base leading-relaxed text-pretty mb-6 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.costTracker.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={HOME_CTA}
              onClick={() => trackLandingCTA("cost_tracker", "hero")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--text-primary)",
                color: "var(--accent-inverse)",
              }}
            >
              {t.costTracker.cta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <span
              className="text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              {t.costTracker.privacyBadge}
            </span>
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((f, idx) => (
              <div key={idx}>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* Bottom CTA */}
        <section className="mb-16 text-center">
          <h2
            className="text-xl font-bold tracking-tight mb-3"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {t.costTracker.bottomCTA}
          </h2>
          <p
            className="text-sm leading-relaxed text-pretty mb-6 max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.costTracker.bottomCTADesc}
          </p>
          <a
            href={HOME_CTA}
            onClick={() => trackLandingCTA("cost_tracker", "bottom")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              background: "var(--text-primary)",
              color: "var(--accent-inverse)",
            }}
          >
            {t.costTracker.cta}
          </a>
        </section>

        <hr style={{ borderColor: "var(--border)", marginBottom: "3rem" }} />

        {/* Recommended Tools (商业化模块) */}
        <section className="mb-16">
          <h2
            className="text-sm font-semibold mb-3"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.costTracker.recommendedTools}
          </h2>
          <p
            className="text-xs leading-relaxed text-pretty mb-4"
            style={{ color: "var(--text-tertiary)" }}
          >
            {t.costTracker.recommendedDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://portkey.ai"
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              onClick={() => trackOutboundClick("cost_tracker", "portkey")}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-subtle transition-all duration-200 hover:opacity-80"
              style={{
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              Portkey — AI Gateway & Observability
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7m10 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="https://www.helicone.ai"
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              onClick={() => trackOutboundClick("cost_tracker", "helicone")}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-subtle transition-all duration-200 hover:opacity-80"
              style={{
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              Helicone — LLM Monitoring
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7m10 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </section>
      </div>

      <FooterBar />
    </div>
  );
}
