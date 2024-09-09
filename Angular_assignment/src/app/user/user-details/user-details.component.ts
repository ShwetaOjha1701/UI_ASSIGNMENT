import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(private userService: UserService,public router: Router) {

  }
  UserObj:any={}
  async ngOnInit(){
    this.UserObj=   this.userService.obj
  }
  goback(){
    this.router.navigate(['/users/list']);
  }
}
