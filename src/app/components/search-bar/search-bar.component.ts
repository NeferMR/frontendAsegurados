import { Component, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <input 
        type="text" 
        [(ngModel)]="searchQuery"
        (ngModelChange)="onInputChange()"
        placeholder="🔍 Buscar por ID..."
      >
      <button (click)="clearSearch()">❌</button>
    </div>
  `,
  styles: `
    .search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0 15px;
      border-radius: 4px;
      cursor: pointer;
    }
  `
})
export class SearchBarComponent {
  private searchSubject = new Subject<string>();
  @Output() search = new EventEmitter<string>();
  searchQuery = '';

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => this.search.emit(query));
  }

  onInputChange() {
    this.search.emit(this.searchQuery);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }

  clearSearch() {
    this.searchQuery = '';
    this.search.emit('');
  }
}