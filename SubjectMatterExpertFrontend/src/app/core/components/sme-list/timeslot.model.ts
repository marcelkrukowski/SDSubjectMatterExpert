export interface TimeSlot {
  id: number;
  availableDate: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy: string;
  userId: number;
}
