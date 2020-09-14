import axios from 'axios';

interface OnlineResponse {
  data: {
    check_ins: number;
    allowed_people: number;
  };
}

export async function getOnline(): Promise<number> {
  const {
    data: { check_ins },
  } = await axios
    .get<OnlineResponse>(
      'https://www.fitnessfirst.de/club/api/checkins/berlin12'
    )
    .then((res) => res.data);

  return check_ins;
}
