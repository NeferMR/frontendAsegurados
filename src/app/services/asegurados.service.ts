import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AseguradosService {
  private apiUrl = 'http://localhost:5277/api/asegurados';

  // Inyecta HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Método para obtener todos los asegurados
  getAsegurados() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para buscar asegurados por ID parcial
  searchAsegurados(query: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`);
  }

  // Método para crear un nuevo asegurado
  createAsegurado(asegurado: any) {
    return this.http.post(this.apiUrl, asegurado);
  }

  // Método para actualizar un asegurado
  updateAsegurado(id: number, asegurado: any) {
    return this.http.put(`${this.apiUrl}/${id}`, asegurado);
  }

  // Método para eliminar un asegurado
  deleteAsegurado(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}