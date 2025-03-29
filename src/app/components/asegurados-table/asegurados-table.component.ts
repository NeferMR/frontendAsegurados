import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asegurado } from '../../models/asegurado.interface';
import { AlertComponent } from '../alert/alert.component';

/**
 * Componente que muestra la lista de asegurados en formato de tabla
 * Permite acciones de edición y eliminación
 */
@Component({
  selector: 'app-asegurados-table',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  template: `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Numero de Identificación</th>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let asegurado of data">
            <td>{{ asegurado.numeroIdentificacion }}</td>
            <td>{{ asegurado.primerNombre }} {{ asegurado.primerApellido }}</td>
            <td>{{ asegurado.telefono }}</td>
            <td>{{ asegurado.email }}</td>
            <td class="actions">
              <button class="btn-edit" (click)="onEdit.emit(asegurado)">
                ✏️ Editar
              </button>
              <button class="btn-delete" (click)="confirmarEliminar(asegurado)">
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <app-alert
      [show]="showDeleteAlert"
      [message]="'¿Está seguro que desea eliminar al asegurado ' + selectedAsegurado?.primerNombre + ' ' + selectedAsegurado?.primerApellido + '?'"
      [type]="'info'"
      [showCancel]="true"
      [confirmText]="'Eliminar'"
      (onClose)="onDeleteConfirm()"
      (onCancel)="cancelDelete()"
    ></app-alert>
  `,
  styles: `
    .table-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin: 1rem 0;
      padding: 0 1rem;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    th {
      background: #f8fafc;
      color: #2c3e50;
      font-weight: 600;
      padding: 1rem;
      text-align: left;
      border-bottom: 2px solid #e2e8f0;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      color: #4a5568;
    }

    th:last-child, td:last-child {
      padding-right: 2rem;
      width: 1%;
      white-space: nowrap;
    }

    th:first-child, td:first-child {
      padding-left: 2rem;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background-color: #f7fafc;
      transition: background-color 0.2s ease;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-edit, .btn-delete {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-edit {
      background-color: #3498db;
      color: white;
    }

    .btn-edit:hover {
      background-color: #2980b9;
      transform: translateY(-1px);
    }

    .btn-delete {
      background-color: #e74c3c;
      color: white;
    }

    .btn-delete:hover {
      background-color: #c0392b;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .table-container {
        border-radius: 0;
        box-shadow: none;
      }

      td, th {
        padding: 0.75rem;
      }

      .actions {
        flex-direction: column;
      }
    }
  `
})
export class AseguradosTableComponent {
  /** Lista de asegurados a mostrar */
  @Input() data: Asegurado[] = [];
  /** Evento emitido cuando se solicita editar un asegurado */
  @Output() onEdit = new EventEmitter<Asegurado>();
  /** Evento emitido cuando se confirma la eliminación de un asegurado */
  @Output() onDelete = new EventEmitter<Asegurado>();

  showDeleteAlert = false;
  selectedAsegurado?: Asegurado;

  /**
   * Solicita confirmación antes de emitir el evento de eliminación
   * @param asegurado Asegurado a eliminar
   */
  confirmarEliminar(asegurado: Asegurado) {
    this.selectedAsegurado = asegurado;
    this.showDeleteAlert = true;
  }

  onDeleteConfirm() {
    if (this.selectedAsegurado) {
      this.onDelete.emit(this.selectedAsegurado);
    }
    this.showDeleteAlert = false;
    this.selectedAsegurado = undefined;
  }

  cancelDelete() {
    this.showDeleteAlert = false;
    this.selectedAsegurado = undefined;
  }
}