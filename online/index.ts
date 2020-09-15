import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getCheckins } from "../get-checkins";

const httpTrigger: AzureFunction = async function (
  context: Context,
  _req: HttpRequest
): Promise<void> {
  context.res = {
    body: await getCheckins(),
  };
};

export default httpTrigger;
