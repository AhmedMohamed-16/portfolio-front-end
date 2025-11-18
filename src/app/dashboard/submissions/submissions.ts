import { Component, OnInit } from '@angular/core';
import{ Submissions as SubmissionsService} from '../../core/services/submissions';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-submissions',
  imports: [CommonModule],
  templateUrl: './submissions.html',
  styleUrl: './submissions.css',
})
export class Submissions implements OnInit {
  SubmissionsData: any ;
constructor(private _submissionsService:SubmissionsService) {}
ngOnInit() {
     this._submissionsService.getSubmissions().subscribe((res) => {
    this.SubmissionsData = res.data;
    console.log(res.data);
  })
}

}
