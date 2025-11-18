import { Component } from '@angular/core';
import { Footer as FooterService } from '../../../core/services/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
footerData:any=[];
constructor(private _footerService:FooterService){}
  ngOnInit(): void {
this.getFooterData();
  }

 getFooterData() {
  this._footerService.getFooter().subscribe(data=>{
      this.footerData = data.data
console.log(this.footerData);
  });
}

}
