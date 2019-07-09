import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '../translate.service';
import { TranslateServerLoaderService } from './translate-server-loader.service';

export function translateFactory(transferState: TransferState): TranslateServerLoaderService {
    return new TranslateServerLoaderService('./dist/assets/i18n', '.json', transferState);
}

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory,
                deps: [TransferState],
            },
        }),
    ],
    providers: [TranslateService],
})
export class TranslateServerModule {
}
