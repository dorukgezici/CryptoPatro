import type { Portfolio } from './api';
import snapshot from './demo-portfolio.json';
// A read-only preview with explicitly illustrative quotes; the API replaces it after hydration.
export const demoPortfolio = snapshot as Portfolio;
