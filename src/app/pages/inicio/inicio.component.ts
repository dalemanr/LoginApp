import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-inicio',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  productos = [
    { id: 1, nombre: 'Producto 1', precio: 100, descripcion: 'Descripción del Producto 1' },
    { id: 2, nombre: 'Producto 2', precio: 200, descripcion: 'Descripción del Producto 2' },
    { id: 3, nombre: 'Producto 3', precio: 300, descripcion: 'Descripción del Producto 3' },
    { id: 4, nombre: 'Producto 4', precio: 400, descripcion: 'Descripción del Producto 4' },
  ];

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'descripcion'];
  
}
