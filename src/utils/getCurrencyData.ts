import { FetchCurrencyDataResult } from '../types';

const getCurrencyData = async (
  currencyCode: string,
  [startDate, endDate]: [Date, Date],
): Promise<FetchCurrencyDataResult> => {
  let labels: string[] = [];
  let values: number[] = [];

  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  const formatLabel = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
  };

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = formatDate(date);
    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/${currencyCode}.json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch currency data');
      const data = await response.json();
      labels.push(formatLabel(formattedDate));
      values.push(data[currencyCode]['rub']);
    } catch (error) {
      console.error(
        'Error fetching currency data for date',
        formattedDate,
        ':',
        error,
      );
    }
  }

  return { labels, values };
};

export default getCurrencyData;
