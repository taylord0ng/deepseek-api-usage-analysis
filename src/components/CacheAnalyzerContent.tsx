/**
 * CacheAnalyzer 页内容 —— 服务端渲染回退组件
 *
 * 将 CacheAnalyzer 落地页的完整中英双语内容以纯 HTML 形式输出，
 * 包裹在 <noscript> 中。确保不执行 JavaScript 的爬虫
 * 也能抓取到文本内容（对 SEO 至关重要）。
 */
import translations from "@/i18n/translations";

const en = translations.en.cacheAnalyzer;
const zh = translations.zh.cacheAnalyzer;

const TIPS_EN = [
  { title: en.cachingTip1Title, desc: en.cachingTip1Desc },
  { title: en.cachingTip2Title, desc: en.cachingTip2Desc },
  { title: en.cachingTip3Title, desc: en.cachingTip3Desc },
];

const TIPS_ZH = [
  { title: zh.cachingTip1Title, desc: zh.cachingTip1Desc },
  { title: zh.cachingTip2Title, desc: zh.cachingTip2Desc },
  { title: zh.cachingTip3Title, desc: zh.cachingTip3Desc },
];

const BENCHMARKS_EN = [
  { title: en.benchmark1Title, desc: en.benchmark1Desc },
  { title: en.benchmark2Title, desc: en.benchmark2Desc },
  { title: en.benchmark3Title, desc: en.benchmark3Desc },
  { title: en.benchmark4Title, desc: en.benchmark4Desc },
];

const BENCHMARKS_ZH = [
  { title: zh.benchmark1Title, desc: zh.benchmark1Desc },
  { title: zh.benchmark2Title, desc: zh.benchmark2Desc },
  { title: zh.benchmark3Title, desc: zh.benchmark3Desc },
  { title: zh.benchmark4Title, desc: zh.benchmark4Desc },
];

const STRATEGIES_EN = [
  { title: en.strategy1Title, desc: en.strategy1Desc },
  { title: en.strategy2Title, desc: en.strategy2Desc },
  { title: en.strategy3Title, desc: en.strategy3Desc },
];

const STRATEGIES_ZH = [
  { title: zh.strategy1Title, desc: zh.strategy1Desc },
  { title: zh.strategy2Title, desc: zh.strategy2Desc },
  { title: zh.strategy3Title, desc: zh.strategy3Desc },
];

const DIAGNOSIS_EN = [
  { title: en.diagnosis1Title, desc: en.diagnosis1Desc },
  { title: en.diagnosis2Title, desc: en.diagnosis2Desc },
  { title: en.diagnosis3Title, desc: en.diagnosis3Desc },
];

const DIAGNOSIS_ZH = [
  { title: zh.diagnosis1Title, desc: zh.diagnosis1Desc },
  { title: zh.diagnosis2Title, desc: zh.diagnosis2Desc },
  { title: zh.diagnosis3Title, desc: zh.diagnosis3Desc },
];

export default function CacheAnalyzerContent() {
  return (
    <noscript>
      {/* 英文版 */}
      <section lang="en">
        <h1>{en.pageTitle}</h1>
        <p>{en.heroTitle}</p>
        <p>{en.heroDesc}</p>

        <h2>{en.cachingExplainerTitle}</h2>
        <p>{en.cachingExplainerDesc}</p>
        {TIPS_EN.map((tip, i) => (
          <div key={i}>
            <h3>{tip.title}</h3>
            <p>{tip.desc}</p>
          </div>
        ))}

        <h2>{en.benchmarkTitle}</h2>
        <p>{en.benchmarkDesc}</p>
        {BENCHMARKS_EN.map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}

        <h2>{en.strategyTitle}</h2>
        {STRATEGIES_EN.map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}

        <h2>{en.diagnosisTitle}</h2>
        {DIAGNOSIS_EN.map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 中文版 */}
      <section lang="zh">
        <h1>{zh.pageTitle}</h1>
        <p>{zh.heroTitle}</p>
        <p>{zh.heroDesc}</p>

        <h2>{zh.cachingExplainerTitle}</h2>
        <p>{zh.cachingExplainerDesc}</p>
        {TIPS_ZH.map((tip, i) => (
          <div key={i}>
            <h3>{tip.title}</h3>
            <p>{tip.desc}</p>
          </div>
        ))}

        <h2>{zh.benchmarkTitle}</h2>
        <p>{zh.benchmarkDesc}</p>
        {BENCHMARKS_ZH.map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}

        <h2>{zh.strategyTitle}</h2>
        {STRATEGIES_ZH.map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}

        <h2>{zh.diagnosisTitle}</h2>
        {DIAGNOSIS_ZH.map((item, i) => (
          <div key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>
    </noscript>
  );
}
