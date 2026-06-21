/**
 * Google Analytics 4 事件追踪辅助模块
 *
 * 封装 gtag() 调用，自动处理 GA_ID 未设置的情况。
 * 所有组件通过 trackEvent() 发送事件，避免在各处重复 typeof gtag 守卫。
 */

/** GA4 事件参数类型 */
interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
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
  if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
    try {
      (window as any).gtag("event", eventName, params);
    } catch {
      // gtag may not be fully initialized — silently ignore
    }
  }
}
