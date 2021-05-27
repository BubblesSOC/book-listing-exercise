import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoodreadsResult } from '../models/goodreads-result.model';

@Injectable({
  providedIn: 'root'
})
export class GoodreadsService {
  private readonly apiUrl =
    'https://goodreads-server-express--dotdash.repl.co/search';

  constructor(private httpClient: HttpClient) {}

  public searchBooks(term: string, page?: number): Observable<GoodreadsResult> {
    let url = `${this.apiUrl}/${term}`;
    if (page) {
      url = `${url}?page=${page}`;
    }
    return this.httpClient.get<GoodreadsResult>(url);
  }
}
