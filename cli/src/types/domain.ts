export type ShootType = 'portrait' | 'wedding' | 'id_photo' | 'commercial' | 'event';
export type TimeSlot = 'morning' | 'afternoon' | 'full_day';
export type OrderStatus = 'pending' | 'confirmed' | 'shooting' | 'completed' | 'cancelled';
export type AppConfig = { apiBaseUrl: string; token?: string; user?: { id: number; username: string } };
export type Booking = { id: number; customerName: string; date: string; shootType: ShootType; note: string };
export type Order = { id: number; customerName: string; date: string; shootType: ShootType; status: OrderStatus; amount: number };
export type Schedule = { id: number; date: string; slot: TimeSlot; shootType: ShootType; price: number; city: string; booked: boolean; customerName?: string };
