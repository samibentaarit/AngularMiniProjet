
import { Chambre } from "./chambre";
import { Restaurant } from "./restaurant";

export class Reservation {
  idReservation: number;
  anneeUniversitaire: Date;
  estValide: boolean;
  chambre: Chambre;
  restaurant: Restaurant

}
