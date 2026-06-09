"use client";

import { useTranslation } from "@/i18n";
import { useState, useEffect, useRef } from "react";
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
 * - 使用说明（3 步骤，编号圆圈 + 悬停微交互）
 * - 常见问题（手风琴折叠，支持无障碍键盘操作）
 * - 关于我们
 *
 * 滚动渐显动画：每个 section 进入视口时通过 Intersection Observer 触发淡入效果。
 * 尊重 prefers-reduced-motion 偏好（CSS 层面全局处理）。
 */
export default function LandingPage() {
  const { t } = useTranslation();

  /* ── QA 手风琴状态 ── */
  const [openQa, setOpenQa] = useState<number | null>(null);

  /** 切换 QA 项的展开/折叠 */
  function toggleQa(index: number) {
    setOpenQa((prev) => (prev === index ? null : index));
  }

  /* ── 滚动渐显动画（Intersection Observer） ── */
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // 元素进入视口后取消观察，保持可见状态
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -48px 0px" }
    );

    const currentRefs = sectionRefs.current.filter(Boolean) as HTMLElement[];
    currentRefs.forEach((el) => observer.observe(el));

    return () => {
      currentRefs.forEach((el) => observer.unobserve(el));
    };
  }, []);

  /* ── 步骤数据 ── */
  const steps = [
    {
      num: "1",
      title: t.landing.howItWorksStep1Title,
      desc: t.landing.howItWorksStep1Desc,
    },
    {
      num: "2",
      title: t.landing.howItWorksStep2Title,
      desc: t.landing.howItWorksStep2Desc,
    },
    {
      num: "3",
      title: t.landing.howItWorksStep3Title,
      desc: t.landing.howItWorksStep3Desc,
    },
  ];

  /* ── QA 数据 ── */
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
        <section className="pt-16 pb-10 text-center reveal-section" ref={(el) => { sectionRefs.current[0] = el; }}>
          <h2
            className="text-3xl font-bold tracking-tight mb-4 text-pretty"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            translate="no"
          >
            {t.app.title}
          </h2>
          <p
            className="text-base leading-relaxed max-w-xl mx-auto text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.app.subtitle}
          </p>
        </section>

        {/* ============================================================ */}
        {/* 上传区                                                         */}
        {/* ============================================================ */}
        <section className="pb-12 reveal-section" ref={(el) => { sectionRefs.current[1] = el; }}>
          <DropZone />
          <ErrorDisplay />
        </section>

        {/* ============================================================ */}
        {/* 使用说明                                                       */}
        {/* ============================================================ */}
        <section className="pb-12 reveal-section" ref={(el) => { sectionRefs.current[2] = el; }}>
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest mb-8 text-center text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.howItWorksTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="text-center group cursor-default"
              >
                {/* 编号圆圈 */}
                <div
                  className="mx-auto mb-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200"
                  style={{
                    background: "var(--bg-surface-hover)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {step.num}
                </div>
                <p
                  className="text-sm font-semibold mb-2 transition-colors duration-200"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </p>
                <p
                  className="text-xs leading-relaxed transition-colors duration-200 text-pretty"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 常见问题（手风琴）                                                */}
        {/* ============================================================ */}
        <section className="pb-12 reveal-section" ref={(el) => { sectionRefs.current[3] = el; }}>
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest mb-8 text-center text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.qaTitle}
          </h3>
          <div className="space-y-1">
            {qaItems.map((item, i) => {
              const isOpen = openQa === i;
              return (
                <div
                  key={i}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  {/* 问题行：点击展开/折叠 */}
                  <button
                    type="button"
                    onClick={() => toggleQa(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleQa(i);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`qa-answer-${i}`}
                    className="w-full text-left py-4 flex items-center justify-between gap-3
                               transition-colors duration-200
                               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                               rounded-subtle focus-visible:outline-[var(--accent)]"
                  >
                    <span
                      className="text-sm font-semibold text-pretty"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.q}
                    </span>
                    {/* 折叠箭头 */}
                    <span
                      className="shrink-0 text-base transition-transform duration-300 ease-out"
                      style={{
                        color: "var(--text-tertiary)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      &#9662;
                    </span>
                  </button>

                  {/* 答案面板（inline style 驱动折叠过渡） */}
                  <div
                    id={`qa-answer-${i}`}
                    role="region"
                    aria-labelledby={`qa-question-${i}`}
                    style={{
                      overflow: "hidden",
                      maxHeight: isOpen ? "20rem" : "0",
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? "0.5rem" : "0",
                      transition:
                        "max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease-out, margin-top 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed pb-4 text-pretty"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 关于我们                                                       */}
        {/* ============================================================ */}
        <section className="pb-16 reveal-section" ref={(el) => { sectionRefs.current[4] = el; }}>
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-center text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.landing.aboutTitle}
          </h3>
          <p
            className="text-sm leading-relaxed text-center max-w-xl mx-auto text-pretty"
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
