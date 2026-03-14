# Spots Design System

## Overview

Spots is a Magic: The Gathering collection tracking application designed primarily for desktop use with responsive support for smaller screens. The design emphasizes a clean, modern aesthetic with glassmorphic elements and a dark theme as the default.

## Color Palette

### Dark Theme (Default)

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-gradient` | `linear-gradient(135deg, #151515 0%, #1a1a1a 50%, #121212 100%)` | Page background |
| `--nav-bg` | `rgba(28, 28, 28, 0.9)` | Navigation panel |
| `--content-bg` | `rgba(26, 26, 26, 0.8)` | Main content area |
| `--flyout-bg` | `rgba(28, 28, 28, 0.95)` | Flyout panel |
| `--tile-bg` | `rgba(38, 38, 38, 0.6)` | Card tiles, stat cards |
| `--tile-hover` | `rgba(52, 52, 52, 0.7)` | Hover state for tiles |

### Accent Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--accent` | `#9b4dca` | Primary accent (royal purple) |
| `--accent-hover` | `#b366d9` | Hover state for accent |
| `--accent-secondary` | `#7a2ba8` | Secondary accent |
| `--accent-glow` | `rgba(155, 77, 202, 0.3)` | Glow effects |

### Text Colors

| Variable | Dark Theme | Light Theme | Usage |
|----------|------------|-------------|-------|
| `--text-primary` | `#e2e8f0` | `#1e293b` | Main text |
| `--text-secondary` | `#94a3b8` | `#64748b` | Muted text, labels |

### Semantic Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--success` | `#10b981` | Positive indicators |
| `--warning` | `#f59e0b` | Warnings |
| `--danger` | `#ef4444` | Errors, destructive actions |

### Borders

| Variable | Value | Usage |
|----------|-------|-------|
| `--border` | `rgba(155, 77, 202, 0.2)` | Default borders |
| `--border-light` | `rgba(155, 77, 202, 0.3)` | Light mode borders |

---

## Typography

- **Font Family**: `'Segoe UI', system-ui, -apple-system, sans-serif`
- **Page Title**: 28px, font-weight 600
- **Section Title**: 16px, font-weight 600
- **Body Text**: 14px, font-weight 500
- **Small/Labels**: 11-13px, uppercase with letter-spacing

---

## Spacing & Sizing

### Border Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius` | `12px` | Default radius |
| `--radius-sm` | `6px` | Small elements (inputs, buttons) |
| `--radius-lg` | `16px` | Large panels (nav, flyout) |

### Shadows

Shadows are intentionally minimal. Use backdrop-filter for depth instead:

```css
box-shadow: none;  /* Default - no shadows */
backdrop-filter: blur(20px);  /* Glassmorphic effect */
```

---

## Layout Structure

### Application Shell

```
+------------------+----------------------------------------+
|                  |              Top Bar                   |
|    Navigation    +----------------------------------------+
|     Panel        |                                        |
|   (floating)    |           Content Area                 |
|                  |         (floating, bordered)          |
|                  |                                        |
+------------------+----------------------------------------+
```

### Navigation Panel

- Width: 240px
- Position: Fixed left, floating 16px from edge
- Border radius: 16px (`--radius-lg`)
- Contains: Logo, nav sections, settings/logout
- Glassmorphic backdrop effect

### Content Area

- Flexible width (fills remaining space)
- Border radius: 12px (`--radius`)
- Border: 1px solid `--border`
- Padding: 24px

### Flyout Panel

- Width: 420px (max 100vw - 32px on mobile)
- Position: Fixed right, 16px from edges
- Slides in/out with transform animation
- Border radius: 16px

---

## Components

### Navigation Items

- Height: auto (padding 12px 16px)
- Icon width: 20px (centered)
- Active indicator: 3px left border with accent color
- Hover: Background `rgba(155, 77, 202, 0.1)`
- Active: Background `rgba(155, 77, 202, 0.15)`

### Cards (Visual View)

- Grid: CSS custom property `--card-grid-cols` (3-8 columns)
- Aspect ratio: 3:4
- Always visible: Card image, name, set, non-foil/foil counts
- Hover: Reveal action buttons (+ Add, + Foil)

### Cards (Table View)

- Columns: Card | Set | Non-Foil | Foil | Actions
- Actions column: Right-aligned
- Row hover: Subtle background change

### Buttons

**Primary**
- Background: `linear-gradient(135deg, var(--accent), var(--accent-secondary))`
- Text: White
- Hover: Slight translateY(-2px)

**Secondary**
- Background: `--tile-bg`
- Border: 1px solid `--border`
- Hover: Background `--tile-hover`, border accent

### Stat Cards

- Padding: 24px
- Hover: translateY(-4px), border accent
- Accent bar: 3px gradient top border (reveals on hover)

### Form Inputs

- Background: `--tile-bg`
- Border: 1px solid `--border`
- Border radius: 6px (`--radius-sm`)
- Focus: Border accent color

### Pagination

- Page buttons: 36px square, border radius 6px
- Active: Background accent, white text
- Disabled: 40% opacity
- Controls: Prev/Next arrows, numbered pages, ellipsis

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|---------------|
| Desktop XL | 1200px+ | 3 column charts, 5 column cards |
| Desktop | 1024px-1199px | 2 column charts |
| Tablet | 768px-1023px | Single column, horizontal nav |
| Mobile | <768px | Stacked layout, collapsed nav |
| Small Mobile | <480px | 2 column cards |

---

## Animations

### Transitions

- Default: `all 0.2s ease`
- Hover effects: 0.2s ease
- Page elements: 0.3s ease

### Keyframes

```css
/* Slide in from left (nav) */
@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
}

/* Slide in from right (flyout) */
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}

/* Fade in (content) */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

---

## Accessibility Considerations

- Ensure sufficient color contrast (text-secondary on dark backgrounds)
- Interactive elements have visible focus states
- Use semantic HTML (nav, main, header, section)
- Icons should have text labels or aria-labels

---

## File Organization

```
/prototype.html      - Dashboard design prototype
/card-list.html      - Collection list view prototype
/DESIGN.md           - This file
```

---

## Notes for Future Development

1. **Do not add shadows** - The design relies on backdrop-filter for depth
2. **Keep border radius consistent** - Use CSS variables, not hardcoded values
3. **Purple accent** - When adding new colors, stay in the royal purple family (#9b4dca)
4. **Mobile-first nav** - The nav collapses to icons-only on smaller screens
5. **Flyout pattern** - Use the flyout for any secondary content or quick actions
6. **Card counts** - Always show both non-foil and foil counts when displaying cards
7. **Table actions column** - Always pin the actions column to the far right using `text-right` class
