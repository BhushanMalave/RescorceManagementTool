import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: PagenotfoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
