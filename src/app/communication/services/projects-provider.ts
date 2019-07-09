import { IProject } from '../models/project';
import { Provider } from './provider';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';

export abstract class ProjectsProvider extends Provider<IProject> {

}
