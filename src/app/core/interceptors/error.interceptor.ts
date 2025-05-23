import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido.';

        if (error.error instanceof ErrorEvent)
          errorMessage = `Erro: ${error.error.message}`;
        else errorMessage = `Erro ${error.status}: ${error.message}`;

        console.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
