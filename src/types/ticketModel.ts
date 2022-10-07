export type TicketModel = {
  ticketId: number;
  title: string;
  state: string;
  priority: string;
  ticketLocationBuildingAddress: string;
  thumbnailURL: string;
  created: boolean;
  follows: boolean;
  appointed: boolean;
};