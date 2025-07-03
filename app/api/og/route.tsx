import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Liquid Glass Demo';
    const slug = searchParams.get('slug') || 'demo';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0e1117 0%, #1c274f 100%)',
            position: 'relative',
          }}
        >
          {/* Animated background elements */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(120, 119, 198, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '20%',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(255, 119, 198, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '40%',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(120, 219, 255, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          
          {/* Glass container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '60px 80px',
              boxShadow: '0 1px 4px 0 rgba(255, 255, 255, 0.08) inset, 0 2px 12px 0 rgba(0, 0, 0, 0.25)',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 0 20px 0',
                lineHeight: '1.1',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0',
                fontWeight: '400',
              }}
            >
              Free AI Booking Demo
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '24px',
                fontWeight: '600',
              }}
            >
              ✨ Powered by Liquid Glass AI
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}