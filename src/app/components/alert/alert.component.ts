import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="alert-overlay">
      <div class="alert-container" [class]="type">
        <div class="alert-content">
          <div class="alert-icon">
            {{ type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️' }}
          </div>
          <p class="alert-message">{{ message }}</p>
          <div class="alert-buttons">
            <button *ngIf="showCancel" class="alert-button cancel" (click)="onCancel.emit()">Cancelar</button>
            <button class="alert-button" (click)="onClose.emit()">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .alert-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
      animation: slideIn 0.3s ease-out;
    }

    .alert-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
    }

    .alert-icon {
      font-size: 2rem;
    }

    .alert-message {
      margin: 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    .alert-buttons {
      display: flex;
      gap: 1rem;
    }

    .alert-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .alert-button:hover {
      background: #2980b9;
      transform: translateY(-1px);
    }

    .success .alert-button {
      background: #2ecc71;
    }

    .success .alert-button:hover {
      background: #27ae60;
    }

    .error .alert-button {
      background: #e74c3c;
    }

    .error .alert-button:hover {
      background: #c0392b;
    }

    .alert-button.cancel {
      background: #95a5a6;
    }

    .alert-button.cancel:hover {
      background: #7f8c8d;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `
})
export class AlertComponent {
  @Input() show = false;
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() showCancel = false;
  @Input() confirmText = 'Aceptar';
  @Output() onClose = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}
