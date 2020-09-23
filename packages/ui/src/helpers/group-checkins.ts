import type { GroupedCheckins, ParsedItem } from '../types';
import { getDateLabel } from './get-date-label';
import { getDay } from './get-day';

export function groupCheckins(checkins: ParsedItem[]): GroupedCheckins {
  const result: GroupedCheckins = new Map();

  for (const checkin of checkins) {
    const day = getDay(checkin.timestamp);
    const label = getDateLabel(checkin.timestamp);

    if (!result.has(day)) {
      result.set(day, { label, checkins: [] });
    }

    result.get(day).checkins.push(checkin);
  }

  for (const day of result.keys()) {
    result
      .get(day)
      .checkins.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  return result;
}
