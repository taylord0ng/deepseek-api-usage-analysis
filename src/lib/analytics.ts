/**
 * Google Analytics 4 事件追踪辅助模块
 *
 * 封装 gtag() 调用，自动处理 GA_ID 未设置的情况。
 * 所有组件通过 trackEvent() 发送事件，避免在各处重复 typeof gtag 守卫。
 *
 * 使用方式：
 * - trackEvent('event_name', { key: 'value' })  — 自定义事件
 * - trackLandingCTA(page)                      — 落地页 CTA 点击
 * - trackPageView(location)                    — 客户端路由 page_view
 */

/** GA4 事件参数类型 */
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

/** GA4 页面浏览参数类型 */
interface GtagConfigParams {
  page_path: string;
}

/** gtag 函数签名 */
interface GtagFunction {
  (command: "event", eventName: string, params?: GtagEventParams): void;
  (command: "config", targetId: string, params: GtagConfigParams): void;
}

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

/**
 * 发送 GA4 自定义事件
 *
 * 当 NEXT_PUBLIC_GA_ID 未设置时，gtag 函数不存在，
 * 此时 trackEvent 静默跳过，不抛出错误。
 */
export function trackEvent(
  eventName: string,
  params?: GtagEventParams
): void {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    try {
      window.gtag("event", eventName, params);
    } catch {
      // gtag may not be fully initialized — silently ignore
    }
  }
}

/**
 * 落地页 CTA 转化追踪
 *
 * 用于 Cost Tracker / Cache Analyzer / Pricing Calculator 三个 SEO 落地页，
 * 当用户点击 "Analyze My Costs Now" 等主 CTA 按钮时触发。
 *
 * @param page - 落地页标识，如 'cost_tracker' | 'cache_analyzer' | 'pricing_calculator'
 * @param ctaPosition - CTA 位置，如 'hero' | 'bottom'
 */
export function trackLandingCTA(
  page: "cost_tracker" | "cache_analyzer" | "pricing_calculator",
  ctaPosition: "hero" | "bottom"
): void {
  trackEvent("landing_cta_click", {
    landing_page: page,
    cta_position: ctaPosition,
    event_category: "conversion",
  });
}

/**
 * 落地页外部链接点击追踪
 *
 * 用于追踪落地页上出站链接的点击（联盟链接、外部工具推荐等）。
 *
 * @param page - 来源落地页
 * @param target - 目标标识，如 'portkey' | 'helicone' | 'vultr' | 'mindrose'
 */
export function trackOutboundClick(
  page: "cost_tracker" | "cache_analyzer" | "pricing_calculator" | "affiliate_wall",
  target: string
): void {
  trackEvent("outbound_link_click", {
    landing_page: page,
    outbound_target: target,
    event_category: "engagement",
  });
}

/**
 * 客户端 page_view 手动上报
 *
 * 用于 SPA 场景或需要手动触发 page_view 的情况。
 * GA4 的 gtag('config', GA_ID) 已自动发送 initial page_view，
 * 此函数用于额外需要精确控制 page_view 的场景（如带 UTM 参数的落地页跳转）。
 *
 * @param location - 页面路径或完整 URL
 */
export function trackPageView(location: string): void {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID) return;
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    try {
      window.gtag("config", GA_ID, {
        page_path: location,
      });
    } catch {
      // silently ignore
    }
  }
}
