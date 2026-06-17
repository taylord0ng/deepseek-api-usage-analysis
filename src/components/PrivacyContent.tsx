/**
 * Privacy 页内容 —— 服务端渲染回退组件
 *
 * 将隐私政策的完整中英双语内容以纯 HTML 形式输出，
 * 包裹在 <noscript> 中。确保不执行 JavaScript 的爬虫
 * 也能抓取到法律文本内容（对 EEAT 信任信号至关重要）。
 *
 * 浏览器（JS 开启时）不会渲染 <noscript> 内部内容，
 * 实际的交互式内容由 PrivacyPage.tsx 客户端组件负责渲染。
 */
import translations from "@/i18n/translations";

const en = translations.en.privacy;
const zh = translations.zh.privacy;

/**
 * 隐私政策章节数据（英文）
 *
 * 每个章节包含 title 和 content，部分章节包含补充说明（note），
 * 与 PrivacyPage.tsx 客户端组件中的 sections 结构保持一致。
 */
const SECTIONS_EN = [
  { title: en.noCollectionTitle, content: en.noCollectionDesc },
  { title: en.localProcessingTitle, content: en.localProcessingDesc },
  { title: en.analyticsTitle, content: en.analyticsDesc, note: translations.en.privacy.analyticsOptOut + " " + translations.en.privacy.gaIdNote },
  { title: en.thirdPartyTitle, content: en.thirdPartyDesc },
  { title: en.securityTitle, content: en.securityDesc },
  { title: en.changesTitle, content: en.changesDesc },
  { title: en.contactTitle, content: en.contactDesc },
];

/** 隐私政策章节数据（中文） */
const SECTIONS_ZH = [
  { title: zh.noCollectionTitle, content: zh.noCollectionDesc },
  { title: zh.localProcessingTitle, content: zh.localProcessingDesc },
  { title: zh.analyticsTitle, content: zh.analyticsDesc, note: translations.zh.privacy.analyticsOptOut + " " + translations.zh.privacy.gaIdNote },
  { title: zh.thirdPartyTitle, content: zh.thirdPartyDesc },
  { title: zh.securityTitle, content: zh.securityDesc },
  { title: zh.changesTitle, content: zh.changesDesc },
  { title: zh.contactTitle, content: zh.contactDesc },
];

export default function PrivacyContent() {
  return (
    <noscript>
      {/* 英文版 */}
      <section lang="en">
        <h1>{en.pageTitle}</h1>
        <p>{en.effectiveDate}</p>
        <p>{translations.en.privacy.intro}</p>

        {SECTIONS_EN.map((section, idx) => (
          <div key={idx}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            {section.note && <p>{section.note}</p>}
          </div>
        ))}
      </section>

      {/* 中文版 */}
      <section lang="zh">
        <h1>{zh.pageTitle}</h1>
        <p>{zh.effectiveDate}</p>
        <p>{translations.zh.privacy.intro}</p>

        {SECTIONS_ZH.map((section, idx) => (
          <div key={idx}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            {section.note && <p>{section.note}</p>}
          </div>
        ))}
      </section>
    </noscript>
  );
}
