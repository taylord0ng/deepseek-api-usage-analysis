/**
 * Landing 页内容 —— 服务端渲染组件
 *
 * 将 How It Works、FAQ、About 的文字内容以纯 HTML 形式输出，
 * 包裹在 <noscript> 中。这样即使在不执行 JavaScript 的爬虫环境中，
 * 搜索引擎也能抓取到完整的中英双语页面内容。
 *
 * 浏览器（JS 开启时）不会渲染 <noscript> 内部内容，
 * 实际的交互式内容由 LandingPage.tsx 客户端组件负责渲染。
 */
import translations from "@/i18n/translations";

/** 英文字符串（与 <html lang="en"> 初始值一致） */
const en = translations.en;
const zh = translations.zh;

export default function LandingContent() {
  return (
    <noscript>
      {/* ============================================================ */}
      {/* 使用说明 — 英文版                                                  */}
      {/* ============================================================ */}
      <section lang="en">
        <h1 className="sr-only">{en.meta.title}</h1>
        <h2>{en.landing.howItWorksTitle}</h2>
        <div>
          <div>
            <span>1</span>
            <h3>{en.landing.howItWorksStep1Title}</h3>
            <p>{en.landing.howItWorksStep1Desc}</p>
          </div>
          <div>
            <span>2</span>
            <h3>{en.landing.howItWorksStep2Title}</h3>
            <p>{en.landing.howItWorksStep2Desc}</p>
          </div>
          <div>
            <span>3</span>
            <h3>{en.landing.howItWorksStep3Title}</h3>
            <p>{en.landing.howItWorksStep3Desc}</p>
          </div>
        </div>
      </section>

      {/* 使用说明 — 中文版 */}
      <section lang="zh">
        <h1 className="sr-only">{zh.meta.title}</h1>
        <h2>{zh.landing.howItWorksTitle}</h2>
        <div>
          <div>
            <span>1</span>
            <h3>{zh.landing.howItWorksStep1Title}</h3>
            <p>{zh.landing.howItWorksStep1Desc}</p>
          </div>
          <div>
            <span>2</span>
            <h3>{zh.landing.howItWorksStep2Title}</h3>
            <p>{zh.landing.howItWorksStep2Desc}</p>
          </div>
          <div>
            <span>3</span>
            <h3>{zh.landing.howItWorksStep3Title}</h3>
            <p>{zh.landing.howItWorksStep3Desc}</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 常见问题 — 英文版                                                  */}
      {/* ============================================================ */}
      <section lang="en">
        <h2>{en.landing.qaTitle}</h2>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
            const qKey = `qaQ${n}` as keyof typeof en.landing;
            const aKey = `qaA${n}` as keyof typeof en.landing;
            return (
              <div key={n}>
                <h3>{en.landing[qKey]}</h3>
                <p>{en.landing[aKey]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 常见问题 — 中文版 */}
      <section lang="zh">
        <h2>{zh.landing.qaTitle}</h2>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
            const qKey = `qaQ${n}` as keyof typeof zh.landing;
            const aKey = `qaA${n}` as keyof typeof zh.landing;
            return (
              <div key={n}>
                <h3>{zh.landing[qKey]}</h3>
                <p>{zh.landing[aKey]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 关于我们 — 英文版                                                  */}
      {/* ============================================================ */}
      <section lang="en">
        <h2>{en.landing.aboutSectionTitle}</h2>

        <div>
          <h3>{en.landing.aboutWhyTitle}</h3>
          <p>{en.landing.aboutWhyDesc}</p>
        </div>

        <div>
          <h3>{en.landing.aboutPrivacyTitle}</h3>
          <p>{en.landing.aboutPrivacyDesc}</p>
        </div>

        <div>
          <h3>{en.landing.aboutMindRoseTitle}</h3>
          <p>{en.landing.aboutMindRoseDesc}</p>
        </div>

        <div>
          <h3>{en.landing.aboutContactTitle}</h3>
          <p>{en.landing.aboutContactDesc}</p>
          <p>{en.landing.aboutContactService}</p>
          <p>
            {en.landing.aboutContactCTA}{" "}
            <a href="mailto:hello@mindrose.xyz">hello@mindrose.xyz</a>
          </p>
        </div>

        <p>
          <a href="https://github.com/GavinCnod/deepseek-api-usage-analysis">
            {en.landing.aboutGitHubLabel}
          </a>
        </p>
      </section>

      {/* 关于我们 — 中文版 */}
      <section lang="zh">
        <h2>{zh.landing.aboutSectionTitle}</h2>

        <div>
          <h3>{zh.landing.aboutWhyTitle}</h3>
          <p>{zh.landing.aboutWhyDesc}</p>
        </div>

        <div>
          <h3>{zh.landing.aboutPrivacyTitle}</h3>
          <p>{zh.landing.aboutPrivacyDesc}</p>
        </div>

        <div>
          <h3>{zh.landing.aboutMindRoseTitle}</h3>
          <p>{zh.landing.aboutMindRoseDesc}</p>
        </div>

        <div>
          <h3>{zh.landing.aboutContactTitle}</h3>
          <p>{zh.landing.aboutContactDesc}</p>
          <p>{zh.landing.aboutContactService}</p>
          <p>
            {zh.landing.aboutContactCTA}{" "}
            <a href="mailto:hello@mindrose.xyz">hello@mindrose.xyz</a>
          </p>
        </div>

        <p>
          <a href="https://github.com/GavinCnod/deepseek-api-usage-analysis">
            {zh.landing.aboutGitHubLabel}
          </a>
        </p>
      </section>
    </noscript>
  );
}
