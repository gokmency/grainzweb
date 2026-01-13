# GRAINZ — SEO & Entity Strategy Source of Truth

**Last Updated:** 2024-05-22
**Domain:** https://grainz.site
**Status:** Live / Production Ready

---

## 1. Core Entity Definition
Grainz is a **build-oriented studio** that designs, develops, and builds products, systems, and communities.
It is **not** a marketing agency or a generic software house.

### Pillars
- Build
- Design
- Development
- Community
- Studio Mindset

## 2. Founders (Entity Authorities)
The founders must always be linked to the `Organization` schema.

1. **Burak Gökmen Çelik**
   - **Role:** Founder & Developer
   - **Focus:** Technical production, systems, infrastructure.
   - **SameAs:** https://x.com/gokmeneth

2. **Burak Yüzgüç**
   - **Role:** Founder & Designer
   - **Focus:** Visual identity, brand experience.
   - **SameAs:** https://x.com/100guc

## 3. Technical Implementation Strategy (Invisible)

### A. Structured Data (JSON-LD)
We use a connected graph strategy:
`Organization` -> `Brand` -> `WebSite` -> `WebPage` -> `Person` (Founders) -> `FAQPage`

- **Organization:** Defines Grainz, its logo, and founders.
- **Person:** Detailed founder profiles with job titles and descriptions.
- **FAQPage:** Explicitly answers "What is Grainz?" for AI/LLM grounding.
- **ImageObject:** Explicitly defines the logo and founder photos for Google Images.

### B. Semantic HTML
- **h1:** "WE BUILD THINGS" (Single H1 rule)
- **role="main":** Main content wrapper.
- **role="contentinfo":** Footer / Copyright section.
- **aria-label:** Added to all icon-only buttons and navigation elements.

### C. Meta Architecture
- **Title:** `Grainz — We Build Things | Design, Development & Community Studio`
- **Description:** "Grainz is a build-oriented studio that designs, develops, and builds digital products, systems, and community-driven structures..."

## 4. Risk Assessment & Guardrails

### 🚫 FORBIDDEN ACTIONS (Risk Level: CRITICAL)
- **No Visible UI Changes:** Do not touch layout, colors, or visible text.
- **No Keyword Stuffing:** Do not add hidden text or spammy meta tags.
- **No Backlink Spam:** Do not engage in link schemes.

### ⚠️ WARNINGS
- **Canonical Conflict:** `grainz.space` is a secondary vertical. `grainz.site` MUST remain the canonical authority for the brand.
- **AI Hallucinations:** Monitor search results for "What is Grainz?". If generic answers appear, strengthen the `FAQPage` schema.

## 5. Maintenance Checklist
- [ ] Verify `sitemap.xml` after new deployments.
- [ ] Check `robots.txt` is not blocking critical assets.
- [ ] Validate JSON-LD using Google Rich Results Test.
- [ ] Ensure Founder images are accessible and have correct alt text (invisible to user, visible to bots).
