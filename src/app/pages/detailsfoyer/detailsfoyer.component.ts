import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bloc } from '../../models/bloc';
import { BlocService } from '../../services/bloc.service';
import { Foyer } from '../../models/foyer';

@Component({
  selector: 'app-detailsfoyer',
  templateUrl: './detailsfoyer.component.html',
  styleUrls: ['./detailsfoyer.component.scss'],
})
export class DetailsfoyerComponent implements OnInit {
  idFoyer: number;
  foyer: Foyer;
  blocs: Bloc[];
  constructor(
    private route: ActivatedRoute,
    private blocService: BlocService
  ) {}

  ngOnInit() {
    this.idFoyer = +this.route.snapshot.paramMap.get('idFoyer');
    console.log('ID du foyer récupéré depuis l\'URL :', this.idFoyer);

    this.getAllBlocs();
  }

  getAllBlocs() {
    this.blocService.getBlocsByFoyerId(this.idFoyer).subscribe(
      (data: Bloc[]) => {
        this.blocs = data;
        console.log('Blocs associés au foyer récupérés :', data);
      },
      (error) => {
        console.error('Error loading Blocs: ', error);
      }
    );
  }
}
