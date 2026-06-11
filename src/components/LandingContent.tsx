/**
 * Landing 页内容 —— 服务端渲染组件
 *
 * 将 How It Works、FAQ、About 的文字内容以纯 HTML 形式输出，
 * 包裹在 <noscript> 中。这样即使在不执行 JavaScript 的爬虫环境中，
 * 搜索引擎也能抓取到完整的页面内容。
 *
 * 浏览器（JS 开启时）不会渲染 <noscript> 内部内容，
 * 实际的交互式内容由 LandingPage.tsx 客户端组件负责渲染。
 */
import translations from "@/i18n/translations";

/** 默认使用英文（与 <html lang="en"> 初始值一致） */
const t = translations.en;

export default function LandingContent() {
  return (
    <noscript>
      {/* ============================================================ */}
      {/* 使用说明                                                       */}
      {/* ============================================================ */}
      <section>
        <h1 className="sr-only">{t.meta.title}</h1>
        <h2>{t.landing.howItWorksTitle}</h2>
        <div>
          <div>
            <span>1</span>
            <h3>{t.landing.howItWorksStep1Title}</h3>
            <p>{t.landing.howItWorksStep1Desc}</p>
          </div>
          <div>
            <span>2</span>
            <h3>{t.landing.howItWorksStep2Title}</h3>
            <p>{t.landing.howItWorksStep2Desc}</p>
          </div>
          <div>
            <span>3</span>
            <h3>{t.landing.howItWorksStep3Title}</h3>
            <p>{t.landing.howItWorksStep3Desc}</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 常见问题                                                       */}
      {/* ============================================================ */}
      <section>
        <h2>{t.landing.qaTitle}</h2>
        <div>
          <div>
            <h3>{t.landing.qaQ1}</h3>
            <p>{t.landing.qaA1}</p>
          </div>
          <div>
            <h3>{t.landing.qaQ2}</h3>
            <p>{t.landing.qaA2}</p>
          </div>
          <div>
            <h3>{t.landing.qaQ3}</h3>
            <p>{t.landing.qaA3}</p>
          </div>
          <div>
            <h3>{t.landing.qaQ4}</h3>
            <p>{t.landing.qaA4}</p>
          </div>
          <div>
            <h3>{t.landing.qaQ5}</h3>
            <p>{t.landing.qaA5}</p>
          </div>
          <div>
            <h3>{t.landing.qaQ6}</h3>
            <p>{t.landing.qaA6}</p>
          </div>
          <div>
            <h3>{t.landing.qaQ7}</h3>
            <p>{t.landing.qaA7}</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 关于我们                                                       */}
      {/* ============================================================ */}
      <section>
        <h2>{t.landing.aboutSectionTitle}</h2>

        <div>
          <h3>{t.landing.aboutWhyTitle}</h3>
          <p>{t.landing.aboutWhyDesc}</p>
        </div>

        <div>
          <h3>{t.landing.aboutPrivacyTitle}</h3>
          <p>{t.landing.aboutPrivacyDesc}</p>
        </div>

        <div>
          <h3>{t.landing.aboutMindRoseTitle}</h3>
          <p>{t.landing.aboutMindRoseDesc}</p>
        </div>

        <div>
          <h3>{t.landing.aboutContactTitle}</h3>
          <p>{t.landing.aboutContactDesc}</p>
          <p>{t.landing.aboutContactService}</p>
          <p>
            {t.landing.aboutContactCTA}{" "}
            <a href="mailto:hello@mindrose.xyz">hello@mindrose.xyz</a>
          </p>
        </div>

        <p>
          <a href="https://github.com/GavinCnod/deepseek-api-usage-analysis">
            {t.landing.aboutGitHubLabel}
          </a>
        </p>
      </section>
    </noscript>
  );
}
