import { CosmosClient } from "@azure/cosmos";
import type { CheckinItem } from "./types";

const { DATABASE_ENDPOINT, DATABASE_KEY } = process.env;

const DATABASE_ID = "track-the-gym";
const CONTAINER_ID = "Items";

export async function trackCheckins(checkins: number): Promise<void> {
  const client = new CosmosClient({
    endpoint: DATABASE_ENDPOINT,
    key: DATABASE_KEY,
  });

  const item: CheckinItem = { checkins, timestamp: new Date().toISOString() };

  try {
    await client
      .database(DATABASE_ID)
      .container(CONTAINER_ID)
      .items.upsert(item);
  } catch (error) {
    console.error("something went wrong", error);
  }
}
