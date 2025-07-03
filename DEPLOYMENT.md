# Cloudflare Pages Deployment Guide

This guide explains how to deploy the Liquid Glass Demo application to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. A GitHub repository with your code
3. Node.js 18+ installed locally

## Deployment Options

### Option 1: Cloudflare Pages Dashboard (Recommended)

1. **Connect Repository**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub account
   - Select your repository

2. **Configure Build Settings**
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/` (leave empty if project is in root)

3. **Environment Variables**
   Set these in the Cloudflare Pages dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
   NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
   NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your site

### Option 2: GitHub Actions (Automated)

1. **Set Repository Secrets**
   In your GitHub repository settings, add these secrets:
   ```
   CLOUDFLARE_API_TOKEN=your_api_token
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
   NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
   NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
   ```

2. **Get Cloudflare Credentials**
   - API Token: Go to Cloudflare Dashboard → My Profile → API Tokens → Create Token
   - Use "Custom token" with permissions:
     - Zone:Zone:Read
     - Zone:Page Rules:Edit
     - Account:Cloudflare Pages:Edit
   - Account ID: Found in the right sidebar of any Cloudflare dashboard page

3. **Deploy**
   - Push to main branch
   - GitHub Actions will automatically build and deploy

### Option 3: Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Create Pages Project**
   ```bash
   wrangler pages project create liquid-glass-demo
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   wrangler pages deploy out --project-name=liquid-glass-demo
   ```

## Custom Domain Setup

1. **Add Custom Domain**
   - In Cloudflare Pages dashboard, go to your project
   - Click "Custom domains" tab
   - Click "Set up a custom domain"
   - Enter your domain name

2. **DNS Configuration**
   - Add a CNAME record pointing to `your-project.pages.dev`
   - Or use Cloudflare as your DNS provider for automatic setup

## Environment Variables

Set these in the Cloudflare Pages dashboard under Settings → Environment variables:

### Production Environment
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
```

### Preview Environment (Optional)
```
NEXT_PUBLIC_SITE_URL=https://preview.yourdomain.com
NEXT_PUBLIC_N8N_CHAT_URL=https://staging-n8n.uninovasolutions.com/webhook/ai-chat
NEXT_PUBLIC_N8N_PROSPECT_URL=https://staging-n8n-instance.com/webhook/get-prospect
```

## Important Notes

### Static Export Limitations

Since this is deployed as a static site, some features are limited:

1. **API Routes**: The `/api/*` routes won't work in static export
2. **Server-Side Features**: No server-side rendering or API routes
3. **Dynamic Routes**: All dynamic routes must be pre-generated

### Workarounds

1. **Chat API**: The chat functionality connects directly to your N8N webhook
2. **Prospect Data**: Fetched from N8N or falls back to local JSON data
3. **Session Management**: Handled client-side with cookies and localStorage

## Performance Optimizations

Cloudflare Pages automatically provides:

- Global CDN distribution
- Automatic HTTPS
- HTTP/2 and HTTP/3 support
- Brotli compression
- Image optimization (with Cloudflare Images)

## Monitoring and Analytics

1. **Cloudflare Analytics**: Built-in analytics in the Pages dashboard
2. **Real User Monitoring**: Available with Cloudflare Pro plan
3. **Custom Analytics**: Add Google Analytics or other tracking

## Troubleshooting

### Build Failures
- Check build logs in Cloudflare Pages dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables
- Make sure all required environment variables are set
- Check variable names match exactly (case-sensitive)
- Redeploy after changing environment variables

### Custom Domain Issues
- Verify DNS records are correct
- Allow up to 24 hours for DNS propagation
- Check SSL certificate status

## Security Headers

The `_headers` file includes security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Cache-Control headers for static assets

## Support

For issues with:
- **Cloudflare Pages**: Check [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- **Next.js Static Export**: Check [Next.js documentation](https://nextjs.org/docs/advanced-features/static-html-export)
- **This Application**: Check the repository issues or create a new one