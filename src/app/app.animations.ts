import { animate, style, transition, trigger } from '@angular/animations';

export function showToaster() {
  return trigger('showToaster', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'scale(0.7)',
      }),
      animate('0.2s ease-in'),
    ]),
    transition(':leave', [
      style({
        opacity: 0.8,
        transform: 'scale(1)',
      }),
      animate('0.2s ease-out'),
    ]),
  ]);
}
