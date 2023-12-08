import {Component, Inject, OnInit} from '@angular/core';
import {Bloc} from "../../models/bloc";
import {BlocService} from "../../services/bloc.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Chambre} from "../../models/chambre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogComponent} from "../../variables/popup/popup.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit {
  blocs: Bloc[];

  constructor(
    private blocService: BlocService
    ,public dialog: MatDialog,
    private router: Router
  ) {}

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
    capaciteBloc:number,
  ): void {
    const dialogRef = this.dialog.open(BlocEditDialog, {
      width: '500px',
      data: {
        idBloc: idBloc,
        nomBloc: nomBloc,
        capaciteBloc: capaciteBloc,
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
    capaciteBloc: number,
  ): void {
    const dialogRef = this.dialog.open(BlocEditDialog, {
      width: '500px',
      data: {
        idBloc: idBloc,
        nomBloc: nomBloc,
        capaciteBloc: capaciteBloc,
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
    const confirmDelete = confirm('Are you sure you want to delete this bloc?');

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

  detailsBloc(idBloc: number) {
    this.router.navigate(['/bloc-details', idBloc]);
  }
}











/////////////////////////////////////////////////////

@Component({
  selector: 'bloc-dialog',
  templateUrl: 'bloc-dialog.html',
})
export class BlocDialog implements OnInit {
  blocForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BlocDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bloc,
    private formBuilder: FormBuilder,
    private blocService: BlocService,
  ) {}

  ngOnInit(): void {


    // Create the form group with custom validation for required fields
    this.blocForm = this.formBuilder.group({
      nomBloc: [this.data.nomBloc, Validators.required],
      capaciteBloc: [this.data.capaciteBloc, Validators.required]
  })}

  submit() {
    if (this.blocForm.invalid) {
      return;
    }

    const formData = this.blocForm.value;
    const bloc: { nomBloc: string; capaciteBloc: number } = {
      nomBloc: formData.nomBloc,
      capaciteBloc: formData.capaciteBloc,
    };

    this.blocService.addBloc(bloc).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'bloc-edit-dialog',
  templateUrl: 'bloc-edit-dialog.html',
})
export class BlocEditDialog implements OnInit {
  blocForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BlocEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bloc,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {



    this.blocForm = this.formBuilder.group({
      idBloc: [this.data.idBloc, Validators.required],
      nomBloc: [this.data.nomBloc, Validators.required],
      capaciteBloc: [this.data.capaciteBloc,Validators.required]
    });
  }

  submitEdit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier ce bloc ?',
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
                };

        this.dialogRef.close(updatedBloc);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

