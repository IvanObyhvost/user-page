import { Injectable } from '@angular/core';
import { ToasterPayload } from '@app/core/interfaces';
import { TOASTER_TYPES } from '@app/shared/constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private payload$ = new Subject<ToasterPayload>();
  public get payload() {
    return this.payload$.asObservable();
  }
  public showToaster(type: TOASTER_TYPES, message: string) {
    this.payload$.next({ type, message });
  }
}
