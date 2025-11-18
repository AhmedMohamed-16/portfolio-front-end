import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Skills as SkillsService } from '../../core/services/skills';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrls: ['./skills.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class Skills implements OnInit {
  myForm!: FormGroup;
  skillsData: any[] = [];
  showSkillForm = false;
  showSkillList = false;
  updatingSkillId: string | null = null;

  constructor(private _skillsService: SkillsService) {}

  ngOnInit(): void {
    this.getDataSkills();
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
        header_section: new FormControl(''),
      description_section: new FormControl(''),

      name: new FormControl(''),
      skillItems: new FormArray([this.createSkillItem()])
    });
  }

  createSkillItem(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      experience_years: new FormControl(null),
      progress_percent: new FormControl(null)
    });
  }

  get skillItems(): FormArray {
    return this.myForm.get('skillItems') as FormArray;
  }

  addItems() {
    this.skillItems.push(this.createSkillItem());
  }

  getDataSkills() {
    this._skillsService.getSkill().subscribe(res => {
      this.skillsData = res.data;
      console.log(this.skillsData);
      if(res.data){
       const secData = this.skillsData.slice().reverse().find((skill: any) => skill.header_section !== undefined && skill.description_section !== undefined);
        console.log(secData);
        this.populateForm(secData);

      }
    });
  }
  populateForm(data: any) {
    this.myForm.patchValue({
      header_section: data.header_section,
      description_section: data.description_section,

  });
  }
  startUpdate(skill: any) {
    this.updatingSkillId = skill._id;
    this.myForm.reset();
    this.skillItems.clear();

    this.myForm.patchValue({ name: skill.name });

    skill.items.forEach((item: any) => {
      this.skillItems.push(
        new FormGroup({
          name: new FormControl(item.name),
          experience_years: new FormControl(item.experience_years),
          progress_percent: new FormControl(item.progress_percent)
        })
      );
    });
  }

  cancelUpdate() {
    this.updatingSkillId = null;
    this.initForm();
  }

  onSubmit() {
    if (this.myForm.valid) {
      const data = {
        header_section: this.myForm.value.header_section,
        description_section: this.myForm.value.description_section,
        name: this.myForm.value.name,
        skillItems: this.skillItems.value
      };
      console.log('data',data);
      this._skillsService.createSkill(data).subscribe(() => {
        this.getDataSkills();
        this.initForm();
        this.showSkillForm = false;
        console.log("Created:", data);
      });
    }
  }

  editSkill(skill: any) {
    if (this.myForm.valid) {
      const data = {
        name: this.myForm.value.name,
        skillItems: this.skillItems.value
      };
      this._skillsService.updateSkill(skill._id, data).subscribe(() => {
        this.getDataSkills();
        this.cancelUpdate();
      });
    }
  }

  deleteSkill(id: string) {
    this._skillsService.deleteSkill(id).subscribe(() => this.getDataSkills());
  }
}
