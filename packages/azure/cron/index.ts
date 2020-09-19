import { AzureFunction, Context } from '@azure/functions';
import { trackCheckins } from '../db';
import { getCheckins } from '../get-checkins';

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  const checkins = await getCheckins();

  await trackCheckins(checkins);
};

export default timerTrigger;
