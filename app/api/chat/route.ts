import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const chatRequestSchema = z.object({
  sid: z.string().uuid(),
  slug: z.string().min(1),
  message: z.string().min(1).max(1000),
  meta: z.object({
    timestamp: z.number(),
    userAgent: z.string().optional(),
    screenSize: z.object({
      width: z.number(),
      height: z.number(),
    }).optional(),
    timezone: z.string().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = chatRequestSchema.parse(body);
    
    // Get N8N endpoint from environment
    const n8nChatUrl = process.env.NEXT_PUBLIC_N8N_CHAT_URL;
    if (!n8nChatUrl) {
      return NextResponse.json(
        { error: 'Chat service not configured' },
        { status: 500 }
      );
    }
    
    // Check if URL is still the demo placeholder
    if (n8nChatUrl.includes('demo-n8n.example')) {
      return NextResponse.json(
        { error: 'Chat service not configured. Please set up N8N endpoint.' },
        { status: 500 }
      );
    }
    
    // Forward request to N8N with better error handling
    let n8nResponse;
    try {
      n8nResponse = await fetch(n8nChatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': request.headers.get('user-agent') || 'LiquidGlass/1.0',
        },
        body: JSON.stringify(validatedData),
      });
    } catch (fetchError) {
      console.error('N8N connection error:', fetchError);
      return NextResponse.json(
        { error: 'Unable to connect to chat service. Please check N8N configuration.' },
        { status: 503 }
      );
    }
    
    if (!n8nResponse.ok) {
      // Handle rate limiting
      if (n8nResponse.status === 429) {
        return NextResponse.json(
          { error: 'Rate limited', retryAfter: 60 },
          { status: 429 }
        );
      }
      
      // Try to extract error message from N8N response
      let errorMessage = `Chat service error: ${n8nResponse.status}`;
      try {
        const errorData = await n8nResponse.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        // If we can't parse the error response, use the default message
        console.error('Failed to parse N8N error response:', parseError);
      }
      
      console.error(`N8N API error: ${n8nResponse.status} - ${n8nResponse.statusText}`);
      return NextResponse.json(
        { error: errorMessage },
        { status: n8nResponse.status }
      );
    }
    
    const responseData = await n8nResponse.json();
    
    // Return N8N response with proper cache headers
    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}