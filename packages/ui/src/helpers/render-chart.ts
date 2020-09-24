/**
 * Chart related helpers that would be used in component
 * The reason to put the code here is - svelte is not capable
 * to get google.visualization types
 */

export async function renderChart(element: HTMLDivElement) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004', 1000, 400],
      ['2005', 1170, 460],
      ['2006', 660, 1120],
      ['2007', 1030, 540],
    ]);

    const options: google.visualization.LineChartOptions = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { position: 'bottom' },
    };

    new google.visualization.LineChart(element).draw(data, options);
  });
}
