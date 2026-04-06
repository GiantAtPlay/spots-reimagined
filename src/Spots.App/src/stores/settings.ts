import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { defaultSettings, type UserSettings } from '../data/mockSettings';

export const useSettingsStore = defineStore('settings', () => {
  // ─── State ─────────────────────────────────────────────────────────────────

  const theme = ref<UserSettings['theme']>(defaultSettings.theme);
  const defaultViewMode = ref<UserSettings['defaultViewMode']>(defaultSettings.defaultViewMode);
  const dateFormat = ref<UserSettings['dateFormat']>(defaultSettings.dateFormat);
  const currency = ref<UserSettings['currency']>(defaultSettings.currency);
  const nearCompletionThreshold = ref<number>(defaultSettings.nearCompletionThreshold);
  const cardsPerPage = ref<UserSettings['cardsPerPage']>(defaultSettings.cardsPerPage);
  const showCardPrices = ref<boolean>(defaultSettings.showCardPrices);

  // ─── Side-effects ──────────────────────────────────────────────────────────

  // Keep the <html data-theme> attribute in sync whenever theme changes
  watch(
    theme,
    (val) => {
      document.documentElement.setAttribute('data-theme', val);
    },
    { immediate: true }
  );

  // ─── Actions ───────────────────────────────────────────────────────────────
  // Each action is the single place to later add an API call that persists the
  // change to the backend.  For now they update local state only.

  const setTheme = (val: UserSettings['theme']) => {
    theme.value = val;
    // TODO: persist to API — PATCH /api/settings { theme: val }
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark');
  };

  const setDefaultViewMode = (val: UserSettings['defaultViewMode']) => {
    defaultViewMode.value = val;
    // TODO: persist to API — PATCH /api/settings { defaultViewMode: val }
  };

  const setDateFormat = (val: UserSettings['dateFormat']) => {
    dateFormat.value = val;
    // TODO: persist to API — PATCH /api/settings { dateFormat: val }
  };

  const setCurrency = (val: UserSettings['currency']) => {
    currency.value = val;
    // TODO: persist to API — PATCH /api/settings { currency: val }
  };

  const setNearCompletionThreshold = (val: number) => {
    nearCompletionThreshold.value = val;
    // TODO: persist to API — PATCH /api/settings { nearCompletionThreshold: val }
  };

  const setCardsPerPage = (val: UserSettings['cardsPerPage']) => {
    cardsPerPage.value = val;
    // TODO: persist to API — PATCH /api/settings { cardsPerPage: val }
  };

  const setShowCardPrices = (val: boolean) => {
    showCardPrices.value = val;
    // TODO: persist to API — PATCH /api/settings { showCardPrices: val }
  };

  // ─── Exports ───────────────────────────────────────────────────────────────

  return {
    // state (read-only in consumers — always write via actions)
    theme,
    defaultViewMode,
    dateFormat,
    currency,
    nearCompletionThreshold,
    cardsPerPage,
    showCardPrices,
    // actions
    setTheme,
    toggleTheme,
    setDefaultViewMode,
    setDateFormat,
    setCurrency,
    setNearCompletionThreshold,
    setCardsPerPage,
    setShowCardPrices,
  };
});
