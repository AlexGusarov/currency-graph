// App.tsx
import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import DateSelector from './DateSelector';
import ChartDesk from './ChartDesk';
import fetchCurrencyData from '../utils/fetchCurrencyData';
import { ChartData } from 'chart.js';
import { SelectedCurrencies, CurrencyCode } from '../types';

const App: React.FC = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (воскресенье) до 6 (суббота)
  const diffToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Если сегодня воскресенье, нам нужно вернуться на 6 дней назад, чтобы найти понедельник
  const lastWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - diffToLastMonday - 6,
  );
  const lastWeekEnd = new Date(
    lastWeekStart.getFullYear(),
    lastWeekStart.getMonth(),
    lastWeekStart.getDate() + 6,
  );

  const [selectedCurrencies, setSelectedCurrencies] =
    useState<SelectedCurrencies>({
      usd: false,
      eur: false,
      cny: false,
    });

  const [dates, setDates] = useState<[Date | null, Date | null]>([
    lastWeekStart,
    lastWeekEnd,
  ]);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const selectedCurrency: CurrencyCode | undefined = Object.keys(
      selectedCurrencies,
    ).find((key) => selectedCurrencies[key as CurrencyCode]) as
      | CurrencyCode
      | undefined;

    if (selectedCurrency && dates[0] && dates[1]) {
      fetchCurrencyData(selectedCurrency, dates as [Date, Date]).then(
        ({ labels, values }) => {
          setChartData({
            labels,
            datasets: [
              {
                label: `Курс ${selectedCurrency} к RUB`,
                data: values,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
              },
            ],
          });
        },
      );
    }
  }, [selectedCurrencies, dates]);

  const handleCurrencyChange = (currency: CurrencyCode) => {
    setSelectedCurrencies((prevSelectedCurrencies) => ({
      ...prevSelectedCurrencies,
      [currency]: !prevSelectedCurrencies[currency],
    }));
  };

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDates([startDate, endDate]);
  };

  return (
    <div className="App">
      <CurrencySelector
        selectedCurrencies={selectedCurrencies}
        onCurrencyChange={handleCurrencyChange}
      />
      <DateSelector
        startDate={dates[0]}
        endDate={dates[1]}
        onDateChange={handleDateChange}
      />
      <ChartDesk chartData={chartData} />
    </div>
  );
};

export default App;
