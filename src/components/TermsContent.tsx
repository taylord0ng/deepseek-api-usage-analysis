/**
 * Terms 页内容 —— 服务端渲染回退组件
 *
 * 将使用条款的完整中英双语内容以纯 HTML 形式输出，
 * 包裹在 <noscript> 中。确保不执行 JavaScript 的爬虫
 * 也能抓取到法律文本内容（对 EEAT 信任信号至关重要）。
 *
 * 浏览器（JS 开启时）不会渲染 <noscript> 内部内容，
 * 实际的交互式内容由 TermsPage.tsx 客户端组件负责渲染。
 */
import translations from "@/i18n/translations";

const en = translations.en.terms;
const zh = translations.zh.terms;

/**
 * 使用条款章节数据（英文）
 *
 * 每个章节包含 title 和 content，与 TermsPage.tsx 客户端组件
 * 中的 sections 结构保持一致。
 */
const SECTIONS_EN = [
  { title: en.asIsTitle, content: en.asIsDesc },
  { title: en.noWarrantyTitle, content: en.noWarrantyDesc },
  { title: en.notAffiliatedTitle, content: en.notAffiliatedDesc },
  { title: en.userDataTitle, content: en.userDataDesc },
  { title: en.openSourceTitle, content: en.openSourceDesc, note: translations.en.terms.openSourceLicense },
  { title: en.limitationTitle, content: en.limitationDesc },
  { title: en.changesTitle, content: en.changesDesc },
  { title: en.contactTitle, content: en.contactDesc },
];

/** 使用条款章节数据（中文） */
const SECTIONS_ZH = [
  { title: zh.asIsTitle, content: zh.asIsDesc },
  { title: zh.noWarrantyTitle, content: zh.noWarrantyDesc },
  { title: zh.notAffiliatedTitle, content: zh.notAffiliatedDesc },
  { title: zh.userDataTitle, content: zh.userDataDesc },
  { title: zh.openSourceTitle, content: zh.openSourceDesc, note: translations.zh.terms.openSourceLicense },
  { title: zh.limitationTitle, content: zh.limitationDesc },
  { title: zh.changesTitle, content: zh.changesDesc },
  { title: zh.contactTitle, content: zh.contactDesc },
];

export default function TermsContent() {
  return (
    <noscript>
      {/* 英文版 */}
      <section lang="en">
        <h1>{en.pageTitle}</h1>
        <p>{en.effectiveDate}</p>
        <p>{translations.en.terms.intro}</p>

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
        <p>{translations.zh.terms.intro}</p>

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
