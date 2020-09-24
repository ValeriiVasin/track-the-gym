/**
 * Chart related helpers that would be used in component
 * The reason to put the code here is - svelte is not capable
 * to get google.visualization types
 */

import type { DataSet } from '../types';

export async function renderChart(element: HTMLDivElement, dataTable: DataSet) {
  await google.charts.load('current', { packages: ['corechart'] });

  const options: google.visualization.LineChartOptions = {
    title: 'Checkins',
    curveType: 'function',
    legend: { position: 'bottom' },
    vAxis: {
      maxValue: 200,
      ticks: [25, 50, 75, 100, 125, 150, 175, 200],
    },
    chartArea: {
      height: '100%',
      width: '100%',
      top: 48,
      left: 48,
      right: 16,
      bottom: 64,
    },
  };

  new google.visualization.LineChart(element).draw(
    google.visualization.arrayToDataTable(dataTable),
    options
  );
}
