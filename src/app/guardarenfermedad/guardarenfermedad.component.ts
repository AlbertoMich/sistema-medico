import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-guardarenfermedad',
  standalone: true,
  imports: [CommonModule,  FormsModule, ],
  templateUrl: './guardarenfermedad.component.html',
  styleUrl: './guardarenfermedad.component.css'
})
export class GuardarenfermedadComponent {
  enfermedad: string = '';
  causa: string = '';
  tratamiento: string = '';
  sintomas: string[] = [];
  nuevoSintoma: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) { }

  // Método para agregar un síntoma
  agregarSintoma() {
    if (this.nuevoSintoma) {
      this.sintomas.push(this.nuevoSintoma);
      this.nuevoSintoma = '';
    }
  }



  async guardarEnfermedad() {

    if (!this.enfermedad || !this.causa || !this.tratamiento || this.sintomas.length === 0) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }


    const payload = {
      enfermedad: this.enfermedad,
      causa: this.causa,
      tratamiento: this.tratamiento,
      sintomas: this.sintomas
    };

    console.log('Payload a enviar:', payload);

    this.http.post<any>('http://localhost:8080/api/enfermedades/crear', payload).subscribe(
      (data) => {
        this.mensaje = data.mensaje || 'Enfermedad guardada con éxito.';
      },
      (error) => {
        console.error('Error al guardar la enfermedad:', error);
        this.mensaje = error.error?.mensaje || 'Error al guardar la enfermedad.';
      }
    );
  }


}
