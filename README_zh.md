# DeepSeek 用量仪表盘

拖拽 DeepSeek 平台的月度 CSV 导出文件，即可查看费用分析、各 Key 用量明细、缓存命中分析和用量趋势。所有数据仅存在于浏览器中 — 无需上传、无需后端、无需注册。

> 🇬🇧 [English version](README.md)

## 使用方式

1. 前往 [DeepSeek 平台](https://platform.deepseek.com) → 用量 → 导出月度 CSV
2. 会得到两个文件：`amount-{年份}-{月份}.csv` 和 `cost-{年份}-{月份}.csv`
3. 将两个文件拖拽到仪表盘上
4. 图表即刻渲染 — 数据不会离开你的浏览器

## 功能特性

- **总览** — KPI 大数字展示（费用、Token、缓存命中率、活跃 Key）+ 每日费用柱状图 + 各 Key 费用环形图
- **按 Key** — 可排序表格，展示每个 Key 的 Token 数、费用、缓存命中率、请求次数及内嵌用量条
- **缓存** — 大字号命中率仪表盘、每日缓存趋势图、各 Key 缓存命中/未命中堆叠图
- **趋势** — 可切换指标的折线图（费用 / Token / 缓存命中率 / 请求次数）
- **🌓 深色模式** — 完整的浅色/深色双主题支持，自动检测系统偏好，也可手动切换
- **🎨 Apple 极简设计** — 干净、通透的「无卡片」通栏模块布局，细横线分割，弥散阴影
- **🔍 模型筛选** — 分段控件胶囊按钮，按模型过滤所有视图（全部 / deepseek-chat / deepseek-reasoner 等）
- **🌐 多语言** — 支持英文和中文，根据浏览器自动检测；可手动切换
- **零配置** — 自动识别 DeepSeek 平台的 CSV 格式
- **100% 隐私** — 所有数据由 Papa Parse 在浏览器本地处理

## CSV 格式

DeepSeek 平台标准导出格式：

### `amount-{年份}-{月份}.csv`

| 列名 | 说明 |
|------|------|
| `utc_date` | 使用日期 |
| `model` | 模型名称，如 `deepseek-chat`、`deepseek-reasoner` |
| `api_key_name` | API Key 标签 |
| `api_key` | Key（脱敏） |
| `type` | `request_count`、`output_tokens`、`input_cache_hit_tokens`、`input_cache_miss_tokens` |
| `price` | 单价（人民币） |
| `amount` | 数量 |

### `cost-{年份}-{月份}.csv`

| 列名 | 说明 |
|------|------|
| `utc_date` | 扣费日期 |
| `model` | 模型名称 |
| `cost` | 金额（负数为扣费） |
| `currency` | 币种（CNY） |

## 本地开发

```bash
npm install
npm run dev        # 开发服务器 → localhost:3000
npm run build      # 静态导出 → out/
```

可使用 `public/sample-amount-2026-06.csv` 和 `public/sample-cost-2026-06.csv` 进行测试。

### 技术栈

Next.js 16（静态导出）· React 19 · TypeScript · ECharts · Papa Parse · Tailwind CSS 4 · CSS 自定义属性

## 部署

静态输出，可部署到任何静态托管服务：

```bash
npm run build
# out/ → Vercel, Netlify, GitHub Pages, Cloudflare Pages
```

## 开源协议

MIT
