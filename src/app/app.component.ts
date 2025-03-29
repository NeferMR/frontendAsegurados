import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AseguradosTableComponent } from './components/asegurados-table/asegurados-table.component';
import { AseguradosService } from './services/asegurados.service';

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
        <app-asegurados-table [data]="aseguradosFiltrados"></app-asegurados-table>
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
export class AppComponent implements OnInit {
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  asegurados: any[] = [];
  aseguradosFiltrados: any[] = [];

  constructor(private aseguradosService: AseguradosService) {}

  loadAsegurados() {
    this.aseguradosService.getAsegurados().subscribe({
      next: (data) => {
        this.asegurados = data;
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        alert('Error al cargar los datos');
      }
    });
  }

  ngOnInit() {
    this.loadAsegurados();
  }

  onSearch(query: string) {
    if (!query.trim()) {
      this.aseguradosFiltrados = this.asegurados;
      return;
    }

    this.aseguradosService.searchAsegurados(query).subscribe({
      next: (data: any[]) => {
        this.aseguradosFiltrados = data;
      },
      error: (err) => console.error('Error en búsqueda:', err)
    });
  }
}