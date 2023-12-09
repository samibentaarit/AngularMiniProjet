import { Reservation } from "./reservation";

export class Restaurant {
  idRestaurant: number;
  nomRestaurant: string;
  reservation: Reservation | null;
}
