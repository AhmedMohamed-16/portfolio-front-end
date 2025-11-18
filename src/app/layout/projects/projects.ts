import { Component, OnInit } from '@angular/core';
import { Project as ProjectService } from '../../core/services/project';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  section: any = null;
  projects: any[] = [];

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this._projectService.getProject().subscribe(data => {
      console.log(data);

      this.section = data.section;
      this.projects = data.projects;
    });
  }

}
