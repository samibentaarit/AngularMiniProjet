import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { EtudiantService } from "/src/app/services/etudiant.service";

import { Inject, } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialog,  MatDialogRef } from '@angular/material/dialog';


import { Etudiant } from 'src/app/models/etudiant';
import { Foyer } from 'src/app/models/foyer';

import {EtudiantEditDialog} from "../etudiant-edit-dialog/etudiant-edit-dialog.component";
import {EtudiantDialog} from '../etudiant-dialog/etudiant-dialog.component';
import {Universite} from "../../models/universite";
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {

  etudiants: Etudiant[];

  constructor(@Inject(EtudiantService) private etudiantService: EtudiantService ,public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllEtudiants();
  }

  refresh() {
    this.getAllEtudiants();
  }

  getAllEtudiants() {
    this.etudiantService.getAllEtudiants().subscribe(
      (data: any) => {
        this.etudiants = data;
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EtudiantDialog, {
      width: '500px',
      data: {
        nomEt: '',
        prenomEt: '',
        cin: null,
        ecole: '',
        dateNaissance: null,
        foyer: null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }

  openEditDialog(
    idEtudiant: number,
    nomEt: string,
    prenomEt: string,
    cin: number,
    ecole: string,
    dateNaissance: Date,

  ): void {
    const dialogRef = this.dialog.open(EtudiantEditDialog, {
      width: '500px',
      data: {
        idEtudiant: idEtudiant,
        nomEt: nomEt,
        prenomEt: prenomEt,
        cin: cin,
        ecole: ecole,
        dateNaissance: dateNaissance,
      },
    });
    dialogRef.afterClosed().subscribe((result: Etudiant) => {
      if (result) {
        this.etudiantService
          .updateEtudiant(result.idEtudiant, result)
          .subscribe(
            (res: any) => {
              console.log('Update successful:', res);
              this.refresh();
              dialogRef.close();
            },
            (error) => {
              console.error('Error updating Etudiant: ', error);
            }
          );
      }
    });
  }

  deleteEtudiant(idEtudiant: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this student?');

    if (confirmDelete) {
      this.etudiantService.deleteEtudiant(idEtudiant).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Etudiant: ', error);
        }
      );
    }
  }
}

