import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProspectData } from '@/lib/prospect-data';

// Mock fetch
global.fetch = vi.fn();

describe('getProspectData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return fallback data when fetch fails', async () => {
    // Mock fetch to throw an error
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const result = await getProspectData('charles');
    
    expect(result).toBeDefined();
    expect(result?.biz_name).toBe('Charles Detailing');
  });

  it('should return generic data for unknown slug', async () => {
    // Mock fetch to throw an error
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const result = await getProspectData('unknown-business');
    
    expect(result).toBeDefined();
    expect(result?.biz_name).toBe('Unknown business');
  });

  it('should fetch data from N8N when available', async () => {
    const mockData = {
      biz_name: 'Test Business',
      biz_pitch: 'Test pitch',
    };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    // Set environment variable
    process.env.NEXT_PUBLIC_N8N_PROSPECT_URL = 'https://test-n8n.com/api';

    const result = await getProspectData('test');
    
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      'https://test-n8n.com/api?slug=test',
      expect.objectContaining({
        next: { revalidate: 300 }
      })
    );
  });
});