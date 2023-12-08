// comment.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private key = 'commentaires';

  getCommentaires(): string[] {
    const commentairesStr = localStorage.getItem(this.key);
    return commentairesStr ? JSON.parse(commentairesStr) : [];
  }

  ajouterCommentaire(commentaire: string): void {
    const commentaires = this.getCommentaires();
    commentaires.push(commentaire);
    localStorage.setItem(this.key, JSON.stringify(commentaires));
  }
  supprimerCommentaire(index: number): void {
    const commentaires = this.getCommentaires();
    if (index >= 0 && index < commentaires.length) {
      commentaires.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(commentaires));
    }
  }
}
