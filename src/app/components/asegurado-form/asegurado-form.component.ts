// components/asegurado-form/asegurado-form.component.ts
import { FormBuilder, Validators } from '@angular/forms';
import { AseguradosService } from '../../services/asegurados.service';

export class AseguradoFormComponent {
  form;

  constructor(private fb: FormBuilder, private aseguradosService: AseguradosService) {
    this.form = this.fb.group({
      numeroIdentificacion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      primerNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      valorSeguro: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.aseguradosService.createAsegurado(this.form.value).subscribe({
        next: () => alert('Asegurado creado!'),
        error: () => alert('Error al crear')
      });
    }
  }
}