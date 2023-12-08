import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChambreService } from '../../services/chambre.service';
import { Chambre } from '../../models/chambre';
import { Equipement } from '../../models/equipement';

@Component({
  selector: 'app-chambre-details',
  templateUrl: './chambre-details.component.html',
  styleUrls: ['./chambre-details.component.scss']
})
export class ChambreDetailsComponent implements OnInit {
  chambreId: number;
  chambre: Chambre;
  equipements: Equipement[] = [];
  equipementsAjoutes: Equipement[] = [];
  canAddEquipement = true;
  sortOrder: string = 'asc';


  constructor(private route: ActivatedRoute, private chambreService: ChambreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chambreId = +params.get('id');
      this.loadChambreDetails();
      this.loadEquipements();
    });
  }
  loadEquipements(): void {
    // Update the function to include the sorting order
    this.chambreService.getAllEquipements(this.sortOrder).subscribe(
      (data: Equipement[]) => {
        this.equipements = data;

      },
      (error) => {
        console.error('Error loading equipements:', error);
      }
    );
  }
  loadChambreDetails(): void {
    this.chambreService.getChambreById(this.chambreId.toString()).subscribe(
      (data: Chambre) => {
        this.chambre = data;
        this.equipements = this.chambre ? this.chambre.equipements : [];
        this.equipementsAjoutes = data.equipements || [];
      },
      (error) => {
        console.error('Error loading chambre details:', error);
      }
    );
  }
  // onSortOrderChange(): void {
  //   // Handle the sorting order change
  //   this.loadEquipements();
  // }
  onSortOrderChange(sortOrder: string): void {
    this.sortOrder = sortOrder;
    this.loadEquipements();
  }
  addEquipementToChambre(equipementId: number): void {
    if (this.canAddEquipement && !this.isEquipementAlreadyAdded(equipementId)) {
      this.chambreService.addEquipementToChambre(this.chambreId, equipementId).subscribe(
        (data: Chambre) => {
          this.loadChambreDetails();
        },
        (error) => {
          console.error('Error adding equipement to chambre:', error);
        }
      );
    } else {
      console.log('Equipement already added to chambre or adding is disabled.');
      // You can also display a message to the user here.
    }
  }

  removeEquipementFromChambre(equipementId: number): void {
    this.chambreService.removeEquipementFromChambre(this.chambreId, equipementId).subscribe(
      (data: Chambre) => {
        this.loadChambreDetails();
      },
      (error) => {
        console.error('Error removing equipement from chambre:', error);
      }
    );
  }

  isEquipementAlreadyAdded(equipementId: number): boolean {
    return this.equipementsAjoutes.some(equipement => equipement.idEquipement === equipementId);
  }
}
