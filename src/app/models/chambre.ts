import { Equipement } from './equipement';
import {Bloc} from "./bloc";

export class Chambre {
  idChambre?: number;
  numeroChambre: number;
  typeC: string;
  prix: number;
  equipements: Equipement[];
  maxEquipements: number;
}
