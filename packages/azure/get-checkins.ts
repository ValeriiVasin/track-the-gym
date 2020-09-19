import axios from 'axios';
import type { ClubCheckinsResponse } from './types';

export async function getCheckins(): Promise<number> {
  const {
    data: { check_ins },
  } = await axios
    .get<ClubCheckinsResponse>(
      'https://www.fitnessfirst.de/club/api/checkins/berlin12'
    )
    .then((res) => res.data);

  return check_ins;
}
