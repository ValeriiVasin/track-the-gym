export function parseDate(isoDate: string): Date {
  const parsed = new Date(isoDate);

  parsed.setMilliseconds(0);
  parsed.setSeconds(0);
  parsed.setMinutes(floorMinutes(parsed.getMinutes()));

  return parsed;
}

function floorMinutes(minutes: number): number {
  if (minutes < 15) {
    return 0;
  }

  if (minutes < 30) {
    return 15;
  }

  if (minutes < 45) {
    return 30;
  }

  return 45;
}
