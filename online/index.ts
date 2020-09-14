import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getOnline } from './get-online';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = {
    body: await getOnline(),
  };
};

export default httpTrigger;
