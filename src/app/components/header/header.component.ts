import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <h1>🛡️ Seguros ABC</h1>
      <nav>
        <button class="nav-button">Inicio</button>
        <button class="nav-button">Reportes</button>
      </nav>
    </header>
  `,
  styles: `
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #2c3e50;
      color: white;
    }
    .nav-button {
      background: none;
      border: 1px solid white;
      color: white;
      padding: 8px 16px;
      margin-left: 10px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .nav-button:hover {
      background: white;
      color: #2c3e50;
    }
  `
})
export class HeaderComponent {}