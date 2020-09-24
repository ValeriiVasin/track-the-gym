import { Day, ParsedItem } from '../types';
import { groupCheckins } from './group-checkins';

describe('group checkins', () => {
  const checkins: ParsedItem[] = [
    { timestamp: new Date('2020-09-23 22:15:00'), checkins: 15 },
    { timestamp: new Date('2020-09-23 21:45:00'), checkins: 20 },
    { timestamp: new Date('2020-09-23 22:00:00'), checkins: 18 },
    { timestamp: new Date('2020-09-24 22:30:00'), checkins: 12 },
    { timestamp: new Date('2020-09-25 22:45:00'), checkins: 8 },
  ];

  it('having proper labels', () => {
    const result = groupCheckins(checkins);

    expect(result.size).toBe(3);
    expect(result.has(Day.Wednesday)).toBe(true);
    expect(result.has(Day.Thursday)).toBe(true);
    expect(result.has(Day.Friday)).toBe(true);
  });

  it('group is having proper label', () => {
    const result = groupCheckins(checkins);

    expect(result.get(Day.Wednesday).has('23 Sep')).toBe(true);
  });

  it('group is ordered by date ASC', () => {
    const result = groupCheckins(checkins);

    expect(result.get(Day.Wednesday).get('23 Sep')).toEqual([
      { timestamp: new Date('2020-09-23 21:45:00'), checkins: 20 },
      { timestamp: new Date('2020-09-23 22:00:00'), checkins: 18 },
      { timestamp: new Date('2020-09-23 22:15:00'), checkins: 15 },
    ]);
  });
});
