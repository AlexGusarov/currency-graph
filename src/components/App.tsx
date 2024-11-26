import React, { useState, useEffect } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { SelectedCurrencies, CurrencyCode } from '../types';
import CurrencySelector from './CurrencySelector';
import DateSelector from './DateSelector';
import ChartDesk from './ChartDesk';
import getCurrenciesData from '../utils/getCurrenciesData';
import { getMinMax } from '../utils/getMinMax';
import useLastWeekRange from '../hooks/useLastWeekRange';

const App: React.FC = () => {
  const [lastWeekStart, lastWeekEnd] = useLastWeekRange();
  const [requestCount, setRequestCount] = useState(0);

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
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: 'The data has not been uploaded',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions<'line'>>({
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
    maintainAspectRatio: true,
    responsive: true,
  });

  useEffect(() => {
    const anyCurrencySelected = Object.values(selectedCurrencies).some(
      (isSelected) => isSelected,
    );

    if (anyCurrencySelected && dates[0] && dates[1]) {
      getCurrenciesData(selectedCurrencies, dates as [Date, Date], () =>
        setRequestCount((count) => count + 1),
      ).then((data) => {
        const { min, max } = getMinMax(data.datasets);
        setChartData(data);

        setChartOptions((prevOptions) => {
          return {
            ...prevOptions,
            scales: {
              ...prevOptions.scales,
              y: {
                ...prevOptions.scales.y,
                suggestedMin: min,
                suggestedMax: max,
                beginAtZero: min <= 0,
              },
            },
          };
        });
      });
    } else {
      setChartData({
        labels: [],
        datasets: [],
      });
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
    <div className="w-full h-screen bg-white m-0 p-0 flex flex-col">
      <main className="flex-1 max-w-[1280px] mx-auto flex flex-col justify-center items-center font-sans py-[50px] px-[40px] box-border">
        <div className="w-auto h-auto border border-gray-300 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Курсограф</h1>
          <div className="flex flex-col md:flex-row gap-[40px]">
            <div className="flex md:flex-col justify-around">
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
{/*           <p className="mt-6 text-gray-700 text-sm text-center">
            Число запросов к API: {requestCount}
          </p> */}
        </div>
      </main>
    </div>
  );
};

export default App;
