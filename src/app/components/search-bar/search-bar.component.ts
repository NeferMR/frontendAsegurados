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
    </div>
  `,
  styles: `
    .search-container {
      margin-bottom: 1.5rem;
    }

    input {
      width: 100%;
      padding: 0.8rem 1.2rem;
      border: 2px solid #e2e8f0;
      border-radius: 50px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }

    input::placeholder {
      color: #a0aec0;
    }
  `
})
export class SearchBarComponent {
  private searchSubject = new Subject<string>();
  @Output() search = new EventEmitter<string>();
  searchQuery = '';

  constructor() {
    this.searchSubject.pipe(
      debounceTime(800),
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
}