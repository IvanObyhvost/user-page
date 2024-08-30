import { NgModule } from '@angular/core';
import { ForbiddenPageRoutingModule } from './forbidden-routing.module';
import { ForbiddenPage } from './page/forbidden.component';

@NgModule({
  imports: [ForbiddenPageRoutingModule],
  declarations: [ForbiddenPage],
})
export class ForbiddenPageModule {}
