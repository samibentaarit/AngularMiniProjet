import { Foyer } from "./foyer";
import { Club } from "./club";
export class Universite {
  idUniversite: number;
  nomUniversite: string;
  adresse: string;
  foyer: Foyer | null; // Use 'null' to represent optional association
  }

