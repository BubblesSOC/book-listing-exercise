import { BookListing } from './book-listing.model';

export interface GoodreadsResult {
  list: BookListing[];
  total: number;
}
