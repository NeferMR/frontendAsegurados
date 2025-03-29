import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asegurados-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
              <button class="delete-btn">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .table-container {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .edit-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 5px 10px;
      margin-right: 5px;
      border-radius: 3px;
      cursor: pointer;
    }
    .delete-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }
    .btn-edit {
      background: #3498db;
      color: white;
      border: none;
      padding: 5px 10px;
      margin-right: 5px;
      border-radius: 3px;
      cursor: pointer;
    }
  `
})
export class AseguradosTableComponent {
  @Input() data: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
}