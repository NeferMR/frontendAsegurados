import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AseguradosTableComponent } from './components/asegurados-table/asegurados-table.component';
import { AseguradosService } from './services/asegurados.service';
import { AseguradoFormComponent } from './components/asegurado-form/asegurado-form.component';
import { CommonModule } from '@angular/common';
import { Asegurado } from './models/asegurado.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, 
    SearchBarComponent, 
    AseguradosTableComponent,
    AseguradoFormComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main>
        <div class="controls">
          <app-search-bar *ngIf="!showForm" (search)="onSearch($event)"></app-search-bar>
          <button class="btn-primary" (click)="toggleView()">
            {{ showForm ? '← Volver a la lista' : '➕ Nuevo Asegurado' }}
          </button>
        </div>

        <app-asegurado-form 
          *ngIf="showForm"
          [aseguradoToEdit]="aseguradoToEdit"
          (formCancel)="toggleView()" 
          (formSubmit)="onAseguradoCreated()"
        ></app-asegurado-form>

        <app-asegurados-table
          *ngIf="!showForm"
          [data]="aseguradosFiltrados"
          (onEdit)="onEditAsegurado($event)"
          (onDelete)="onDeleteAsegurado($event)"
        ></app-asegurados-table>
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
    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
  `,
})
export class AppComponent implements OnInit {
  showForm = false;
  aseguradoToEdit?: Asegurado;

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  asegurados: Asegurado[] = [];
  aseguradosFiltrados: Asegurado[] = [];

  constructor(private aseguradosService: AseguradosService) {}

  loadAsegurados() {
    this.aseguradosService.getAsegurados().subscribe({
      next: (data) => {
        this.asegurados = data;
        this.aseguradosFiltrados = data;
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        alert('Error al cargar los datos');
      },
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
      error: (err) => console.error('Error en búsqueda:', err),
    });
  }

  onEditAsegurado(asegurado: Asegurado) {
    this.aseguradoToEdit = asegurado;
    this.showForm = true;
  }

  toggleView() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.aseguradoToEdit = undefined;
    }
  }

  onAseguradoCreated() {
    this.loadAsegurados();
    this.toggleView();
  }

  onDeleteAsegurado(asegurado: Asegurado) {
    this.aseguradosService.deleteAsegurado(asegurado.numeroIdentificacion).subscribe({
      next: () => {
        alert('Asegurado eliminado exitosamente');
        this.loadAsegurados();
      },
      error: () => alert('Error al eliminar el asegurado')
    });
  }
}
