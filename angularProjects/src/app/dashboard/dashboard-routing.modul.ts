import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ActivityComponent } from './components/activity/activity.component';
import { MembersComponent } from './components/members/members.component';
import { AddactivitiesComponent } from './components/addactivities/addactivities.component';
import { AddmembersComponent } from './components/addmembers/addmembers.component';
const routes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: 'projekti',
                component: ProjectsComponent
            },
            {
                path: 'aktivnosti',
                component: ActivityComponent
            },
            {
                path: 'clanovi',
                component: MembersComponent
            },
            {
                path: 'dodaj_aktivnost',
                component: AddactivitiesComponent
            },
            {
                path: 'dodaj_clana',
                component: AddmembersComponent
            }

        ]
    },
    {
        path: '**',
        redirectTo: '   ',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
