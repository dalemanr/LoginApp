import { Component, inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { error } from 'console';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    username:['', Validators.required],
    password:['', Validators.required]
  });

  login(){
    if(this.formLogin.invalid) return;

    const object:Login={
      username : this.formLogin.value.username,
      password : this.formLogin.value.password,
    }

    this.accessService.login(object).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          localStorage.setItem("token", data.token);
          this.router.navigate(['inicio']);
        }
      }, 
      error:(error) =>{
        if (error.status === 401){
          alert("Credenciales incorrectas");
        }else{
          console.log('error inesperado', error);
          alert("Ocurrio un error inesperado, intenta nuevamente");
        }
      }
    });
  }

  formRegister(){                                           
    this.router.navigate(['registro'])
  }

}
