import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private commentaires: string[] = [];

  getCommentaires(): string[] {
    return this.commentaires;
  }

  ajouterCommentaire(commentaire: string): void {
    this.commentaires.push(commentaire);
  }

  supprimerCommentaire(index: number): void {
    if (index >= 0 && index < this.commentaires.length) {
      this.commentaires.splice(index, 1);
    }
  }
}
