# Demo Website for an Automated Chatbot and CRM System for Car Wrapping Shops in Germany with Apple Design and Liquid Glass Glassmorphism Panels for a Clean Futuristic Simple Look and Feel

## The Website should have these features:

- **Animated Gradient Backgrounds**: Smooth, organic animations
- **Glass Morphism Components**: Beautiful frosted glass effects with backdrop blur
- **Multiple Variants**: 3 different background styles to choose from
- **Responsive**: Works perfectly on all screen sizes
- **Accessible**: Respects user preferences for reduced motion
- **Print-Friendly**: Automatically adapts for print media

---

## Background Variants

### Default
```html
<div class="liquid-background"></div>
```
Purple and blue gradients with subtle animation.

### Variant 1
```html
<div class="liquid-background-variant-1"></div>
```
Gray and purple tones with green accents.

### Variant 2
```html
<div class="liquid-background-variant-2"></div>
```
Pink, blue, and teal combination.

## Glass Components

### Basic Glass Container
```html
<div class="glass">
    Your content here
</div>
```

### Glass Card (with padding)
```html
<div class="glass-card">
    Your content here
</div>
```

### Glass Button
```html
<button class="glass-button">
    Click me
</button>
```

### Minimal Glass (subtle effect)
```html
<div class="glass-minimal">
    Subtle glass effect
</div>
```

## Floating Orbs (Optional)

Add floating orbs for extra visual appeal:
```html
<div class="floating-orb floating-orb-1"></div>
<div class="floating-orb floating-orb-2"></div>
<div class="floating-orb floating-orb-3"></div>
```

## CSS Custom Properties

Customize the glass effects by overriding these CSS variables:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.07);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.08) inset, 
                  0 2px 12px 0 rgba(0, 0, 0, 0.25);
  --glass-backdrop: blur(12px);
}
```

## Animation Classes

- `.animate-slide-in-up` - Slide in from bottom with fade
- `.animate-slide-in-right` - Slide in from right with fade
- `.pulse` - Gentle pulsing animation

## Browser Support

- Modern browsers with backdrop-filter support
- Graceful degradation for older browsers
- Respects `prefers-reduced-motion` setting

## Usage Examples

### React/Next.js
```jsx
export default function App() {
  return (
    <>
      <div className="liquid-background" />
      <div className="glass-card">
        <h1>Welcome</h1>
        <button className="glass-button">Get Started</button>
      </div>
    </>
  );
}
```

### Vue.js
```vue
<template>
  <div>
    <div class="liquid-background"></div>
    <div class="glass-card">
      <h1>Welcome</h1>
      <button class="glass-button">Get Started</button>
    </div>
  </div>
</template>
```

### Vanilla HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="liquid-glass-background.css">
</head>
<body>
    <div class="liquid-background"></div>
    <div class="glass-card">
        <h1>Welcome</h1>
        <button class="glass-button">Get Started</button>
    </div>
</body>
</html>
```

## Customization Tips

1. **Adjust Animation Speed**: Modify the animation duration in the CSS
2. **Change Colors**: Update the gradient colors in the background definitions
3. **Modify Blur Amount**: Adjust the `--glass-backdrop` variable
4. **Add More Variants**: Create new background classes following the same pattern

## Performance Notes

- The backdrop-filter can be GPU intensive on some devices
- Consider adding the `will-change` property for better performance on moving elements
- The floating orbs are optional and can be removed for better performance