export type CurrencyCode = 'usd' | 'eur' | 'cny';

export interface SelectedCurrencies {
  usd: boolean;
  eur: boolean;
  cny: boolean;
}

export interface FetchCurrencyDataResult {
  labels: string[];
  values: number[];
}
