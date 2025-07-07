# SSR Deployment Guide

This guide explains how to deploy the Liquid Glass Demo application with **Server-Side Rendering (SSR)**.

## CRITICAL: SSR ONLY

This application **MUST** be deployed with SSR capabilities. Static export is **NOT SUPPORTED**.


It will either be deployed to NETLIFY or CLOUDFLARE, so make sure THAT THE PROJECT SUPPORTS THAT.


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