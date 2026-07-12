/**
 * 文件说明：结构化数据 JSON-LD 通用渲染组件。
 *
 * 统一封装页面中的 `<script type="application/ld+json">` 注入逻辑，
 * 复用 Next.js 官方推荐的输出方式，并对潜在的 `<` 字符进行转义。
 */

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * 将结构化数据渲染为 JSON-LD `<script>` 标签。
 *
 * 这里会将 `<` 转义为 `\u003c`，避免 JSON 字符串被误解析为 HTML。
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
