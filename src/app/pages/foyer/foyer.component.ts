import {Component, OnInit} from '@angular/core';
import { FoyerService } from 'src/app/services/foyer.service';
import { Inject, } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialog,  MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Foyer } from 'src/app/models/foyer';
import { ConfirmDialogComponent } from 'src/app/variables/popup/popup.component';
import {Bloc} from "../../models/bloc";

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.scss']
})
export class FoyerComponent implements OnInit {
  foyers: Foyer[];
  hasBlocsAssociated: boolean;

  constructor(
    private foyerService: FoyerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllFoyers();
  }

  refresh() {
    this.getAllFoyers();
  }

  getAllFoyers() {
    this.foyerService.getAllFoyers().subscribe(
      (data: Foyer[]) => {
        this.foyers = data;
        console.log('Données des foyers récupérées :', this.foyers);
      },
      (error) => {
        console.error('Error loading Foyers: ', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FoyerDialog, {
      width: '500px',
      data: {
        nomFoyer: '' ,
        capaciteFoyer : ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllFoyers();
    });
  }

  openEditDialog(idFoyer: number, nomFoyer: string, capaciteFoyer : number): void {
    const dialogRef = this.dialog.open(FoyerEditDialog, {
      width: '500px',
      data: {
        idFoyer: idFoyer,
        nomFoyer: nomFoyer,
        capaciteFoyer : capaciteFoyer
      },
    });

    dialogRef.afterClosed().subscribe((result: Foyer) => {
      if (result) {
        this.foyerService.updateFoyer(result.idFoyer, result).subscribe(
          (res: any) => {
            console.log('Update successful:', res);
            this.refresh();
            dialogRef.close();
          },
          (error) => {
            console.error('Error updating Foyer: ', error);
          }
        );
      }
    });
  }

  deleteFoyer(idFoyer: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce foyer ?');

    if (confirmDelete) {
      this.foyerService.deleteFoyer(idFoyer).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Foyer: ', error);
        }
      );
    }
  }
}

@Component({
  selector: 'foyer-dialog',
  templateUrl: 'foyer-dialog.html',
})
export class FoyerDialog implements OnInit {
  foyerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FoyerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Foyer,
    private formBuilder: FormBuilder,
    private foyerService: FoyerService
  ) {}

  ngOnInit(): void {
    this.foyerForm = this.formBuilder.group({
      nomFoyer: [this.data.nomFoyer, Validators.required],
      capaciteFoyer: [this.data.capaciteFoyer, Validators.required]

    });
  }

  submit() {
    if (this.foyerForm.invalid) {
      return;
    }

    const foyerData = this.foyerForm.value;
    const foyerPayload = {
      nomFoyer: foyerData.nomFoyer,
      capaciteFoyer: foyerData.capaciteFoyer,

    };

    this.foyerService.addFoyer(foyerPayload).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


//////////////////////////////////////////////////////
@Component({
  selector: 'foyer-edit-dialog',
  templateUrl: 'foyer-edit-dialog.html',
})
export class FoyerEditDialog implements OnInit {
  foyerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FoyerEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Foyer,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.foyerForm = this.formBuilder.group({
      idFoyer: [this.data.idFoyer, Validators.required],
      nomFoyer: [this.data.nomFoyer, Validators.required],
      capaciteFoyer: [this.data.capaciteFoyer, Validators.required]

    });
  }

  submitEdit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier ce foyer ?',
        confirmText: 'Confirmer',
        confirmColor: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const updatedFoyer: {  idFoyer: number , nomFoyer: any , capaciteFoyer:number} = {
          idFoyer: this.data.idFoyer,
          nomFoyer: this.foyerForm.value.nomFoyer,
          capaciteFoyer: this.foyerForm.value.capaciteFoyer,

        };

        this.dialogRef.close(updatedFoyer);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
