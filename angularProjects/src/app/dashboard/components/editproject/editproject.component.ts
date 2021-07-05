import {Component, Input , OnInit, Inject, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { membersClass } from '../../classes/membersClass';
import { Members } from '../../services/members.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Activities } from '../../services/activity.service';
import { activityClass } from '../../classes/activityClass';
import { projectMembers } from '../../classes/projectMemebrs';
import { MembersOnly } from '../../services/memebrsOnly.service';
import { membesOnlyClass } from '../../classes/membersOnlyClass';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';

@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.scss']
})
export class EditprojectComponent implements OnInit {

  @Input() result = '';

  members: membersClass[];
  projectMembersAr: projectMembers[];
  membersOnly: membesOnlyClass[];
  activities: activityClass[];

  public editProjectForm: FormGroup;
  control: FormControl;
  projRes: any;

  listData: MatTableDataSource<any>; 
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;

  projects: ProjectsClass[];

  constructor(public dialogRef: MatDialogRef<EditprojectComponent>,private _members: Members, private fb: FormBuilder, 
    private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, private _activity: Activities,
    private _membersOnly: MembersOnly, private _projects: Projects, private cdr: ChangeDetectorRef) 
    { 
      this.projRes = data;
    }

  ngOnInit(): void {

    this._membersOnly.getMembers()
      .subscribe
      (
        data=>
        {
          let data2 = this.removeDuplicates(data, "sifra");
          this.membersOnly = data2;
          
          this.projectMembersAr = this.projRes.clanovi;
          
          for(let i = 0; i < this.projectMembersAr.length; i++)
          {
            for(let j = 0; j < this.membersOnly.length; j++)
            {
              if(this.membersOnly[j].sifra == this.projectMembersAr[i].sifra)
              {
                this.membersOnly.splice(j, 1);
              }
            }
          }       
        }
      ); 


    this.control = this.fb.control('', Validators.required);

    this.editProjectForm = this.fb.group({
      sifra: [''],
      naziv: ['', [Validators.required,]],
      nositelj: ['', [Validators.required]],
      vrijednost: ['', [Validators.required, Validators.min(1), Validators.max(10000000000)]],
      clanovi: [''],
      status: ['', [Validators.required]]
    })

    this.editProjectForm.patchValue({
      sifra: this.projRes.sifra,
      naziv: this.projRes.naziv,
      nositelj: this.projRes.nositelj,
      vrijednost: this.projRes.vrijednost,
      status: this.projRes.status
    })
  }

  editProject(): void{

    const projectStatus = (<HTMLInputElement>document.getElementById("projectStatus")).value;
    if(confirm("Jeste li sigurni da želite ažurirati projekt?"))
    {
      if(projectStatus == "Aktivan")
    {
      if(this.editProjectForm.value.clanovi != "")
      {
        this.httpClient.post('http://localhost/VUV_managment/api/azurirajProjekt.php',
        JSON.stringify({
            sifra: this.editProjectForm.value.sifra,
            naziv: this.editProjectForm.value.naziv,
            nositelj: this.editProjectForm.value.nositelj,
            vrijednost: this.editProjectForm.value.vrijednost,
            status: true
        })).subscribe(
              data => {
                console.log('Uspješno ste ažurirali projekt!');
              },
              error => {
                console.log('Došlo je do pogreške pri ažuriranju projekta!');
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
                          for(let i = 0; i < this.editProjectForm.value.clanovi.length; i++)
                          {
                            this.httpClient.post('http://localhost/VUV_managment/api/kreirajSifrarnik.php',
                              JSON.stringify({
                                clanSifra: this.editProjectForm.value.clanovi[i],
                                projektSifra: this.editProjectForm.value.sifra,
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
                  );
      }
      else if(this.editProjectForm.value.clanovi === "")
      {
        this.httpClient.post('http://localhost/VUV_managment/api/azurirajProjektBez.php',
        JSON.stringify({
            sifra: this.editProjectForm.value.sifra,
            naziv: this.editProjectForm.value.naziv,
            nositelj: this.editProjectForm.value.nositelj,
            vrijednost: this.editProjectForm.value.vrijednost,
            status: true
        })).subscribe(
              data => {
                console.log('Uspješno ste ažurirali projekt!');
              },
              error => {
                console.log('Došlo je do pogreške pri ažuriranju projekta!');
              }
            )
      }
    }
    else if(projectStatus === "Neaktivan")
    {
      if(this.editProjectForm.value.clanovi != "")
      {
        this.httpClient.post('http://localhost/VUV_managment/api/azurirajProjekt.php',
        JSON.stringify({
            sifra: this.editProjectForm.value.sifra,
            naziv: this.editProjectForm.value.naziv,
            nositelj: this.editProjectForm.value.nositelj,
            vrijednost: this.editProjectForm.value.vrijednost,
            status: false
        })).subscribe(
              data => {
                console.log('Uspješno ste ažurirali projekt!');
              },
              error => {
                console.log('Došlo je do pogreške pri ažuriranju projekta!');
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
                    for(let i = 0; i < this.editProjectForm.value.clanovi.length; i++)
                    {
                      this.httpClient.post('http://localhost/VUV_managment/api/kreirajSifrarnik.php',
                        JSON.stringify({
                          clanSifra: this.editProjectForm.value.clanovi[i],
                          projektSifra: this.editProjectForm.value.sifra,
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
            );      
      }
      else if(this.editProjectForm.value.clanovi === "")
      {
        this.httpClient.post('http://localhost/VUV_managment/api/azurirajProjektBez.php',
        JSON.stringify({
            sifra: this.editProjectForm.value.sifra,
            naziv: this.editProjectForm.value.naziv,
            nositelj: this.editProjectForm.value.nositelj,
            vrijednost: this.editProjectForm.value.vrijednost,
            status: false
        })).subscribe(
              data => {
                console.log('Uspješno ste ažurirali projekt!');
              },
              error => {
                console.log('Došlo je do pogreške pri ažuriranju projekta!');
              }
            )
      }
    }

    this.dialogRef.close();
    }
    
  }
  
  onNoClick(): void{
      this.dialogRef.close();
  }

  public changeActivity():  void
    {
      let statusActivity = (<HTMLInputElement>document.getElementById("projectStatus")).value;

      if(statusActivity == "Aktivan")
      { 
        (<HTMLInputElement>document.getElementById("projectStatus")).value = "Neaktivan";
      }
      else
      {
        (<HTMLInputElement>document.getElementById("projectStatus")).value = "Aktivan";
      }
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
