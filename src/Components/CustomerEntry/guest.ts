export interface GuestData {
  id?: string;
  tableNumber: number;
  guestName: string;
  status: "active" | "completed";
  entryTime: string;
}