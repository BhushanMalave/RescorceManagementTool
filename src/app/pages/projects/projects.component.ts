import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projectName: string = '';
  projectlist: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  deg = ['a', 'b', 'c'];
  addNewProject!: FormGroup;
  showModel: boolean = false;
  ngOnInit() {
    this.addNewProject = new FormGroup({
      name: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    console.log(this.addNewProject.value);
    this.addNewProject.reset();
    this.showModel = false;
  }
  handleChange(event: string): void {
    console.log(event);
  }
}
