import { Reservation } from "./reservation";

export class Restaurant {
  idRestaurant: number;
  nomRestaurant: string;
  reservations: Reservation[] | null;
}