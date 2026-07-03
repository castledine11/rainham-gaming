# Rainham Gaming static website

A static event website for the Rainham Gaming event. It is designed to match the supplied poster artwork while keeping the event details readable, responsive and accessible.

## Files

- `index.html` — page content and structure
- `styles.css` — responsive visual design
- `script.js` — mobile navigation and copy buttons
- `assets/` — optimised poster, RG logo, favicon and social preview image
- `_headers` — security headers for Netlify / Cloudflare Pages-style static hosting
- `netlify.toml` — Netlify header configuration
- `vercel.json` — Vercel header configuration
- `robots.txt` and `sitemap.xml` — starter SEO files

## Event details currently used

- Date: 7th August
- Time: 11am – 5pm
- Location: The Oast, Rainham, ME8 7SG
- Entry: £2 per person
- Contact: rainhamgaming@gmail.com
- Fundraising for: My Shining Star

## Local preview

Open `index.html` directly in a browser, or run a small local server from this folder:

```bash
python -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Before publishing

1. Replace `https://example.com/` in `robots.txt` and `sitemap.xml` with the real domain.
2. Confirm the event year if you want event schema markup added later.
3. Confirm whether there is a WhatsApp community URL, ticket link or sign-up form.
4. Confirm final tournament rules, age guidance, accessibility notes and whether visitors need to bring anything.
5. If using a custom domain, enable HTTPS before relying on HSTS.

## Security notes

This site has no backend, no database, no external script dependencies, no tracking and no public form. That reduces the attack surface.

Recommended static hosting settings are included:

- Content Security Policy
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- restrictive Permissions Policy
- HTTPS-only HSTS once the domain is configured correctly

If you add forms, analytics, payment, ticketing or embedded maps later, the Content Security Policy will need to be adjusted deliberately rather than weakened broadly.
