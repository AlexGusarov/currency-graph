import { getMinMax } from './getMinMax';
import { ChartDataset } from '../types';

describe('getMinMax function', () => {
  test('returns infinity for an empty dataset', () => {
    const result = getMinMax([]);
    expect(result.min).toBe(Infinity);
    expect(result.max).toBe(-Infinity);
  });

  test('returns min and max for the same dataset', () => {
    const datasets: ChartDataset[] = [
      {
        label: 'Dataset 1',
        data: [10],
        borderColor: 'red',
        backgroundColor: 'blue',
      },
    ];
    const result = getMinMax(datasets);
    expect(result.min).toBe(10);
    expect(result.max).toBe(10);
  });

  test('returns min and max for multiple datasets', () => {
    const datasets: ChartDataset[] = [
      {
        label: 'Dataset 1',
        data: [10, 20],
        borderColor: 'red',
        backgroundColor: 'blue',
      },
      {
        label: 'Dataset 2',
        data: [15, 5, 25],
        borderColor: 'green',
        backgroundColor: 'yellow',
      },
    ];
    const result = getMinMax(datasets);
    expect(result.min).toBe(5);
    expect(result.max).toBe(25);
  });
});
