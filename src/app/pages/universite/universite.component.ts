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
foyer : Foyer ;
  focus = false;
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
   // this.generatePdf() ;

  }


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
    this.getAllClubs();

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
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }

openEditDialog(
  idUniversite: number,
  nomUniversite: string,
  adresse: string,
): void {
  const dialogRef = this.dialog.open(UniversiteEditDialog, {
    width: '500px',
    data: {
      idUniversite: idUniversite,
      nomUniversite: nomUniversite,
      adresse: adresse,
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
  selector: 'universite-dialog',
  templateUrl: 'universite-dialog.html',
})

export class UniversiteDialog implements OnInit {

  universiteForm: FormGroup;


  constructor(
      public dialogRef: MatDialogRef<UniversiteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Universite,
      private formBuilder: FormBuilder,
      private universiteService: UniversiteService,

  ) {}

  ngOnInit(): void {
    // Create the form group with custom validation for required fields
    this.universiteForm = this.formBuilder.group({
      nomUniversite: [this.data.nomUniversite, Validators.required],
      adresse: [this.data.adresse, Validators.required],
    });
  }


  submit() {
    if (this.universiteForm.invalid) {
      return;
    }
    // Customize the submission logic for adding  universite
    const universite: {nomUniversite: string; adresse: string; } = {
      nomUniversite: this.data.nomUniversite,
      adresse: this.data.adresse,
    };

    this.universiteService.addUniversite(universite).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'universite-edit-dialog',
  templateUrl: 'universite-edit-dialog.html',
})
export class UniversiteEditDialog implements OnInit {
  universiteForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<UniversiteEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Universite,
    private formBuilder: FormBuilder,
    private foyerService: FoyerService,
    private dialog: MatDialog,
    private universiteService: UniversiteService

  ) {}

  ngOnInit(): void {
    this.universiteForm = this.formBuilder.group({
      idUniversite: [this.data.idUniversite, Validators.required],
      nomUniversite: [this.data.nomUniversite, Validators.required],
      adresse: [this.data.adresse, Validators.required],
    });
  }

  submitEdit() {
    if (this.universiteForm.invalid) {
      return;
    }
    const universite: {nomUniversite: string; adresse: string; } = {
      nomUniversite: this.data.nomUniversite,
      adresse: this.data.adresse,
    };

    this.universiteService.addUniversite(universite).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }




}
