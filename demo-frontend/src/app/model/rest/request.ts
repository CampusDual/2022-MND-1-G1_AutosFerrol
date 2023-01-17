import { Contact } from '../contact';

export class QuerySortPaginationRequest {
  query: string;
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortColumn: string;

  constructor(query: string, pageIndex: number, pageSize: number, sortDirection: string, sortColumn: string) {
    this.query = query;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortDirection = sortDirection;
    this.sortColumn = sortColumn;
  }
}

export class CreateContactRequest {
  brand: string;
  model: string;
  price: number;
  colour: string;

  constructor(contact: Contact) {
    this.brand = contact.brand;
    this.model = contact.model;
    this.price = contact.price;
    this.colour = contact.colour;
  }
}

export class EditContactRequest extends CreateContactRequest {
  id: number;

  constructor(contact: Contact) {
    super(contact);
    this.id = contact.id;
  }
}
