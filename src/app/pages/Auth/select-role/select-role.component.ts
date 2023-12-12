import { Component,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
})
export class SelectRoleComponent {
  roleForm: FormGroup;

  roles: string[] = ['ADMIN', 'USER']; // Available roles




  @Input() userId: number;
  @Output() notif = new EventEmitter<string>();
  isButtonClicked: boolean;
  @Output() roleSet = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmDialogService:ConfirmDialogService
  ) {
    this.userId = +this.route.snapshot.paramMap.get('id'); // Assuming the user ID is passed in the route
    this.createForm();
  }

  createForm(): void {
    this.roleForm = this.formBuilder.group({
      selectedRole: ['', Validators.required]
    });
  }

  
setRole(): void {
  this.confirmDialogService
    .openConfirmDialog('Confirmer la modification', 'Êtes-vous sûr de vouloir modifier ce foyer ?')
    .subscribe((result: boolean) => {
      if (result) {
        const selectedRole = this.roleForm.get('selectedRole').value;
        console.log(this.userId);

        this.userService.setUserRoleToAdmin(this.userId, selectedRole).subscribe(
          () => {
            this.notif.emit(`Role ${selectedRole} set for user with ID ${this.userId}`);
            console.log('Role set successfully');
            this.roleForm.reset();
            this.roleSet.emit();
            alert(`l'utilisateur avec l'id :${this.userId} à été mis a jour avec succes`);
          },
          (error) => {
            console.error('Error setting role:', error);
            alert(`érreur à la mise a jour`);
          }
        );
      }
    });
}
  
}