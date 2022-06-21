import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http';
import { filter, tap } from "rxjs";
import { Observable } from "rxjs";
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // MOdify or log the outgoing request
        const modifiedReq = req.clone({
            withCredentials: true,
        });
        return next.handle(modifiedReq)
            .pipe(
                filter(val => val.type === HttpEventType.Sent),
                tap(val => {
                    console.log('Sent the request')
                })
            );
    }
}
