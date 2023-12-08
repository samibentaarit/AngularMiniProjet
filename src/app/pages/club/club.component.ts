import {Component, Inject, OnInit} from '@angular/core';
import {Universite} from "../../models/universite";
import {ClubService} from "../../services/club.service";
import {FoyerService} from "../../services/foyer.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Foyer} from "../../models/foyer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogComponent} from "../../variables/popup/popup.component";
import {Club} from "../../models/club";

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  clubs: Club[]; // Change the type to match your Universite model.
  searchTerm: string = '';
  filteredClubs: Club[];
  constructor(
    private clubService: ClubService
    , public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllClubs();

  }


  refresh() {
    this.getAllClubs();
  }
  zoomCard(club: Club): void {
    club.isZoomed = true;
  }

  resetZoom(club: Club): void {
    club.isZoomed = false;
  }
  getAllClubs() {
    this.clubService.getAllClubs().subscribe(
      (data: any) => {
        this.clubs = data;
        this.filteredClubs = this.clubs;// Assuming your service returns an array of Universite objects.
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );

  }
  search() {
    // Filtrer les universités basées sur le terme de recherche
    this.filteredClubs = this.clubs.filter(club =>
      club.nomClub.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  openDialog(): void {
    const defaultClub: Club = {
      idClub: null, // You can set a default value if needed
      nomClub: '',
      dateCreation: new Date(), // You can set a default date if needed
      lienSocial: '',

    };

    const dialogRef = this.dialog.open(ClubDialog, {
      width: '500px',
      data: defaultClub,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }


  openEditDialog(
    idClub: number,
    nomClub: string,
    dateCreation: Date,
    lienSocial: string
  ): void {
    const defaultClub: Club = {
      idClub: idClub,
      nomClub: nomClub,
      dateCreation: dateCreation,
      lienSocial: lienSocial,
    };

    const dialogRef = this.dialog.open(ClubEditDialog, {
      width: '500px',
      data: defaultClub,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });


    dialogRef.afterClosed().subscribe((result: Club) => {
      if (result) {
        this.clubService.updateClub(result.idClub, result).subscribe(
          (res: any) => {
            console.log('Update successful:', res);
            this.refresh();
            dialogRef.close();
          },
          (error) => {
            console.error('Error updating Club: ', error);
          }
        );
      }
    });
  }
  assignClubToUniversity(universityId: number, clubId: number): void {
    this.clubService.assignClubToUniversity(universityId, clubId).subscribe(
      (response) => {
        console.log('Assignation réussie', response);
        // Vous pouvez mettre à jour votre interface utilisateur ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'assignation', error);
        // Gérez les erreurs ici
      }
    );}
  deleteClub(idClub: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this club?');

    if (confirmDelete) {
      this.clubService.deleteClub(idClub).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Club: ', error);
        }
      );
    }
  }
}


/////////////////////////////////////////////////////


    @Component({
      selector: 'app-club-dialog',
      templateUrl: 'club-dialog.html',
    })
    export class ClubDialog implements OnInit {
      clubForm: FormGroup;

      constructor(
        public dialogRef: MatDialogRef<ClubDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Club,
        private formBuilder: FormBuilder,
        private clubService: ClubService,
        private dialog: MatDialog
      ) {
      }

      ngOnInit(): void {
        this.clubForm = this.formBuilder.group({
          nomClub: [this.data?.nomClub || '', Validators.required],
          dateCreation: [this.data?.dateCreation || '', Validators.required],
          lienSocial: [this.data?.lienSocial || '', Validators.required],
          // Ajoutez d'autres propriétés du Club avec une validation appropriée
        });
      }

      submit(): void {
        if (this.clubForm.invalid) {
          return;
        }

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: {
            title: 'Confirm addition',
            message: 'Are you sure you want to add this club?',
            confirmText: 'Confirm',
            confirmColor: 'primary',
          },
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            const club: Club = {
              idClub: null, // Vous pouvez définir une valeur par défaut si nécessaire
              nomClub: this.clubForm.value.nomClub,
              dateCreation: this.clubForm.value.dateCreation,
              lienSocial: this.clubForm.value.lienSocial,
              // Ajoutez d'autres propriétés du Club
            };

            this.clubService.addClub(club).subscribe((res: any) => {
              this.dialogRef.close();
            });
          }
        });
      }

      onCancel(): void {
        this.dialogRef.close();
      }
    }


     @Component({
      selector: 'app-club-edit-dialog',
      templateUrl: 'club-edit-dialog.html',
    })
    export class ClubEditDialog implements OnInit {
      clubForm: FormGroup;

      constructor(
        public dialogRef: MatDialogRef<ClubEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Club,
        private formBuilder: FormBuilder,
        private dialog: MatDialog
      ) {
      }

      ngOnInit(): void {
        this.clubForm = this.formBuilder.group({
          idClub: [this.data.idClub, Validators.required],
          nomClub: [this.data.nomClub, Validators.required],
          dateCreation: [this.data.dateCreation, Validators.required],
          lienSocial: [this.data.lienSocial, Validators.required],
        });
      }

      submitEdit(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: {
            title: 'Confirm modification',
            message: 'Are you sure you want to modify this club?',
            confirmText: 'Confirm',
            confirmColor: 'primary',
          },
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
          if (result) {
            const updatedClub: Club = {
              idClub: this.data.idClub,
              nomClub: this.clubForm.value.nomClub,
              dateCreation: this.clubForm.value.dateCreation,
              lienSocial: this.clubForm.value.lienSocial,
            };

            this.dialogRef.close(updatedClub);
          }
        });
      }

      onCancel(): void {
        this.dialogRef.close();
      }
    }

