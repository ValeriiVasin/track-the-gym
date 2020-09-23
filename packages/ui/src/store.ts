import { writable } from 'svelte/store';
import { Day } from './types';

export const day = writable<Day>(Day.Friday);
