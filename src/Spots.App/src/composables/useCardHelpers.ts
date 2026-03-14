import { computed, type ComputedRef } from 'vue';

/**
 * Mapping of card colours to FontAwesome icon names
 */
const COLOUR_ICON_MAP: Record<string, string> = {
  white: 'sun',
  blue: 'tint',
  black: 'skull',
  red: 'fire',
  green: 'leaf',
  colourless: 'gavel',
  gold: 'bolt',
  land: 'turn-down',
};

/**
 * Composable for card-related helper functions
 */
export function useCardHelpers() {
  /**
   * Get the FontAwesome icon name for a given card colour
   * @param colour - The card colour
   * @returns The FontAwesome icon name
   */
  const getColourIcon = (colour: string): string => {
    return COLOUR_ICON_MAP[colour] || 'question';
  };

  /**
   * Create a computed ref that returns the colour icon for a given colour
   * @param colour - Reactive colour value or getter function
   * @returns Computed ref with the icon name
   */
  const useColourIcon = (colour: string | (() => string)): ComputedRef<string> => {
    return computed(() => {
      const colourValue = typeof colour === 'function' ? colour() : colour;
      return getColourIcon(colourValue);
    });
  };

  return {
    getColourIcon,
    useColourIcon,
  };
}
