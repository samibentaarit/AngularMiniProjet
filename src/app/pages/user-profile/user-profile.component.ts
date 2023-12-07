import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  etudiantForm: FormGroup;
data:any;
  constructor(
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService
  ) { }

  ngOnInit(): void {

  }

  submitEdit(): void {

      const updatedEtudiant = {
        nom: this.etudiantForm.value.nomEt,
        prenom: this.etudiantForm.value.prenom,
        carteIdentite: this.etudiantForm.value.carteIdentite,
        dateNaissance: this.etudiantForm.value.dateNaissance,
        ecole: this.etudiantForm.value.ecole
      };

      // @ts-ignore
      this.etudiantService.updateEtudiant(updatedEtudiant.idEtudiant, updatedEtudiant).subscribe(
        (response) => {
          console.log('Etudiant updated successfully:', response);
          // Perform additional actions here, such as navigation to another page
        },
        (error) => {
          console.error('Error updating Etudiant:', error);
        }
      );

  }

  cancelEdit(): void {
    // Implement cancellation logic here, such as navigating away from the form
    // Alternatively, you can prompt the user to confirm discarding the changes
  }
}
