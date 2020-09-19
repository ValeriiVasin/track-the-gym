import type { Item } from '../types';

const storageKey = 'items';
const DEFAULT_TIMESTAMP = new Date('2020-01-01').toISOString();
let checkins: Item[] = getPersistedItems();

export async function fetchItems(): Promise<Item[]> {
  const timestamp =
    checkins.length > 0 ? checkins[0].timestamp : DEFAULT_TIMESTAMP;

  const items = await fetch(timestamp);

  if (items.length === 0) {
    return checkins;
  }

  checkins = [...items, ...checkins];
  persist(checkins);
  return checkins;
}

async function fetch(since: string): Promise<Item[]> {
  const code = '75wRTCthtJ8217T4F1corEqmG8WCChUaxys6L1KPRAobReQcd7Yyzg==';
  const params = new URLSearchParams({ code, since });

  return await window
    .fetch(
      `https://track-the-gym.azurewebsites.net/api/online?${String(params)}`,
      { method: 'GET', mode: 'cors' }
    )
    .then((response) => response.json())
    .then((data: { items: Item[] }) => data.items);
}

function getPersistedItems(): Item[] {
  try {
    return localStorage.getItem(storageKey)
      ? JSON.parse(localStorage.getItem(storageKey))
      : [];
  } catch (error) {
    console.error('error happened while retrieving', error);
    return [];
  }
}

function persist(items: Item[]): void {
  localStorage.setItem(storageKey, JSON.stringify(items));
}
