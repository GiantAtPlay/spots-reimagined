export type Theme = 'dark' | 'light';
export type ViewMode = 'grid' | 'list';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY';
export type Currency = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
export type CardsPerPage = 25 | 50 | 100;

export interface UserSettings {
  theme: Theme;
  defaultViewMode: ViewMode;
  dateFormat: DateFormat;
  currency: Currency;
  nearCompletionThreshold: number;
  cardsPerPage: CardsPerPage;
  showCardPrices: boolean;
}

export const defaultSettings: UserSettings = {
  theme: 'dark',
  defaultViewMode: 'grid',
  dateFormat: 'DD/MM/YYYY',
  currency: 'USD',
  nearCompletionThreshold: 80,
  cardsPerPage: 25,
  showCardPrices: true,
};
