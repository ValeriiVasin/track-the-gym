import type { ParsedItem } from '../types';
import { getChartDataset } from './get-dataset';

describe('get dataset', () => {
  describe('heading', () => {
    it('is having time label first', () => {
      const group: Map<string, ParsedItem[]> = new Map([
        [
          '24 Sep',
          [{ timestamp: new Date('2020-09-24 12:00:00'), checkins: 25 }],
        ],
      ]);

      const dataset = getChartDataset(group);
      expect(dataset[0][0]).toBe('time');
    });

    it('is having labels ordered ASC', () => {
      const group: Map<string, ParsedItem[]> = new Map([
        [
          '24 Sep',
          [{ timestamp: new Date('2020-09-24 12:00:00'), checkins: 25 }],
        ],
        [
          '11 Oct',
          [{ timestamp: new Date('2020-09-24 12:00:00'), checkins: 25 }],
        ],
        [
          '08 Mar',
          [{ timestamp: new Date('2020-09-24 12:00:00'), checkins: 25 }],
        ],
      ]);

      const dataset = getChartDataset(group);
      expect(dataset[0]).toEqual(['time', '08 Mar', '24 Sep', '11 Oct']);
    });
  });

  describe('rows', () => {
    it('every 15 mins are tracked from 06:00 to 23:00', () => {
      const group: Map<string, ParsedItem[]> = new Map([
        [
          '24 Sep',
          [{ timestamp: new Date('2020-09-24 12:00:00'), checkins: 25 }],
        ],
      ]);

      const dataset = getChartDataset(group);
      // 1 heading row, 4 * 17 (hourly) + 1 (23:00 extra row)
      expect(dataset.length).toBe(70);
    });

    it('missed checkin value is set to 0', () => {
      const group: Map<string, ParsedItem[]> = new Map([
        [
          '24 Sep',
          [{ timestamp: new Date('2020-09-24 12:00:00'), checkins: 25 }],
        ],
      ]);

      const dataset = getChartDataset(group);
      expect(dataset[1]).toEqual(['06:00', 0]);
    });

    it('in case of duplicates the latest value is being used', () => {
      const group: Map<string, ParsedItem[]> = new Map([
        [
          '24 Sep',
          [
            { timestamp: new Date('2020-09-24 06:00:00'), checkins: 25 },
            { timestamp: new Date('2020-09-24 06:00:00'), checkins: 28 },
          ],
        ],
      ]);

      const dataset = getChartDataset(group);
      expect(dataset[1]).toEqual(['06:00', 28]);
    });

    it('properly lists items from different dates', () => {
      const group: Map<string, ParsedItem[]> = new Map([
        [
          '24 Sep',
          [{ timestamp: new Date('2020-09-24 06:00:00'), checkins: 25 }],
        ],
        [
          '23 Sep',
          [{ timestamp: new Date('2020-09-23 06:00:00'), checkins: 10 }],
        ],
      ]);

      const dataset = getChartDataset(group);
      expect(dataset[1]).toEqual(['06:00', 10, 25]);
    });
  });
});
