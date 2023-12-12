import { Component, Inject, OnInit,NgZone } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { Reservation } from '../../models/reservation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Foyer } from '../../models/foyer';
import { Universite } from '../../models/universite';
import { FoyerService } from '../../services/foyer.service';
import { ReservationService } from '../../services/reservation.service';
import { ConfirmDialogComponent } from '../../variables/popup/popup.component';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[] = [];
  searchTerm = '';


  constructor(
    private restaurantService: RestaurantService
    ,public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllRestaurants();
    console.log('ngOnInit')

  }

  refresh() {
    this.getAllRestaurants();
  }


  search() {
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.nomRestaurant.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.filteredRestaurants);

  }



  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: any) => {
        this.restaurants = data;
        this.filteredRestaurants = this.restaurants;
      },
      (error) => {
        console.error('Error loading Restaurants: ', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RestaurantDialog, {
      width: '500px',
      data: {
        nomRestaurant: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('dialog')
      this.getAllRestaurants();
    });
  }
  aopenEditDialog(
    idRestaurant: number,
    nomRestaurant: string,
    reservation: Reservation
  ): void {
    const dialogRef = this.dialog.open(RestaurantEditDialog, {
      width: '500px',
      data: {
        idRestaurant: idRestaurant,
        nomRestaurant: nomRestaurant,
        reservation: reservation
      }
    });
    dialogRef.afterClosed().subscribe((result: Restaurant) => {
      if (result) {
        this.restaurantService.updateRestaurant(result.idRestaurant, result).subscribe((res: any) => {
          dialogRef.close();
          this.refresh();
        });
      }
    });
  }
  openEditDialog(
    idRestaurant: number,
    nomRestaurant: string,
    reservation: Reservation
  ): void {
    const dialogRef = this.dialog.open(RestaurantEditDialog, {
      width: '500px',
      data: {
        idRestaurant: idRestaurant,
        nomRestaurant: nomRestaurant,
        reservation: reservation,
      },
    });
    dialogRef.afterClosed().subscribe((result: Restaurant) => {
      if (result) {
        this.restaurantService
          .updateRestaurant(result.idRestaurant, result)
          .subscribe(
            (res: any) => {
              // Assuming your service returns a success response
              console.log('Update successful:', res);
              this.refresh();
              dialogRef.close(); // Close the dialog here
            },
            (error) => {
              console.error('Error updating Restaurant: ', error);
              // Handle error here (e.g., show an error message)
            }
          );
      }
    });
  }
  deleteRestaurant(idRestaurant: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this restaurant?');

    if (confirmDelete) {
      this.restaurantService.deleteRestaurant(idRestaurant).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Restaurant: ', error);
        }
      );
    }
  }


}










/////////////////////////////////////////////////////

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'restaurant-dialog',
  templateUrl: 'restaurant-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class RestaurantDialog implements OnInit {

  restaurantForm: FormGroup;
  restaurant:Restaurant[] = [];

  constructor(
    public dialogRef: MatDialogRef<RestaurantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurant,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    //private reservationService: ReservationService,

  ) {}

  ngOnInit(): void {
    /*this.reservationService.getAllReservations().subscribe(
      (foyers) => {
        this.reservations = this.reservations;
      },
      (error) => {
        console.error(error);

      }
    );*/

    // Create the form group with custom validation for required fields
    this.restaurantForm = this.formBuilder.group({
      nomRestaurant: [this.data.nomRestaurant, Validators.required],
      //foyer: [this.data.foyer, Validators.required], // Add the foyer field with appropriate validation
    });
  }


  submit() {
    if (this.restaurantForm.invalid) {
      return;
    }
    // Customize the submission logic for adding a universite
    const restaurant: {nomRestaurant: string; } = {
      nomRestaurant: this.data.nomRestaurant,

    };

    this.restaurantService.addRestaurant(restaurant).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

}





@Component({
  selector: 'restaurant-edit-dialog',
  templateUrl: 'restaurant-edit-dialog.html',
})
export class RestaurantEditDialog implements OnInit {
  restaurantForm: FormGroup;
  restaurants: Restaurant[];
  private restaurantService: RestaurantService

  //reservations: Restaurant[] = [];
  // selectedFoyer: Foyer;

  constructor(
    public dialogRef: MatDialogRef<RestaurantEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurant,
    private formBuilder: FormBuilder,
    // private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    /*this.foyerService.getAllFoyers().subscribe(
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
    );*/

    this.restaurantForm = this.formBuilder.group({
      idReservation: [this.data.idRestaurant,Validators.required],
      nomRestaurant: [this.data.nomRestaurant,Validators.required],
      reservation: [null],
    });
  }


  refresh() {
    console.log('re')
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (data: any) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error loading Restaurants: ', error);
      }
    );
  }



  submitEdit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier ce restaurant ?',
        confirmText: 'Confirmer',
        confirmColor: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const updatedRestaurant: Restaurant = {
          idRestaurant: this.data.idRestaurant,
          nomRestaurant: this.restaurantForm.value.nomRestaurant,
          reservations: this.restaurantForm.value.reservation,
        };

        this.dialogRef.close(updatedRestaurant);
      }
    });

    this.refresh();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
