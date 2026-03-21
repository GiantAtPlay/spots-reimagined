import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from '@/components/Icon.vue';

/**
 * Icon component tests
 *
 * The `font-awesome-icon` global component is stubbed so tests run without
 * requiring the full FontAwesome library to be bootstrapped. We validate that
 * Icon correctly forwards the icon name, applies the right CSS classes for each
 * size variant, and only injects an inline color style when one is provided.
 */

const FontAwesomeIconStub = {
  name: 'FontAwesomeIcon',
  template: '<svg data-testid="fa-icon" :data-icon="icon" :class="$attrs.class" :style="$attrs.style"></svg>',
  props: ['icon'],
};

const mountIcon = (props: Record<string, unknown>) =>
  mount(Icon, {
    props,
    global: {
      components: { FontAwesomeIcon: FontAwesomeIconStub },
    },
  });

// ---------------------------------------------------------------------------
// Icon name forwarding
// ---------------------------------------------------------------------------

describe('Icon - icon prop', () => {
  it('forwards the icon name to font-awesome-icon', () => {
    const wrapper = mountIcon({ icon: 'star' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.attributes('data-icon')).toBe('star');
  });

  it('forwards hyphenated icon names correctly', () => {
    const wrapper = mountIcon({ icon: 'dollar-sign' });
    expect(wrapper.find('[data-testid="fa-icon"]').attributes('data-icon')).toBe('dollar-sign');
  });
});

// ---------------------------------------------------------------------------
// Size classes
// ---------------------------------------------------------------------------

describe('Icon - size prop', () => {
  it('applies no extra class when size is md (default)', () => {
    const wrapper = mountIcon({ icon: 'star', size: 'md' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.classes()).not.toContain('icon-md');
    expect(svg.classes()).toContain('icon');
  });

  it('defaults to md when no size is provided', () => {
    const wrapper = mountIcon({ icon: 'star' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.classes()).not.toContain('icon-md');
    expect(svg.classes()).toContain('icon');
  });

  const nonDefaultSizes = ['xs', 'sm', 'lg', 'xl', '2x', '3x'] as const;

  nonDefaultSizes.forEach((size) => {
    it(`applies icon-${size} class when size="${size}"`, () => {
      const wrapper = mountIcon({ icon: 'star', size });
      const svg = wrapper.find('[data-testid="fa-icon"]');
      expect(svg.classes()).toContain('icon');
      expect(svg.classes()).toContain(`icon-${size}`);
    });
  });
});

// ---------------------------------------------------------------------------
// Color prop
// ---------------------------------------------------------------------------

describe('Icon - color prop', () => {
  it('applies no inline style when color is not provided', () => {
    const wrapper = mountIcon({ icon: 'star' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.attributes('style')).toBeFalsy();
  });

  it('applies an inline color style when a hex color is provided', () => {
    const wrapper = mountIcon({ icon: 'star', color: '#ff416c' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.attributes('style')).toContain('color');
    expect(svg.attributes('style')).toContain('#ff416c');
  });

  it('applies an inline color style when a CSS variable is provided', () => {
    const wrapper = mountIcon({ icon: 'star', color: 'var(--accent)' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.attributes('style')).toContain('var(--accent)');
  });

  it('applies an inline color style when an rgb value is provided', () => {
    const wrapper = mountIcon({ icon: 'star', color: 'rgb(155, 77, 202)' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.attributes('style')).toContain('rgb(155, 77, 202)');
  });
});

// ---------------------------------------------------------------------------
// Combined props
// ---------------------------------------------------------------------------

describe('Icon - combined props', () => {
  it('applies both a size class and a color style together', () => {
    const wrapper = mountIcon({ icon: 'trophy', size: 'xl', color: 'var(--success)' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.classes()).toContain('icon-xl');
    expect(svg.attributes('style')).toContain('var(--success)');
  });

  it('renders with only an icon name and no extra attributes', () => {
    const wrapper = mountIcon({ icon: 'check-circle' });
    const svg = wrapper.find('[data-testid="fa-icon"]');
    expect(svg.attributes('data-icon')).toBe('check-circle');
    expect(svg.attributes('style')).toBeFalsy();
    expect(svg.classes()).toContain('icon');
  });
});
