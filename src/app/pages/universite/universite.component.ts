import { Component, OnInit } from '@angular/core';
import { UniversiteService } from 'src/app/src/universite.service';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.scss']
})
export class UniversiteComponent implements OnInit {
  universites: any[]; // Change the type to match your Universite model.

  constructor(private universiteService: UniversiteService) {}

  ngOnInit() {
    this.loadUniversites();
  }

  loadUniversites() {
    this.universiteService.getAllUniversites().subscribe(
      (data: any) => {
        this.universites = data; // Assuming your service returns an array of Universite objects.
      },
      (error) => {
        console.error('Error loading Universites: ', error);
      }
    );
  }
}
