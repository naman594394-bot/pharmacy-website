# Bharat Medical Store — Developer Notes

Static informational website for Bharat Medical Store (BMS), a retail pharmacy in Hapur, Uttar Pradesh, India.

---

## Replacing [PLACEHOLDER] Tokens

Search for the string `[PLACEHOLDER]` in `index.html` and replace each occurrence with real values before publishing.

Run this to find every token:

```bash
grep -n '\[PLACEHOLDER\]' index.html
```

| Token location in index.html | What to replace with |
|---|---|
| `href="tel:[PLACEHOLDER]"` | Full phone number, e.g. `+911234567890` |
| `aria-label="Call us at [PLACEHOLDER]"` | Same phone number |
| `<span ...>[PLACEHOLDER]</span>` (phone display) | Formatted phone number, e.g. `+91 12345 67890` |
| `href="https://wa.me/91[PLACEHOLDER]"` | 10-digit mobile number (no spaces), e.g. `9876543210` |
| `href="mailto:[PLACEHOLDER]"` | Email address, e.g. `info@bharatmedicalstore.in` |
| `aria-label="Email us at [PLACEHOLDER]"` | Same email address |
| `<span ...>[PLACEHOLDER]</span>` (email display) | Same email address |
| `href="https://instagram.com/[PLACEHOLDER]"` | Instagram username (no @), e.g. `bharatmedicalhapur` |
| `href="https://facebook.com/[PLACEHOLDER]"` | Facebook page slug or numeric ID |

After replacing, verify no `[PLACEHOLDER]` remains:

```bash
grep '\[PLACEHOLDER\]' index.html && echo "TOKENS REMAIN" || echo "All tokens replaced"
```

---

## Google Maps Embed URL

The current embed URL in `index.html` uses the public Google Maps query embed approach:

```
https://maps.google.com/maps?q=Jain+Gali+Kaserath+Bazar+Trivanti+Ganj+Hapur+Uttar+Pradesh+245101&output=embed
```

This works without an API key. If you want a more precise pin (e.g. using a Place ID), use the Google Maps Embed API with a key:

```
https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:YOUR_PLACE_ID
```

To find the Place ID: go to https://developers.google.com/maps/documentation/places/web-service/place-id and search for the store.

---

## Local Development

No build tools required. Open `index.html` directly in a browser:

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or serve with any static server:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx, no install needed)
npx serve .
```

---

## GitHub Pages Deployment

### 1. Create a GitHub repository

```bash
git init
git add .
git commit -m "feat(pharmacy): initial BMS static site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Enable GitHub Pages

- Go to the repository on GitHub.
- Click **Settings** → **Pages** (left sidebar).
- Under **Source**, select **Deploy from a branch**.
- Choose **main** branch, **/ (root)** folder.
- Click **Save**.

GitHub Pages will publish the site at:
`https://YOUR_USERNAME.github.io/YOUR_REPO/`

### 3. Verify

Wait ~60 seconds, then visit the URL above. The `index.html` at the repository root is served automatically.

---

## Custom Domain Setup

### Step 1 — Add CNAME file

Create a file named `CNAME` (no extension) in the repository root containing only your domain:

```
www.bharatmedicalstore.in
```

Commit and push it.

### Step 2 — Configure DNS

At your domain registrar, add a DNS record:

| Type | Name | Value |
|---|---|---|
| CNAME | www | YOUR_USERNAME.github.io |

For an apex domain (no www), add four `A` records pointing to GitHub Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Step 3 — Enable HTTPS

In **Settings → Pages**, check **Enforce HTTPS** after DNS propagates (can take up to 48 hours).

---

## File Structure

```
pharmacy/
  index.html    — full single-page site (all six sections)
  style.css     — all styles + CSS custom properties
  script.js     — hamburger toggle + keyboard/outside-click handling
  README.md     — this file
```

No build tools, no npm, no frameworks. Edit files directly and commit.
