import { Component } from '@angular/core';
import { SistemaExpertoService } from '../sistema-experto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent {
  sintomas: string[] = []; // Lista de síntomas obtenidos
  seleccionados: boolean[] = []; // Estado de selección de cada síntoma
  respuestas: string[] = []; // Síntomas seleccionados
  resultado: any = null; // Resultado del diagnóstico

  constructor(private sistemaExpertoService: SistemaExpertoService) {}

  ngOnInit(): void {
    this.obtenerSintomas();
  }

  obtenerSintomas(): void {
    this.sistemaExpertoService.obtenerEnfermedades().subscribe(
      (data: any) => {
        console.log(data);
        if (data && data.enfermedades && Array.isArray(data.enfermedades)) {
          // Inicializar síntomas y su estado de selección
          this.sintomas = data.enfermedades
            .map((enfermedad: any) => enfermedad.sintomas)
            .flat();
          this.seleccionados = new Array(this.sintomas.length).fill(false);
        } else {
          console.error('La respuesta no contiene un array de enfermedades o el formato es incorrecto:', data);
        }
      },
      (error) => {
        console.error('Error al obtener enfermedades:', error);
      }
    );
  }

  enviarRespuestas(): void {
    // Filtrar los síntomas seleccionados
    this.respuestas = this.sintomas.filter((_, index) => this.seleccionados[index]);
    console.log('Respuestas seleccionadas:', this.respuestas);
  
    // Enviar las respuestas seleccionadas al backend
    this.sistemaExpertoService.obtenerDiagnostico(this.respuestas).subscribe(
      (data: any) => {
        this.resultado = data;
        console.log('Resultado del diagnóstico:', data);
      },
      (error) => {
        console.error('Error al obtener el diagnóstico:', error);
      }
    );
  }
}
