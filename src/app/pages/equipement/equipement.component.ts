import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipement } from '../../models/equipement';
import { EquipementService } from '../../services/equipement.service';
import { EquipementDialogComponent } from '../equipement-dialog/equipement-dialog.component';
import { EquipementEditDialogComponent } from '../equipement-edit-dialog/equipement-edit-dialog.component';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.scss']
})
export class EquipementComponent implements OnInit {
  equipements: Equipement[] = [];
  selectedEquipement: Equipement | undefined;

  constructor(private equipementService: EquipementService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEquipements();
  }

  loadEquipements(): void {
    this.equipementService.getAllEquipements().subscribe(
      (data: Equipement[]) => {
        this.equipements = data;
      },
      (error) => {
        console.error('Error loading equipements:', error);
      }
    );
  }

  onSelectEquipement(equipement: Equipement): void {
    this.selectedEquipement = equipement;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EquipementDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEquipement(result);
      }
    });
  }

  openEditDialog(id: number, nom: string, prixEquipement: number): void {
    const dialogRef = this.dialog.open(EquipementEditDialogComponent, {
      width: '500px',
      data: { idEquipement: id, nom: nom, prixEquipement: prixEquipement }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEquipement(id, result);
      }
    });
  }

  deleteEquipement(idEquipement: number): void {
    if (this.selectedEquipement) {
      const equipementId = this.selectedEquipement.idEquipement;

      console.log('Deleting equipement with ID:', equipementId);

      this.equipementService.deleteEquipement(equipementId).subscribe(
        () => {
          console.log('Equipement deleted successfully');
          this.equipements = this.equipements.filter(e => e.idEquipement !== equipementId);
          this.selectedEquipement = undefined;
        },
        (error) => {
          console.error('Error deleting equipement:', error);
        }
      );
    } else {
      console.warn('No equipement selected for deletion');
    }
  }

  addEquipement(equipement: Equipement): Observable<Equipement> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.equipementService.addEquipement(equipement)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.equipementService.updateEquipement(id, equipement)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}


// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Equipement } from '../../models/equipement';
// import { EquipementService } from '../../services/equipement.service';
// import { EquipementDialogComponent } from '../equipement-dialog/equipement-dialog.component';
// import { EquipementEditDialogComponent } from '../equipement-edit-dialog/equipement-edit-dialog.component';
// import {Observable, throwError} from 'rxjs';
// import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
// import {environment} from '../../../environments/environment';
// import {catchError} from 'rxjs/operators';
//
// @Component({
//   selector: 'app-equipement',
//   templateUrl: './equipement.component.html',
//   styleUrls: ['./equipement.component.scss']
// })
// export class EquipementComponent implements OnInit {
//   equipements: Equipement[] = [];
//   selectedEquipement: Equipement | undefined;
//   private http: any;
//
//   constructor(private equipementService: EquipementService, private dialog: MatDialog) { }
//
//   ngOnInit(): void {
//     this.loadEquipements();
//   }
//
//   loadEquipements(): void {
//     this.equipementService.getAllEquipements().subscribe(
//       (data: Equipement[]) => {
//         this.equipements = data;
//       },
//       (error) => {
//         console.error('Error loading equipements:', error);
//       }
//     );
//   }
//
//   onSelectEquipement(equipement: Equipement): void {
//     this.selectedEquipement = equipement;
//   }
//
//   openDialog(): void {
//     const dialogRef = this.dialog.open(EquipementDialogComponent, {
//       width: '400px',
//       data: {}
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         // If the result is truthy, meaning the dialog was closed successfully
//         // and the user submitted the form, add a new equipement
//         this.addEquipement(result);
//       }
//     });
//   }
//
//   openEditDialog(id: number, nom: string, prixEquipement: number): void {
//     const dialogRef = this.dialog.open(EquipementEditDialogComponent, {
//       width: '500px',
//       data: { idEquipement: id, nom: nom, prixEquipement: prixEquipement }
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         // If the result is truthy, meaning the dialog was closed successfully
//         // and the user submitted the form, update the existing equipement
//         this.updateEquipement(id, result);
//       }
//     });
//   }
//
//   deleteEquipement(idEquipement: number): void {
//     if (this.selectedEquipement) {
//       const equipementId = this.selectedEquipement.idEquipement;
//
//       console.log('Deleting equipement with ID:', equipementId);
//
//       this.equipementService.deleteEquipement(equipementId).subscribe(
//         () => {
//           console.log('Equipement deleted successfully');
//           this.equipements = this.equipements.filter(e => e.idEquipement !== equipementId);
//           this.selectedEquipement = undefined;
//         },
//         (error) => {
//           console.error('Error deleting equipement:', error);
//         }
//       );
//     } else {
//       console.warn('No equipement selected for deletion');
//     }
//   }
//
//   addEquipement(equipement: Equipement): Observable<Equipement> {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.post<Equipement>(environment.url + '/equipement', equipement, { headers })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }
//
//   updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this['http'].put<Equipement>(environment.url + '/equipement/' + id,
//       equipement,
//       {headers})
//       .pipe(
//         catchError(this.handleError)
//       );
//   }
//
//   private handleError(error: HttpErrorResponse): Observable<never> {
//     if (error.error instanceof ErrorEvent) {
//       // A client-side or network error occurred.
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // The backend returned an unsuccessful response code.
//       console.error(
//         `Backend returned code ${error.status}, ` +
//         `body was: ${error.error}`);
//     }
//     // Return an observable with a user-facing error message.
//     return throwError('Something bad happened; please try again later.');
//   }
//
//
// }
