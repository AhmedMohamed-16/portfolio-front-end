import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Home } from '../../../core/services/home';
import { IHome } from '../../../core/models/home.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
logo:string='';
constructor(private _homeService:Home){}
  ngOnInit(): void {
this.getHomeData();
  }

 getHomeData() {
  this._homeService.getHome().subscribe(data=>{
      this.logo = data.data.logo
      
  });
}


}
