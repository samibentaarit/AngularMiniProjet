import { Component, OnInit } from '@angular/core';
import { UniversiteService } from 'src/app/services/universite.service';


import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialog,  MatDialogRef } from '@angular/material/dialog';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Universite } from 'src/app/models/universite';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {RouterLink} from "@angular/router";
import {SearchService} from "../../services/Search.Service";
import {ClubService} from "../../services/club.service";
import { Club } from 'src/app/models/club';
import {  Input, Output, EventEmitter } from '@angular/core';

import 'jspdf-autotable';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
})
export class UniversiteComponent implements OnInit {
  universites: Universite[]; // Change the type to match your Universite model.
  averageFoyerCapacity: number;
  searchTerm: string = '';
  filteredUniversites: Universite[];
clubs : Club [] ;

  constructor(
    private universiteService: UniversiteService
    , private foyerService: FoyerService
    , public dialog: MatDialog,
    private searchService: SearchService
  ,private clubService :ClubService){
  }

  ngOnInit() {
    this.getAllUniversites();
    this.getAllClubs();
    this.generatePdf() ;

  }
  generatePdf() {
    const jsPDF = require('jspdf');
    require('jspdf-autotable');

    const pdf = new jsPDF();
    const pageTitle = 'Liste des Universités';
    const header = [['ID', 'Nom de l\'Université', 'Adresse', 'Nom du Foyer']];

    // Ajouter des données (par exemple, utiliser filteredUniversites)
    const data = this.filteredUniversites.map(universite => [
      universite.idUniversite.toString(),
      universite.nomUniversite,
      universite.adresse,
      universite.foyer?.nomFoyer || '', // Si foyer est null, affiche une chaîne vide
    ]);

    pdf.autoTable({
      head: header,
      body: data,
      startY: 40,
    });

    pdf.text(pageTitle, 14, 20);

    // Sauvegarder le PDF
    pdf.save('liste_universites.pdf');
  }

  // ...

