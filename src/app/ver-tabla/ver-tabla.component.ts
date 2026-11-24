import { Component } from '@angular/core';
import { SistemaExpertoService } from '../sistema-experto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ver-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './ver-tabla.component.html',
  styleUrl: './ver-tabla.component.css'
})
export class VerTablaComponent {
  enfermedades: any[] = [];
  enfermedadSeleccionada: any = null;

  constructor(private sistemaExpertoService: SistemaExpertoService) {}

  ngOnInit(): void {
    this.obtenerEnfermedades();
  }

  obtenerEnfermedades(): void {
    this.sistemaExpertoService.obtenerEnfermedades().subscribe(
      (data) => {
        if (data && data.enfermedades) {
          this.enfermedades = data.enfermedades;
        } else {
          alert('No se encontraron enfermedades en la respuesta');
        }
      },
      (error) => {
        console.error('Error al obtener las enfermedades:', error);
        alert('Ocurrió un problema al cargar las enfermedades.');
      }
    );
  }

  eliminarEnfermedad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta enfermedad?')) {
      this.sistemaExpertoService.eliminarEnfermedad(id).subscribe(
        () => {
          alert('Enfermedad eliminada correctamente');
          this.obtenerEnfermedades(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar la enfermedad:', error);
          alert('No se pudo eliminar la enfermedad');
        }
      );
    }
  }

  editarEnfermedad(enfermedad: any): void {
    console.log(enfermedad)
    this.enfermedadSeleccionada = { ...enfermedad };
  }

  guardarCambios(): void {
    if (this.enfermedadSeleccionada) {
      // Convertir síntomas de cadena a lista antes de enviarlos
      const enfermedad = {
        ...this.enfermedadSeleccionada,
        sintomas: this.enfermedadSeleccionada.sintomas
          .split(',')
          .map((sintoma: string) => sintoma.trim()) // Eliminar espacios extra
      };

      this.sistemaExpertoService
        .editarEnfermedad(enfermedad.id, enfermedad)
        .subscribe(
          () => {
            alert('Enfermedad actualizada correctamente');
            this.enfermedadSeleccionada = null;
            this.obtenerEnfermedades();
          },
          (error) => {
            console.error('Error al actualizar la enfermedad:', error);
            alert('No se pudo actualizar la enfermedad');
          }
        );
    }
  }

  cancelarEdicion(): void {
    this.enfermedadSeleccionada = null;
  }
}
