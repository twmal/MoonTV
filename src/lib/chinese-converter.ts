import { Converter } from 'opencc-js';

// 創建轉換器實例
const traditionalToSimplified = Converter({ from: 'hk', to: 'cn' });
const simplifiedToTraditional = Converter({ from: 'cn', to: 'hk' });

/**
 * 將繁體中文轉換為簡體中文
 * @param text 要轉換的文本
 * @returns 轉換後的簡體中文文本
 */
export function convertToSimplified(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  try {
    return traditionalToSimplified(text);
  } catch (error) {
    console.warn('繁體轉簡體失敗:', error);
    return text;
  }
}

/**
 * 將簡體中文轉換為繁體中文
 * @param text 要轉換的文本
 * @returns 轉換後的繁體中文文本
 */
export function convertToTraditional(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  try {
    return simplifiedToTraditional(text);
  } catch (error) {
    console.warn('簡體轉繁體失敗:', error);
    return text;
  }
}

/**
 * 檢測文本是否包含繁體中文字符
 * @param text 要檢測的文本
 * @returns 是否包含繁體中文
 */
export function hasTraditionalChinese(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  // 常見的繁體中文字符範圍和特定字符
  const traditionalChineseRegex = /[\u4e00-\u9fff]/;
  const commonTraditionalChars = /[繁體電視劇電影動畫紀錄片綜藝節目戲劇連續劇]/;
  
  // 如果包含常見繁體字符，則認為是繁體
  if (commonTraditionalChars.test(text)) {
    return true;
  }
  
  // 簡單的繁簡對比檢測
  const simplified = convertToSimplified(text);
  return text !== simplified;
}

/**
 * 為搜尋生成多個查詢變體（包括原文、簡體、繁體）
 * @param query 原始查詢字符串
 * @returns 查詢變體數組
 */
export function generateSearchVariants(query: string): string[] {
  if (!query || typeof query !== 'string') {
    return [query];
  }
  
  const variants = new Set<string>();
  const trimmedQuery = query.trim();
  
  // 添加原始查詢
  variants.add(trimmedQuery);
  
  // 添加簡體版本
  const simplified = convertToSimplified(trimmedQuery);
  if (simplified !== trimmedQuery) {
    variants.add(simplified);
  }
  
  // 添加繁體版本
  const traditional = convertToTraditional(trimmedQuery);
  if (traditional !== trimmedQuery) {
    variants.add(traditional);
  }
  
  return Array.from(variants);
}