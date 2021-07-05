import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  

@Injectable()
export class Locations{

    constructor(private httpClient: HttpClient) { }

    getLocations(): Observable<any> {
        return this.httpClient.get('http://localhost/VUV_managment/api/ucitajLokacije.php');
    }
}