export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  endDate?: string;
  imageUrl: string;
  organizer: {
    id: number;
    name: string;
    email: string;
  };
  ticketPrice: number;
  featured?: boolean;
  category: string;
  tickets?: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description?: string;
  }[];
  schedule?: {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    description?: string;
    speaker?: string;
    location?: string;
  }[];
}

export interface Ticket {
  id: number;
  eventId: number;
  userId: number;
  ticketType: string;
  price: number;
  purchaseDate: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  ticketCode: string;
}