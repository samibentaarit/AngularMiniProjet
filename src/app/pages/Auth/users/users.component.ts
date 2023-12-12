// user.component.ts

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { cp } from 'fs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users = [];

  filteredData: any[] = [];
  searchText = '';
  show = false;

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getUsers();
  }
  onSearchChange(): void {
    // Reset the filteredData array
    this.filteredData = [];

    // Check if the search text is empty
    if (!this.searchText) {
      this.filteredData = this.users;
      return;
    }

    // Perform the search based on the searchText
    this.filteredData = this.users.filter(user => {
      // Customize the search criteria as per your requirements
      const fullSearch = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
      return fullSearch.includes(this.searchText.toLowerCase());
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (users:User[]) => {
        console.log(users);
        this.users = users;
        this.filteredData = this.users;
        console.log(this.users);
        console.log(this.filteredData)
          },
          (err:any) =>{
          console.log(err)
        } 
      );
  }

  addUser(user: User): void {
    this.userService.addUser(user)
      .subscribe(newUser => {
        this.users.push(newUser);
      });
  }

  updateUser(user: User): void {
    this.userService.updateUser(user)
      .subscribe(updatedUser => {
        // Update the user in the local array or perform any other necessary actions
        console.log('User updated:', updatedUser);
      });
  }

  deleteUser1(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(() => {
        // Remove the user from the local array or perform any other necessary actions
        this.users = this.users.filter(u => u.id !== userId);
        console.log('User deleted successfully.');
      });
  }

  isButtonClicked = false;
  id:any

  onClickButton(id:any) {
    this.isButtonClicked = true;
    this.id=id
  }

  userToUpdate: User;
  showFormAdd = false;

  update(user: any) {
    console.log(user);
    this.show = true;
    this.userToUpdate = user;
    console.log(this.userToUpdate);

  }

  traitement(t: any) {
    this.show = !this.show;
  }
  ////after sending haka bech n5abiha
  handleRoleSet(): void {
    console.log(this.userToUpdate)
    this.isButtonClicked = false;
    this.getUsers()
  }

  deleteUser(userId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
  
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          // Handle success
          alert(`User avec ID ${userId} a ete supprimé`)
          console.log(`User with ID ${userId} deleted successfully.`);
          this.getUsers()

          // You may want to refresh the user list or perform any other necessary actions.
        },
        (error) => {
          // Handle errors appropriately
          console.error('Error deleting user:', error);
          // Display an error message to the user
          alert('Error deleting user. Please try again.');
        }
      );
    }
  }


  // changeTab(e: any) {
  //   this.show = false;
  //   for (let i = 0; i < this.blocs.length; i++) {
  //     if (this.blocs[i].idBloc == e.idBloc) {
  //       this.blocs[i] = e;
  //     }
  //   }
  // }
  selectedTheme: string = 'light'; // Default theme

  // Add a method to switch themes
  switchTheme() {
    this.selectedTheme = this.selectedTheme === 'light' ? 'dark' : 'light';
    this.cdr.detectChanges(); // Manually trigger change detection

  }
}