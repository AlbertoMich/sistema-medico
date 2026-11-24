import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemaExpertoService {


  private baseUrl: string = 'http://localhost:8080/api/enfermedades';

  constructor(private http: HttpClient) { }


  obtenerEnfermedades(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  crearEnfermedad(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/crear`, payload);
  }


  obtenerDiagnostico(respuestas: String[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/diagnostico`, respuestas);
  }

  eliminarEnfermedad(id: number) {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }

  editarEnfermedad(id: number, enfermedad: any) {
    return this.http.put(`${this.baseUrl}/editar/${id}`, enfermedad);
  }
}
