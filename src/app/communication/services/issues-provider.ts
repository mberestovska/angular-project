import { IIssue } from '../models/issue';
import { Provider } from './provider';
import { Observable } from 'rxjs';

export abstract class IssuesProvider extends Provider<IIssue> {
    abstract getItems(projectId?: number): Observable<IIssue[]>;

    abstract getItemById(id: number, projectId?: number): Observable<IIssue>;


    abstract  deleteItem(id: number, projectId?: number): Observable<boolean>;


    abstract deleteItem(id: number, projectId?: number): Observable<boolean>;
}

