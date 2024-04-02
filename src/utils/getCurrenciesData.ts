import { SelectedCurrencies, CurrencyCode } from '../types';
import { currencyColors } from '../assets/currencyColors';
import getCurrencyData from './getCurrencyData';

function isCurrencyCode(code: any): code is CurrencyCode {
  return ['usd', 'eur', 'cny'].includes(code);
}

const getCurrenciesData = async (
  selectedCurrencies: SelectedCurrencies,
  dates: [Date, Date],
) => {
  const results = await Promise.all(
    Object.entries(selectedCurrencies)
      .filter(([_, isSelected]) => isSelected)
      .map(async ([currencyCode]) => {
        if (currencyCode as CurrencyCode) {
          const { labels, values } = await getCurrencyData(
            currencyCode as CurrencyCode,
            dates,
          );
          const color = currencyColors[currencyCode as CurrencyCode];
          return {
            labels,
            dataset: {
              label: `Курс ${currencyCode.toUpperCase()} к RUB`,
              data: values,
              borderColor: color.borderColor,
              backgroundColor: color.backgroundColor,
            },
          };
        }
        throw new Error(`Invalid currency code: ${currencyCode}`);
      }),
  );
  const labels = results[0]?.labels || [];

  const datasets = results.map((result) => result.dataset);

  return { labels, datasets };
};

export default getCurrenciesData;
