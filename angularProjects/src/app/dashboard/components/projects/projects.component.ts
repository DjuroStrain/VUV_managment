import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';
import { Members } from '../../services/members.service';
import { membersClass } from '../../classes/membersClass';
import { Locations } from '../../services/location.service';
import { locationClass } from '../../classes/locationClass';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { dashCaseToCamelCase, stringify } from '@angular/compiler/src/util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog } from '@angular/material/dialog';
import { AddprojectComponent } from '../addproject/addproject.component';
import { EditprojectComponent } from '../editproject/editproject.component';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsComponent]
})

export class ProjectsComponent implements OnInit {

    naziv: string;
    nositelj: string;
    vrijednost: string;
    voditelj: string;
    adresa: string;
    postanskiBroj: number;
    grad: string;
    latituda: number;
    longituda: number;

    displayedColumns: string[] = ['rbr', 'naziv', 'nositelj', 'vrijednost', 'voditelj', 'lokacija', 'status', 'actions'];  //zaglavlje tablice

    editProjectForm!: FormGroup; //form grupa za popunjavanje forme za uredivanje projekta
    
    listData: MatTableDataSource<any>; 
    @ViewChild(MatSort) sort : MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator; //tablica

    projects! : ProjectsClass[];
    members! : membersClass[];
    location! : locationClass[];  
    projRes: any;

    constructor(private _projects: Projects, private modalService: NgbModal, private _members: Members, 
      private httpClient: HttpClient, private fb: FormBuilder, private _location: Locations,private cdr: ChangeDetectorRef,
      public dialog: MatDialog, private editProjectForm2: EditprojectComponent)
      { }

    
    ngOnInit() {

      /*Dohvati projekte*/ 
      this._projects.getProjects()
      .subscribe
      (
        data=>
        {
          this.listData = new MatTableDataSource(data);
          this.cdr.detectChanges();
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
          console.log(this.listData);
        }
      )
      /*Dohvati clanove*/ 
      this._members.getMembers()
      .subscribe
      (
        data=>
        {
          let data2 = this.removeDuplicates(data, "sifra");
          this.members = data2;
        }
      ); 
            
     }

    getAllProjects(): void {
      this._projects.getProjects()
      .subscribe
      (
        data=>
        {
          this.listData = new MatTableDataSource(data);
          this.cdr.detectChanges();
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
          this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
          console.log(this.listData);
        }
      );
    }
    
    openDialogAdd(): void {
      const dialogRef = this.dialog.open(AddprojectComponent, {
        disableClose: true,
        maxWidth: "50%",
        minWidth: "50%",
        height: "auto"
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.getAllProjects();
      })
    }

    openDialogEdit(element): void {
      const dialogRef = this.dialog.open(EditprojectComponent, {
        disableClose: true,
        width: "auto",
        height: "auto",
        data: {
          sifra: element.sifra,
          naziv: element.naziv,
          nositelj: element.nositelj,
          vrijednost: element.vrijednost,
          status: element.status,
          clanovi: element.clanoviProjekta
        }
      });



      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.getAllProjects();
      })
    }


    public changeActivity()
    {
      let statusActivity = (<HTMLInputElement>document.getElementById("projectStatus2")).value;

      if(statusActivity == "Aktivan")
      { 
        (<HTMLInputElement>document.getElementById("projectStatus2")).value = "Neaktivan";
      }
      else
      {
        (<HTMLInputElement>document.getElementById("projectStatus2")).value = "Aktivan";
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

  public applyFilter(filterValue: string){
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }
}
