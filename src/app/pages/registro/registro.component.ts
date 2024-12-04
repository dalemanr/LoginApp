import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/Usuario';

@Component({
  selector: 'app-registro',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuild.group({
    username:['', Validators.required],
    password: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['']
  });

  public register(){
    if(this.formRegister.invalid) return;

    const object:Usuario = {
      nombre: this.formRegister.value.nombre,
      apellido: this.formRegister.value.apellido,
      email: this.formRegister.value.email,
      username: this.formRegister.value.username,
      password: this.formRegister.value.password,
      telefono: this.formRegister.value.telefono
    }

    this.accessService.registrarse(object).subscribe({
      next: (data)=>{
        this.router.navigate(['inicio']);
        alert("Usuario Registrado con exito");
      }, error:(error) =>{
        alert('Error al registrar el nuevo usuario, por favor intente nuevamente')
        console.log(error.message);
      }
    });

  }

  back(){
    this.router.navigate([''])
  }

}
