import { Foyer } from "./foyer";

export class Universite {
  idUniversite: number;
  nomUniversite: string;
  adresse: string;
  foyer: Foyer | null; // Use 'null' to represent optional association
}