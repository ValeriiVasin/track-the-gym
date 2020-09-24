import { getDateLabel } from './get-date-label';

describe('get date label', () => {
  it('is proper', () => {
    expect(getDateLabel(new Date('2020-09-23'))).toBe('23 Sep');
  });

  it('pads values with zeros', () => {
    expect(getDateLabel(new Date('2020-09-01'))).toBe('01 Sep');
  });
});
