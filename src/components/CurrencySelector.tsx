import React from 'react';
import { SelectedCurrencies, CurrencyCode } from '../types';

interface CurrencySelectorProps {
  selectedCurrencies: SelectedCurrencies;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrencies,
  onCurrencyChange,
}) => {
  const currencyNames: Record<CurrencyCode, string> = {
    usd: 'Dollar',
    eur: 'Euro',
    cny: 'Yuan',
  };

  return (
    <div className="flex flex-col justify-around md:justify-start">
      {Object.keys(selectedCurrencies).map((currency) => (
        <label key={currency} className="cursor-pointer p-1">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => onCurrencyChange(currency as CurrencyCode)}
            checked={selectedCurrencies[currency as CurrencyCode]}
          />
          {currencyNames[currency as CurrencyCode]}
        </label>
      ))}
    </div>
  );
};

export default CurrencySelector;
