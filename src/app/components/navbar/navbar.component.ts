import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {SearchService} from "../../services/Search.Service";
import { Auth1Service } from 'src/app/services/auth1.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  userRole: string | null = null;

  constructor(private authService: Auth1Service,location: Location,  private element: ElementRef, private router: Router ,private searchService: SearchService) {
    this.location = location;
  }
  

  ngOnInit() {
    // Fetch the user role from session storage or wherever you store it
    this.userRole = sessionStorage.getItem('role');

    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle(): string {
    if (this.userRole === 'USER') {
      return 'Bienvenue à espace etudiant';
    } else if (this.userRole === 'ADMIN') {
      return 'Bienvenue à espace admin';
    } else {
      return 'Default Title'; // You can set a default title for other roles or when the role is not defined
    }
  }
}
  /*
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
*/

