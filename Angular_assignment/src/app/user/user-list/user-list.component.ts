import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];
  totalUsers!: number;
  page: number = 1;
  searchQuery: string = '';

  filteredUsers: User[] = this.users;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = Math.ceil(this.filteredUsers.length / this.pageSize);

  constructor(private userService: UserService,public router: Router) { }

  async ngOnInit() {
    await this.getUsers();
    await this.updatePagination();
  }
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue)
    );
    await this.updatePagination();
  }

  async updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUsers.slice(start, end);
  }
  setPage(page: number) {
    this.currentPage = page;
  }

  async getUsers() {

    let obj = {}
    let resp = await this.userService.getUsers()
    if (resp["error"] == false) {
      this.users = resp['data']
    }
  }

  async onSearch(query: string) {
    this.searchQuery = query;
    await this.getUsers();
  }

  async delete(element: any) {

    let obj: any = Object.assign({}, element)
    let user_id = obj['id']
    let resp: any = await this.userService.deleteUser(user_id)
    if (resp["error"] == false) {
      Swal.fire('Success', "Successfully Deleted", 'success')
      await this.getUsers()
    }
    else {
      Swal.fire('Error', "Server Side Error", 'error')
    }

  }

  async update(element: any) {
    this.userService.setUser(element);
    this.router.navigate(['/users/create'], { state: { user: element } });
    this.userService.isflag=true

  }
  async view_Details(element: any) {
    let Userobj = Object.assign({},element)
    this.userService.obj=Userobj;
    this.router.navigate(['/users/userdetails']);
 

  }

}
