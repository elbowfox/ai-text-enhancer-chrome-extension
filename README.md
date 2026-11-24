# AI Text Enhancer Chrome Extension

Passive revenue ready Chrome extension that lets users rewrite, summarize, expand, or improve any selected text using AI (OpenAI or xAI/Grok).

## Monetization Potential
- Freemium: Free tier with limited daily uses (add rate limiting later), paid subscription $5-9/mo for unlimited.
- Lifetime deal $49-79 for early adopters.
- High demand for AI writing helpers. Similar extensions generate $5K-30K+ MRR.
- Zero server costs if users bring their own API key (BYOK model).

## Features
- Right-click any selected text → Rewrite / Summarize / Expand / Improve / Casual / Formal
- Supports OpenAI and xAI (Grok) APIs
- Clean popup with copy button
- Settings page for API key

## Installation (Developer Mode)
1. Download or clone this repo.
2. Open Chrome → `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → select this folder
5. Set your API key in the extension options (right-click icon → Options)

## Chrome Web Store Deployment
1. Create icons (16, 48, 128 px) and place in `/icons/`
2. Zip the folder
3. Go to Chrome Web Store Developer Dashboard
4. Upload, fill listing, privacy policy (BYOK, no data collected)
5. Submit for review

## Monetization Setup (Recommended)
- Add usage counter in chrome.storage
- After X free uses, prompt for upgrade
- Use Stripe + LemonSqueezy or ExtensionPay for payments
- Verify license via your backend or simple key check

## AI Automation
This extension can be maintained and improved by AI agents. Update prompts, add models, or build new features with minimal human input.

**Revenue note**: Significant income requires marketing (Product Hunt, Reddit, Twitter/X, Chrome Web Store SEO). Organic discovery from store search is possible for well-named tools.