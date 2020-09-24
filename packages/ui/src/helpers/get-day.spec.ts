import { Day } from '../types';
import { getDay } from './get-day';

describe('get day', () => {
  it('is correct for monday', () => {
    expect(getDay(new Date('2020-09-21'))).toBe(Day.Monday);
  });

  it('is correct for sunday', () => {
    expect(getDay(new Date('2020-09-20'))).toBe(Day.Sunday);
  });
});
