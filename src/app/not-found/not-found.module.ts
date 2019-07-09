import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutes } from './not-found.routing';

@NgModule({
    imports: [CommonModule, NotFoundRoutes, TranslateModule],
    declarations: [NotFoundComponent],
})
export class NotFoundModule {
}
