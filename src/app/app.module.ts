import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { InterceptorsService } from './services/interceptors.service';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddemployeemodelComponent } from './components/addemployeemodel/addemployeemodel.component';
import { MatIconModule } from '@angular/material/icon';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';
import { AddprojectmodelComponent } from './components/addprojectmodel/addprojectmodel.component';
import { ProjectdetailsComponent } from './components/projectdetails/projectdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    EmployeesComponent,
    LoginComponent,
    PagenotfoundComponent,
    EmployeedetailsComponent,
    AddemployeemodelComponent,
    AddprojectmodelComponent,
    ProjectdetailsComponent,
    EmployeedetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
