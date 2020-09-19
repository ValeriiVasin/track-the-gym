import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getOnline } from '../db';

const httpTrigger: AzureFunction = async function (
  context: Context,
  _req: HttpRequest
): Promise<void> {
  const timestamp = _req.query.since;
  context.res = {
    body: JSON.stringify({ items: await getOnline(timestamp) }),
  };
};

export default httpTrigger;
