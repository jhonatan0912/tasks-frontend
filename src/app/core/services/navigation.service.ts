import { Injectable, inject } from '@angular/core';
import { Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  private readonly _router = inject(Router);

  forward(url: string, queryParams?: Params[]): void {
    this._router.navigate([url], { queryParams });
  }

}
