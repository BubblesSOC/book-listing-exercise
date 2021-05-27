import { Component, OnInit, Input } from '@angular/core';
import { BookListing } from 'src/app/models/book-listing.model';

@Component({
  selector: 'book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent implements OnInit {
  authorName = '';
  title = '';
  imageUrl = '';

  @Input()
  set book({ authorName, title, imageUrl }: BookListing) {
    this.authorName = authorName;
    this.title = title;
    this.imageUrl = imageUrl;
  }

  constructor() {}

  ngOnInit(): void {}
}
