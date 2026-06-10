# Google Login + 5 AI Requests Per Day

## 1. Create Supabase project

Create a free project at:

```text
https://supabase.com/dashboard
```

## 2. Run database SQL

Open `SQL Editor`, paste all content from `supabase.sql`, then run it.

The SQL also creates `content_history` with Row Level Security. Every signed-in
user can only read, add, and delete their own history. Product images are not
stored in this table.

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

For this project, the Google OAuth Web client must contain:

```text
Authorized JavaScript origin:
https://shopcontentvn-ai.onrender.com

Authorized redirect URI:
https://ghhclkwqoeoewaesblmq.supabase.co/auth/v1/callback
```

In Supabase `Authentication -> URL Configuration`, add:

```text
Site URL:
https://shopcontentvn-ai.onrender.com

Redirect URL:
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
SUPABASE_ANON_KEY=your-publishable-or-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-or-service-role-key
OPENAI_API_KEY=your-openai-api-key
OPENAI_VISION_MODEL=gpt-4.1-mini
```

`SUPABASE_ANON_KEY` is public and is sent to the browser.

`SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` must only exist in Render
environment variables. Never put them in GitHub or frontend JavaScript.

The server supports both the new `sb_secret_...` key and the legacy
`service_role` JWT key.

## 5. Redeploy

After saving environment variables, redeploy the Render service.

The server verifies every Supabase access token and allows five image-analysis
requests per user per Vietnam calendar day.

Content generation from text is free and does not require Google login.
Google login is only required for image analysis, which consumes one of the
five daily image-analysis requests.
