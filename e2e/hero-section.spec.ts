import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test('should display business name correctly', async ({ page }) => {
    await page.goto('/charles');
    
    // Check if business name is displayed
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Charles Detailing');
    
    // Check if CTA button is present
    await expect(page.getByRole('button', { name: /KI-Assistent/ })).toBeVisible();
    
    // Check if business pitch is displayed
    await expect(page.getByText(/Premium automotive detailing/)).toBeVisible();
  });

  test('should open chat when CTA is clicked', async ({ page }) => {
    await page.goto('/charles');
    
    // Click the CTA button
    await page.getByRole('button', { name: /KI-Assistent/ }).click();
    
    // Check if chat interface opens
    await expect(page.getByText('KI-Assistent')).toBeVisible();
    await expect(page.getByPlaceholder(/Nachricht/)).toBeVisible();
  });

  test('should handle unknown business slug', async ({ page }) => {
    await page.goto('/unknown-business');
    
    // Should display a generic business name
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Unknown business');
    
    // CTA should still be functional
    await expect(page.getByRole('button', { name: /KI-Assistent/ })).toBeVisible();
  });
});