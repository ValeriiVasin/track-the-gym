import { CosmosClient } from '@azure/cosmos';
import type { CheckinItem } from './types';

const { DATABASE_ENDPOINT, DATABASE_KEY } = process.env;

const DATABASE_ID = 'track-the-gym';
const CONTAINER_ID = 'Items';

// as recommended:
// https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections#cosmosclient-code-example-javascript
const client = new CosmosClient({
  endpoint: DATABASE_ENDPOINT,
  key: DATABASE_KEY,
});
const container = client.database(DATABASE_ID).container(CONTAINER_ID);

export async function trackCheckins(checkins: number): Promise<void> {
  const item: CheckinItem = { checkins, timestamp: new Date().toISOString() };

  try {
    await container.items.upsert(item);
  } catch (error) {
    console.error('something went wrong', error);
  }
}

const DEFAULT_TIMESTAMP = new Date('2020-01-01').toISOString();
export async function getOnline(
  timestamp: string = DEFAULT_TIMESTAMP
): Promise<CheckinItem[]> {
  const query = `SELECT c.timestamp, c.checkins FROM c WHERE c.timestamp > "${timestamp}" ORDER BY c._ts DESC`;
  const { resources: items } = await container.items
    .query<CheckinItem>({ query })
    .fetchAll();

  return items;
}
