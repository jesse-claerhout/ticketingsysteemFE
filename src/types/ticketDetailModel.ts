export type TicketDetailModel = {
    ticketId: number;
    title: string;
    state: string;
    priority: string;
    ticketLocationBuildingAddress: string;
    ticketLocationSpace: string;
    date: Date;
    deliveryDate: Date;
    description: string;
    media: File[];
    visibleToAll: boolean;
    created: boolean;
    follows: boolean;
    appointed: boolean;
  };