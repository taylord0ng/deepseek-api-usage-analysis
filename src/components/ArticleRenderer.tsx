"use client";

import Link from "next/link";
import type { ArticleSection, PricingRow } from "@/lib/content";

/* ===== Props ===== */

interface ArticleRendererProps {
  sections: ArticleSection[];
  pricingTable?: {
    headers: string[];
    rows: PricingRow[];
  };
}

/* ===== Inline HTML 渲染 ===== */

/**
 * 将段落字符串渲染为 JSX。
 * 支持 <strong>, <em>, <a href="...">, <code> 四种内联标签。
 * 内容来自项目自身的 content 模块，XSS 安全。
 */
function RichParagraph({ html }: { html: string }) {
  return (
    <p
      className="mb-3 text-sm leading-relaxed text-pretty"
      style={{ color: "var(--text-secondary)" }}
      dangerouslySetInnerHTML={{
        __html: html
          .replace(
            /<a href="([^"]+)">([^<]*)<\/a>/g,
            (_: string, href: string, text: string) => {
              const isInternal = href.startsWith("/") || href.startsWith("mailto:");
              return `<a href="${href}" ${isInternal ? "" : 'target="_blank" rel="sponsored nofollow noopener noreferrer"'} class="underline" style="color:var(--accent)">${text}</a>`;
            }
          )
          .replace(
            /<code>([^<]*)<\/code>/g,
            '<code class="text-xs px-1 py-0.5 rounded font-mono" style="background:var(--border);color:var(--text-primary)">$1</code>'
          ),
      }}
    />
  );
}

/* ===== 主渲染器 ===== */

export default function ArticleRenderer({ sections, pricingTable }: ArticleRendererProps) {
  return (
    <>
      {sections.map((section, si) => (
        <section key={si} className="mb-10">
          <h2
            className="text-xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {section.heading}
          </h2>

          {section.blocks.map((block, bi) => {
            switch (block.type) {
              case "h3":
                return (
                  <h3
                    key={bi}
                    className="text-base font-semibold mt-6 mb-2"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
                  >
                    {block.content}
                  </h3>
                );
              case "p":
                return <RichParagraph key={bi} html={block.content} />;
              case "ul":
                return (
                  <ul key={bi} className="list-disc pl-5 mb-3 space-y-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {block.items.map((item, ii) => <li key={ii}>{item}</li>)}
                  </ul>
                );
              case "ol":
                return (
                  <ol key={bi} className="list-decimal pl-5 mb-4 space-y-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {block.items.map((item, ii) => <li key={ii}>{item}</li>)}
                  </ol>
                );
              case "inline_code":
                return (
                  <code
                    key={bi}
                    className="block text-xs px-2 py-1.5 rounded font-mono mb-3"
                    style={{ background: "var(--border)", color: "var(--text-primary)" }}
                  >
                    {block.content}
                  </code>
                );
              case "compare_note":
                return (
                  <p key={bi} className="text-xs mb-6" style={{ color: "var(--text-tertiary)" }}>
                    {block.content}
                  </p>
                );
              default:
                return null;
            }
          })}
        </section>
      ))}

      {/* 定价对比表 */}
      {pricingTable && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full text-xs" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {pricingTable.headers.map((h, hi) => (
                  <th
                    key={hi}
                    className={`py-2 ${hi === 0 ? "text-left pr-4" : "text-right px-3"}`}
                    style={{ color: hi === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}
                  >
                    {h}
                  </th>
                ))}
                <th className="text-left py-2 pl-3" style={{ color: "var(--text-secondary)" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {pricingTable.rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td
                    className={`py-2.5 pr-4 ${row.modelColor ? "font-semibold" : ""}`}
                    style={{ color: row.modelColor || "var(--text-primary)" }}
                  >
                    {row.model}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: row.inputColor || "var(--text-primary)" }}>
                    {row.input}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: row.outputColor || "var(--text-primary)" }}>
                    {row.output}
                  </td>
                  <td className="text-right py-2.5 px-3 font-mono" style={{ color: row.cacheHitColor || "var(--text-primary)" }}>
                    {row.cacheHit}
                  </td>
                  <td className="py-2.5 pl-3" style={{ color: "var(--text-tertiary)" }}>
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
