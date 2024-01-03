import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // This code will run for every http request
    console.log('Request is on its way');
    // Lest the requets continue

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'token'),
    });
    return next.handle(modifiedRequest);
  }
}
