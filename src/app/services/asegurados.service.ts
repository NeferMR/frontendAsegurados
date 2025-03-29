import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asegurado } from '../models/asegurado.interface';

@Injectable({
  providedIn: 'root'
})
export class AseguradosService {
  private apiUrl = 'http://localhost:5277/api/asegurados';

  // Inyecta HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Método para obtener todos los asegurados
  getAsegurados() {
    return this.http.get<Asegurado[]>(this.apiUrl);
  }

  // Método para buscar asegurados por ID parcial
  searchAsegurados(query: string) {
    return this.http.get<Asegurado[]>(`${this.apiUrl}/search?query=${query}`);
  }

  // Método para crear un nuevo asegurado
  createAsegurado(asegurado: Omit<Asegurado, 'numeroIdentificacion'>) {
    return this.http.post<Asegurado>(this.apiUrl, asegurado);
  }

  // Método para actualizar un asegurado
  updateAsegurado(id: number, asegurado: Partial<Asegurado>) {
    return this.http.put<Asegurado>(`${this.apiUrl}/${id}`, asegurado);
  }

  // Método para eliminar un asegurado
  deleteAsegurado(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}