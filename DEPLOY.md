# Deploying Kriyvo AI on Vercel (free Hobby plan)

## 1. Import the project
1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, pick the repository. Vercel detects the build automatically
   (`npm run build`; Nitro outputs a Vercel-ready server).

## 2. Add environment variables
Vercel → Project → **Settings → Environment Variables**. Add each for *Production* and *Preview*:

| Name | Value | Required |
|---|---|---|
| `APIFY_TOKEN` | your Apify API token (rotate the one shared in chat first) | yes |
| `APIFY_ACTOR` | `harvestapi~linkedin-profile-scraper` | yes |
| `RESEND_API_KEY` | your Resend API key (rotate the one shared in chat first) | yes |
| `INVITE_FROM` | `Kriyvo AI <hello@kriyvoai.online>` | yes |
| `SITE_URL` | `https://kriyvoai.online` | yes |
| `PLAYGROUND_SECRET` | output of `openssl rand -hex 32` | yes |
| `TURNSTILE_SECRET_KEY` / `VITE_TURNSTILE_SITE_KEY` | from Cloudflare Turnstile | recommended |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | from Upstash Redis | recommended |

Secrets are only read by server functions. Only variables starting with `VITE_` reach the browser,
and the Turnstile *site* key is meant to be public.

## 3. Connect the domain
Vercel → Project → **Settings → Domains** → add `kriyvoai.online` and follow the DNS instructions.
Keep the Resend DNS records you already added.

## 4. Recommended bot protection (free, ~10 minutes)
- **Cloudflare Turnstile** — dash.cloudflare.com → Turnstile → Add site → domain `kriyvoai.online`,
  widget mode *Managed*. Copy the site key and secret key into the two variables above.
- **Upstash Redis** — console.upstash.com → Create database (free) → REST API tab → copy URL and token.
  Without it, rate limits still work but are per server instance instead of shared.

## 5. Spending safety net
Apify → Settings → Usage & billing → set a monthly limit (e.g. $5). Each demo costs about $0.004.

## Limits built into the demo
- 3 demos per IP per day, 2 per LinkedIn profile per day, 1 email per address per day.
- Only `linkedin.com/in/...` URLs are accepted; consent is required.
- Scraped data is deleted from Apify immediately after the invite is written and never stored by the site.

## Live demo keys (Netlify → Site configuration → Environment variables)

| Key | Used by |
|---|---|
| `GROQ_API_KEY` | Website assistant, feedback classifier, voice receptionist's replies |
| `GROQ_CHAT_MODEL` | Optional, default `openai/gpt-oss-120b` |
| `GROQ_FALLBACK_MODEL` | Optional, default `openai/gpt-oss-20b`; used when the main model is rate limited or down |
| `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID` | Voice receptionist's speech |
| `ELEVENLABS_TTS_MODEL` | Optional, default `eleven_flash_v2_5` |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limits shared across serverless instances (strongly recommended in production) |

Every demo that spends credit is rate limited in `src/lib/demo-guards.ts` (`LIMITS`): a per-minute burst and a daily limit per visitor, plus a daily cap across all visitors. Without Upstash the counters live in memory per function instance, which is much weaker on Netlify. Without a key, each demo falls back to a scripted version.

### When a key runs out or a provider is down

No demo shows a dead end:

- **Chatbot, feedback classifier, voice replies:** Groq main model → Groq fallback model → scripted answers.
- **Voice:** ElevenLabs → the browser's built-in speech voice.
- **Outreach:** Apify → an invite written from the name in the LinkedIn URL, marked as a sample. Resend → "copy the invite instead".
- **Over a visitor's daily share or the global cap:** scripted answers, so no more credit is spent. Only rapid bursts are refused outright.

A provider that fails is skipped for a cool-down so visitors don't wait on it: 10 minutes for an invalid or exhausted key (401/402/403), Retry-After or 2 minutes for 429, 30 seconds for outages or timeouts. Watch the function logs for `unavailable (...)` lines to know when to top up or rotate a key.
