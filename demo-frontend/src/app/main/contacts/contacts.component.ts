import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, fromEvent, Observable, Observer } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { AnyPageFilter, AnyField, SortFilter } from 'src/app/model/rest/filter';
import { TranslateService } from '@ngx-translate/core';
import { ContactDataSource } from '../../model/datasource/contacts.datasource';
import { Contact } from '../../model/contact';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  // selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, AfterViewInit {
  dataSource: ContactDataSource;
  displayedColumns = [
    'select',
    'brand',
    'model',
    'price',
    'colour',
  ];
  fields = ['brand', 'model', 'price', 'colour'];

  selection = new SelectionModel<Contact>(true, []);
  error = false;

  @ViewChild('edit') editTemplate: any;
  highlightedRow: Contact;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private contactService: ContactService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.dataSource = new ContactDataSource(this.contactService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'brand'
    );
    this.dataSource.getContacts(pageFilter);
  }

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadContactsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.selection.clear();
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadContactsPage();
        })
      )
      .subscribe();
  }

  loadContactsPage() {
    this.selection.clear();
    this.error = false;
    const pageFilter = new AnyPageFilter(
      this.input.nativeElement.value,
      this.fields.map((field) => new AnyField(field)),
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    pageFilter.order = [];
    pageFilter.order.push(
      new SortFilter(this.sort.active, this.sort.direction.toString())
    );
    this.dataSource.getContacts(pageFilter);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.contactsSubject.value.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.contactsSubject.value.forEach((row) =>
          this.selection.select(row)
        );
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-element-confirmation'),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
        return new Observable((observer: Observer<boolean>) =>
          observer.next(true)
        );
      } else {
        return new Observable((observer: Observer<boolean>) =>
          observer.next(false)
        );
      }
    });
  }

  delete() {
    const contact = this.selection.selected[0];
    this.selection.deselect(contact);
    if (this.selection.selected && this.selection.selected.length === 0) {
      this.contactService.deleteContact(contact.id).subscribe((response) => {
        console.log(response)
        if (response.responseCode !== 'OK') {
           this.error = true;
         } else {
          this.loadContactsPage();
         }
      });
    } else {
      this.contactService.deleteContact(contact.id).subscribe((response) => {
        console.log(response);
        if (response.responseCode !== 'OK') {
           this.error = true;
        }
        this.delete();
      });
    }
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

  onAdd() {
    
    this.router.navigate(['/catalogo/add']);
  }
  
  iniciar() {
    
    this.router.navigate(['/']);
  }

  onEdit(row: Contact) {
    this.highlightedRow = row;
    if(this.isAuthenticated){
    this.router.navigate(['/catalogo/edit/' + row.id]);
    }
    
  }
}