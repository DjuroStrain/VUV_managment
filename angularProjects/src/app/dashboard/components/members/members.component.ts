import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Members } from '../../services/members.service';
import { membersClass } from '../../classes/membersClass';
import { Activities } from '../../services/activity.service';
import { activityClass } from '../../classes/activityClass';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { blub } from '../animations/template.animations';
import { ID } from '../../services/id.service';
import { IDClass } from '../../classes/IDClass';
import { MemberActivityComponent } from '../member-activity/member-activity.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [blub]
})
export class MembersComponent implements OnInit {

  sifra: string;

  faEdit = faEdit;
  faTrash = faTrash;
  members! : membersClass[];
  membersNames! : membersClass[];
  activities! : activityClass[];
  projects! : ProjectsClass[];
  projectsActive : ProjectsClass[] = [];
  
  id_s: IDClass[];

  deleteForm: FormGroup;

  displayedColumns: string[] = ['rbr', 'ime','prezime' ,'projekti', 'actions2','actions'];

  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this

  listData: MatTableDataSource<any>;
  listData2: MatTableDataSource<any>;

  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;

  constructor(private httpClient: HttpClient, private _members: Members, private modalService: NgbModal, private _activity: Activities, 
    private _projects: Projects, private fb: FormBuilder, private cdr: ChangeDetectorRef, private _router: Router,
    private _id: ID, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._members.getMembers()
    .subscribe(
      data => 
      {
          this.members = data;
      }
    );

    this._members.getMembers()
    .subscribe(
      data => 
      {
        this.membersNames = this.removeDuplicates(data, "sifra");
        this.listData = new MatTableDataSource(this.membersNames);
        this.cdr.detectChanges();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
        console.log(this.listData);
      }
    );

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

    this.deleteForm = this.fb.group({
      sifra: [''],
      projekti: ['']
    });
  }

  openModal(targetModal: any, memb: any){
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'  
    });

    this.deleteForm.patchValue({
      sifra: memb.sifra,
      projekti: memb.projekt
    })
  }

  onSubmit(){
    this.modalService.dismissAll();
    console.log("res:", this.deleteForm.getRawValue());
  }

  openDialogActivities(element): void {
    const dialogRef = this.dialog.open(MemberActivityComponent, {
      disableClose: true,
      width: "60%",
      height: "auto",
      data: {
        sifra: element.sifra
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  public deleteMember(){

    this.httpClient.post('http://localhost/VUV_managment/api/obrisiClana.php',
    JSON.stringify({
      sifra: this.deleteForm.value.sifra
    })).subscribe(
      data => {
        console.log('Uspješno se izbrisali člana!')
    },
    error => {
        console.log("Došlo je do pogreške pri brisanju člana!");
    }
    );

    this.GetAllMembers();
    this.GetAllID();

    this.deleteForm.value.projekti.forEach(element => {
      this.httpClient.post('http://localhost/VUV_managment/api/azurirajProjektBezClana.php',
    JSON.stringify({
      sifra: this.deleteForm.value.sifra,
      projektSifra: element.sifra
    })).subscribe(
      data => {
        console.log('Uspješno se ažurirali projekt!')
    },
    error => {
        console.log("Došlo je do pogreške pri ažuriranju projekta!");
    }
    );
    });
  }

  //otvaranje i zatvarnje modala
  closeResult = '';
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public GetAllMembers() {
    this._members.getMembers()
    .subscribe(
      data => 
      {
        this.membersNames = this.removeDuplicates(data, "sifra");
        this.listData = new MatTableDataSource(this.membersNames);
        this.cdr.detectChanges();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
        console.log(this.listData);
      }
    );
  }

  public GetAllID() {
    this._id.getIDs()
    .subscribe(
      data => 
      {
        this.listData2 = new MatTableDataSource(data);
        this.cdr.detectChanges();
        this.listData2.paginator = this.paginator;
        this.listData2.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Broj stavki po stranici";
        console.log(this.listData2);
      }
    );
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

  public addMember(){
    this._router.navigateByUrl('/projekti_pocetna/dodaj_clana');
  }
}
