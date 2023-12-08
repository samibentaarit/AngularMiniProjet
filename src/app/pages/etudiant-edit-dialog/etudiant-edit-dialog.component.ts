import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary modules and services
import { Foyer } from 'src/app/models/foyer';

@Component({
  selector: 'app-etudiant-edit-dialog',
  templateUrl: 'etudiant-edit-dialog.component.html',
})
export class EtudiantEditDialog implements OnInit {
  etudiantForm: FormGroup;

  selectedFoyer: Foyer;

  constructor(
      public dialogRef: MatDialogRef<EtudiantEditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder
      // Add any other necessary services
  ) {}

  ngOnInit(): void {
    // Assuming you have a service method to get the list of foyers
    // You should replace `YourFoyerService` with your actual service
    // this.foyers = this.yourFoyerService.getFoyers();

    // Set the initial value for the "foyer" form control and selectedFoyer


    this.etudiantForm = this.formBuilder.group({
      idEtudiant: [this.data.idEtudiant, Validators.required],
      nomEt: [this.data.nomEt, Validators.required],
      prenomEt: [this.data.prenomEt, Validators.required],
      cin: [this.data.cin, Validators.required],
      ecole: [this.data.ecole, Validators.required],
      dateNaissance: [this.data.dateNaissance, Validators.required],

    });
  }

  submitEdit(): void {
    // Handle your form submission logic here
    const updatedEtudiant = {
      idEtudiant: this.data.idEtudiant,
      nomEt: this.etudiantForm.value.nomEt,
      prenomEt: this.etudiantForm.value.prenomEt,
      cin: this.etudiantForm.value.cin,
      ecole: this.etudiantForm.value.ecole,
      dateNaissance: this.etudiantForm.value.dateNaissance,

    };

    // Assuming you have an EtudiantService to handle CRUD operations
    // this.etudiantService.updateEtudiant(updatedEtudiant);

    // Close the dialog
    this.dialogRef.close(updatedEtudiant);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
