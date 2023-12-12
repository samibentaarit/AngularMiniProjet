import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { Suggestion } from "../../models/suggestion";
import { SuggestionService } from "../../services/suggestion.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {CommentService} from "../../services/comment.service";
import {CommentaireService} from "../../services/Commentaire.service";
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  suggestions: Suggestion[];
  private idFoyer: number;
  filtredSuggestions: Suggestion[] ;
  searchTerm: String = '';
  commentaires: string[] = [];
  focus = false;
  constructor(
    private suggestionService: SuggestionService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private commentaireService: CommentaireService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idFoyer = +params.get('idFoyer');
      console.log('ID du foyer récupéré depuis l\'URL :', this.idFoyer);

      this.loadSuggestions();
    });
  }

  loadSuggestions() {
    const idFoyer = +this.activatedRoute.snapshot.paramMap.get('idFoyer');
    this.suggestionService.getSuggestionsByFoyerId(idFoyer).subscribe(
      (data: Suggestion[]) => {
        this.suggestions = data;
        this.filtredSuggestions = this.suggestions;
        this.initializeLikes();
        this.sortSuggestionsByLikes();
      },
      (error) => {
        console.error('Error loading Suggestions: ', error);
      }
    );
  }
  search() {
    this.filtredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.tagSuggestion.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  sortSuggestionsByLikes(): void {
    this.suggestions.sort((a, b) => b.likes - a.likes);
  }
  initializeLikes(): void {
    this.suggestions.forEach((suggestion) => {
      const savedLikes = localStorage.getItem(`likes_${suggestion.idSuggestion}`);
      if (savedLikes !== null) {
        suggestion.likes = +savedLikes;
      }
    });
  }
  rafraichirCommentaires() {
    this.commentaires = this.commentaireService.getCommentaires();}
  // Méthode appelée lorsque le composant Commentaire émet un nouvel événement


  refreshSuggestions(): void {
    this.loadSuggestions();
  }

  likeSuggestion(suggestion: Suggestion): void {
    suggestion.likes++;
    this.suggestionService.updateSuggestion(suggestion.idSuggestion, suggestion).subscribe(
      (res: any) => {
        const index = this.suggestions.findIndex((s) => s.idSuggestion === suggestion.idSuggestion);
        if (index !== -1) {
          this.suggestions[index] = suggestion;
          this.sortSuggestionsByLikes();
          localStorage.setItem(`likes_${suggestion.idSuggestion}`, suggestion.likes.toString());
        }
      },
      (error) => {
        console.error('Error updating likes for suggestion: ', error);
      }
    );
  }

  openDialog(): void {
    const idFoyer = +this.activatedRoute.snapshot.paramMap.get('idFoyer');
    const dialogRef = this.dialog.open(SuggestionDialog, {
      width: '500px',
      data: {
        idFoyer: idFoyer,
        suggestion: new Suggestion()
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadSuggestions();
    });
  }

  openEditDialog(suggestion: Suggestion): void {
    // Vérifiez si suggestion, suggestion.idFoyer et suggestion.idSuggestion sont définis
    if (suggestion && suggestion.foyer.idFoyer !== undefined && suggestion.idSuggestion !== undefined) {
      console.log('Data before opening dialog:', { idFoyer: suggestion.idFoyer, idSuggestion: suggestion.idSuggestion });

      const dialogRef = this.dialog.open(SuggestionEditDialog, {
        width: '500px',
        data: {
          idFoyer: suggestion.idFoyer,
          suggestion: suggestion,
        },
      });

      dialogRef.afterClosed().subscribe((result: Suggestion) => {
        if (result) {
          this.suggestionService.mettreAJourSuggestionDansFoyer(
            suggestion.idFoyer,
            suggestion.idSuggestion,
            result
          ).subscribe(
            (res: any) => {
              console.log('Update successful:', res);
              this.refreshSuggestions();
            },
            (error) => {
              console.error('Error updating Suggestion: ', error);
            }
          );
        }
      });
    } else {
      console.error('idFoyer or idSuggestion is undefined in the provided suggestion data.');
    }
  }



  deleteSuggestion(idSuggestion: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this suggestion?');

    if (confirmDelete) {
      this.suggestionService.deleteSuggestion(idSuggestion).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refreshSuggestions();
        },
        (error) => {
          console.error('Error deleting Suggestion: ', error);
        }
      );
    }
  }
}
/////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'suggestion-dialog',
  templateUrl: 'suggestion-dialog.html',
})
export class SuggestionDialog implements OnInit {
  suggestion: Suggestion;
  suggestionForm: FormGroup;
  idFoyer: number;