  assignClubToUniversity(universityId: number, clubId: number): void {
    this.universiteService.assignClubToUniversity(universityId, clubId).subscribe(
      (response) => {
        console.log('Assignation réussie', response);
        // Vous pouvez mettre à jour votre interface utilisateur ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'assignation', error);
        // Gérez les erreurs ici
      }
    );}
  search() {
    // Filtrer les universités basées sur le terme de recherche
    this.filteredUniversites = this.universites.filter(universite =>
      universite.nomUniversite.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



  refresh() {
    this.getAllUniversites();
  }



  getAllUniversites() {
    this.universiteService.getAllUniversites().subscribe(
      (data: any) => {
        this.universites = data;
        this.filteredUniversites = this.universites; // Initialiser la liste filtrée avec toutes les universités
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );
  }
  getAllClubs() {
    this.clubService.getAllClubs().subscribe(
      (data: any) => {
        this.clubs = data; // Assuming your service returns an array of Universite objects.
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UniversiteDialog, {
      width: '500px',
      data: {
        nomUniversite: '',
        adresse: '',
        foyer: null, // You can pass an foyer object here if needed
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }
  /*
  aopenEditDialog(
    idUniversite: number,
    nomUniversite: string,
    adresse: string,
    foyer: Foyer
): void {
  const dialogRef = this.dialog.open(UniversiteEditDialog, {
    width: '500px',
    data: {
      idUniversite: idUniversite,
      nomUniversite: nomUniversite,
      adresse: adresse,
      foyer: foyer // You can pass an foyer object here if needed
    }
  });
  dialogRef.afterClosed().subscribe((result: Universite) => {
    if (result) {
      this.universiteService.updateUniversite(result.idUniversite, result).subscribe((res: any) => {
        dialogRef.close();
        this.refresh();
      });
    }
  });
}
*/

openEditDialog(
  idUniversite: number,
  nomUniversite: string,
  adresse: string,
  foyer: Foyer
): void {
  const dialogRef = this.dialog.open(UniversiteEditDialog, {
    width: '500px',
    data: {
      idUniversite: idUniversite,
      nomUniversite: nomUniversite,
      adresse: adresse,
      foyer: foyer,
    },
  });
  dialogRef.afterClosed().subscribe((result: Universite) => {
    if (result) {
      this.universiteService
        .updateUniversite(result.idUniversite, result)
        .subscribe(
          (res: any) => {
            // Assuming your service returns a success response
            console.log('Update successful:', res);
            this.refresh();
            dialogRef.close(); // Close the dialog here
          },
          (error) => {
            console.error('Error updating Universite: ', error);
            // Handle error here (e.g., show an error message)
          }
        );
    }
  });
}
deleteUniversite(idUniversite: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this university?');

  if (confirmDelete) {
    this.universiteService.deleteUniversite(idUniversite).subscribe(
      (res: any) => {
        console.log('Delete successful:', res);
        this.refresh();
      },
      (error) => {
        console.error('Error deleting Universite: ', error);
      }
    );
  }
}


  protected readonly RouterLink = RouterLink;
}








/////////////////////////////////////////////////////

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'universite-dialog',
  templateUrl: 'universite-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class UniversiteDialog implements OnInit {
  // Add the necessary properties for universite creation dialog

  universiteForm: FormGroup;
  foyers:Foyer[] = [];

  constructor(
      public dialogRef: MatDialogRef<UniversiteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Universite,
      private formBuilder: FormBuilder,
      private universiteService: UniversiteService,
      private foyerService: FoyerService,

  ) {}

  ngOnInit(): void {
    this.foyerService.getAllFoyers().subscribe(
      (foyers) => {
        this.foyers = foyers;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    // Create the form group with custom validation for required fields
    this.universiteForm = this.formBuilder.group({
      nomUniversite: [this.data.nomUniversite, Validators.required],
      adresse: [this.data.adresse, Validators.required],
      foyer: [this.data.foyer, Validators.required], // Add the foyer field with appropriate validation
    });
  }


  submit() {
    if (this.universiteForm.invalid) {
      return;
    }
    // Customize the submission logic for adding  universite
    const universite: {foyer:Foyer;  nomUniversite: string; adresse: string; } = {
      nomUniversite: this.data.nomUniversite,
      adresse: this.data.adresse,
      foyer:this.data.foyer
    };

    this.universiteService.addUniversite(universite).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

}





@Component({
  selector: 'universite-edit-dialog',
  templateUrl: 'universite-edit-dialog.html',
})
export class UniversiteEditDialog implements OnInit {
  universiteForm: FormGroup;
  foyers: Foyer[] = [];
  selectedFoyer: Foyer;

  constructor(
    public dialogRef: MatDialogRef<UniversiteEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Universite,
    private formBuilder: FormBuilder,
    private foyerService: FoyerService,
    private dialog: MatDialog,
    private universiteService: UniversiteService

  ) {}

  ngOnInit(): void {
    this.foyerService.getAllFoyers().subscribe(
      (foyers) => {
        this.foyers = foyers;

        // Set the initial value for the "foyer" form control and selectedFoyer
        const initialFoyer = this.foyers.find(f => f.idFoyer === this.data.foyer.idFoyer);
        this.universiteForm.get('foyer')?.setValue(initialFoyer);
        this.selectedFoyer = initialFoyer;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    this.universiteForm = this.formBuilder.group({
      idUniversite: [this.data.idUniversite, Validators.required],
      nomUniversite: [this.data.nomUniversite, Validators.required],
      adresse: [this.data.adresse, Validators.required],
      foyer: [null, Validators.required],
    });
  }

  submit() {
    if (this.universiteForm.invalid) {
      return;
    }
    // Customize the submission logic for adding  universite
    const universite: {foyer:Foyer;  nomUniversite: string; adresse: string; } = {
      nomUniversite: this.data.nomUniversite,
      adresse: this.data.adresse,
      foyer:this.data.foyer
    };

    this.universiteService.addUniversite(universite).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }




}
