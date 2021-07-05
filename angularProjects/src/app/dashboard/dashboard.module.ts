import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projects } from './services/projects.service';
import { Activities } from './services/activity.service';
import { Members } from './services/members.service';
import { Locations } from './services/location.service';
import { DashboardRoutingModule } from './dashboard-routing.modul';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ActivityComponent } from './components/activity/activity.component';
import { MatSidenavModule   } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AddactivitiesComponent } from './components/addactivities/addactivities.component'  
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MembersComponent } from './components/members/members.component';
import { AddmembersComponent } from './components/addmembers/addmembers.component';
import { AddprojectComponent } from './components/addproject/addproject.component';
import { FormsModule } from '@angular/forms';
import { EditprojectComponent } from './components/editproject/editproject.component';
import { MembersOnly } from './services/memebrsOnly.service';
import { EditactivityComponent } from './components/editactivity/editactivity.component';
import { ID } from './services/id.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MemberActivityComponent } from './components/member-activity/member-activity.component';

@NgModule({
  declarations: [WrapperComponent, ProjectsComponent, ActivityComponent, AddactivitiesComponent,
     MembersComponent, AddmembersComponent, AddprojectComponent, EditprojectComponent, EditactivityComponent, MemberActivityComponent],
  imports: [
    CommonModule, 
    DashboardRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FontAwesomeModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [Projects, Members, Locations, Activities, ActivityComponent, ProjectsComponent ,AddprojectComponent, EditprojectComponent ,
  {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}, MembersOnly, ID],
  entryComponents:[]
})
export class DashboardModule { }
