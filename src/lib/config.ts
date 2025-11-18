export const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3000/";
  }
  
  // Приоритет: VITE_APP_URL > VERCEL_URL > fallback
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL;
  }
  
  if (import.meta.env.VERCEL_URL) {
    return `https://${import.meta.env.VERCEL_URL}/`;
  }
  
  // На случай если переменные не установлены (например, локальный билд)
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/`;
  }
  
  return "/";
};

export const config = {
  baseURL: getBaseURL(),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Helper to build absolute URLs
export const buildUrl = (path: string) => {
  const base = config.baseURL;
  if (path.startsWith("http")) {
    return path;
  }
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};
