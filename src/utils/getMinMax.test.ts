import { getMinMax } from './getMinMax';
import { ChartDataset } from '../types';

describe('getMinMax function', () => {
  test('возвращает бесконечность для пустого датасета', () => {
    const result = getMinMax([]);
    expect(result.min).toBe(Infinity);
    expect(result.max).toBe(-Infinity);
  });

  test('возвращает min и max для одного датасета', () => {
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

  test('возвращает min и max для нескольких датасетов', () => {
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
