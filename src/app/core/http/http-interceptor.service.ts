import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BASE_REQUEST_URL } from 'src/app/app.config';

export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      url: this.resolveUrl(request.url)
    });
    return next.handle(modifiedRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            return event;
          }
        },
        (errorResponse: any) => {
          if (errorResponse instanceof HttpErrorResponse) {
            const errorMessage = errorResponse.error.message;
            return throwError(errorMessage);
          }
        }
      )
    );
  }

  private resolveUrl(url: string): string {
    return `${BASE_REQUEST_URL}${url}`;
  }
}
