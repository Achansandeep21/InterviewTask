import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        console.log("id from url",this.id)
        if(this.id){
            this.getUserDetails(this.id)
        }
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            salary: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
            age: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }
    userdata : any
    private getUserDetails(id: string){
        this.userService.getById(id).subscribe((resp : any)=>{
            this.userdata = resp.data
            console.log("user details by id",resp)
            
            if(resp.status == 'success')
            {
                this.form.patchValue({
                    name : this.userdata.employee_name,
                    salary : this.userdata.employee_salary,
                    age : this.userdata.employee_age
                }) 
            }
        })
    }
    private createUser() {
        this.userService.create(this.form.value).subscribe((resp: any)=>{
            console.log("added user resp",resp)
            if(resp.status == 'success'){
                this.alertService.success("user created successfully")
            }
            else {
                this.alertService.error("Error occured while creating User")
            }
        })
           
    }

    private updateUser() {
        this.userService.update(this.id, this.form.value).subscribe((resp:any)=>{
            console.log(resp)
            if (resp.status == 'success'){
                this.alertService.success("User Updated successfully")
            }
            else{
                this.alertService.error("please try after some time")
            }
        })
            
    }
}