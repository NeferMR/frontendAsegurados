import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header>
      <h1>🏥 Gestión de Asegurados</h1>
    </header>
  `,
  styles: `
    header {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      padding: 1.5rem;
      border-radius: 0 0 20px 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: white;
      margin: 0;
      font-size: 2rem;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  `
})
export class HeaderComponent {}