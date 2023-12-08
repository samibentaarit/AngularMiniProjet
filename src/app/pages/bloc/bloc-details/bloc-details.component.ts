import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlocService } from '../../../services/bloc.service';
import { BibliothequeService } from '../../../services/bibliotheque.service';
import { Bibliotheque } from '../../../models/bibliotheque';
import { MatDialog } from '@angular/material/dialog';
import { BibliothequeDialog } from '../../bibliotheque/bibliotheque.component';
import { Bloc } from '../../../models/bloc';

@Component({
    selector: 'app-bloc-details',
    templateUrl: './bloc-details.component.html',
    styleUrls: ['./bloc-details.component.scss']
})
export class BlocDetailsComponent implements OnInit {
    @Input() idBloc: number;
    bloc: Bloc;


    constructor(
        private route: ActivatedRoute,
        private blocService: BlocService,
        private bibliothequeService: BibliothequeService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.idBloc = +params['idBloc'];
            if (this.idBloc) {
                this.retrieveBlocDetails(this.idBloc);
            }
        });
    }

    retrieveBlocDetails(idBloc: number) {
        this.blocService.getBlocById(idBloc).subscribe(
            (bloc: Bloc) => {
                this.bloc = bloc;
                console.log(this.bloc.idBloc);
            },
            (error) => {
                console.error(error);
            }
        );
    }
}
