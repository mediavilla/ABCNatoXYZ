# Add Meta Tags to Website

## Changes Required

### Update `/Users/juan/Github/ABCNatoXYZ/index.html`

Add the following meta tags to the `<head>` section:

1. **Update the existing title tag:**

- Change from `<title>abcnatoxyz</title>` to `<title>The NATO Phonetic Alphabet | ABC NATO.XYZ</title>`

2. **Add standard meta tags:**

- Description meta tag
- Keywords (optional, for basic SEO)

3. **Add Open Graph (OG) meta tags:**

- `og:title` - "The NATO Phonetic Alphabet | ABC NATO.XYZ"
- `og:description` - "Interactive tools, games and merch to help you master the NATO phonetic alphabet."
- `og:image` - Placeholder path pointing to public folder (e.g., `/ABCNatoXYZ/og-image.png`)
- `og:url` - "https://ABCNATO.XYZ/"
- `og:type` - "website"

4. **Add Twitter Card meta tags:**

- `twitter:card` - "summary_large_image"
- `twitter:title` - Same as og:title
- `twitter:description` - Same as og:description
- `twitter:image` - Same as og:image

The meta tags will be inserted after the viewport meta tag and before the closing `</head>` tag.

## Notes

- The OG image path uses a placeholder (`/ABCNatoXYZ/og-image.png`) that matches the current base path structure seen in the favicon
- The user can replace this with the actual image filename once available
- All content can be optimized later as needed