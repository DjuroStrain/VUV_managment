import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  

@Injectable()
export class ID{

    constructor(private httpClient: HttpClient) { }

    getIDs(): Observable<any> {
        return this.httpClient.get('http://localhost/VUV_managment/api/ucitajSifrarnik.php');
    }
}