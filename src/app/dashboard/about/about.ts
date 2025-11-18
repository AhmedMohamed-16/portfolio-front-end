import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { About as AboutService } from '../../core/services/about';
import { IAbout } from '../../core/models/about.model';
@Component({
  selector: 'app-about',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],

  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  showHomeForm = false
  showTechForm = false
  aboutData: any
  techsData: any
  selectedFile!:File
myFormTechs!:FormGroup;
  uploadImage(event:any){

 if(event.target.files.length > 0)
  {
             this.selectedFile= event.target.files[0];

  }

}
constructor(private _aboutService:AboutService) {
}

ngOnInit(): void {
  this._aboutService.getAbout().subscribe(res => {
    this.aboutData = res.data;
  });

  this._aboutService.getTechs().subscribe(res => {
    this.techsData = res.data;

    this.myFormTechs = new FormGroup({
      techs: new FormArray([])
    });

    this.techsData.forEach((t :{ name: string }) => {
      this.techs.push(new FormControl(t.name));
    });
  });
}

get techs() {
  return this.myFormTechs.get('techs') as FormArray;
}

addTechs() {
  this.techs.push(new FormControl(''));
}

onSubmit(form:NgForm){
 console.log(form.value);


  if(form.valid){
   const Data=new FormData()
   Data.append('header_section',form.value.header_section)
   Data.append('description_section',form.value.description_section)
   Data.append('img',this.selectedFile)
   Data.append('header',form.value.header)
   Data.append('content',form.value.content)


    console.log(form.value);
    this._aboutService.updateAbout(Data).subscribe()
  }else{
    //show error msg
  }


}
onSubmitTechs(){
  console.log(this.myFormTechs.value);
  this._aboutService.updateTechs(this.myFormTechs.value).subscribe()
}
}
