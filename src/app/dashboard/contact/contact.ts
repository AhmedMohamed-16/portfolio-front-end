import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import{ Contact as ContactService } from '../../core/services/contact';
@Component({
  selector: 'app-contact',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  myForm!: FormGroup;
  contactsData: any[] = [];
  showContactForm = false;
  showContactList = false;
  updatingContactId: string | null = null;

previewUrl: string | null = null;

  constructor(private _contactService: ContactService) {}

  ngOnInit(): void {
    this.getDataContact();
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      header_section: new FormControl(''),
      description_section: new FormControl(''),
      contact_form: this.createContact_form(),
      contact_info: this.contact_info_form()
    });
  }

  createContact_form(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      project_type: new FormControl(''),
      message: new FormControl(''),
      send_message: new FormControl(''),
    });
  }
  contact_info_form(): FormGroup {
    return new FormGroup({
      header: new FormControl(''),
      description: new FormControl(''),
     contact_info_item: new FormArray([this.contact_info_item_form()]),
     contact_info_social_link: new FormArray([this.contact_info_social_link_form()]),
    });
  }

contact_info_item_form(): FormGroup {
    return new FormGroup({
      icon: new FormControl(''),
      header: new FormControl(''),
      description: new FormControl(''),
      type: new FormControl(''),
    });
  }
contact_info_social_link_form(): FormGroup {
    return new FormGroup({
      link: new FormControl(''),
      svg: new FormControl(''),
    });
  }


  // get contact_info(): FormArray {
  //   return this.myForm.get('contact_info') as FormArray;
  // }

  // addItems_contact_info() {
  //   this.contact_info.push(this.contact_info_form());
  // }


  get contact_info_item(): FormArray {
    return this.myForm.get('contact_info')!.get('contact_info_item') as FormArray;
  }

  addItems_contact_info_item() {
    this.contact_info_item.push(this.contact_info_item_form());
  }
  removeItems_contact_info_item(i: number) {
this.contact_info_item.removeAt(i);
  }

  get contact_info_social_link(): FormArray {
     return this.myForm.get('contact_info')!.get('contact_info_social_link') as FormArray;

  }

  addItems_info_social_link() {
    this.contact_info_social_link.push(this.contact_info_social_link_form());
  }
  removeItems_info_social_link(i: number) {
    this.contact_info_social_link.removeAt(i);
  }


// Array to hold preview URLs
iconPreviews: string[] = [];

// Update method
onUploadIcon(event: any, i: number,info: any) {
  const file = event.target.files[0];
  if (!file) return;

  // Set file inside FormGroup
  this.contact_info_item.at(i).patchValue({ icon: file });

  // Set preview in parallel array
  const reader = new FileReader();
  reader.onload = () => {
    this.iconPreviews[i] = reader.result as string;
  };
  reader.readAsDataURL(file);
}




populateForm(data: any) {

  this.myForm.patchValue({
    header_section: data.header_section,
    description_section: data.description_section,
    contact_form: data.contact_form,
    contact_info: {
      header: data.contact_info.header,
      description: data.contact_info.description
    }
  });

    // ---------------------------------------------
  // 1️⃣ Populate contact_info_item  (FormArray)
  // ---------------------------------------------
  const itemsFormArray = this.myForm.get('contact_info.contact_info_item') as FormArray;
  itemsFormArray.clear(); // remove existing rows

  data.contact_info.contact_info_item.forEach((item: any) => {
    itemsFormArray.push(
      this.contact_info_item_form()
    );
  });

  itemsFormArray.patchValue(data.contact_info.contact_info_item);



  // ---------------------------------------------
  // 2️⃣ Populate contact_info_social_link (FormArray)
  // ---------------------------------------------
  const socialFormArray = this.myForm.get('contact_info.contact_info_social_link') as FormArray;
  socialFormArray.clear();

  data.contact_info.contact_info_social_link.forEach((item: any) => {
    socialFormArray.push(
      this.contact_info_social_link_form()
    );
  });

  socialFormArray.patchValue(data.contact_info.contact_info_social_link);
}

getDataContact() {
  this._contactService.getContact().subscribe(res => {
    this.contactsData = res.data;

    if (this.contactsData) {
      this.populateForm(this.contactsData);  // ⬅️ IMPORTANT
    }

    console.log(this.contactsData);
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

  const formData = new FormData();

  formData.append('header_section', this.myForm.get('header_section')?.value);
  formData.append('description_section', this.myForm.get('description_section')?.value);

  const contactForm = this.myForm.get('contact_form')?.value;
  const contactInfo = this.myForm.get('contact_info')?.value;

  formData.append('contact_form', JSON.stringify(contactForm));
  formData.append('contact_info', JSON.stringify(contactInfo));


  const items = this.myForm.get('contact_info.contact_info_item')?.value;

  items.forEach((item: any) => {
    if (item.icon) {
      formData.append('icon', item.icon);
    }
  });


  this._contactService.createContact(formData).subscribe({
    next: (data) => {
      this.getDataContact();
      this.initForm();
      this.showContactForm = false;
      console.log("Created:", data);
    },
    error: (err) => {
      console.error("API ERROR:", err.error);
    }
  });

}


      }

