import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { take } from 'rxjs/operators';
import { GoodreadsService } from './services/goodreads.service';
import { BookListing } from './models/book-listing.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly pageSize = 20;
  searchForm: FormGroup;
  termCtrl: FormControl;
  term = '';
  searching = false;
  paging = false;
  currentPage = 1;
  totalPages = 1;
  total = 0;
  books: BookListing[] = [];

  constructor(
    private fb: FormBuilder,
    private goodreadsService: GoodreadsService
  ) {
    this.searchForm = this.fb.group({
      term: ['', Validators.required]
    });
    this.termCtrl = this.searchForm.get('term') as FormControl;
  }

  search(): void {
    const term = this.termCtrl.value;
    if (!term) {
      return;
    }
    this.term = term;
    this.currentPage = 1;
    this.searching = true;
    this.fetchBooks();
  }

  previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage--;
    this.paging = true;
    this.fetchBooks();
  }

  nextPage(): void {
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.currentPage++;
    this.paging = true;
    this.fetchBooks();
  }

  private fetchBooks(): void {
    this.goodreadsService
      .searchBooks(this.term, this.currentPage)
      .pipe(take(1))
      .subscribe(({ total, list }) => {
        this.books = list;
        this.total = total;
        this.totalPages = Math.ceil(this.total / this.pageSize);
        this.searching = false;
        this.paging = false;
      });
  }
}
