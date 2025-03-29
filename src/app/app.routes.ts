// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Asegúrate de importar tu componente raíz

export const routes: Routes = [
  { path: '', component: AppComponent }, // Ruta raíz
  // { path: 'otra-ruta', component: OtroComponent } // Rutas adicionales
];