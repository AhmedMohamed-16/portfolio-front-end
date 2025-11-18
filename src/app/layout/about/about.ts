import { Component, NgModule, OnInit } from '@angular/core';
import{About as AboutService} from '../../core/services/about'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  AboutData:any
  paragraphs = [];
  techs=[]
constructor(private _aboutService:AboutService) {
}
  ngOnInit(): void {
   this._aboutService.getAbout().subscribe(AboutData=>{this.AboutData = AboutData.data;
    console.log(this.AboutData);
    this.paragraphs = this.AboutData.content.split("|||");
   })
   this._aboutService.getTechs().subscribe(data=>{this.techs = data.data; console.log(this.techs)})
  }

}
