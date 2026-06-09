# Google Login + 5 AI Requests Per Day

## 1. Create Supabase project

Create a free project at:

```text
https://supabase.com/dashboard
```

## 2. Run database SQL

Open `SQL Editor`, paste all content from `supabase.sql`, then run it.

## 3. Enable Google login

In Supabase:

```text
Authentication -> Providers -> Google
```

Enable Google and enter the Google OAuth Client ID and Client Secret.

In Google Cloud, add the callback URL shown by Supabase. It normally looks like:

```text
https://YOUR_PROJECT.supabase.co/auth/v1/callback
```

In Supabase `Authentication -> URL Configuration`, add:

```text
https://shopcontentvn-ai.onrender.com
```

to the allowed redirect URLs.

## 4. Add Render environment variables

Open Render:

```text
shopcontentvn-ai -> Environment
```

Add:

```text
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
OPENAI_VISION_MODEL=gpt-4.1-mini
```

`SUPABASE_ANON_KEY` is public and is sent to the browser.

`SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` must only exist in Render
environment variables. Never put them in GitHub or frontend JavaScript.

## 5. Redeploy

After saving environment variables, redeploy the Render service.

The server verifies every Supabase access token and allows five combined AI
requests per user per Vietnam calendar day. Both content generation and image
analysis consume one request.
