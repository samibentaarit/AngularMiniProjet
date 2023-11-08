export class Universite {
    idUniversite: number;
    nomUniversite: string;
    adresse: string;
    // Add any other properties as needed
  
    constructor(idUniversite: number, nomUniversite: string, adresse: string) {
      this.idUniversite = idUniversite;
      this.nomUniversite = nomUniversite;
      this.adresse = adresse;
    }
  }