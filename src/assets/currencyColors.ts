import { CurrencyCode } from '../types';

export const currencyColors: {
  [key in CurrencyCode]: {
    borderColor: string;
    backgroundColor: string;
  };
} = {
  usd: {
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
  },
  eur: {
    borderColor: 'rgb(54, 162, 235)',
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
  },
  cny: {
    borderColor: 'rgb(255, 205, 86)',
    backgroundColor: 'rgba(255, 205, 86, 0.5)',
  },
};
