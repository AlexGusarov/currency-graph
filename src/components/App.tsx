// App.tsx
import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import DateSelector from './DateSelector';
import ChartDesk from './ChartDesk';
import fetchCurrencyData from '../utils/getCurrencyData';
import getCurrenciesData from '../utils/getCurrenciesData';
import { ChartData, ChartOptions } from 'chart.js';
import { SelectedCurrencies, CurrencyCode } from '../types';

const App: React.FC = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
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
    labels: [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ],
    datasets: [
      {
        label: 'Данные не загружены',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const chartOptions: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    // Проверяем, выбрана ли хотя бы одна валюта
    const anyCurrencySelected = Object.values(selectedCurrencies).some(
      (isSelected) => isSelected,
    );

    if (anyCurrencySelected && dates[0] && dates[1]) {
      // Используем getCurrenciesData для получения данных по всем выбранным валютам
      getCurrenciesData(selectedCurrencies, dates as [Date, Date]).then(
        (data) => {
          setChartData(data); // Предполагая, что data уже в правильном формате
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
    <div className="w-full h-screen bg-white m-0 p-0">
      <main className="max-w-[1280px] mx-auto flex flex-col justify-center items-center font-sans py-[50px] px-[40px] box-border">
        <div className="w-auto h-auto border border-gray-300 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Курсограф</h1>
          <div className="flex gap-[40px]">
            <div className="flex flex-col justify-around">
              <CurrencySelector
                selectedCurrencies={selectedCurrencies}
                onCurrencyChange={handleCurrencyChange}
              />
              <DateSelector
                startDate={dates[0]}
                endDate={dates[1]}
                onDateChange={handleDateChange}
              />
            </div>

            <ChartDesk chartData={chartData} chartOptions={chartOptions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
