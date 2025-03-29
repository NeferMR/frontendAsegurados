import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asegurado } from '../models/asegurado.interface';

/**
 * Servicio que maneja todas las operaciones CRUD para los asegurados
 */
@Injectable({
  providedIn: 'root'
})
export class AseguradosService {
  /** URL base de la API de asegurados */
  private apiUrl = 'http://localhost:5277/api/asegurados';

  // Inyecta HttpClient en el constructor
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de asegurados
   * @returns Observable con el array de asegurados
   */
  getAsegurados() {
    return this.http.get<Asegurado[]>(this.apiUrl);
  }

  /**
   * Busca asegurados según un criterio de búsqueda
   * @param query Término de búsqueda
   * @returns Observable con los asegurados que coinciden con la búsqueda
   */
  searchAsegurados(query: string) {
    return this.http.get<Asegurado[]>(`${this.apiUrl}/search?query=${query}`);
  }

  /**
   * Crea un nuevo asegurado
   * @param asegurado Datos del nuevo asegurado (sin número de identificación)
   * @returns Observable con el asegurado creado
   */
  createAsegurado(asegurado: Omit<Asegurado, 'numeroIdentificacion'>) {
    return this.http.post<Asegurado>(this.apiUrl, asegurado);
  }

  /**
   * Actualiza un asegurado existente
   * @param id Número de identificación del asegurado
   * @param asegurado Datos parciales o completos del asegurado a actualizar
   * @returns Observable con el asegurado actualizado
   */
  updateAsegurado(id: number, asegurado: Partial<Asegurado>) {
    return this.http.put<Asegurado>(`${this.apiUrl}/${id}`, asegurado);
  }

  /**
   * Elimina un asegurado
   * @param id Número de identificación del asegurado a eliminar
   * @returns Observable vacío que confirma la eliminación
   */
  deleteAsegurado(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}