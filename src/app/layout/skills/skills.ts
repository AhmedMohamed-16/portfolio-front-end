import { Component } from '@angular/core';
import { Skills as SkillsService } from '../../core/services/skills';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  skills: any = [];
  lastSkillWithSection: any = {};
 constructor(private _skillsService: SkillsService) {}

  ngOnInit(): void {
    this._skillsService.getSkill().subscribe(data => {
      this.skills = data.data;
      this.lastSkillWithSection=this.skills.slice().reverse().find((skill: any) => skill.header_section !== undefined && skill.description_section !== undefined);

      console.log(data);

    });
  }
}
