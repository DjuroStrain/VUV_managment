import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  

@Injectable()
export class Members{

    constructor(private httpClient: HttpClient) { }

    getMembers(): Observable<any> {
        return this.httpClient.get('http://localhost/VUV_managment/api/ucitajClanove.php');
    }
}