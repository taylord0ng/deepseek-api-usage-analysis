"use client";

import { useTranslation } from "@/i18n";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";
import DropZone from "./DropZone";
import ErrorDisplay from "./ErrorDisplay";

/**
 * Landing 页面 — 上传前的完整落地页
 *
 * Apple 极简风格，包含以下区域：
 * - Hero（短版标题 + 副标题）
 * - 上传区（DropZone + ErrorDisplay）
 * - 使用说明（3 步骤）
 * - 常见问题（4 组 Q&A）
 * - 关于我们
 */
export default function LandingPage() {
  const { t } = useTranslation();

  const steps = [
    { title: t.landing.howItWorksStep1Title, desc: t.landing.howItWorksStep1Desc },
    { title: t.landing.howItWorksStep2Title, desc: t.landing.howItWorksStep2Desc },
    { title: t.landing.howItWorksStep3Title, desc: t.landing.howItWorksStep3Desc },
  ];

  const qaItems = [
    { q: t.landing.qaQ1, a: t.landing.qaA1 },
    { q: t.landing.qaQ2, a: t.landing.qaA2 },
    { q: t.landing.qaQ3, a: t.landing.qaA3 },
    { q: t.landing.qaQ4, a: t.landing.qaA4 },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <TitleBar />

      <main className="max-w-3xl mx-auto px-6">
        {/* ============================================================ */}
        {/* Hero — 短版，非全屏居中                                         */}
        {/* ============================================================ */}
        <section className="pt-16 pb-10 text-center">
          <h2
            className="text-3xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          >
            {t.app.title}
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.app.subtitle}
          </p>
        </section>

        {/* ============================================================ */}
        {/* 上传区                                                         */}
        {/* ============================================================ */}
        <section className="pb-12">
          <DropZone />
          <ErrorDisplay />
        </section>

        {/* ============================================================ */}
        {/* 使用说明                                                       */}
        {/* ============================================================ */}
        <section className="pb-12">
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest mb-8 text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.howItWorksTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="text-center">
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 常见问题                                                       */}
        {/* ============================================================ */}
        <section className="pb-12">
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest mb-8 text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.qaTitle}
          </h3>
          <div className="space-y-6">
            {qaItems.map((item, i) => (
              <div key={i}>
                <p
                  className="text-sm font-semibold mb-1.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.q}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 关于我们                                                       */}
        {/* ============================================================ */}
        <section className="pb-16">
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.aboutTitle}
          </h3>
          <p
            className="text-sm leading-relaxed text-center max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.aboutText}
          </p>
        </section>
      </main>

      <FooterBar />
    </div>
  );
}
