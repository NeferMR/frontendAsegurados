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
      min-height: 100vh;
      background-color: #f8fafc;
    }

    main {
      margin-top: 2rem;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      gap: 1rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    @media (max-width: 768px) {
      .controls {
        flex-direction: column;
      }

      .btn-primary {
        width: 100%;
        justify-content: center;
      }
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
