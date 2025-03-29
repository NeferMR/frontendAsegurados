import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
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
  searchQuery = '';
  @Output() search = new EventEmitter<string>();

  onInputChange() {
    this.search.emit(this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.search.emit('');
  }
}