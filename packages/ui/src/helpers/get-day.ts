import { Day } from '../types';

const days = [
  Day.Sunday,
  Day.Monday,
  Day.Tuesday,
  Day.Wednesday,
  Day.Thursday,
  Day.Friday,
  Day.Saturday,
];

export function getDay(date: Date): Day {
  return days[date.getDay()];
}
