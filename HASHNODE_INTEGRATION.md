# Hashnode Integration & SEO Strategy

This document outlines how the blog integration with Hashnode works for `grainz.site`.

## 1. Hashnode Configuration

- **Source Host**: `grainz.hashnode.dev` (The technical Hashnode domain).
- **Target Host**: `grainz.site` (The custom domain where content is consumed).

### Why `grainz.hashnode.dev`?
The previous configuration pointed to `grainz.site` as the source host. However, the Hashnode API requires the **publication's handle** (e.g., `grainz.hashnode.dev`) or a fully propagated custom domain to return data. Using `grainz.hashnode.dev` as the default source ensures reliability even if DNS settings fluctuate.

### Environment Variable Override
You can override the source host without code changes by setting the environment variable in Vercel:
```env
VITE_HASHNODE_HOST=your-custom-host.com
```

## 2. SEO & Canonical Strategy

Since content exists on both Hashnode and `grainz.site`, we must prevent duplicate content penalties.

### Strategy: Self-Referencing Canonical on `grainz.site`
We treat `grainz.site` as the authority for its own pages.

- **Content Hub**: Canonical -> `https://grainz.site/content-hub`
- **Article Detail**: Canonical -> `https://grainz.site/content-hub/article/slug-here`

### Implementation
We use `react-helmet-async` to dynamically inject:
- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph tags (`og:title`, `og:image`, etc.)

This ensures that when links are shared on social media (Twitter/X, LinkedIn), the correct preview card for `grainz.site` appears.

## 3. Automatic Sync Workflow

1.  **Publish** an article on Hashnode (`grainz.hashnode.dev`).
2.  **Wait** ~1-5 minutes for Hashnode's API cache to clear (sometimes instant).
3.  **Visit** `grainz.site/content-hub`.
4.  The new article appears **automatically**.

**No redeploy is required.** The integration uses Client-Side Rendering (CSR) to fetch the latest data from Hashnode's GraphQL API at runtime.

## 4. Troubleshooting

**Issue**: "My post isn't showing up."
- **Check**: Did you publish it? (Drafts are not fetched).
- **Check**: Is `VITE_HASHNODE_HOST` set correctly? (Default is safe).
- **Check**: Clear your browser cache or wait a few minutes.

**Issue**: "SEO tags are wrong on Twitter."
- **Check**: Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator) with your `grainz.site` URL.
- **Note**: Since this is a SPA (Single Page App), some older crawlers might not execute JS. However, Google and modern social bots generally handle this well.
