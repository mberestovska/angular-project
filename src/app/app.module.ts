import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule, CookieService, TransferHttpModule } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateService } from './translate';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { UniversalStorage } from './storage/universal.storage';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService as NGXTranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LANG_LIST } from './translate/translate.service';

export function metaFactory(translate: NGXTranslateService): MetaLoader {
    return new MetaStaticLoader({
        callback: (key: string): Observable<string | Object> => translate.get(key),
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        pageTitleSeparator: ' | ',
        applicationName: 'App Universal',
        defaults: {
            title: 'Default page title',
            description: 'Default description',
            'og:site_name': 'App site Universal',
            'og:type': 'website',
            'og:locale': 'ru_RU',
            'og:locale:alternate': LANG_LIST
                .map((lang: any) => lang.culture)
                .toString(),
        },
    });
}

export function initLanguage(translateService: TranslateService): Function {
    return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        MetaModule.forRoot({
            provide: MetaLoader,
            useFactory: metaFactory,
            deps: [NGXTranslateService],
        }),
        TransferHttpCacheModule,
        TransferHttpModule,
        HttpClientModule,
        RouterModule,
        AppRoutes,
        BrowserAnimationsModule,
        CookieModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [
        CookieService,
        UniversalStorage,
        { provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [TranslateService] },
    ],
})
export class AppModule {
}
