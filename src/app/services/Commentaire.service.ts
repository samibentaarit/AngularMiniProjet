import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private key = 'commentaires';

  getCommentaires(): string[] {
    const commentairesStr = sessionStorage.getItem(this.key);
    return commentairesStr ? JSON.parse(commentairesStr) : [];
  }

  ajouterCommentaire(commentaire: string): void {
    const commentaires = this.getCommentaires();
    commentaires.push(commentaire);
    sessionStorage.setItem(this.key, JSON.stringify(commentaires));
  }

  supprimerCommentaire(index: number): void {
    const commentaires = this.getCommentaires();
    if (index >= 0 && index < commentaires.length) {
      commentaires.splice(index, 1);
      sessionStorage.setItem(this.key, JSON.stringify(commentaires));
    }
  }
}
