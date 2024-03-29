import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/services/contact.service';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  idContact: number;

  ocultar =  false;
  contactForm: FormGroup;
  contact: Contact;
  errores: string[];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    public authService: AuthService
  ) {
    this.contact = new Contact();
  }

  ngOnInit() {
    this.createFormGroup();
    this.idContact = this.route.snapshot.params['id'];
    if (this.idContact) {
      this.contactService.getContact(this.idContact).subscribe(
        response => {
          this.contact = response;
          this.contactForm.patchValue(this.contact, { emitEvent: false, onlySelf: false });
          this.logger.info(this.contact);
        }
      );
    }
  }



  onFormChanges() {
    this.contactForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.contactForm = this.fb.group({
      id: [this.contact.id],
      brand: [this.contact.brand],
      model: [this.contact.model],
      price: [this.contact.price],
      colour: [this.contact.colour],
    });
  }

  save() {
    const newContact: Contact = Object.assign({}, this.contactForm.value);
    if (newContact.id) {
      this.contactService.editContact(newContact).subscribe((response) =>{
        this.redirectList(response);
      });
    } else {
      this.contactService.createContact(newContact).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/contacts']);
    }else{
      console.log(response);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigate(['/contacts']);
  }

  public isAuthenticated() {
    
    //return this.authService.getRoles().some(authoritie => allowedRoles.indexOf(authoritie) > -1);
    if(this.authService.isLoggedIn()){
    const a = this.authService.getRoles();
    if (!a.includes("ADMIN")){
      return false;
    }
  }
    return this.authService.isLoggedIn();
  }
}
