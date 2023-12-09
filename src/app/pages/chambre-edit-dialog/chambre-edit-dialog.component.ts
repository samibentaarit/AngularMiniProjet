import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chambre } from '../../models/chambre';
import { ChambreService } from '../../services/chambre.service';

@Component({
  selector: 'app-chambre-edit-dialog',
  templateUrl: './chambre-edit-dialog.component.html',
})
export class ChambreEditDialog implements OnInit {
  chambreForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChambreEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Chambre,
    private formBuilder: FormBuilder,
    private chambreService: ChambreService
) {}

  ngOnInit(): void {
    console.log('ChambreEditDialog - Data:', this.data);

    this.chambreForm = this.formBuilder.group({
      // idChambre: [this.data.idChambre, Validators.required],
      numeroChambre: [this.data.numeroChambre, Validators.required],
      typeC: [this.data.typeC, Validators.required],
    });
  }

  submitEdit() {
    console.log('Original idChambre:', this.data.idChambre);

    if (this.chambreForm.invalid) {
      return;
    }

    const updatedChambre: Chambre = {
      idChambre: this.data.idChambre,
      numeroChambre: this.chambreForm.value.numeroChambre,
      typeC: this.chambreForm.value.typeC,
      equipements: [],
      prix: 0,
      maxEquipements: 0,
    };
    this.chambreService.updateChambre(updatedChambre.idChambre, updatedChambre).subscribe(
      (response: Chambre) => {
        console.log('Chambre updated successfully:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating chambre:', error);
        // Affichez un message d'erreur à l'utilisateur ou effectuez d'autres actions en cas d'erreur.
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
