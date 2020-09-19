export interface CheckinItem {
  checkins: number;
  timestamp: string;
}

export interface ClubCheckinsResponse {
  data: {
    check_ins: number;
    allowed_people: number;
  };
}
