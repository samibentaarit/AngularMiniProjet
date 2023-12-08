import { Equipement } from './equipement';

export class Chambre {
  idChambre?: number;
  numeroChambre: number;
  typeC: string;
  prix: number;
  equipements: Equipement[];
  maxEquipements: number;
}
