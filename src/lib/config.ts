export const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3000/";
  }
  return (
    import.meta.env.VITE_APP_URL ||
    import.meta.env.VERCEL_URL 
      ? `https://${import.meta.env.VERCEL_URL}/`
      : "/"
  );
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
