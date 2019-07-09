import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progress'
})
export class ProgressPipe implements PipeTransform {

  transform(values: any[], args?: any): any {
  return values.filter((item) => !item.inProgress);
  }

}
