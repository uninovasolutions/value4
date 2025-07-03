import { test, expect } from '@playwright/test';

test.describe('Chat Functionality', () => {
  test('should open chat and send message', async ({ page }) => {
    await page.goto('/charles');
    
    // Wait for page to load
    await expect(page.getByText('Charles Detailing')).toBeVisible();
    
    // Click chat button
    await page.click('[data-testid="chat-fab"]');
    
    // Wait for chat interface to open
    await expect(page.getByText('KI-Assistent')).toBeVisible();
    
    // Send a message
    await page.fill('input[placeholder*="Nachricht"]', 'Hallo');
    await page.press('input[placeholder*="Nachricht"]', 'Enter');
    
    // Check that message appears
    await expect(page.getByText('Hallo')).toBeVisible();
    
    // Wait for bot response (with timeout)
    await expect(page.locator('[data-testid="bot-message"]').first()).toBeVisible({
      timeout: 10000
    });
  });

  test('should handle rate limiting', async ({ page }) => {
    await page.goto('/charles');
    
    // Open chat
    await page.click('[data-testid="chat-fab"]');
    await expect(page.getByText('KI-Assistent')).toBeVisible();
    
    // Send multiple rapid messages
    for (let i = 0; i < 10; i++) {
      await page.fill('input[placeholder*="Nachricht"]', `Message ${i}`);
      await page.press('input[placeholder*="Nachricht"]', 'Enter');
      await page.waitForTimeout(100); // Small delay between messages
    }
    
    // Should show rate limit error
    await expect(page.getByText(/warten Sie einen Moment/)).toBeVisible({
      timeout: 15000
    });
  });

  test('should minimize and maximize chat', async ({ page }) => {
    await page.goto('/charles');
    
    // Open chat
    await page.click('[data-testid="chat-fab"]');
    
    // Minimize chat
    await page.click('[data-testid="minimize-chat"]');
    
    // Check that chat is minimized (messages should not be visible)
    await expect(page.locator('[data-testid="chat-messages"]')).not.toBeVisible();
    
    // Maximize chat
    await page.click('[data-testid="maximize-chat"]');
    
    // Check that chat is maximized
    await expect(page.locator('[data-testid="chat-messages"]')).toBeVisible();
  });
});