import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-editactivity',
  templateUrl: './editactivity.component.html',
  styleUrls: ['./editactivity.component.scss']
})
export class EditactivityComponent implements OnInit {

  public editActivityForm: FormGroup;
  public control: FormControl;
  actRes: any;

  constructor(public dialogRef: MatDialogRef<EditactivityComponent>, private fb: FormBuilder, 
    private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) 
    { 
      this.actRes = data;
    }

  ngOnInit(): void {

    this.control = this.fb.control('', Validators.required);

    this.editActivityForm = this.fb.group({
      sifra: [''],
      naziv: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      vrijeme: ['', [Validators.required, Validators.max(5000), Validators.min(1)]],
      projektSifra: [''],
      status: ['', [Validators.required]]
    })

    this.editActivityForm.patchValue({
      sifra: this.actRes.sifra,
      naziv: this.actRes.naziv,
      opis: this.actRes.opis,
      vrijeme: this.actRes.vrijeme,
      status: this.actRes.status,
      projektSifra: this.actRes.projektSifra
    })

  }

  public editActivity(){
    let activityStatus = (<HTMLInputElement>document.getElementById("activityStatus")).value;
    if(confirm("Jeste li sigurni da želite urediti aktivnost?"))
    {
      if(activityStatus == "Aktivan")
    {
      
      this.httpClient.put('http://localhost/VUV_managment/api/azurirajAktivnost.php',
      JSON.stringify({
        naziv: this.editActivityForm.value.naziv,
        opis: this.editActivityForm.value.opis,
        vrijeme: this.editActivityForm.value.vrijeme,
        projektSifra: this.editActivityForm.value.projektSifra,
        status: true,
        sifra: this.editActivityForm.value.sifra
      })).subscribe(
        data => {
          console.log('Uspješno se ažurirali aktivnost!')
        },
        error => {
          console.log("Došlo je do pogreške pri ažuriranju aktivnosti!");
        }
      )
    }
    else
    {
      this.httpClient.put('http://localhost/VUV_managment/api/azurirajAktivnost.php',
      JSON.stringify({
        naziv: this.editActivityForm.value.naziv,
        opis: this.editActivityForm.value.opis,
        vrijeme: this.editActivityForm.value.vrijeme,
        projektSifra: this.editActivityForm.value.projektSifra,
        status: false,
        sifra: this.editActivityForm.value.sifra
      })).subscribe(
        data => {
          console.log('Uspješno se kreirali aktivnost!')
        },
        error => {
          console.log("Došlo je do pogreške pri kreiranju aktivnosti!");
        }
      )
    }

    this.dialogRef.close();
    }
    
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  public changeActivity()
  {
    let statusActivity = (<HTMLInputElement>document.getElementById("activityStatus")).value;

    if(statusActivity == "Aktivan")
    { 
      (<HTMLInputElement>document.getElementById("activityStatus")).value = "Neaktivan";
    }
    else
    {
      (<HTMLInputElement>document.getElementById("activityStatus")).value = "Aktivan";
    }
  }

}
