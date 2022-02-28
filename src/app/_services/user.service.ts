import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

// const baseUrl = `${environment.apiUrl}/users`;
const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${baseUrl}/employees`);
    }

    getById(id: string) {
        return this.http.get<User>(`${baseUrl}/employee/${id}`);
    }

    create(params) {
        return this.http.post(`${baseUrl}/create`, params);
    }

    update(id: string, params) {
        return this.http.put(`${baseUrl}/update/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/delete/${id}`);
    }
}