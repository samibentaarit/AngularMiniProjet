import {Universite} from "../../models/universite";
import {UniversiteService} from "../../services/universite.service";
import {FoyerService} from "../../services/foyer.service";
import {MatDialog} from "@angular/material/dialog";
import {ClubService} from "../../services/club.service";
import {Foyer} from "../../models/foyer";
import {Club} from "../../models/club";
import {RouterLink} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Injectable } from '@angular/core';
import {CommentService} from "../../services/comment.service";
import * as QRCode from 'qrcode';
import {QRCodeModule} from "angular2-qrcode";

@Component({
  selector: 'app-detail-universite',
  templateUrl: './detail-universite.component.html',
  styleUrls: ['./detail-universite.component.scss']
})
export class DetailUniversiteComponent {
  zoomedClubId: number | null = null;
  selectedClubId: number | null = null;
  universites: Universite[];
  clubs: Club[];
  clubs1: Club[];// Change the type to match your Universite model.
  averageFoyerCapacity: number;
  idUniversite: number;
  showClubsList: boolean = false;
  universite: Universite;
  clubsAssign: Club[];
  commentaires: string[] = []; // Liste des commentaires

  commentaireDetail: string = '';
  constructor(
    private universiteService: UniversiteService
    , private foyerService: FoyerService
    , private clubService: ClubService
    , public dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  private commentService: CommentService
  ) {
  }

  ngOnInit() {

    this.commentaires = this.commentService.getCommentaires();
    this.getAllClubs();
    // Subscribe to route params to get the university ID from the URL
    this.route.params.subscribe(params => {
      this.idUniversite = +params['id']; // Convert id to a number


      // this.universiteService.getClubsByUniversity(this.idUniversite)
      //   .subscribe(clubs1 => this.clubs = clubs1);


      // Call the service method to get university details
      this.universiteService.getUniversiteById(this.idUniversite).subscribe(
        (data: Universite) => {
          this.universite = data;
          console.log('University details:', this.universite);
        },
        (error) => {
          console.error('Error loading University details: ', error);
        }
      );
    });

  }
  zoomCard(club: Club): void {
    this.zoomedClubId = club.idClub;
  }


  rafraichirCommentaires() {
    this.commentaires = this.commentService.getCommentaires();}
  // Méthode appelée lorsque le composant Commentaire émet un nouvel événement


  resetZoom(): void {
    this.zoomedClubId = null;
  }
  isClubAssignedToUniversity(clubId: number): boolean {
    return this.clubs.some(club => club.idClub === clubId);
  }
  getClubsByUniversity(idUniversite: number): void {
    // Call the service method to get clubs associated with the university
    this.universiteService.getClubsByUniversity(idUniversite).subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
        console.log('Clubs associated with the university:', this.clubs);
      },
      (error) => {
        console.error('Error loading clubs: ', error);
      }
    );
  }

  loadClubs(): void {
    if (this.universite && this.universite.idUniversite) {
      this.getClubsByUniversity(this.universite.idUniversite);
      // Mettez à jour la variable pour afficher la liste des clubs associés à l'université
      this.showClubsList = true;
    } else {
      console.error('Erreur: Aucune université sélectionnée.');
    }

}
  getAllClubs() {
    this.clubService.getAllClubs().subscribe(
      (data: any) => {
        this.clubsAssign = data; // Assuming your service returns an array of Universite objects.
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );

  }
  refresh() {
    this.getAllUniversites();
  }
  assignClubToUniversity(idUniversite: number, clubId: number): void {
    this.universiteService.assignClubToUniversity(idUniversite, clubId).subscribe(
      (response) => {
        console.log('Assignation réussie', response);
        // Vous pouvez mettre à jour votre interface utilisateur ici si nécessaire
      },
      (error) => {
        console.error('Erreur lors de l\'assignation', error);
        // Gérez les erreurs ici
      }
    );}
  removeClubFromUniversity(idUniversite: number, clubId: number): void {
    this.universiteService.removeClubFromUniversity(idUniversite, clubId).subscribe(
      (response) => {
        console.log('Dissociation réussie', response);
        // Update your UI if necessary
      },
      (error) => {
        console.error('Erreur lors de la dissociation', error);
        // Handle errors here
      }
    );
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
  deleteClub(idClub: number) {
    // Find the index of the club in the array
    const index = this.clubs.findIndex(club => club.idClub === idClub);

    // Remove the club from the array if found
    if (index !== -1) {
      this.clubs.splice(index, 1);
    }
  }


  // AjoutClub() {
  //
  //   // Customize the submission logic for adding a universite
  //
  //
  //   this.universiteService.addClubToUniversite(universite.id, club).subscribe(
  //     (res: any) => {
  //       // Handle the response if needed
  //       console.log('Club added successfully:', res);
  //     },
  //     (error: any) => {
  //       // Handle errors
  //       console.error('Error adding club to university:', error);
  //     }
  //   );
  // }

    protected readonly RouterLink = RouterLink;
    protected readonly Club = Club;

  submit() {
    // // Customize the submission logic for adding  universite
    // // this.universiteService.addClub(universite).subscribe((res: any) => {
    // //   this.dialogRef.close();
    // });
  }

}
@Component({
  selector: 'app-commentaire',
  template: `
    <!-- app-commentaire.component.html -->
    <div class="comment-container">
      <h3>Ajouter un commentaire</h3>
      <div class="comment-input">
        <textarea [(ngModel)]="nouveauCommentaire" placeholder="Écrivez votre commentaire"></textarea>
        <button class="add-button" (click)="ajouterCommentaire()">Ajouter</button>
      </div>
      <ul class="comment-list">
        <li *ngFor="let commentaire of commentaires; let i = index" class="comment-item">
          <div class="comment-content">
            {{ commentaire }}
          </div>
          <div class="qr-code">
            <qr-code [value]="commentaire" [size]="60"></qr-code>
          </div>
          <div class="comment-actions">
            <button class="delete-button" (click)="supprimerCommentaire(i)">Supprimer</button>
          </div>
        </li>
      </ul>
    </div>




  `,
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent {

  @Input() commentaires: string[] = [];
  @Output() miseAJourCommentaires = new EventEmitter<void>();
  nouveauCommentaire: string = '';
  constructor(private commentService: CommentService) {}
  ngOnInit() {
    this.commentaires = this.commentService.getCommentaires();

      // Générer les QR codes lors de l'initialisation
      this.genererQRCodes();

  }
  private genererQRCodes() {
    this.commentaires.forEach((commentaire, index) => {
      const qrCodeCanvasId = `qrcode-canvas-${index}`;
      QRCode.toCanvas(document.getElementById(qrCodeCanvasId), commentaire, (error) => {
        if (error) {
          console.error('Erreur lors de la génération du QR code:', error);
        }
      });
    });
  }
  ajouterCommentaire() {
    this.commentService.ajouterCommentaire(this.nouveauCommentaire);
    this.nouveauCommentaire = '';
    this.miseAJourCommentaires.emit(); // Émettre un événement pour notifier le parent
  }

  supprimerCommentaire(index: number) {
    this.commentService.supprimerCommentaire(index);
    this.miseAJourCommentaires.emit(); // Émettre un événement pour notifier le parent
  }}










