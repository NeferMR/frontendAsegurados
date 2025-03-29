import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AseguradosTableComponent } from './components/asegurados-table/asegurados-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchBarComponent,
    AseguradosTableComponent
],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main>
        <app-search-bar (search)="onSearch($event)"></app-search-bar>
        <app-asegurados-table [data]="asegurados"></app-asegurados-table>
      </main>
    </div>
  `,
  styles: `
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    main {
      margin-top: 20px;
    }
  `
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  asegurados: any[] = [];

  onSearch(query: string) {
    // Lógica de búsqueda (se implementará luego)
    console.log('Buscando:', query);
  }
}