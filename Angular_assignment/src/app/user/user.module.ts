import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms'; // For using reactive forms
import { UserRoutingModule } from './user-routing.module';
// import { UserService } from './user.service';
@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule, // Import the routing module
    ReactiveFormsModule
  ]
  ,
  // providers: [
  //   UserService // Provide UserService here
  // ]
})
export class UserModule { }
