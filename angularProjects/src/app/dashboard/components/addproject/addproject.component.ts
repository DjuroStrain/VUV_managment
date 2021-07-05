import {Component, Inject, NgModule, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { membersClass } from '../../classes/membersClass';
import { Members } from '../../services/members.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';
import { NumericLiteral } from 'typescript';

export interface DialogData {
  naziv: string;
  nositelj: string;
  vrijednost: string;
  voditelj: string;
  adresa: string;
  postanskiBroj: number;
  grad: string;
  latituda: number;
  longituda: number;
}
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {

  members: membersClass[];
  members2: membersClass[];

  addProjectsForm: FormGroup;
  control: FormControl;

  listData: MatTableDataSource<any>; 
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;

  projects: ProjectsClass[];

  constructor(public dialogRef: MatDialogRef<AddprojectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _members: Members, private fb: FormBuilder, private httpClient: HttpClient, 
    private _projects: Projects, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this._members.getMembers()
      .subscribe
      (
        data=>
        {
          let data2 = this.removeDuplicates(data, "sifra");
          this.members = data2;
        }
      ); 

    this.control = this.fb.control('', Validators.required);

    this.addProjectsForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.minLength(1)]],
      nositelj: ['', [Validators.required]],
      vrijednost: ['', [Validators.required,Validators.max(10000000000) ,Validators.min(1)]],
      voditelj: ['', [Validators.required]],
      clanovi: [''],
      adresa: ['', [Validators.required]],
      postanskiBroj: ['', [Validators.required, Validators.max(100000) ,Validators.min(1)]],
      grad: ['', [Validators.required]],
      latituda: ['', [Validators.required, Validators.max(90) ,Validators.min(-90)]],
      longituda: ['', [Validators.required, Validators.max(180) ,Validators.min(-180)]]
    })
  }

  populateMember() :void {
    this._members.getMembers()
    .subscribe
    (
      data=>
      {
        let data2 = this.removeDuplicates(data, "sifra");
        this.members2 = data2;
      }
    ); 
  }

  addProject(): void{

            for(let i = 0; i < this.addProjectsForm.value.clanovi.length; i++)
            {
              if(this.addProjectsForm.value.clanovi[i] == this.addProjectsForm.value.voditelj)
              {
                alert("Osoba koja je odabrana za voditelja ne može biti odabrana i kao dio dodatnih članova!");
                return;
              }
            }

      if(confirm("Jeste li sigurni da želite dodati projekt?"))
    {
      this.httpClient.post('http://localhost/VUV_managment/api/kreirajProjekt.php',
                  JSON.stringify({
                    naziv: this.addProjectsForm.value.naziv,
                    nositelj: this.addProjectsForm.value.nositelj,
                    vrijednost: this.addProjectsForm.value.vrijednost,
                    status: true,
                    adresa: this.addProjectsForm.value.adresa,
                    postanskiBroj: this.addProjectsForm.value.postanskiBroj,
                    grad: this.addProjectsForm.value.grad,
                    latituda: this.addProjectsForm.value.latituda,
                    longituda: this.addProjectsForm.value.longituda,
                    clanSifra: this.addProjectsForm.value.voditelj,
                  })).subscribe(
                  data => {
                    console.log('Uspješno ste kreirali projekt!');
                  },
                  error => {
                    console.log("Došlo je do pogreške pri kreiranju projekta!");
                  }
                  )

                  this._projects.getProjects()
                  .subscribe
                  (
                    data=>
                    {
                      this.listData = new MatTableDataSource(data);
                      this.cdr.detectChanges();
                      this.listData.paginator = this.paginator;
                      this.listData.sort = this.sort;
                    }
                  );

                  this._projects.getProjects()
                  .subscribe
                  (
                    data=>
                    {
                      this.projects= data;
                      let count: number = 1;
                      this.projects.forEach(element => {
                        if(count == this.projects.length)
                        {
                          for(let i = 0; i < this.addProjectsForm.value.clanovi.length; i++)
                          {
                            this.httpClient.post('http://localhost/VUV_managment/api/kreirajSifrarnik.php',
                              JSON.stringify({
                                clanSifra: this.addProjectsForm.value.clanovi[i],
                                projektSifra: element.sifra,
                                voditelj: false
                              })).subscribe(
                                data => {
                                  console.log('Uspješno ste kreirali sifrarnik!');
                                },
                                error => {
                                  console.log("Došlo je do pogreške pri kreiranju sifrarnika!");
                                }
                              )
                          }
                        }
                        count++;
                      })
                    }
                  );

                  this.dialogRef.close();
                }
                
  }
  
  onNoClick(): void{
      this.dialogRef.close();
  }


  removeDuplicates(originalArray: [], prop: any) {
    let newArray = [];
    let lookupObject: any  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }

}
