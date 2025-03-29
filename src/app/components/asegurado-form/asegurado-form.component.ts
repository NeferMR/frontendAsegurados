import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AseguradosService } from '../../services/asegurados.service';
import { Asegurado } from '../../models/asegurado.interface';

/**
 * Componente para crear y editar asegurados
 * Maneja un formulario reactivo con validaciones
 */
@Component({
  selector: 'app-asegurado-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <h2 *ngIf="!aseguradoToEdit">➕ Nuevo Asegurado</h2>
      <h2 *ngIf="aseguradoToEdit">✏️ Editar Asegurado</h2>
      
      <div class="form-group">
        <label>Número de Identificación</label>
        <input type="number" formControlName="numeroIdentificacion">
        <div *ngIf="form.get('numeroIdentificacion')?.invalid && form.get('numeroIdentificacion')?.touched" class="error">
          Campo requerido (solo números)
        </div>
      </div>

      <div class="form-group">
        <label>Primer Nombre</label>
        <input type="text" formControlName="primerNombre">
        <div *ngIf="form.get('primerNombre')?.invalid && form.get('primerNombre')?.touched" class="error">
          Campo requerido
        </div>
      </div>

      <div class="form-group">
        <label>Segundo Nombre (Opcional)</label>
        <input type="text" formControlName="segundoNombre">
      </div>

      <div class="form-group">
        <label>Primer Apellido</label>
        <input type="text" formControlName="primerApellido">
        <div *ngIf="form.get('primerApellido')?.invalid && form.get('primerApellido')?.touched" class="error">
          Campo requerido
        </div>
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
        <div *ngIf="form.get('telefono')?.invalid && form.get('telefono')?.touched" class="error">
          Campo requerido (10 dígitos)
        </div>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" formControlName="email">
        <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="error">
          Email inválido
        </div>
      </div>

      <div class="form-group">
        <label>Fecha de Nacimiento</label>
        <input type="date" formControlName="fechaNacimiento">
        <div *ngIf="form.get('fechaNacimiento')?.invalid && form.get('fechaNacimiento')?.touched" class="error">
          Campo requerido
        </div>
      </div>

      <div class="form-group">
        <label>Valor del Seguro</label>
        <input type="number" formControlName="valorSeguro">
        <div *ngIf="form.get('valorSeguro')?.invalid && form.get('valorSeguro')?.touched" class="error">
          Valor inválido (debe ser mayor a 0)
        </div>
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

export class AseguradoFormComponent implements OnInit {
  /** Asegurado a editar (undefined si es creación) */
  @Input() aseguradoToEdit?: Asegurado;
  /** Evento emitido cuando se cancela el formulario */
  @Output() formCancel = new EventEmitter<void>();
  /** Evento emitido cuando se guarda exitosamente */
  @Output() formSubmit = new EventEmitter<void>();

  /** Formulario reactivo para los datos del asegurado */
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private aseguradosService: AseguradosService
  ) {
    this.initForm();
  }

  /**
   * Inicializa el formulario con validaciones
   * @private
   */
  private initForm() {
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

  /**
   * Si hay un asegurado para editar, carga sus datos en el formulario
   */
  ngOnInit() {
    if (this.aseguradoToEdit) {
      this.form.patchValue(this.aseguradoToEdit);
    }
  }

  /**
   * Maneja el envío del formulario
   * Crea o actualiza el asegurado según corresponda
   */
  onSubmit() {
    if (this.form.valid) {
      const request = this.aseguradoToEdit
        ? this.aseguradosService.updateAsegurado(this.aseguradoToEdit.numeroIdentificacion, this.form.value)
        : this.aseguradosService.createAsegurado(this.form.value);

      request.subscribe({
        next: () => {
          alert(this.aseguradoToEdit 
            ? '¡Asegurado actualizado exitosamente!' 
            : '¡Asegurado creado exitosamente!');
          this.form.reset();
          this.formSubmit.emit();
        },
        error: () => alert('Error al guardar el asegurado')
      });
    }
  }

  /**
   * Reinicia el formulario y emite evento de cancelación
   */
  cancelar() {
    this.form.reset();
    this.formCancel.emit();
  }
}