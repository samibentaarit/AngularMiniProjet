import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chambre } from '../../models/chambre';
import { ChambreService } from '../../services/chambre.service';

@Component({
  selector: 'app-chambre-dialog',
  templateUrl: './chambre-dialog.component.html',
})
export class ChambreDialog implements OnInit {
  chambreForm: FormGroup;
  errorMessages: string[] = [];  // Nouvelle variable


  constructor(
    public dialogRef: MatDialogRef<ChambreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Chambre,
    private formBuilder: FormBuilder,
    private chambreService: ChambreService  // Inject ChambreService
  ) {}

  ngOnInit(): void {
    this.chambreForm = this.formBuilder.group({
      numeroChambre: [this.data.numeroChambre, Validators.required],
      typeC: [this.data.typeC, Validators.required],
    });
  }
  submit() {
    if (this.chambreForm.invalid) {
      return;
    }

    const newChambre: Chambre = {
      numeroChambre: this.chambreForm.value.numeroChambre,
      typeC: this.chambreForm.value.typeC,
      equipements: [],
      prix: 0,
      maxEquipements: 0,
    };

    // Vérifier si le numéro de chambre existe déjà
    this.chambreService.isNumeroChambreExists(newChambre.numeroChambre).subscribe(
      (exists: boolean) => {
        if (!exists) {
          // Le numéro de chambre n'existe pas, procéder à l'ajout
          this.chambreService.addChambre(newChambre).subscribe(
            (addedChambre: Chambre) => {
              console.log('Chambre added successfully:', addedChambre);
              this.dialogRef.close(addedChambre);
            },
            (error) => {
              console.error('Error adding chambre:', error);
            }
          );
        } else {
          this.errorMessages = ['Le numéro de chambre existe déjà.'];
        }
      },
      (error) => {
        console.error('Error checking chambre existence:', error);
        this.errorMessages = ['cet chambre exsite , utiliser un autre numero'];
      }
    );
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
