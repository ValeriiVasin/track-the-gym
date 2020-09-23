export interface Item {
  timestamp: string;
  checkins: number;
}

export interface ParsedItem {
  timestamp: Date;
  checkins: number;
}

export const enum Day {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export const enum Month {
  January = 'Jan',
  February = 'Feb',
  March = 'Mar',
  April = 'Apr',
  May = 'May',
  June = 'Jun',
  July = 'Jul',
  August = 'Aug',
  September = 'Sep',
  October = 'Oct',
  November = 'Nov',
  December = 'Dec',
}

interface CheckinGroup {
  label: string;
  checkins: ParsedItem[];
}

export type GroupedCheckins = Map<Day, CheckinGroup>;
