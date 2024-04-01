import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartDeskProps {
  chartData: ChartData<'line'>;
  chartOptions?: ChartOptions<'line'>;
}

const ChartDesk: React.FC<ChartDeskProps> = ({ chartData, chartOptions }) => {
  return (
    <div className="w-[600px] h-[400px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartDesk;
