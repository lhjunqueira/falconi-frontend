import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly API_BASE_URL = 'http://localhost:3000';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('http')) {
      const apiReq = req.clone({ url: `${this.API_BASE_URL}${req.url}` });

      return next.handle(apiReq);
    }

    return next.handle(req);
  }
}
