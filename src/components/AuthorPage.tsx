/** 文件说明：站内作者页组件，集中展示作者背景、团队信息与外部身份验证链接。 */
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "@/i18n";
import {
  AUTHOR_PAGE_URL,
  GAVIN_LINKEDIN_URL,
  MINDROSE_SITE_URL,
  TEAM_MEMBERS_SECTION_ID,
} from "@/lib/authors";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";

/** 项目 GitHub 仓库链接。 */
const GITHUB_REPO_URL =
  "https://github.com/GavinCnod/deepseek-api-usage-analysis";

/**
 * 站内作者页组件。
 *
 * 该页面复用 Landing 页已有的 About 内容，并补充作者实体、公开资料链接、
 * 团队成员预留区块与结构化数据，增强站内 EEAT 信号。
 */
export function AuthorPage() {
  const { locale, t } = useTranslation();

  /** 作者页 JSON-LD 结构化数据。 */
  const authorJsonLd = useMemo(() => {
    const isZh = locale === "zh";

    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: isZh
        ? "作者页 — Gavin Chen 与 MindRose 团队"
        : "Author Page — Gavin Chen & MindRose Team",
      url: AUTHOR_PAGE_URL,
      description: isZh
        ? "DeepSeek API 用量分析仪表盘项目作者与团队介绍页，包含作者背景、团队简介、联系方式与公开身份验证链接。"
        : "Author and team page for the DeepSeek API Usage Analytics Dashboard, including background, team information, contact details, and public verification links.",
      mainEntity: {
        "@type": "Person",
        name: "Gavin Chen",
        url: AUTHOR_PAGE_URL,
        sameAs: [GAVIN_LINKEDIN_URL],
        jobTitle: isZh
          ? "DeepSeek API 用量分析仪表盘创建者"
          : "Builder of the DeepSeek API Usage Analytics Dashboard",
        worksFor: {
          "@type": "Organization",
          name: "MindRose Team",
          url: `${AUTHOR_PAGE_URL}#${TEAM_MEMBERS_SECTION_ID}`,
          sameAs: [MINDROSE_SITE_URL],
        },
      },
      isPartOf: {
        "@type": "WebSite",
        name: "DeepSeek API Usage Analytics Dashboard",
        url: "https://deepseek-usage.xyz",
      },
    };
  }, [locale]);

  const verificationLinks = [
    {
      href: GAVIN_LINKEDIN_URL,
      label: t.author.linkedInLabel,
    },
    {
      href: GITHUB_REPO_URL,
      label: t.author.githubLabel,
    },
    {
      href: MINDROSE_SITE_URL,
      label: t.author.websiteLabel,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorJsonLd),
        }}
      />

      <TitleBar />

      <div className="max-w-3xl mx-auto px-6 py-8">
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
          {t.guideline.backToHome}
        </Link>

        <h1
          className="text-2xl font-bold tracking-tight mb-3"
          style={{
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
          }}
        >
          {t.author.pageTitle}
        </h1>

        <p
          className="text-sm leading-relaxed text-pretty mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          {t.author.pageSubtitle}
        </p>

        <section className="mb-10">
          <h2
            className="text-base font-semibold mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {t.author.profileTitle}
          </h2>
          <div
            className="p-5 rounded-subtle"
            style={{ border: "1px solid var(--border)" }}
          >
            <h3
              className="text-base font-semibold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {t.author.profileName}
            </h3>
            <p
              className="text-xs mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              {t.author.profileRole}
            </p>
            <p
              className="text-sm leading-relaxed text-pretty mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.author.profileDesc}
            </p>
            <p
              className="text-sm leading-relaxed text-pretty"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.author.intro}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2
            className="text-base font-semibold mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {t.landing.aboutSectionTitle}
          </h2>

          <div className="space-y-8">
            <div>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.landing.aboutWhyTitle}
              </h3>
              <p
                className="text-sm leading-relaxed text-pretty"
                style={{ color: "var(--text-secondary)" }}
              >
                {t.landing.aboutWhyDesc}
              </p>
            </div>

            <div>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.landing.aboutPrivacyTitle}
              </h3>
              <p
                className="text-sm leading-relaxed text-pretty"
                style={{ color: "var(--text-secondary)" }}
              >
                {t.landing.aboutPrivacyDesc}
              </p>
            </div>

            <div>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.landing.aboutMindRoseTitle}
              </h3>
              <p
                className="text-sm leading-relaxed text-pretty"
                style={{ color: "var(--text-secondary)", whiteSpace: "pre-line" }}
              >
                {t.landing.aboutMindRoseDesc}
              </p>
            </div>

            <div>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t.landing.aboutContactTitle}
              </h3>
              <p
                className="text-sm leading-relaxed text-pretty mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {t.landing.aboutContactDesc}
              </p>
              <p
                className="text-sm leading-relaxed text-pretty mb-2"
                style={{ color: "var(--text-secondary)", whiteSpace: "pre-line" }}
              >
                {t.landing.aboutContactService}
              </p>
              <p
                className="text-sm leading-relaxed text-pretty"
                style={{ color: "var(--text-secondary)" }}
              >
                {t.landing.aboutContactCTA}{" "}
                <a
                  href="mailto:hello@mindrose.xyz"
                  className="underline underline-offset-2 transition-colors duration-200"
                  style={{ color: "var(--text-primary)" }}
                >
                  hello@mindrose.xyz
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2
            className="text-base font-semibold mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {t.author.verificationTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            {verificationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-200 rounded-subtle px-3 py-2 hover:bg-[var(--bg-surface-hover)]"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {item.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7m10 0v10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>

        <section id={TEAM_MEMBERS_SECTION_ID} className="mb-10">
          <h2
            className="text-base font-semibold mb-3"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            {t.author.teamMembersTitle}
          </h2>
          <p
            className="text-sm leading-relaxed text-pretty mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.author.teamMembersDesc}
          </p>
          <div
            className="p-5 rounded-subtle"
            style={{ border: "1px dashed var(--border)" }}
          >
            <h3
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {t.author.memberPlaceholderName}
            </h3>
            <p
              className="text-xs mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              {t.author.memberPlaceholderRole}
            </p>
            <p
              className="text-sm leading-relaxed text-pretty"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.author.memberPlaceholderDesc}
            </p>
          </div>
        </section>
      </div>

      <FooterBar />
    </div>
  );
}
