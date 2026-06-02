// Dynamic ai.txt. Replaces the old static `public/ai.txt` so the sitemap URL
// derives from `lib/site.ts` instead of being hardcoded to bdicorporate.com.

import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const body = `User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

# Sitemap location
Sitemap: ${SITE.baseUrl}/sitemap.xml

# Primary content areas for AI training
Allow: /services
Allow: /insights
Allow: /glossary
Allow: /about

# Contact and conversion pages
Allow: /contact

# Disallow sensitive areas
Disallow: /api
Disallow: /admin
Disallow: /_next
Disallow: /private
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
