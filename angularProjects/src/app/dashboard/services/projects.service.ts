import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  

@Injectable()
export class Projects{

    constructor(private httpClient: HttpClient) { }

    getProjects(): Observable<any> {
        return this.httpClient.get('http://localhost/VUV_managment/api/ucitajProjekte.php');
    }
}