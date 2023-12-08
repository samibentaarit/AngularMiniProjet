import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Foyer} from "../../models/foyer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Etudiant} from "../../models/etudiant";
import {EtudiantService} from "../../services/etudiant.service";
import {FoyerService} from "../../services/foyer.service";

@Component({
  selector: 'app-etudiant-dialog',
  templateUrl: 'etudiant-dialog.component.html', // Update the template file path
})
export class EtudiantDialog implements OnInit {
  etudiantForm: FormGroup;


  constructor(
      public dialogRef: MatDialogRef<EtudiantDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Etudiant,
      private formBuilder: FormBuilder,
      private etudiantService: EtudiantService, // Update the service reference

  ) {}

  ngOnInit(): void {


    this.etudiantForm = this.formBuilder.group({
      nomEt: [this.data.nomEt, Validators.required],
      prenomEt: [this.data.prenomEt, Validators.required],
      cin: [this.data.cin, Validators.required],
      ecole: [this.data.ecole, Validators.required],
      dateNaissance: [this.data.dateNaissance, Validators.required],

    });
  }

  submit() {
    if (this.etudiantForm.invalid) {
      return;
    }

    const etudiant: Etudiant = {
      idEtudiant:this.etudiantForm.value.idEtudiant,
      nomEt: this.etudiantForm.value.nomEt,
      prenomEt: this.etudiantForm.value.prenomEt,
      cin: this.etudiantForm.value.cin,
      ecole: this.etudiantForm.value.ecole,
      dateNaissance: this.etudiantForm.value.dateNaissance,

    };

    this.etudiantService.addEtudiant(etudiant).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
