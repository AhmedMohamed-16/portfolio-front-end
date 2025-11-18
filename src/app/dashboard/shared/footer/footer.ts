import { Component, OnInit } from '@angular/core';
import{ Footer as FooterService } from '../../../core/services/footer';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  myForm!: FormGroup;
  footerData: any[] = [];
  showFooterForm = false;
  constructor(private _footerService: FooterService) {}

  ngOnInit(): void {
    this.getDataFooter();
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      description: new FormControl(''),
      links: new FormArray([this.links_form()]),
    });
  }

links_form(): FormGroup {
    return new FormGroup({
      url: new FormControl(''),
      name: new FormControl(''),
      _id: new FormControl(''),

    });
  }


  // get contact_info(): FormArray {
  //   return this.myForm.get('contact_info') as FormArray;
  // }

  // addItems_contact_info() {
  //   this.contact_info.push(this.contact_info_form());
  // }


  get links(): FormArray {
    return this.myForm.get('links') as FormArray;
  }

  addLink() {
    this.links.push(this.links_form());
  }
  removeLink(i: number) {
this.links.removeAt(i);
  }




populateForm(data: any) {

  this.myForm.patchValue({
    description: data.description,

  });

    // ---------------------------------------------
  // 1️⃣ Populate contact_info_item  (FormArray)
  // ---------------------------------------------
  const linksFormArray = this.myForm.get('links') as FormArray;
  linksFormArray.clear(); // remove existing rows

  data.links.forEach((item: any) => {
    linksFormArray.push(
      this.links_form()
    );
  });

  linksFormArray.patchValue(data.links);



  // ---------------------------------------------
  // 2️⃣ Populate contact_info_social_link (FormArray)
  // ---------------------------------------------
  // const socialFormArray = this.myForm.get('contact_info.contact_info_social_link') as FormArray;
  // socialFormArray.clear();

  // data.contact_info.contact_info_social_link.forEach((item: any) => {
  //   socialFormArray.push(
  //     this.contact_info_social_link_form()
  //   );
  // });

  // socialFormArray.patchValue(data.contact_info.contact_info_social_link);
}

getDataFooter() {
  this._footerService.getFooter().subscribe(res => {
    this.footerData = res.data;

    if (this.footerData) {
      this.populateForm(this.footerData);  // ⬅️ IMPORTANT
    }

    console.log(this.footerData);
  });
}

  // startUpdate(skill: any) {
  //   this.updatingContactId = skill._id;
  //   this.myForm.reset();
  //   this.contact_info.clear();

  //   this.myForm.patchValue({ name: skill.name });

  //   skill.items.forEach((item: any) => {
  //     this.contact_info.push(
  //       new FormGroup({
  //         name: new FormControl(item.name),
  //         experience_years: new FormControl(item.experience_years),
  //         progress_percent: new FormControl(item.progress_percent)
  //       })
  //     );
  //   });
  // }

  // cancelUpdate() {
  //   this.updatingContactId = null;
  //   this.initForm();
  // }



onSubmit() {

  if (!this.myForm.valid) return;

      const data = {
        description: this.myForm.value.description,
        links: this.links.value.map((link: any) => ({
          name: link.name,
          url: link.url,

        }))
      };
      this._footerService.createFooter(data).subscribe(() => {
        this.getDataFooter();
        this.initForm();
        this.showFooterForm = false;
         console.log("Created:", data);
      });


  // this._footerService.createFooter(formData).subscribe({
  //   next: (data) => {
  //     this.getDataContact();
  //     this.initForm();
  //     this.showContactForm = false;
  //     console.log("Created:", data);
  //   },
  //   error: (err) => {
  //     console.error("API ERROR:", err.error);
  //   }
  // });

}
 deleteLink(link:any) {
  if (!link) return;

  this._footerService.deleteLink(link.value._id).subscribe(data=>{
    console.log(data);
      this.getDataFooter();
  });
}
}

