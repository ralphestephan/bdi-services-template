module.exports = {
  siteUrl: "https://bdicorporate.com",
  generateRobotsTxt: false, // We have custom robots.ts
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/api/*",
    "/404",
    "/_*",
    "/admin/*",
    "/private/*",
    "/temp/*",
    "/draft/*",
  ],
  alternateRefs: [
    {
      href: 'https://bdicorporate.com',
      hreflang: 'en',
    },
    {
      href: 'https://bdicorporate.com/ar',
      hreflang: 'ar',
    },
  ],
  transform: async (config, path) => {
    // Custom priorities and change frequencies for different page types
    const pageConfig = {
      "/": { priority: 1.0, changefreq: "daily" },
      "/services": { priority: 0.9, changefreq: "weekly" },
      "/services/systems-integration": { priority: 0.9, changefreq: "weekly" },
      "/services/crm-pos": { priority: 0.9, changefreq: "weekly" },
      "/services/erp": { priority: 0.9, changefreq: "weekly" },
      "/services/financial-analysis": { priority: 0.9, changefreq: "weekly" },
      "/services/ai-automation": { priority: 0.9, changefreq: "weekly" },
      "/about": { priority: 0.8, changefreq: "monthly" },
      "/contact": { priority: 0.8, changefreq: "monthly" },
      "/insights": { priority: 0.7, changefreq: "weekly" },
      "/glossary": { priority: 0.6, changefreq: "monthly" },
      "/locations/dubai": { priority: 0.7, changefreq: "monthly" },
      "/locations/lebanon": { priority: 0.7, changefreq: "monthly" },
    };

    const config_override = pageConfig[path] || {};
    
    // Dynamic priority based on path depth and type
    let defaultPriority = config.priority;
    if (path.includes('/insights/') && path !== '/insights') defaultPriority = 0.6;
    if (path.includes('/glossary/') && path !== '/glossary') defaultPriority = 0.5;
    if (path.includes('/locations/')) defaultPriority = 0.7;

    return {
      loc: path,
      changefreq: config_override.changefreq || config.changefreq,
      priority: config_override.priority || defaultPriority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs || [],
    };
  },
};
