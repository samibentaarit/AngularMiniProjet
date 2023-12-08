import {Component, Inject, Input, OnInit} from '@angular/core';
import {Bibliotheque} from "../../models/bibliotheque";
import {BibliothequeService} from "../../services/bibliotheque.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogComponent} from "../../variables/popup/popup.component";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.scss']
})
export class BibliothequeComponent {
  bibliotheques: Bibliotheque[];
  bibliothequeAssociee: Bibliotheque;
  @Input() idBloc: number;
  public qrCodeText: string;

  constructor(
    private bibliothequeService: BibliothequeService
    ,public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllBibliotheques();
  }
  refresh() {
    this.getAllBibliotheques();
  }

  getAllBibliotheques() {
    this.bibliothequeService.getBibliothequeByBlocId(this.idBloc).subscribe(
      (data: Bibliotheque) => {
        this.bibliothequeAssociee = data;
          console.log("bibliothequeAssociee", this.bibliothequeAssociee)
      },
      (error) => {
        console.error('Error loading Bibliotheque: ', error);
      }
    );
  }
  openDialog(idBloc: number): void {
    const dialogRef = this.dialog.open(BibliothequeDialog, {
      width: '500px',
      data: {
        titreBibliotheque: '',
          idBloc: idBloc
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllBibliotheques();
    });
  }

  openEditDialog(
    idBibliotheque: number,
    titreBibliotheque: string,
    descriptionBibliotheque: string,
  ): void {
    const dialogRef = this.dialog.open(BibliothequeEditDialog, {
      width: '500px',
      data: {
        idBibliotheque: idBibliotheque,
          titreBibliotheque: titreBibliotheque,
          descriptionBibliotheque: descriptionBibliotheque,
      },
    });
    dialogRef.afterClosed().subscribe((result: Bibliotheque) => {
      if (result) {
          console.log("result.idBibliotheque", result.idBibliotheque)
          console.log("result", result)
          console.log("this.idBloc", this.idBloc)
        this.bibliothequeService
          .updateBibliotheque(result.idBibliotheque,this.idBloc, result)
          .subscribe(
            (res: any) => {
              // Assuming your service returns a success response
              console.log('Update successful:', res);
              this.refresh();
              dialogRef.close(); // Close the dialog here
            },
            (error) => {
              console.error('Error updating Bibliotheque: ', error);
              // Handle error here (e.g., show an error message)
            }
          );
      }
    });
  }


  deleteBibliotheque(idBibliotheque: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this bibliotheque?');

    if (confirmDelete) {
      this.bibliothequeService.deleteBibliotheque(idBibliotheque).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Bibliotheque: ', error);

          // Check if the error is of type HttpErrorResponse and if it has a message
          if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
            // Handle client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Handle server-side error
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
        }
      );
    }
  }

}



/////////////////////////////////////////////////////

@Component({
    selector: 'bibliotheque-dialog',
    templateUrl: 'bibliotheque-dialog.html',
})
export class BibliothequeDialog implements OnInit {
    bibliothequeForm: FormGroup;
    private idBloc: number;
    constructor(
        private route: ActivatedRoute,
      public dialogRef: MatDialogRef<BibliothequeDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { bibliotheque: Bibliotheque, idBloc: number },
      private formBuilder: FormBuilder,

      private bibliothequeService: BibliothequeService
    )  {
        this.bibliothequeForm = this.formBuilder.group({
            titreBibliotheque: ['', Validators.required],
            descriptionBibliotheque: ['', Validators.required]
        });}

  ngOnInit(): void {
    const { bibliotheque, idBloc } = this.data;
    this.idBloc = this.data.idBloc;

    this.bibliothequeForm = this.formBuilder.group({
      titreBibliotheque: [bibliotheque.titreBibliotheque, Validators.required],
      descriptionBibliotheque: [bibliotheque.descriptionBibliotheque, Validators.required]
    });

    // Ajoutez une propriété pour l'ID du bloc dans le formulaire
    this.bibliothequeForm.addControl('idBloc', this.formBuilder.control(idBloc, Validators.required));
  }

  submit() {
    if (this.bibliothequeForm.invalid) {
      return;
    }

    const formData = this.bibliothequeForm.value;
    const bibliotheque: Bibliotheque = {
      titreBibliotheque: formData.titreBibliotheque,
      descriptionBibliotheque: formData.descriptionBibliotheque,
       bloc :formData.bloc,
        idBloc:formData.idBloc
    };

    this.bibliothequeService.addBibliotheque(this.idBloc, bibliotheque).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

    onCancel(): void {
        this.dialogRef.close();
    }
}



@Component({
    selector: 'bibliotheque-edit-dialog',
    templateUrl: 'bibliotheque-edit-dialog.html',
})
export class BibliothequeEditDialog implements OnInit {
    bibliothequeForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<BibliothequeEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Bibliotheque,
        private formBuilder: FormBuilder,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {



        this.bibliothequeForm = this.formBuilder.group({
            idBibliotheque: [this.data.idBibliotheque, Validators.required],
            titreBibliotheque: [this.data.titreBibliotheque, Validators.required],
            descriptionBibliotheque: [this.data.descriptionBibliotheque,Validators.required]
        });
    }

    submitEdit() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirmer la modification',
                message: 'Êtes-vous sûr de vouloir modifier cette bibliotheque ?',
                confirmText: 'Confirmer',
                confirmColor: 'primary',
            },
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                const updatedBibliotheque: any = {
                    idBibliotheque: this.bibliothequeForm.value.idBibliotheque,
                    titreBibliotheque: this.bibliothequeForm.value.titreBibliotheque,
                    descriptionBibliotheque: this.bibliothequeForm.value.descriptionBibliotheque
                };

                this.dialogRef.close(updatedBibliotheque);
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
