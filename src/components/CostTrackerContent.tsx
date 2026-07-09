/**
 * CostTracker 页内容 —— 服务端渲染回退组件
 *
 * 将 CostTracker 落地页的完整中英双语内容以纯 HTML 形式输出，
 * 包裹在 <noscript> 中。确保不执行 JavaScript 的爬虫
 * 也能抓取到文本内容（对 SEO 至关重要）。
 */
import translations from "@/i18n/translations";

const en = translations.en.costTracker;
const zh = translations.zh.costTracker;

const FEATURES_EN = [
  { title: en.feature1Title, desc: en.feature1Desc },
  { title: en.feature2Title, desc: en.feature2Desc },
  { title: en.feature3Title, desc: en.feature3Desc },
  { title: en.feature4Title, desc: en.feature4Desc },
];

const FEATURES_ZH = [
  { title: zh.feature1Title, desc: zh.feature1Desc },
  { title: zh.feature2Title, desc: zh.feature2Desc },
  { title: zh.feature3Title, desc: zh.feature3Desc },
  { title: zh.feature4Title, desc: zh.feature4Desc },
];

const USE_CASES_EN = [
  { title: en.useCase1Title, desc: en.useCase1Desc },
  { title: en.useCase2Title, desc: en.useCase2Desc },
  { title: en.useCase3Title, desc: en.useCase3Desc },
];

const USE_CASES_ZH = [
  { title: zh.useCase1Title, desc: zh.useCase1Desc },
  { title: zh.useCase2Title, desc: zh.useCase2Desc },
  { title: zh.useCase3Title, desc: zh.useCase3Desc },
];

const FAQ_EN = [
  { q: en.faq1Q, a: en.faq1A },
  { q: en.faq2Q, a: en.faq2A },
  { q: en.faq3Q, a: en.faq3A },
];

const FAQ_ZH = [
  { q: zh.faq1Q, a: zh.faq1A },
  { q: zh.faq2Q, a: zh.faq2A },
  { q: zh.faq3Q, a: zh.faq3A },
];

export default function CostTrackerContent() {
  return (
    <noscript>
      {/* 英文版 */}
      <section lang="en">
        <h1>{en.pageTitle}</h1>
        <p>{en.heroTitle}</p>
        <p>{en.heroDesc}</p>

        <h2>Features</h2>
        {FEATURES_EN.map((f, i) => (
          <div key={i}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}

        <h2>{en.useCasesTitle}</h2>
        {USE_CASES_EN.map((u, i) => (
          <div key={i}>
            <h3>{u.title}</h3>
            <p>{u.desc}</p>
          </div>
        ))}

        <h2>{en.faqTitle}</h2>
        {FAQ_EN.map((f, i) => (
          <div key={i}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>

      {/* 中文版 */}
      <section lang="zh">
        <h1>{zh.pageTitle}</h1>
        <p>{zh.heroTitle}</p>
        <p>{zh.heroDesc}</p>

        <h2>功能特点</h2>
        {FEATURES_ZH.map((f, i) => (
          <div key={i}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}

        <h2>{zh.useCasesTitle}</h2>
        {USE_CASES_ZH.map((u, i) => (
          <div key={i}>
            <h3>{u.title}</h3>
            <p>{u.desc}</p>
          </div>
        ))}

        <h2>{zh.faqTitle}</h2>
        {FAQ_ZH.map((f, i) => (
          <div key={i}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </section>
    </noscript>
  );
}
