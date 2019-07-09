import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILang, TranslateService } from '../translate';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    public langList$: Observable<ILang[]>;
    public currentLang: string;

    constructor(private _translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.langList$ = this._translateService.getLangList();
        this.currentLang = this._translateService.getCurrentLang();
    }

    public changeLang(code: string): void {
        this._translateService.changeLang(code);
    }
}
