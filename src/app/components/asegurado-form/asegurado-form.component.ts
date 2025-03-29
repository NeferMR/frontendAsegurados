import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AseguradosService } from '../../services/asegurados.service';

@Component({
  selector: 'app-asegurado-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <h2>➕ Nuevo Asegurado</h2>
      
      <div class="form-group">
        <label>Número de Identificación</label>
        <input type="number" formControlName="numeroIdentificacion">
        <div *ngIf="form.get('numeroIdentificacion')?.invalid" class="error">
          Campo requerido (solo números)
        </div>
      </div>

      <div class="form-group">
        <label>Primer Nombre</label>
        <input type="text" formControlName="primerNombre">
      </div>

      <div class="form-group">
        <label>Segundo Nombre (Opcional)</label>
        <input type="text" formControlName="segundoNombre">
      </div>

      <div class="form-group">
        <label>Primer Apellido</label>
        <input type="text" formControlName="primerApellido">
      </div>

      <div class="form-group">
        <label>Segundo Apellido</label>
        <input type="text" formControlName="segundoApellido">
        <div *ngIf="form.get('segundoApellido')?.invalid && form.get('segundoApellido')?.touched" class="error">
          Campo requerido
        </div>
      </div>

      <div class="form-group">
        <label>Teléfono</label>
        <input type="tel" formControlName="telefono">
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" formControlName="email">
      </div>

      <div class="form-group">
        <label>Fecha de Nacimiento</label>
        <input type="date" formControlName="fechaNacimiento">
      </div>

      <div class="form-group">
        <label>Valor del Seguro</label>
        <input type="number" formControlName="valorSeguro">
      </div>

      <div class="form-actions">
        <button type="button" (click)="cancelar()">Cancelar</button>
        <button type="submit" [disabled]="!form.valid">Guardar</button>
      </div>
    </form>
  `,
  styles: `
    .form-container {
      background: #ffffff;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: 2rem auto;
    }

    h2 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1.8rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #34495e;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }

    input:focus {
      outline: none;
      border-color: #3498db;
    }

    .error {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    button[type="submit"] {
      background-color: #2ecc71;
      color: white;
    }

    button[type="submit"]:hover {
      background-color: #27ae60;
    }

    button[type="submit"]:disabled {
      background-color: #95a5a6;
      cursor: not-allowed;
    }

    button[type="button"] {
      background-color: #e74c3c;
      color: white;
    }

    button[type="button"]:hover {
      background-color: #c0392b;
    }

    /* Estilo para campos inválidos */
    input.ng-invalid.ng-touched {
      border-color: #e74c3c;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .form-container {
        margin: 1rem;
        padding: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `
})

export class AseguradoFormComponent {
  @Output() formCancel = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<void>();

  form;

  constructor(
    private fb: FormBuilder,
    private aseguradosService: AseguradosService
  ) {
    this.form = this.fb.group({
      numeroIdentificacion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      valorSeguro: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.aseguradosService.createAsegurado(this.form.value).subscribe({
        next: () => {
          alert('¡Asegurado creado exitosamente!');
          this.form.reset();
          this.formSubmit.emit();
        },
        error: () => alert('Error al crear el asegurado')
      });
    }
  }

  cancelar() {
    this.form.reset();
    this.formCancel.emit();
  }
}