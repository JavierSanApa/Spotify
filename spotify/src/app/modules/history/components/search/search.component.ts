import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  src: string = '';

  callSearch(term: string): void {
    if (term.length >= 1) {
      this.searchEmitter.emit(term);
    }
  }
}