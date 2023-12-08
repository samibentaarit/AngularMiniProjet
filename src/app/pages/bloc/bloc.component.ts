import {Component, Inject, OnInit} from '@angular/core';
import {Bloc} from "../../models/bloc";
import {BlocService} from "../../services/bloc.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Chambre} from "../../models/chambre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogComponent} from "../../variables/popup/popup.component";
import {ActivatedRoute, Router} from "@angular/router";
import { Component } from '@angular/core';
import {Component, Inject, Input, OnInit} from '@angular/core';
import { Bloc } from "../../models/bloc";
import { BlocService } from "../../services/bloc.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


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
export class BlocComponent {

  ngOnInit() {
    this.getAllBlocs();
  }
  refresh() {
  idFoyer: number;

  constructor(
    private blocService: BlocService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idFoyer = +params.get('idFoyer');
      console.log('ID du foyer récupéré depuis l\'URL :', this.idFoyer);

      this.getAllBlocs();
    });
  }

  refresh(): void {
    this.getAllBlocs();
  }

  getAllBlocs() {
    this.blocService.getAllBlocs().subscribe(
      (data: any) => {
        this.blocs = data; // Assuming your service returns an array of Bloc objects.
    this.blocService.getBlocsByFoyerId(this.idFoyer).subscribe(
      (data: Bloc[]) => {
        this.blocs = data;
        console.log('Blocs associés au foyer récupérés :', data);
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

  openDialog(): void {
    const idFoyer = this.activatedRoute.snapshot.params['idFoyer'];

    const dialogRef = this.dialog.open(BlocDialog, {
      width: '500px',
      data: {
        idFoyer: idFoyer,
        nomBloc: '',
        capaciteBloc: '',
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllBlocs();
    });
  }

  openEditDialog(idBloc: number, nomBloc: string, capaciteBloc: number): void {
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

    dialogRef.afterClosed().subscribe((result: Bloc) => {
      if (result) {
        this.blocService.updateBloc(result.idBloc, result).subscribe(
          (res: any) => {
            console.log('Update successful:', res);
            this.refresh();
          },
          (error) => {
            console.error('Error updating Bloc: ', error);
          }
        );
      }
    });
  }


  deleteBloc(idBloc: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?');

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
  detailsBloc(idBloc: number): void {
    this.router.navigate(['/bloc-details', idBloc]);
  }
}











/////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
  idFoyer: number;

  constructor(
    public dialogRef: MatDialogRef<BlocDialog>,
    private formBuilder: FormBuilder,
    private blocService: BlocService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.blocForm = this.formBuilder.group({
      nomBloc: ['', Validators.required],
      capaciteBloc: ['', Validators.required]
    });
    this.idFoyer = this.data.idFoyer;
    console.log(this.idFoyer);
  }

  submit() {
    console.log(this.idFoyer);
    if (this.blocForm.invalid) {
      return;
    }

    const formData = this.blocForm.value;
    const bloc: { nomBloc: string; capaciteBloc: number } = {
    const bloc: { idFoyer: any; capaciteBloc: any; nomBloc: any } = {
      idFoyer: this.idFoyer,
      nomBloc: formData.nomBloc,
      capaciteBloc: formData.capaciteBloc,
    };

    this.blocService.addBloc(bloc).subscribe((res: any) => {
      this.dialogRef.close();
    });
    this.blocService.addBloctoFoyer(this.idFoyer, bloc).subscribe(
      (res: any) => {
        this.dialogRef.close();
        console.log(res.text); // Accès au texte de la réponse
      },
      (error: any) => {
        // Gérer les erreurs de la requête
        console.log(JSON.stringify(error));
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'bloc-edit-dialog',
  templateUrl: 'bloc-edit-dialog.html',
})
export class BlocEditDialog implements OnInit {
  blocForm: FormGroup;
  idFoyer: number;

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.blocForm = this.formBuilder.group({
      idBloc: [this.data.idBloc, Validators.required],
      nomBloc: [this.data.nomBloc, Validators.required],
      capaciteBloc: [this.data.capaciteBloc, Validators.required],
    });
  }

  submit() {
    if (this.blocForm.invalid) {
      return;
    }

    const formData = this.blocForm.value;
    const updatedBloc: { idBloc: any; capaciteBloc: any; nomBloc: any } = {
      idBloc: formData.idBloc,
      nomBloc: formData.nomBloc,
      capaciteBloc: formData.capaciteBloc,
    };

    this.dialogRef.close(updatedBloc);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

}
