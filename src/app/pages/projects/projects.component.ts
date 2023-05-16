import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projectData: any;
  projectName: string = '';
  projectlist: any = [];
  filterlist: any = [];
  deg = ['a', 'b', 'c'];
  addNewProject!: FormGroup;
  showModel: boolean = false;

  constructor(public apiServices: ApiService) {}
  ngOnInit() {
    this.getData();
    this.addNewProject = new FormGroup({
      name: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }

  getData() {
    this.apiServices.getProjectsData().subscribe((responseData) => {
      this.projectlist = responseData;
      this.filterlist = this.projectlist;
      this.projectData = this.filterlist[0];
    });
  }
  onSubmit() {
    console.log(this.addNewProject.value);
    this.apiServices
      .postProjectsData(this.addNewProject.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.addNewProject.reset();
    this.showModel = false;
    this.getData();
  }
  handleChange(event: string): void {
    // console.log(event);
    this.filterlist = this.projectlist.filter((item) =>
      item.name.toLowerCase().includes(event.toLocaleLowerCase())
    );
  }
}
