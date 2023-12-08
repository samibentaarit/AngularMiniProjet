// user.component.ts

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  filteredData: any[] = [];
  searchText = '';

  constructor(private userService: UserService) {}

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
    this.userService.getUsers()
      .subscribe(users => this.users = users);
      console.log(this.users);
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

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId)
      .subscribe(() => {
        // Remove the user from the local array or perform any other necessary actions
        this.users = this.users.filter(u => u.id !== userId);
        console.log('User deleted successfully.');
      });
  }
}
