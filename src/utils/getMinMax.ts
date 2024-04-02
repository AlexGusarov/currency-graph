type ChartDataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

export const getMinMax = (
  datasets: ChartDataset[],
): { min: number; max: number } => {
  let min = Infinity;
  let max = -Infinity;

  datasets.forEach((dataset) => {
    dataset.data.forEach((value) => {
      if (value < min) min = value;
      if (value > max) max = value;
    });
  });

  return { min, max };
};
