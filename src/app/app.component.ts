import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { GuardarenfermedadComponent } from "./guardarenfermedad/guardarenfermedad.component";
import { VerTablaComponent } from "./ver-tabla/ver-tabla.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CuestionarioComponent, GuardarenfermedadComponent, VerTablaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistemaMedico';
}
