# Icon System

Spots uses [FontAwesome 6 (Free Solid)](https://fontawesome.com/icons?s=solid&o=r) icons, surfaced through a thin `Icon.vue` wrapper component. All icon rendering in the application **must** go through this component — never use `<i class="fas fa-*">` tags or `<font-awesome-icon>` directly in templates.

---

## Usage

### Basic

```vue
<Icon icon="star" />
```

### With a size

```vue
<Icon icon="trophy" size="lg" />
```

### With a custom color

```vue
<Icon icon="gem" color="#ff416c" />
<Icon icon="dollar-sign" color="var(--success)" />
```

### Combined

```vue
<Icon icon="star" size="xl" color="var(--warning)" />
```

### Inheriting color from a parent

When `color` is omitted the icon inherits the CSS `color` of its parent element — the recommended approach for icons that sit inside styled containers.

```vue
<!-- The .stat-icon wrapper sets color: var(--accent), so the icon inherits it -->
<div class="stat-icon">
  <Icon icon="clone" />
</div>
```

---

## Props

| Prop    | Type     | Default  | Description |
|---------|----------|----------|-------------|
| `icon`  | `string` | required | FontAwesome icon name (kebab-case, e.g. `"dollar-sign"`) |
| `size`  | `IconSize` | `'md'`  | Size variant (see table below) |
| `color` | `string` | `undefined` | Any valid CSS color. Omit to inherit from parent. |

### Size variants

| Value | em size | Approximate px (at base 16px) |
|-------|---------|-------------------------------|
| `xs`  | 0.75em  | 12px |
| `sm`  | 0.875em | 14px |
| `md`  | 1em     | 16px (default) |
| `lg`  | 1.25em  | 20px |
| `xl`  | 1.5em   | 24px |
| `2x`  | 2em     | 32px |
| `3x`  | 3em     | 48px |

Sizes use `em` units so they scale proportionally with the parent's `font-size`.

---

## Available icons

All icons below are registered in `src/Spots.App/src/main.ts`. To use an icon it must appear in both the `import` statement and the `library.add()` call — see [Adding new icons](#adding-new-icons).

### Dashboard

| Name | Usage |
|------|-------|
| `clone` | Total cards / collection count |
| `dollar-sign` | Currency / collection value |
| `palette` | Unique cards / color variety |
| `trophy` | Completion progress |
| `star` | Rarity breakdown title / Rare rarity |
| `gem` | Mythic rarity / foil card indicator |
| `certificate` | Uncommon rarity |
| `circle` | Common rarity |
| `tasks` | Trackers near completion |
| `check-circle` | Completed trackers |
| `paint-brush` | Color distribution chart |

### Navigation

| Name | Usage |
|------|-------|
| `th-large` | Dashboard nav item |
| `layer-group` | Collection view nav item |
| `plus-circle` | Add cards nav item |
| `exchange-alt` | For Trade nav item |
| `tasks` | Trackers nav item |
| `map-marker-alt` | Spots nav item |
| `cog` | Settings nav item |
| `users` | User management nav item |
| `server` | System admin nav item |
| `cube` | App logo |
| `sign-out-alt` | Logout |

### Collection

| Name | Usage |
|------|-------|
| `box` | Regular (non-foil) card count |
| `gem` | Foil card count |
| `plus` | Increment / add action |
| `minus` | Decrement action |
| `search` | Search input |
| `filter` | Filter toggle |
| `sort` | Sort toggle |
| `th` | Grid view (compact) |
| `th-large` | Grid view (large) |
| `list` | List view |
| `chevron-left` | Previous page |
| `chevron-right` | Next page |
| `exchange-alt` | Mark for trade |
| `trash` | Delete card |
| `edit` | Edit card |

### Mana / card color icons

These are used in `CardImage.vue` via `useCardHelpers.ts`.

| Name | Mana color |
|------|------------|
| `sun` | White |
| `tint` | Blue |
| `skull` | Black |
| `fire` | Red |
| `leaf` | Green |
| `gavel` | Colorless |
| `bolt` | Gold / Multicolor |
| `turn-down` | Land |

### Admin & system

| Name | Usage |
|------|-------|
| `cloud-download` | Import / sync data |
| `database` | Database operations |
| `exclamation-triangle` | Warnings / errors |
| `user` | Regular user role |
| `user-shield` | Admin user role |

### Setup & import

| Name | Usage |
|------|-------|
| `file-import` | Import from file |
| `snowflake` | Scryfall sync |
| `check` | Success / confirmation |

### UI controls

| Name | Usage |
|------|-------|
| `plus` | Primary add action |
| `times` | Close / dismiss |
| `moon` | Dark theme indicator |
| `sun` | Light theme indicator |
| `arrow-down` | Collapse / descending |
| `clone` | Duplicate / stacked items |

---

## Adding new icons

1. Find the icon on [FontAwesome (free solid)](https://fontawesome.com/icons?s=solid&o=r) and note its name (e.g. `flag`).
2. Open `src/Spots.App/src/main.ts`.
3. Add the camelCase import name (`faFlag`) to the import statement:
   ```ts
   import { ..., faFlag } from '@fortawesome/free-solid-svg-icons';
   ```
4. Add it to `library.add(...)`:
   ```ts
   library.add(..., faFlag);
   ```
5. Use it in any template via the Icon component:
   ```vue
   <Icon icon="flag" />
   ```
6. Update this document by adding it to the appropriate category table.

> **Convention:** Icon name in templates is always kebab-case (`flag`, `dollar-sign`, `check-circle`). The JS import is always the camelCase `fa`-prefixed equivalent (`faFlag`, `faDollarSign`, `faCheckCircle`).

---

## Styling icons

### Inherit color (preferred)

Set `color` on the parent element and let the icon inherit it. This keeps color concerns in CSS.

```vue
<div class="stat-icon">   <!-- CSS: color: var(--accent) -->
  <Icon icon="trophy" />  <!-- inherits --accent -->
</div>
```

### Inline color (for one-off overrides)

Use the `color` prop when an icon needs a color that differs from its container.

```vue
<Icon icon="gem" color="#ff416c" />
```

### Sizing with `:deep()` in scoped styles

When an Icon is inside a scoped-styled container and you need to target the underlying `<svg>`:

```vue
<style scoped>
.my-container :deep(svg) {
  width: 20px;
  height: 20px;
}
</style>
```

---

## Do not use

The following patterns are **not** supported and will produce blank/invisible icons:

```html
<!-- ❌ Requires FontAwesome CSS stylesheet (not loaded) -->
<i class="fas fa-star"></i>

<!-- ❌ Use Icon.vue instead -->
<font-awesome-icon icon="star" />
```
