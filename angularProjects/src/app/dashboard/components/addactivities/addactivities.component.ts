import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Projects } from '../../services/projects.service';
import { ProjectsClass } from '../../classes/projectsClass';
import { activityClass } from '../../classes/activityClass';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addactivities',
  templateUrl: './addactivities.component.html',
  styleUrls: ['./addactivities.component.scss']
})
export class AddactivitiesComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _projects: Projects, private httpClient: HttpClient, private _router: Router) { }
  public addmore: FormGroup;
  faTrash = faTrash;
  faPlus = faPlus;
  projects: ProjectsClass[];
  projectsActive = [];
  Activity: activityClass[] = [];

  themeColor: 'primary' | 'accent' | 'warn' = 'primary';

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
  	  projekt: ['', [Validators.required]],
      itemRows: this._fb.array([this.initItemRows()])
    });
  }

  get formArr() {
    return this.addmore.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
    naziv:['', [Validators.required]],
    opis:['', [Validators.required]],
    vrijeme:['', [Validators.required]],
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
 

  public addActivity(){
    let activityStatus = true;
    if(confirm("Jeste li sigurni da želite dodati aktivnost?"))
    {
      this.addmore.value.itemRows.forEach(element => {
        this.httpClient.post('http://localhost/VUV_managment/api/kreirajAktivnost.php',
              JSON.stringify({
                naziv: element.naziv,
                opis: element.opis,
                vrijeme: element.vrijeme,
                status: activityStatus,
                projektSifra: this.addmore.value.projekt
              })).subscribe(
                data => {
                  console.log('Uspješno ste kreirali aktivnost!')
                },
                error => {
                  console.log('greska');
                }
            )
      });
      this._router.navigateByUrl('/projekti_pocetna/aktivnosti'); 
    }
  }
}
