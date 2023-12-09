import { Component, OnInit } from '@angular/core';
import { UniversiteService } from 'src/app/services/universite.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ChambreService } from 'src/app/services/chambre.service';

import { Inject, } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialog,  MatDialogRef } from '@angular/material/dialog';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Universite } from 'src/app/models/universite';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import { ConfirmDialogComponent } from 'src/app/variables/popup/popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Reservation } from 'src/app/models/reservation';
import { Chambre } from 'src/app/models/chambre';
import { Restaurant } from 'src/app/models/restaurant';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservations: Reservation[]; // Change the type to match your Universite model.

  constructor(
    private reservationService: ReservationService
    ,public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllReservations();
    console.log("reservation",this.reservations)
  }
  refresh() {
    this.getAllReservations();
    console.log("reservation",this.reservations)

  }

  getAllReservations() {
    this.reservationService.getAllReservations().subscribe(
      (data: any) => {
        this.reservations = data; // Assuming your service returns an array of Universite objects.
        console.log("reservation",this.reservations)

      },
      (error) => {
        console.error('Error loading reservations: ', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationDialog, {
      width: '500px',
      data: {
        anneeUniversitaire: '',
        estValide: '',
        chambre: null, // You can pass an foyer object here if needed
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllReservations();
    });
  }

  aopenEditDialog(
    idReservation: number,
    anneeUniversitaire: Date,
    estValide: boolean,
    chambre: Chambre
  ): void {
    const dialogRef = this.dialog.open(ReservationEditDialog, {
      width: '500px',
      data: {
        idReservation: idReservation,
        anneeUniversitaire: anneeUniversitaire,
        estValide: estValide,
        chambre: chambre
      }
    });
    dialogRef.afterClosed().subscribe((result: Reservation) => {
      if (result) {
        this.reservationService.updateReservation(result.idReservation, result).subscribe((res: any) => {
          dialogRef.close();
          this.refresh();
        });
      }
    });
  }

  openEditDialog(
    idReservation: number,
    anneeUniversitaire: Date,
    estValide: boolean
  ): void {
    const dialogRef = this.dialog.open(ReservationEditDialog, {
      width: '500px',
      data: {
        idReservation: idReservation,
        anneeUniversitaire: anneeUniversitaire,
        estValide: estValide,
        chambre: Chambre
      },
    });
    dialogRef.afterClosed().subscribe((result: Reservation) => {
      if (result) {
        this.reservationService
          .updateReservation(result.idReservation, result)
          .subscribe(
            (res: any) => {
              console.log('Update successful:', res);
              this.refresh();
              dialogRef.close();
            },
            (error) => {
              console.error('Error updating Reservation: ', error);
              // Handle error here (e.g., show an error message)
            }
          );
      }
    });
  }
  deleteReservation(idReservation: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this reservation?');

    if (confirmDelete) {
      this.reservationService.deleteReservation(idReservation).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Reservation: ', error);
        }
      );
    }
  }
}








/////////////////////////////////////////////////////

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'reservation-dialog',
  templateUrl: 'reservation-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ReservationDialog implements OnInit {

  reservationForm: FormGroup;
  chambres:Chambre[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReservationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private chambreService: ChambreService,

  ) {}

  ngOnInit(): void {
    this.chambreService.getAllChambres().subscribe(
      (foyers) => {
        this.chambres =this.chambres;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    // Create the form group with custom validation for required fields
    this.reservationForm= this.formBuilder.group({
      nomUniversite: [this.data.anneeUniversitaire, Validators.required],
      adresse: [this.data.estValide, Validators.required],
      foyer: [this.data.chambre, Validators.required], // Add the foyer field with appropriate validation
    });
  }


  submit() {
    if (this.reservationForm.invalid) {
      return;
    }
    // Customize the submission logic for adding a universite
    const reservation: {chambre:Chambre;  anneeUniversitaire: Date; estValide: boolean; } = {
      anneeUniversitaire : this.data.anneeUniversitaire,
      estValide: this.data.estValide,
      chambre:this.data.chambre
    };

    this.reservationService.addReservation(reservation).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

}





@Component({
  selector: 'reservation-edit-dialog',
  templateUrl: 'reservation-edit-dialog.html',
})
export class ReservationEditDialog implements OnInit {
  reservationForm: FormGroup;
  chambres: Chambre[] = [];
  selectedChambre: Chambre;

  constructor(
    public dialogRef: MatDialogRef<ReservationEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
    private formBuilder: FormBuilder,
    private chambreService:ChambreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chambreService.getAllChambres().subscribe(
      (chambres) => {
        this.chambres = chambres;

        // Set the initial value for the "foyer" form control and selectedFoyer
        const initialChambre = this.chambres.find(f => f.idChambre === this.data.chambre.idChambre);
        this.reservationForm.get('chambre')?.setValue(initialChambre);
        this.selectedChambre = initialChambre;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    this.reservationForm = this.formBuilder.group({
      idReservation: [this.data.idReservation, Validators.required],
      anneeUniversitaire: [this.data.anneeUniversitaire, Validators.required],
      estValide: [this.data.estValide, Validators.required],
      chambre: [null, Validators.required],
    });
  }

  submitEdit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier cette reservation ?',
        confirmText: 'Confirmer',
        confirmColor: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const updateReservation: Reservation = {
          idReservation: this.data.idReservation,
          anneeUniversitaire: this.reservationForm.value.anneeUniversitaire,
          estValide: this.reservationForm.value.estValide,
          chambre: this.reservationForm.value.chambre,
          restaurant: this.reservationForm.value.restaurant,
        };

        this.dialogRef.close(updateReservation);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
