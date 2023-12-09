import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Importez le service Router
import { Chambre } from '../../models/chambre';
import { ChambreService } from '../../services/chambre.service';
import { ChambreDialog } from '../chambre-dialog/chambre-dialog.component';
import { ChambreEditDialog } from '../chambre-edit-dialog/chambre-edit-dialog.component';
import { copy } from 'clipboard';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.scss'], // Ajoutez le style si nécessaire
})
export class ChambreComponent implements OnInit {

  constructor(private chambreService: ChambreService, public dialog: MatDialog, private router: Router) {
  }
  chambres: Chambre[];
  selectedChambre: Chambre | undefined;
  filteredChambres: Chambre[];
  searchTerm: String = '';
  focus = false;

  protected readonly copy = copy;


  ngOnInit(): void {
    this.loadChambres();
  }

  loadChambres(): void {
    this.chambreService.getAllChambres().subscribe(
      (data: Chambre[]) => {
        this.chambres = data;
        this.filteredChambres = this.chambres;

      },
      (error) => {
        console.error('Error loading chambres:', error);
      }
    );
  }
  refresh() {
    this.getAllChambres();
  }


  getAllChambres() {
    this.chambreService.getAllChambres().subscribe(
      (data: any) => {
        this.chambres = data;
      },
      (error) => {
        console.error('Error loading Chambres: ', error);
        // Ajoutez ici une logique pour gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
      }
    );
  }
  search(): void {
    this.filteredChambres = this.chambres.filter(chambre =>
      chambre.numeroChambre.toString().includes(this.searchTerm.toLowerCase())
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChambreDialog, {
      width: '500px',
      data: {
        numeroChambre: '',
        typeC: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.getAllChambres();
    });
  }


  openEditDialog(idChambre: number, numeroChambre: number, typeC: string): void {
    const dialogRef = this.dialog.open(ChambreEditDialog, {
      width: '500px',
      data: { idChambre, numeroChambre, typeC }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the result is truthy, meaning the dialog was closed successfully
        // and the user submitted the form, update the existing chambre
        this.updateChambre(idChambre, result);
      }
    });
  }

  updateChambre(idChambre: number, updatedChambre: Chambre): void {
    this.chambreService.updateChambre(idChambre, updatedChambre).subscribe(
      (data: Chambre) => {
        console.log('Chambre updated successfully:', data);

        // Update the local chambres array with the updated chambre
        const index = this.chambres.findIndex(c => c.idChambre === idChambre);
        if (index !== -1) {
          this.chambres[index] = data;
        }

        // Optionally, reload the chambres from the server
        // this.loadChambres();
      },
      (error) => {
        console.error('Error updating chambre:', error);
      }
    );
  }

  redirectToChambreDetails(idChambre: number): void {
    this.router.navigate(['/chambre-details', idChambre]);
  }

  deleteChambre(idChambre: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this room?');

    if (confirmDelete) {
      this.chambreService.deleteChambre(idChambre).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Chambre: ', error);
        }
      );
    }
  }
}
