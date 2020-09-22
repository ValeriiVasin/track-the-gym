import { parseDate } from './parse-date';

describe('parse date', () => {
  it('truncates everything to minutes', () => {
    const parsed = parseDate('2020-09-22T22:21:48.598Z');

    expect(parsed.getMilliseconds()).toBe(0);
    expect(parsed.getSeconds()).toBe(0);
  });

  it('floors minutes to 00/15/30/45', () => {
    expect(parseDate('2020-09-22T22:00:48.598Z').getMinutes()).toBe(0);
    expect(parseDate('2020-09-22T22:14:48.598Z').getMinutes()).toBe(0);
    expect(parseDate('2020-09-22T22:15:48.598Z').getMinutes()).toBe(15);
    expect(parseDate('2020-09-22T22:16:48.598Z').getMinutes()).toBe(15);
    expect(parseDate('2020-09-22T22:29:48.598Z').getMinutes()).toBe(15);
    expect(parseDate('2020-09-22T22:30:48.598Z').getMinutes()).toBe(30);
    expect(parseDate('2020-09-22T22:31:48.598Z').getMinutes()).toBe(30);
    expect(parseDate('2020-09-22T22:44:48.598Z').getMinutes()).toBe(30);
    expect(parseDate('2020-09-22T22:45:48.598Z').getMinutes()).toBe(45);
    expect(parseDate('2020-09-22T22:46:48.598Z').getMinutes()).toBe(45);
    expect(parseDate('2020-09-22T22:59:48.598Z').getMinutes()).toBe(45);
  });
});
