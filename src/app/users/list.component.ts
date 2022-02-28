import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    employees = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll().subscribe((resp:any)=>{
            this.employees = resp?.data
            console.log("employees list",resp)
        });
        // this.userService.getAll().pipe(first()).subscribe(users => this.users = users);
        // users => this.users = users
    }

    deleteUser(id: string) {
        const user = this.employees.find(x => x.id === id);
        user.isDeleting = true;
        this.userService.delete(id).subscribe(resp=>{
            console.log("deleted user resp",resp)
        })
            // .subscribe(() => this.employees = this.employees.filter(x => x.id !== id));
    }
}