import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Activities } from '../../services/activity.service';
import { activityClass } from '../../classes/activityClass';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Members } from '../../services/members.service';
import { membersClass } from '../../classes/membersClass';

@Component({
  selector: 'app-member-activity',
  templateUrl: './member-activity.component.html',
  styleUrls: ['./member-activity.component.scss']
})
export class MemberActivityComponent implements OnInit {

  displayedColumns: string[] = ['rbr', 'ime', 'prezime'];

  listData: MatTableDataSource<any>;
  listData2: MatTableDataSource<any>;

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;

  activities: activityClass[];
  activitiesProj: activityClass[] = [];
  members: membersClass[];
  memberSelected: membersClass[] = [];

  actRes: any;

  constructor(private httpClient: HttpClient, private _activities: Activities, @Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<Component>, private _members: Members) {
    this.actRes = data;
   }

  ngOnInit(): void {

    this._activities.getActivities()
    .subscribe(
      data =>
      {
        this.activities =  data;

        this.activities.forEach(element => {
          element.clanoviProjekta.forEach(element2 => {

              if(element2.sifra == this.actRes.sifra)
              {
                this.activitiesProj.push(element);
              }
          })
        })
        console.log(this.activitiesProj);
        this.listData = new MatTableDataSource(this.activitiesProj);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        //this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
        console.log(this.listData);
      }   
    )


    this._members.getMembers()
    .subscribe(
      data => 
      {
          this.members = this.removeDuplicates(data, "sifra");

          this.members.forEach(element => {
            if(element.sifra == this.actRes.sifra)
            {
              this.memberSelected.push(element);
            }
          })
      }
    );
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
