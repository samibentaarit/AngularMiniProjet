import { Component, OnInit } from '@angular/core';
import { UniversiteService } from 'src/app/services/universite.service';


import { Inject, } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialog,  MatDialogRef } from '@angular/material/dialog';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Universite } from 'src/app/models/universite';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import { ConfirmDialogComponent } from 'src/app/variables/popup/popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.scss']
})
export class UniversiteComponent implements OnInit {
  universites: Universite[]; // Change the type to match your Universite model.

  constructor(
    private universiteService: UniversiteService
    ,public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllUniversites();
  }
  refresh() {
    this.getAllUniversites();
  }

  getAllUniversites() {
    this.universiteService.getAllUniversites().subscribe(
      (data: any) => {
        this.universites = data; // Assuming your service returns an array of Universite objects.
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UniversiteDialog, {
      width: '500px',
      data: {
        nomUniversite: '',
        adresse: '',
        foyer: null, // You can pass an foyer object here if needed
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllUniversites();
    });
  }
  aopenEditDialog(
    idUniversite: number,
    nomUniversite: string,
    adresse: string,
    foyer: Foyer
): void {
  const dialogRef = this.dialog.open(UniversiteEditDialog, {
    width: '500px',
    data: {
      idUniversite: idUniversite,
      nomUniversite: nomUniversite,
      adresse: adresse,
      foyer: foyer // You can pass an foyer object here if needed
    }
  });
  dialogRef.afterClosed().subscribe((result: Universite) => {
    if (result) {
      this.universiteService.updateUniversite(result.idUniversite, result).subscribe((res: any) => {
        dialogRef.close();
        this.refresh();
      });
    }
  });
}
openEditDialog(
  idUniversite: number,
  nomUniversite: string,
  adresse: string,
  foyer: Foyer
): void {
  const dialogRef = this.dialog.open(UniversiteEditDialog, {
    width: '500px',
    data: {
      idUniversite: idUniversite,
      nomUniversite: nomUniversite,
      adresse: adresse,
      foyer: foyer,
    },
  });
  dialogRef.afterClosed().subscribe((result: Universite) => {
    if (result) {
      this.universiteService
        .updateUniversite(result.idUniversite, result)
        .subscribe(
          (res: any) => {
            // Assuming your service returns a success response
            console.log('Update successful:', res);
            this.refresh();
            dialogRef.close(); // Close the dialog here
          },
          (error) => {
            console.error('Error updating Universite: ', error);
            // Handle error here (e.g., show an error message)
          }
        );
    }
  });
}
deleteUniversite(idUniversite: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this university?');

  if (confirmDelete) {
    this.universiteService.deleteUniversite(idUniversite).subscribe(
      (res: any) => {
        console.log('Delete successful:', res);
        this.refresh();
      },
      (error) => {
        console.error('Error deleting Universite: ', error);
      }
    );
  }
}
}








/////////////////////////////////////////////////////

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'universite-dialog',
  templateUrl: 'universite-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class UniversiteDialog implements OnInit {
  // Add the necessary properties for universite creation dialog

  universiteForm: FormGroup;
  foyers:Foyer[] = [];

  constructor(
      public dialogRef: MatDialogRef<UniversiteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Universite,
      private formBuilder: FormBuilder,
      private universiteService: UniversiteService,
      private foyerService: FoyerService,

  ) {}

  ngOnInit(): void {
    this.foyerService.getAllFoyers().subscribe(
      (foyers) => {
        this.foyers = foyers;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );
    
    // Create the form group with custom validation for required fields
    this.universiteForm = this.formBuilder.group({
      nomUniversite: [this.data.nomUniversite, Validators.required],
      adresse: [this.data.adresse, Validators.required],
      foyer: [this.data.foyer, Validators.required], // Add the foyer field with appropriate validation
    });
  }
  
  
  submit() {
    if (this.universiteForm.invalid) {
      return;
    }
    // Customize the submission logic for adding a universite
    const universite: {foyer:Foyer;  nomUniversite: string; adresse: string; } = {
      nomUniversite: this.data.nomUniversite,
      adresse: this.data.adresse,
      foyer:this.data.foyer
    };

    this.universiteService.addUniversite(universite).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

}





@Component({
  selector: 'universite-edit-dialog',
  templateUrl: 'universite-edit-dialog.html',
})
export class UniversiteEditDialog implements OnInit {
  universiteForm: FormGroup;
  foyers: Foyer[] = [];
  selectedFoyer: Foyer;

  constructor(
    public dialogRef: MatDialogRef<UniversiteEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Universite,
    private formBuilder: FormBuilder,
    private foyerService: FoyerService,
    private dialog: MatDialog 
  ) {}

  ngOnInit(): void {
    this.foyerService.getAllFoyers().subscribe(
      (foyers) => {
        this.foyers = foyers;

        // Set the initial value for the "foyer" form control and selectedFoyer
        const initialFoyer = this.foyers.find(f => f.idFoyer === this.data.foyer.idFoyer);
        this.universiteForm.get('foyer')?.setValue(initialFoyer);
        this.selectedFoyer = initialFoyer;
      },
      (error) => {
        console.error(error);
        // Handle error here
      }
    );

    this.universiteForm = this.formBuilder.group({
      idUniversite: [this.data.idUniversite, Validators.required],
      nomUniversite: [this.data.nomUniversite, Validators.required],
      adresse: [this.data.adresse, Validators.required],
      foyer: [null, Validators.required],
    });
  }

  submitEdit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier cette université ?',
        confirmText: 'Confirmer',
        confirmColor: 'primary',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const updatedUniversite: Universite = {
          idUniversite: this.data.idUniversite,
          nomUniversite: this.universiteForm.value.nomUniversite,
          adresse: this.universiteForm.value.adresse,
          foyer: this.universiteForm.value.foyer,
        };

        this.dialogRef.close(updatedUniversite);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
