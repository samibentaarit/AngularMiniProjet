import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipement } from '../../models/equipement';
import { EquipementService } from '../../services/equipement.service';

@Component({
  selector: 'app-equipement-edit-dialog',
  templateUrl: './equipement-edit-dialog.component.html',
  styleUrls: ['./equipement-edit-dialog.component.scss']
})
export class EquipementEditDialogComponent implements OnInit {
  equipementForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EquipementEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Equipement,
    private fb: FormBuilder,
    private equipementService: EquipementService // Inject EquipementService
  ) {}

  ngOnInit(): void {
    this.equipementForm = this.fb.group({
      nom: [this.data.nom, Validators.required],
      prixEquipement: [this.data.prixEquipement, Validators.required],
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  submitEdit(): void {
    if (this.equipementForm.invalid || !this.data.idEquipement) {
      return;
    }

    const updatedEquipement: Equipement = {
      idEquipement: this.data.idEquipement,
      nom: this.equipementForm.value.nom,
      prixEquipement: this.equipementForm.value.prixEquipement,
    };

    // Use EquipementService to update the equipement
    this.equipementService.updateEquipement(updatedEquipement.idEquipement, updatedEquipement).subscribe(
      (response: Equipement) => {
        console.log('Equipement updated successfully:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error updating equipement:', error);
      }
    );
  }
}
