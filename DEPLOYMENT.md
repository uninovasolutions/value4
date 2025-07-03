# SSR Deployment Guide

This guide explains how to deploy the Liquid Glass Demo application with **Server-Side Rendering (SSR)**.

## CRITICAL: SSR ONLY

This application **MUST** be deployed with SSR capabilities. Static export is **NOT SUPPORTED**.

## Supported Platforms

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Vercel automatically detects Next.js and configures SSR

2. **Environment Variables**
   Set these in the Vercel dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
   NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
   ```

3. **Deploy**
   - Push to main branch
   - Vercel automatically builds and deploys with SSR

### Option 2: Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app/)
   - Connect your GitHub repository
   - Railway automatically detects Next.js

2. **Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
   NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
   NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
   ```

3. **Deploy**
   - Railway automatically builds and deploys with SSR

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Connect your GitHub repository
   - Select Node.js environment

2. **Build Settings**
   - Build command: `npm run build`
   - Run command: `npm start`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-app.ondigitalocean.app
   NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
   NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
   ```

## UNSUPPORTED Platforms

These platforms do **NOT** support SSR and **CANNOT** be used:

- ❌ Netlify (static hosting only)
- ❌ GitHub Pages (static only)
- ❌ Cloudflare Pages (static only)
- ❌ Surge.sh (static only)

## SSR Features

The application uses these SSR features:

1. **Server-Side Data Fetching**: Prospect data is fetched on the server
2. **Dynamic Metadata**: SEO metadata is generated server-side
3. **API Routes**: Backend functionality for chat
4. **Dynamic Routing**: Business-specific pages with SSR

## Environment Variables

Required for SSR deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_N8N_CHAT_URL=https://n8n.uninovasolutions.com/webhook/ai-chat
NEXT_PUBLIC_N8N_PROSPECT_URL=https://your-n8n-instance.com/webhook/get-prospect
```

## Verification

After deployment, verify SSR is working:

1. **View Page Source**: Should show fully rendered HTML
2. **Check Network Tab**: Initial page load should be server-rendered
3. **Test Dynamic Routes**: `/charles`, `/demo` should work with SSR
4. **API Routes**: `/api/chat` should be functional

## Performance

SSR provides:

- Better SEO (fully rendered HTML)
- Faster initial page load
- Dynamic content generation
- Server-side data fetching

## Troubleshooting

### Build Failures
- Ensure Node.js 18+ is used
- Check all dependencies are in package.json
- Verify no static export configuration

### SSR Issues
- Check server logs for errors
- Verify environment variables are set
- Test API routes separately

### Performance Issues
- Monitor server response times
- Check database connection if using external data
- Optimize images and assets

## Support

For SSR deployment issues:
- **Vercel**: Check [Vercel documentation](https://vercel.com/docs)
- **Railway**: Check [Railway documentation](https://docs.railway.app/)
- **DigitalOcean**: Check [App Platform documentation](https://docs.digitalocean.com/products/app-platform/)

**Remember: This application requires SSR and cannot be deployed as a static site.**