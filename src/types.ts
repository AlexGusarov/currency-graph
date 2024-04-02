export type CurrencyCode = 'usd' | 'eur' | 'cny';

export type CurrencyColors = {
  [key in CurrencyCode]: {
    borderColor: string;
    backgroundColor: string;
  };
};

export type SelectedCurrencies = {
  usd: boolean;
  eur: boolean;
  cny: boolean;
};

export type FetchCurrencyDataResult = {
  labels: string[];
  values: number[];
};

export type CurrencyDataResult = {
  labels: string[];
  values: number[];
};

export type ChartDataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

export type CurrenciesDataResult = {
  labels: string[];
  datasets: ChartDataset[];
};
