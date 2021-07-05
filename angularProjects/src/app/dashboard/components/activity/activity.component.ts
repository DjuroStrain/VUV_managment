import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';
import { Activities } from '../../services/activity.service';
import { activityClass } from '../../classes/activityClass';
import { Members } from '../../services/members.service';
import { membersClass } from '../../classes/membersClass';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { EditactivityComponent } from '../editactivity/editactivity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  displayedColumns: string[] = ['rbr', 'naziv', 'opis', 'vrijeme','projekt' ,'clanovi', 'status','actions']; //zaglavlje tablice

  @ViewChild(MatTable) table: MatTable<any>;

  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this

  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;

  activities!: activityClass[];
  activitiesProj: activityClass[] = [];
  members!: membersClass[];
  projects!: ProjectsClass[];
  projectsActive: ProjectsClass[] = [];

  editActivityForm!: FormGroup;

  selectedOption: any;

  constructor(private httpClient: HttpClient,private _router: Router, private _activity: Activities, private modalService: NgbModal, 
    private _members: Members, private fb: FormBuilder, private _projects: Projects, private cdr: ChangeDetectorRef, 
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this._projects.getProjects()
    .subscribe(
      data =>
      {
        this.projects = data;
        this.projects.forEach(element => {
          if(element.status == "Aktivan")
          {
            this.projectsActive.push(element);
          }
        })
      }   
    )

    this._members.getMembers()
    .subscribe(
      data => 
      {
        this.members = data;
      }
    )
  }

  openDialogEdit(element): void {
    const dialogRef = this.dialog.open(EditactivityComponent, {
      disableClose: true,
        width: "auto",
        height: "auto",
      data: {
        sifra: element.sifra,
        naziv: element.naziv,
        opis: element.opis,
        vrijeme: element.vrijeme,
        status: element.status,
        projektSifra: element.projektSifra
      }
    });



    dialogRef.afterClosed().subscribe(result => {
       this.getActivities();
    })
  }

  public changeActivity()
  {
    let statusActivity = (<HTMLInputElement>document.getElementById("activityStatus2")).value;

    if(statusActivity == "Aktivan")
    { 
      (<HTMLInputElement>document.getElementById("activityStatus2")).value = "Neaktivan";
    }
    else
    {
      (<HTMLInputElement>document.getElementById("activityStatus2")).value = "Aktivan";
    }
  }
  public getActivities(): void {

    let table = (<HTMLInputElement>document.getElementById("table"));
    let paginator = (<HTMLInputElement>document.getElementById("paginator"))

    table.style.visibility = "visible"; 
    paginator.style.visibility = "visible"; 

    this._activity.getActivities()
    .subscribe(
      data =>
      {
        this.activitiesProj = [];
        this.activities = data;
        this.activities.forEach(element => {
          if(element.projekt == this.selectedOption)
          { 
              this.activitiesProj.push(element);
          }
        })
        this.listData = new MatTableDataSource(this.activitiesProj);
        this.cdr.detectChanges();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
        console.log(this.listData);
      }   
    )
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


  public addActivity2(){
    this._router.navigateByUrl('/projekti_pocetna/dodaj_aktivnost');
  }

  public applyFilter(filterValue: string){
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

}
