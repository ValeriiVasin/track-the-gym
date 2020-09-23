import { Month } from '../types';

const months = [
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

export function getDateLabel(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')} ${
    months[date.getMonth()]
  }`;
}
