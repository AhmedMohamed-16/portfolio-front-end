import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project as ProjectService } from '../../core/services/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  myForm!: FormGroup;
  projectData: any[] = [];

  showProjectForm = false;
  showProjectList = false;
  // showUpdateProjectForm = false;
  updatingProjectId: string | null = null;

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.getDataProject();
this.initForm();

  }
 initForm() {
    this.myForm = new FormGroup({
      header_section: new FormControl(''),
      description_section: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      icon: new FormControl(null),
      link: new FormControl('', Validators.required),
      techs: new FormArray([new FormControl('', Validators.required)]),
    });
  }
  // ---------------------------------------------------
  // GET PROJECT DATA
  // ---------------------------------------------------
  getDataProject() {
    this._projectService.getProject().subscribe((res) => {
      this.projectData = res.projects;
      console.log(res);
      if(res.section){
        this.populateForm(res.section);
      }
    });
  }


  populateForm(data: any) {
    this.myForm.patchValue({
      header_section: data.header_section,
      description_section: data.description_section,

  });
  }
  // ---------------------------------------------------
  // GET TECHS FORM ARRAY
  // ---------------------------------------------------
  get techs(): FormArray {
    return this.myForm.get('techs') as FormArray;
  }

  addTechs() {
    this.techs.push(new FormControl('', Validators.required));
  }

  removeTech(i: number) {
    this.techs.removeAt(i);
  }

  // ---------------------------------------------------
  // UPLOAD ICON
  // ---------------------------------------------------
  onUploadIcon(event: any) {
    if (event.target.files.length > 0) {
      this.myForm.patchValue({
        icon: event.target.files[0],
      });
    }
  }

  // ---------------------------------------------------
  // CREATE PROJECT
  // ---------------------------------------------------
  onSubmit() {
    if (!this.myForm.valid) return;

    const formData = new FormData();

    formData.append('header_section', this.myForm.get('header_section')?.value);
    formData.append('description_section', this.myForm.get('description_section')?.value);
    formData.append('icon', this.myForm.get('icon')?.value);
    formData.append('title', this.myForm.get('title')?.value);
    formData.append('description', this.myForm.get('description')?.value);
    formData.append('link', this.myForm.get('link')?.value);

    // Add techs array properly
    this.techs.controls.forEach((ctrl) => {
      formData.append('techs[]', ctrl.value);
    });

    this._projectService.createProject(formData).subscribe(() => {
      this.getDataProject();
      this.initForm();
        this.showProjectForm = false;

    });
  }

  // ---------------------------------------------------
  // EDIT PROJECT
  // ---------------------------------------------------
  editProject(p: any) {
    if (!this.myForm.valid) return;

    const formData = new FormData();

    formData.append('icon', this.myForm.get('icon')?.value);
    formData.append('title', this.myForm.get('title')?.value);
    formData.append('description', this.myForm.get('description')?.value);
    formData.append('link', this.myForm.get('link')?.value);

    this.techs.controls.forEach((ctrl) => {
      formData.append('techs[]', ctrl.value);
    });

    this._projectService.updateProject(p._id, formData).subscribe(() => {
      this.getDataProject();
    });
  }

  // ---------------------------------------------------
  // DELETE PROJECT
  // ---------------------------------------------------
  deleteProject(id: string) {
    this._projectService.deleteProject(id).subscribe(() => {
      this.getDataProject();
    });
  }


  startUpdate(p: any) {
      this.updatingProjectId = p._id; // track which project is updating

  // this.showUpdateProjectForm = true;

  // Reset the whole form
  this.myForm.reset();

  // Clear the tech list FormArray
  this.techs.clear();

  // Patch main fields
  this.myForm.patchValue({
    title: p.title,
    description: p.description,
    link: p.link
    // icon: not patched because it's a File, user must upload a new one
  });

  // Load techs into the FormArray
  p.techs.forEach((t: any) => {
    this.techs.push(new FormControl(t.name));
  });

  console.log("UPDATE FORM LOADED:", this.myForm.value);
}
cancelUpdate() {
  this.updatingProjectId = null;
  this.myForm.reset();
  this.techs.clear();
}


}
