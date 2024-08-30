import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterPayload } from '@app/core/interfaces';
import { ToasterService } from '@app/core/services';
import { TOASTER_TYPES } from '@app/shared/constants';
import { showToaster } from 'src/app/app.animations';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  standalone: true,
  animations: [showToaster()],
})
export class ToasterComponent implements OnInit {
  private toasterService = inject(ToasterService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  public payload!: ToasterPayload | undefined;
  public TOASTER_TYPES = TOASTER_TYPES;

  ngOnInit() {
    this.toasterService.payload
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((payload) => {
        this.updatePayload(payload);
        setTimeout(() => {
          this.updatePayload();
        }, 3000);
      });
  }

  private updatePayload(payload?: ToasterPayload) {
    this.payload = payload;
    this.cdr.detectChanges();
  }
}
