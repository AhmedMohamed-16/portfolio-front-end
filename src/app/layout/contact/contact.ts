import { Component } from '@angular/core';

import { Contact as ContactService } from '../../core/services/contact';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
 ContactData:any
constructor(private _contactService:ContactService) {
}
  ngOnInit(): void {
   this._contactService.getContact().subscribe(ContactData=>{this.ContactData = ContactData.data;
    console.log(this.ContactData);
   })
  }

  onSubmit(form:NgForm){
 console.log(form.value);

  if(form.valid){
    //call api
    console.log(form.value);
    this._contactService.createContactForm(form.value).subscribe(data=>console.log(data))

    form.reset();
    form.resetForm();
  }else{
    //show error msg
  }
}
}
