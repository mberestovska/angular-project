import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateBrowserModule } from './translate/translate-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StateTransferInitializerModule } from '@nguniversal/common';
// import { ServiceWorkerModule } from '@angular/service-worker';

// the Request object only lives on the server
export function getRequest(): any {
    return { headers: { cookie: document.cookie } };
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        AppModule,
        StateTransferInitializerModule,
        BrowserTransferStateModule,
        TranslateBrowserModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: false }),
    ],
    providers: [
        {
            // The server provides these in main.server
            provide: REQUEST,
            useFactory: getRequest,
        },
        { provide: 'ORIGIN_URL', useValue: location.origin },
    ],
})
export class AppBrowserModule {
}
