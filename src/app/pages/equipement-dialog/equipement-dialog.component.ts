import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipement } from '../../models/equipement';
import { EquipementService } from '../../services/equipement.service';

@Component({
  selector: 'app-equipement-dialog',
  templateUrl: './equipement-dialog.component.html',
})
export class EquipementDialogComponent implements OnInit {
  equipementForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EquipementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Equipement,
    private formBuilder: FormBuilder,
    private equipementService: EquipementService // Inject EquipementService
  ) {}

  ngOnInit(): void {
    this.equipementForm = this.formBuilder.group({
      nom: [this.data.nom, Validators.required],
      prixEquipement: [this.data.prixEquipement, Validators.required],
    });
  }

  submit() {
    if (this.equipementForm.invalid) {
      return;
    }

    const newEquipement: Equipement = {
      idEquipement: 0, // Set the appropriate value for a new equipement
      nom: this.equipementForm.value.nom,
      prixEquipement: this.equipementForm.value.prixEquipement,
    };

    // Use EquipementService to add the new equipement
    this.equipementService.addEquipement(newEquipement).subscribe(
      (addedEquipement: Equipement) => {
        console.log('Equipement added successfully:', addedEquipement);
        this.dialogRef.close(addedEquipement);
      },
      (error) => {
        console.error('Error adding equipement:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
