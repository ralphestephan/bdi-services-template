# BDI Services Template — Dynamic-Brand Contract

This repository is a **GitHub template** consumed by the MemberFlow website-
builder pipeline for tenants of type **SERVICES** or **BILLING**. Each
generated tenant site is a fork of this template wired to a tenant-specific
set of environment variables.

The template guarantees the following contract so MemberFlow can flip every
piece of branding by editing a single Supabase row (and Vercel env vars at
provisioning time).

---

## 1. Build-time brand (`lib/site.ts`)

`SITE` is the single brand constant consumed by SEO metadata, structured-
data generators, the navbar, the footer, and most marketing components. It
resolves from `NEXT_PUBLIC_BRAND_*` env vars at build time with BDI Corporate
values as fallback.

| Env var                              | Used for                       |
| ------------------------------------ | ------------------------------ |
| `NEXT_PUBLIC_BRAND_NAME`             | Site title, navbar, OG tags    |
| `NEXT_PUBLIC_BRAND_LEGAL_NAME`       | Footer, structured data        |
| `NEXT_PUBLIC_BRAND_TAGLINE`          | Hero subtitle default          |
| `NEXT_PUBLIC_BRAND_DESCRIPTION`      | `<meta description>`, OG       |
| `NEXT_PUBLIC_SITE_URL`               | Canonical URL, sitemap, OG     |
| `NEXT_PUBLIC_BRAND_SUPPORT_EMAIL`    | Contact CTA, footer            |
| `NEXT_PUBLIC_BRAND_PHONE`            | Contact CTA, footer            |
| `NEXT_PUBLIC_BRAND_TWITTER`          | Social meta + structured data  |
| `NEXT_PUBLIC_BRAND_LINKEDIN`         | Social meta + structured data  |
| `NEXT_PUBLIC_BRAND_OG_IMAGE`         | `og:image`                     |
| `NEXT_PUBLIC_BRAND_LOGO`             | Header/footer logo path        |
| `NEXT_PUBLIC_BRAND_KEYWORDS`         | Comma-separated SEO keywords   |

These are baked into the client bundle, so they require a redeploy to
change. For live edits without a rebuild, use the runtime layer below.

---

## 2. Runtime tenant brand (`lib/tenant-brand.ts`)

`getTenantBrand()` (server) and `useSiteBrand()` (client) read the live
tenant brand from Supabase via the `get_tenant_brand` RPC. Results are
cached via Next ISR for **60 seconds** — brand edits in MemberFlow propagate
within a minute, no redeploy required.

### Required env

| Env var                                 | Notes                                |
| --------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_BDI_ORGANIZATION_ID`       | Tenant `organizations.id`            |
| `NEXT_PUBLIC_SUPABASE_URL`              | MemberFlow Supabase project URL      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`         | Public anon JWT                      |

When any of these are missing, `getTenantBrand()` returns the env defaults
so the site still renders correctly during initial template-fork bring-up.

### RPC contract

```sql
get_tenant_brand(p_organization_id uuid) RETURNS jsonb
-- Returns the merged brand from organizations.settings.brand:
--   name, legal_name, tagline, description, site_url, support_email,
--   phone, primary_color, accent_color, logo_url, og_image, twitter,
--   linkedin, enabled_sections (string[])
```

`enabled_sections` is the per-tenant flag set used by page templates to
selectively render `services-grid`, `case-studies`, `contact-form`, etc.

---

## 3. Submissions pipeline

All form-submission routes accept an optional `organizationId` in the body.
The server resolves the tenant via `lib/tenant.ts` (Prisma) and uses the
tenant's Resend `from` + admin email for confirmation/notification mails.
Cross-origin posts must match `tenant.allowedOrigins`; first-party (BDI)
requests bypass the check.

Routes:
- `POST /api/contact`
- `POST /api/newsletter`
- `POST /api/booking`
- `POST /api/orders`

---

## 4. i18n

The template ships with EN routes at `/` and AR routes at `/ar/*`. Adding a
locale = scaffold a new top-level route + extend `lib/languages.ts`.
`lib/translations.ts` is keyed by locale + section.

---

## 5. What the template does NOT promise

- Hardcoded **marketing copy** (service descriptions, hero variants,
  testimonials, case-study text) is still BDI Corporate's copy. Operators
  cloning the template are expected to rewrite these by hand or via the
  AI editor in MemberFlow before going live. See the `app/services/_data.ts`
  and `doc/*` files for the canonical copy that needs replacing.
- Hardcoded **imagery** (`public/*.png`, `.jpg`, `.webp`) is BDI's; swap
  the assets keeping the same filenames or update component imports.
- Phone numbers / email addresses inlined into JSX (search for `+961` and
  `bdicorporate.com`) are not automatically rewritten. Operators should
  audit and switch these to `SITE.contact.email` / `SITE.contact.phone`.

These limitations are tracked as Wave 16 follow-ups in the MemberFlow
marketing-launch plan.
