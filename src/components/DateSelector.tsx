import React from 'react';

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
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newStartDate = event.target.value
      ? new Date(event.target.value)
      : null;
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value ? new Date(event.target.value) : null;
    onDateChange(startDate, newEndDate);
  };

  return (
    <div className="flex flex-col space-y-4">
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
