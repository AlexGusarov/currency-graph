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
  return (
    <div>
      {Object.keys(selectedCurrencies).map((currency) => (
        <label key={currency}>
          <input
            type="checkbox"
            onChange={() => onCurrencyChange(currency as CurrencyCode)}
            checked={selectedCurrencies[currency as CurrencyCode]}
          />{' '}
          {currency}
        </label>
      ))}
    </div>
  );
};

export default CurrencySelector;
