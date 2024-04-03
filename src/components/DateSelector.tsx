import React, { useState, useEffect } from 'react';
import { MIN_AVAILABLE_DATE } from '../config';

interface DateSelectorProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let newStartDate = event.target.value ? new Date(event.target.value) : null;

    if (newStartDate && newStartDate < MIN_AVAILABLE_DATE) {
      setShowTooltip(true);
      onDateChange(MIN_AVAILABLE_DATE, endDate);
    } else {
      setShowTooltip(false);
      onDateChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newEndDate = event.target.value ? new Date(event.target.value) : null;

    if (newEndDate && newEndDate < MIN_AVAILABLE_DATE) {
      newEndDate = MIN_AVAILABLE_DATE;
    }

    onDateChange(startDate, newEndDate);
  };

  const minDateStr = MIN_AVAILABLE_DATE.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    // Если подсказка показана, установим таймер для её скрытия
    if (showTooltip) {
      timer = setTimeout(() => {
        setShowTooltip(false); // Скрываем подсказку напрямую
      }, 3000); // Подсказка будет скрыта через 3 секунды
    }

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, [showTooltip]); // Эффект запускается каждый раз при изменении showTooltip

  return (
    <div className="flex flex-col space-y-4 relative">
      {showTooltip && (
        <div className="absolute -top-[25px] -right-[150px] w-[250px] bg-white border border-gray-400 shadow-lg rounded-md p-2">
          <p className="text-sm text-gray-700">
            Данные доступны только с {minDateStr}
          </p>
        </div>
      )}
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Дата с
        </label>
        <input
          id="startDate"
          type="date"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={handleStartDateChange}
          className="input input-bordered w-[150px] max-w-xs px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-1"
        />
      </div>
      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          Дата по
        </label>
        <input
          id="endDate"
          type="date"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={handleEndDateChange}
          className="input input-bordered w-[150px] max-w-xs px-3 py-2 border border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-1"
        />
      </div>
    </div>
  );
};

export default DateSelector;
