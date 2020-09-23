import { writable } from 'svelte/store';
import { getDay } from './helpers/get-day';
import type { Day } from './types';

export const day = writable<Day>(getDay(new Date()));
