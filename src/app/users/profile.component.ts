import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService){

    }
    id
    profileData
    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        if(this.id){
            this.userService.getById(this.id).subscribe((resp: any)=>{
                this.profileData = resp.data
                console.log('profile resp',resp)
            })
        }
    }
}