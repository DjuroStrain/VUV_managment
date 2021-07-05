import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';
import { Members } from '../../services/members.service';
import { membersClass } from '../../classes/membersClass';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.component.html',
  styleUrls: ['./addmembers.component.scss']
})
export class AddmembersComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _projects: Projects, private httpClient: HttpClient, private _router: Router,
    private _members: Members) { }

 public addmore: FormGroup;
  faTrash = faTrash;
  faPlus = faPlus;
  projects: ProjectsClass[];
  projectsActive = [];
  memebrs: membersClass[];
  membersNames: membersClass[];

  ngOnInit() {

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

  	this.addmore = this._fb.group({
  	  projekt: [''],
      itemRows: this._fb.array([this.initItemRows()])
    });
  }
  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
    ime:['', [Validators.required]],
    prezime:['', [Validators.required]],
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  submit(){
    console.log(this.addmore.value);

    this.addmore.value.itemRows.forEach(element => {
      console.log(element.ime);
    });
  }

  public addMember(){

    if(confirm("Jeste li sigurni da želite dodati člana?"))
    {
      this.addmore.value.itemRows.forEach(element => {
        this.httpClient.post('http://localhost/VUV_managment/api/kreirajClana.php',
        JSON.stringify({
          ime: element.ime,
          prezime: element.prezime,
          projektSifra: this.addmore.value.projekt,
          voditelj: false
        })).subscribe(
              data => {
                  console.log('Uspješno se kreirali člana!')
              },
              error => {
                  console.log("Došlo je do pogreške pri kreiranju člana!");
              }
            );
      });
      this._router.navigateByUrl('/projekti_pocetna/clanovi'); 
    }
  }
}
