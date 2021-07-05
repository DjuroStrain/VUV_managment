import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { loginClass } from './components/loginClass';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path: 'projekti_pocetna',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
      path: '**',
      redirectTo: 'projekti_pocetna',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
