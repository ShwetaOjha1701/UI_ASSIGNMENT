import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',  // This defines how the component will be referenced in HTML
  templateUrl: './user-form.component.html',  // The HTML template file
  styleUrls: ['./user-form.component.css']  // Optional: add CSS styles for the component
})

export class UserFormComponent {
  userForm: FormGroup;
  isEditMode = false;
  id:any;
  constructor(private fb: FormBuilder, private userService: UserService,public router: Router) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], 
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  async ngOnInit(){
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.id=user.user_id
        console.log(user)
        this.isEditMode = true;
        this.userForm.patchValue(user);
      }
    });
  }

  async onSubmit() {
    console.log(this.userForm)
    if (this.userForm.valid) {
      if(this.isEditMode==false){
        let dt = await this.userService.createUser(this.userForm.value);
        console.log(dt)
        if(dt["error"]==false){
  
          Swal.fire('Suceess',"Successfully Created",'success')
          this.router.navigate(['./list']);
  
        }else{
          Swal.fire("ERROR","Server Side Error",'error')
        }
      }
      else{
        // console.log(user)
        let dt = await this.userService.updateUser(this.userForm.value,this.id);
        console.log(dt)
        if(dt["error"]==false){
  
          Swal.fire('Suceess',"Successfully Updated",'success')
          this.router.navigate(['./list']);
  
        }else{
          Swal.fire("ERROR","Server Side Error",'error')
        }
      }
    
    }
  }
  goback(){
    this.router.navigate(['/users/list']);
  }
}
