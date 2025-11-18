import { Component, OnInit } from '@angular/core';
import { Home as HomeService } from '../../core/services/home';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IHome } from '../../core/models/home.model';
@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  showHomeForm = false
  homeData: any
constructor(private _homeService:HomeService) {
}
  ngOnInit(): void {
   this._homeService.getHome().subscribe(HomeData=>{this.homeData = HomeData.data;
    console.log(this.homeData);
   })
  }


// updateHomeSection(){
// console.log(this.homeData);
// }
onSubmit(form:NgForm){
 console.log(form.value);

  if(form.valid){
    //call api
    console.log(form.value as IHome);
    this._homeService.updateHome(form.value as IHome).subscribe()


  }else{
    //show error msg
  }
}

}
