export type CurrencyCode = 'usd' | 'eur' | 'cny';

export type CurrencyColors = {
  [key in CurrencyCode]: {
    borderColor: string;
    backgroundColor: string;
  };
};

export interface SelectedCurrencies {
  usd: boolean;
  eur: boolean;
  cny: boolean;
}

export interface FetchCurrencyDataResult {
  labels: string[];
  values: number[];
}
