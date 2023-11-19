import {Component, Inject, OnInit} from '@angular/core';
import {Bloc} from "../../models/bloc";
import {BlocService} from "../../services/bloc.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Chambre} from "../../models/chambre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChambreService} from "../../services/chambre.service";
import {ConfirmDialogComponent} from "../../variables/popup/popup.component";

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit {
  blocs: Bloc[]; // Change the type to match your Bloc model.

  constructor(
    private blocService: BlocService
    ,public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllBlocs();
  }
  refresh() {
    this.getAllBlocs();
  }

  getAllBlocs() {
    this.blocService.getAllBlocs().subscribe(
      (data: any) => {
        this.blocs = data; // Assuming your service returns an array of Bloc objects.
      },
      (error) => {
        console.error('Error loading Blocs: ', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BlocDialog, {
      width: '500px',
      data: {
        nomBloc: '',
        adresse: '',
        chambre: null, // You can pass an chambre object here if needed
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllBlocs();
    });
  }
  aopenEditDialog(
    idBloc: number,
    nomBloc: string,
    adresse: string,
    chambre: Chambre
  ): void {
    const dialogRef = this.dialog.open(BlocEditDialog, {
      width: '500px',
      data: {
        idBloc: idBloc,
        nomBloc: nomBloc,
        adresse: adresse,
        chambre: chambre // You can pass an chambre object here if needed
      }
    });
    dialogRef.afterClosed().subscribe((result: Bloc) => {
      if (result) {
        this.blocService.updateBloc(result.idBloc, result).subscribe((res: any) => {
          dialogRef.close();
          this.refresh();
        });
      }
    });
  }
  openEditDialog(
    idBloc: number,
    nomBloc: string,
    chambre: Chambre
  ): void {
    const dialogRef = this.dialog.open(BlocEditDialog, {
      width: '500px',
      data: {
        idBloc: idBloc,
        nomBloc: nomBloc,
        chambre: chambre,
      },
    });
    dialogRef.afterClosed().subscribe((result: Bloc) => {
      if (result) {
        this.blocService
          .updateBloc(result.idBloc, result)
          .subscribe(
            (res: any) => {
              // Assuming your service returns a success response
              console.log('Update successful:', res);
              this.refresh();
              dialogRef.close(); // Close the dialog here
            },
            (error) => {
              console.error('Error updating Bloc: ', error);
              // Handle error here (e.g., show an error message)
            }
          );
      }
    });
  }
  deleteBloc(idBloc: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this university?');

    if (confirmDelete) {
      this.blocService.deleteBloc(idBloc).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Bloc: ', error);
        }
      );
    }
  }
}








/////////////////////////////////////////////////////

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bloc-dialog',
  templateUrl: 'bloc-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class BlocDialog implements OnInit {
  // Add the necessary properties for bloc creation dialog

  blocForm: FormGroup;
  chambres:Chambre[] = [];

  constructor(
    public dialogRef: MatDialogRef<BlocDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bloc,
    private formBuilder: FormBuilder,
    private blocService: BlocService,
    private chambreService: ChambreService,

  ) {}

  ngOnInit(): void {
    this.chambreService.getAllChambres().subscribe(
      (chambres) => {
        this.chambres = chambres;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    // Create the form group with custom validation for required fields
    this.blocForm = this.formBuilder.group({
      nomBloc: [this.data.nomBloc, Validators.required],
      chambre: [this.data.chambre, Validators.required], // Add the chambre field with appropriate validation
    });
  }


  submit() {
    if (this.blocForm.invalid) {
      return;
    }
    // Customize the submission logic for adding a bloc
    const bloc: {chambre:Chambre;  nomBloc: string;  capaciteBloc: number;
    } = {
      nomBloc: this.data.nomBloc,
      chambre:this.data.chambre,
      capaciteBloc:this.data.capaciteBloc
    };

    this.blocService.addBloc(bloc).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

}





@Component({
  selector: 'bloc-edit-dialog',
  templateUrl: 'bloc-edit-dialog.html',
})
export class BlocEditDialog implements OnInit {
  blocForm: FormGroup;
  chambres: Chambre[] = [];
  selectedChambre: Chambre;

  constructor(
    public dialogRef: MatDialogRef<BlocEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bloc,
    private formBuilder: FormBuilder,
    private chambreService: ChambreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chambreService.getAllChambres().subscribe(
      (chambres) => {
        this.chambres = chambres;

        // Set the initial value for the "chambre" form control and selectedChambre
        const initialChambre = this.chambres.find(f => f.idChambre === this.data.chambre.idChambre);
        this.blocForm.get('chambre')?.setValue(initialChambre);
        this.selectedChambre = initialChambre;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    this.blocForm = this.formBuilder.group({
      idBloc: [this.data.idBloc, Validators.required],
      nomBloc: [this.data.nomBloc, Validators.required],
      chambre: [null, Validators.required],
    });
  }

  submitEdit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier cette université ?',
        confirmText: 'Confirmer',
        confirmColor: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const updatedBloc: Bloc = {
          idBloc: this.data.idBloc,
          nomBloc: this.blocForm.value.nomBloc,
          capaciteBloc: this.blocForm.value.capaciteBloc,
          chambre: this.blocForm.value.chambre,
        };

        this.dialogRef.close(updatedBloc);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

