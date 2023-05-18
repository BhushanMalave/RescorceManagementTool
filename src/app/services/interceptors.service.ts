import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class InterceptorsService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedRequest = req.clone({
      headers: req.headers.append('x-api-key', 'secrt-dev-1505'),
    });
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          //   console.log(event.body);
        }
      })
    );
  }
}
