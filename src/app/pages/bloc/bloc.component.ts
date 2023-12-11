import {Component, Inject, Input, OnInit} from '@angular/core';
import { Bloc } from "../../models/bloc";
import { BlocService } from "../../services/bloc.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {Suggestion} from "../../models/suggestion";
import {Chambre} from "../../models/chambre";


@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss']
})
export class BlocComponent implements OnInit {
  blocs: Bloc[];
  idFoyer: number;
  filteredBlocs: Bloc[];
  searchTerm: String = '';
  focus = false;  Blocs: Bloc[];

  constructor(
    private blocService: BlocService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idFoyer = +params.get('idFoyer');
      console.log('ID du foyer récupéré depuis l\'URL :', this.idFoyer);

      this.getAllBlocs();
    });
  }

  refresh(): void {
    this.getAllBlocs();
  }
  // search() {
  //   this.filtredBloc = this.Blocs.filter(bloc =>
  //       bloc.nomBloc.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
  search() {
    // Perform filtering based on the entered search term
    if (this.searchTerm.trim() !== '') {
      this.filteredBlocs = this.blocs.filter(bloc =>
        bloc.nomBloc.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If the search term is empty, display all blocs
      this.filteredBlocs = this.blocs;
    }
  }
  getAllBlocs() {
    this.blocService.getBlocsByFoyerId(this.idFoyer).subscribe(
      (data: Bloc[]) => {
        this.blocs = data;
        this.filteredBlocs = this.blocs;

        console.log('Blocs associés au foyer récupérés :', data);
      },
      (error) => {
        console.error('Error loading Blocs: ', error);
      }
    );
  }


  openDialog(): void {
    const idFoyer = this.activatedRoute.snapshot.params['idFoyer'];

    const dialogRef = this.dialog.open(BlocDialog, {
      width: '500px',
      data: {
        idFoyer: idFoyer,
        nomBloc: '',
        capaciteBloc: '',
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllBlocs();
    });
  }

  openEditDialog(idBloc: number, nomBloc: string, capaciteBloc: number): void {
    const dialogRef = this.dialog.open(BlocEditDialog, {
      width: '500px',
      data: {
        idBloc: idBloc,
        nomBloc: nomBloc,
        capaciteBloc: capaciteBloc,
      },
    });

    dialogRef.afterClosed().subscribe((result: Bloc) => {
      if (result) {
        this.blocService.updateBloc(result.idBloc, result).subscribe(
          (res: any) => {
            console.log('Update successful:', res);
            this.refresh();
          },
          (error) => {
            console.error('Error updating Bloc: ', error);
          }
        );
      }
    });
  }


  deleteBloc(idBloc: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?');

    if (confirmDelete) {
      this.blocService.deleteBloc(idBloc).subscribe(
        (res: any) => {
          console.log('Delete successful:', res);
          this.refresh();
        },
        (error) => {
          console.error('Error deleting Bloc: ', error);
        }
      );
    }
  }

  detailsBloc(idBloc: number): void {
    this.router.navigate(['/bloc-details', idBloc]);
  }
}

////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'bloc-dialog',
  templateUrl: 'bloc-dialog.html',
})
export class BlocDialog implements OnInit {
  blocForm: FormGroup;
  idFoyer: number;


  constructor(
    public dialogRef: MatDialogRef<BlocDialog>,
    private formBuilder: FormBuilder,
    private blocService: BlocService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.blocForm = this.formBuilder.group({
      nomBloc: ['', Validators.required],
      capaciteBloc: ['', Validators.required]
    });
    this.idFoyer = this.data.idFoyer;
    console.log(this.idFoyer);
  }



  submit() {
    console.log(this.idFoyer);
    if (this.blocForm.invalid) {
      return;
    }

    const formData = this.blocForm.value;
    const bloc: { idFoyer: any; capaciteBloc: any; nomBloc: any } = {
      idFoyer: this.idFoyer,
      nomBloc: formData.nomBloc,
      capaciteBloc: formData.capaciteBloc,
    };

    this.blocService.addBlocToFoyer(this.idFoyer, bloc).subscribe(
      (res: any) => {
        this.dialogRef.close();
        console.log(res.text); // Accès au texte de la réponse
      },
      (error: any) => {
        // Gérer les erreurs de la requête
        console.log(JSON.stringify(error));
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'bloc-edit-dialog',
  templateUrl: 'bloc-edit-dialog.html',
})
export class BlocEditDialog implements OnInit {
  blocForm: FormGroup;
  idFoyer: number;

  constructor(
    public dialogRef: MatDialogRef<BlocEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bloc,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.blocForm = this.formBuilder.group({
      idBloc: [this.data.idBloc, Validators.required],
      nomBloc: [this.data.nomBloc, Validators.required],
      capaciteBloc: [this.data.capaciteBloc, Validators.required],
    });
  }

  submit() {
    if (this.blocForm.invalid) {
      return;
    }

    const formData = this.blocForm.value;
    const updatedBloc: { idBloc: any; capaciteBloc: any; nomBloc: any } = {
      idBloc: formData.idBloc,
      nomBloc: formData.nomBloc,
      capaciteBloc: formData.capaciteBloc,
    };

    this.dialogRef.close(updatedBloc);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
