import { Component, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Home as HomeService } from '../../core/services/home';
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  HomeData:any
constructor(private _homeService:HomeService) {
}
  ngOnInit(): void {
   this._homeService.getHome().subscribe(HomeData=>{this.HomeData = HomeData.data;
    console.log(this.HomeData);
   })
  }

}
