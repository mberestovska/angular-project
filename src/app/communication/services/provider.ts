import { Observable } from 'rxjs';
import { IIdObject } from '../models/id.object';

export type ExcludeId<T> = {
    [P in Exclude<keyof T, keyof IIdObject>]: T[P]
};

export abstract class Provider<T extends IIdObject> {
    abstract getItemById(id): Observable<T>;

    abstract createItem(item: ExcludeId<T>): Observable<T>;

    abstract updateItem(item: T): Observable<T>;

    abstract deleteItem(id: number): Observable<boolean>;

    abstract getItems(): Observable<T[]>;
}
