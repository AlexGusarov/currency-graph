import { useMemo } from 'react';

const useLastWeekRange = (): [Date, Date] => {
  const [lastWeekStart, lastWeekEnd] = useMemo(() => {
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

    return [lastWeekStart, lastWeekEnd];
  }, []);

  return [lastWeekStart, lastWeekEnd];
};

export default useLastWeekRange;
