import { FetchCurrencyDataResult } from '../types';

const getCurrencyData = async (
  currencyCode: string,
  [startDate, endDate]: [Date, Date],
  onRequest?: () => void,
): Promise<FetchCurrencyDataResult> => {
  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

  const formatLabel = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const cacheKey = `currencyData-${currencyCode}-${formatDate(startDate)}-to-${formatDate(endDate)}`;
  const cachedData = localStorage.getItem(cacheKey);

  // Если в кэше есть данные для этого запроса, возвращаем их
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  let labels: string[] = [];
  let values: number[] = [];

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
      onRequest?.();
    } catch (error) {
      console.error(
        'Error fetching currency data for date',
        formattedDate,
        ':',
        error,
      );
    }
  }

  // Кэширование полученных данных
  const result: FetchCurrencyDataResult = { labels, values };
  localStorage.setItem(cacheKey, JSON.stringify(result));

  return result;
};

export default getCurrencyData;