  constructor(
    public dialogRef: MatDialogRef<SuggestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private suggestionService: SuggestionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.suggestion = this.data.suggestion ? this.data.suggestion : new Suggestion();

    this.suggestionForm = this.formBuilder.group({
      titreSuggestion: [this.suggestion.titreSuggestion, Validators.required],
      contenuSuggestion: [this.suggestion.contenuSuggestion, Validators.required],
      tagSuggestion: [this.suggestion.tagSuggestion, Validators.required],
    });

    this.idFoyer = this.data.idFoyer;
  }

  submit() {
    if (this.suggestionForm.valid) {
      const formData = this.suggestionForm.value;

      this.suggestionService.addSuggestionToFoyer(this.idFoyer, formData).subscribe(
        (res: any) => {
          this.dialogRef.close();
          console.log(res.message); // Accédez à la propriété "message" de la réponse
        },
        (error) => {
          console.error('Error adding suggestion to foyer: ', error);
          console.log(JSON.stringify(error));
        }
      );
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
/////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-suggestion-edit-dialog',
  templateUrl: 'suggestion-edit-dialog.html',
})
export class SuggestionEditDialog {
  suggestionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SuggestionEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private suggestionService: SuggestionService
  ) {
    this.suggestionForm = this.formBuilder.group({
      titreSuggestion: [this.data.suggestion ? this.data.suggestion.titreSuggestion : '', Validators.required],
      contenuSuggestion: [this.data.suggestion ? this.data.suggestion.contenuSuggestion : '', Validators.required],
      tagSuggestion: [this.data.suggestion ? this.data.suggestion.tagSuggestion : '', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Fermer le dialogue lors de l'annulation
  }

  submit(): void {
    if (this.suggestionForm.valid) {
      const updatedSuggestion: Suggestion = {
        ...this.suggestionForm.value,
      };

      // Utiliser l'opérateur de coalescence nulle pour fournir des valeurs par défaut
      const idFoyer = this.data?.suggestion.idFoyer;
      const idSuggestion = this.data?.suggestion?.idSuggestion ?? undefined;

      // Vérifier si idFoyer et idSuggestion sont définis
      if (idFoyer !== undefined && idSuggestion !== undefined) {
        const url = `${environment.url}suggestion/${idFoyer}/suggestion/${idSuggestion}`;
        console.log('URL for updating suggestion:', url);

        this.suggestionService.mettreAJourSuggestionDansFoyer(
          idFoyer,
          idSuggestion,
          updatedSuggestion
        ).subscribe(
          (res: any) => {
            console.log('Update successful:', res);
            this.dialogRef.close(); // Fermer le dialogue après la mise à jour réussie
          },
          (error) => {
            console.error('Error updating Suggestion: ', error);
          }
        );
      } else {
        console.error('idFoyer or idSuggestion is undefined in this.data.');
      }
    }
  }

}
@Component({
  selector: 'app-comment',
  template: `
    <!-- app-commentaire.component.html -->
    <div class="comment-container">

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

})
export class CommentComponent {

  @Input() commentaires: string[] = [];
  @Output() miseAJourCommentaires = new EventEmitter<void>();
  nouveauCommentaire: string = '';
  constructor(private commentaireService: CommentaireService) {}
  ngOnInit() {
    this.commentaires = this.commentaireService.getCommentaires();

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
    this.commentaireService.ajouterCommentaire(this.nouveauCommentaire);
    this.nouveauCommentaire = '';
    this.miseAJourCommentaires.emit(); // Émettre un événement pour notifier le parent
  }

  supprimerCommentaire(index: number) {
    this.commentaireService.supprimerCommentaire(index);
    this.miseAJourCommentaires.emit(); // Émettre un événement pour notifier le parent
  }}



