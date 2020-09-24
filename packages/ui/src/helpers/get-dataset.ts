import { DataSet, Month, ParsedItem } from '../types';

export function getChartDataset(group: Map<string, ParsedItem[]>): DataSet {
  const labels = getSortedGroupKeys(group);
  const headings = ['time', ...labels];
  const result: DataSet = [headings];

  const times = getAllTimes();
  const checkinsCache = createCheckinsCache(group);

  for (const time of times) {
    const row: [string, ...number[]] = [time];

    for (const label of labels) {
      row.push(checkinsCache[`${label} ${time}`] ?? 0);
    }

    result.push(row);
  }

  return result;
}

const order: string[] = [
  Month.January,
  Month.February,
  Month.March,
  Month.April,
  Month.May,
  Month.June,
  Month.July,
  Month.August,
  Month.September,
  Month.October,
  Month.November,
  Month.December,
];

function compareLabelsAsc(a: string, b: string): number {
  const [aDate, aMonth] = a.split(' ');
  const [bDate, bMonth] = b.split(' ');
  const aMonthOrder = order.indexOf(aMonth);
  const bMonthOrder = order.indexOf(bMonth);

  if (aMonthOrder !== bMonthOrder) {
    return aMonthOrder - bMonthOrder;
  }

  return Number(aDate) - Number(bDate);
}

function getSortedGroupKeys(group: Map<string, ParsedItem[]>): string[] {
  return [...group.keys()].sort(compareLabelsAsc);
}

function getAllTimes(): string[] {
  const hours: string[] = [
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
  ];
  const minutes = ['00', '15', '30', '45'];
  const result: string[] = [];

  for (const hour of hours) {
    for (const minute of minutes) {
      result.push(`${hour}:${minute}`);
    }
  }

  result.push('23:00');
  return result;
}

function getTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
}

function createCheckinsCache(
  group: Map<string, ParsedItem[]>
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [label, items] of group.entries()) {
    for (const item of items) {
      result[`${label} ${getTime(item.timestamp)}`] = item.checkins;
    }
  }

  return result;
}
