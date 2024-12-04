import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccessService } from '../services/access.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem("token") ||"";
  const router = inject(Router);

  const accessService = inject(AccessService);

  if(accessService.isAuthenticated()){
    return accessService.validateToken().pipe(
      map(isValid =>{
        if (isValid){
          return true;
        }else{
          router.navigateByUrl("");
          return false;
        } 
      }),
      catchError(()=>{
        router.navigateByUrl("");
        return of(false);
      })

    );
  }else{
    router.navigateByUrl("");
    return false;
  }
  
};
