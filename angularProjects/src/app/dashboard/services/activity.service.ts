import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  

@Injectable()
export class Activities{

    constructor(private httpClient: HttpClient) { }

    getActivities(): Observable<any> {
        return this.httpClient.get('http://localhost/VUV_managment/api/ucitajAktivnosti.php');
    }
}