import type { GroupedCheckins, ParsedItem } from '../types';
import { getDateLabel } from './get-date-label';
import { getDay } from './get-day';

export function groupCheckins(checkins: ParsedItem[]): GroupedCheckins {
  const result: GroupedCheckins = new Map();

  for (const checkin of checkins) {
    const day = getDay(checkin.timestamp);
    const label = getDateLabel(checkin.timestamp);

    if (!result.has(day)) {
      result.set(day, new Map<string, ParsedItem[]>());
    }

    if (!result.get(day).get(label)) {
      result.get(day).set(label, []);
    }

    result.get(day).get(label).push(checkin);
  }

  for (const day of result.keys()) {
    for (const label of result.get(day).keys()) {
      result
        .get(day)
        .get(label)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
  }

  return result;
}
