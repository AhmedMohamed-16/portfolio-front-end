import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Home as HomeServices} from '../../../core/services/home';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
logo:string='';
constructor(private _homeService:HomeServices){}
  ngOnInit(): void {
this.getHomeData();
  }

 getHomeData() {
  this._homeService.getHome().subscribe(data=>{
      this.logo = data.data.logo

  });
}


}
