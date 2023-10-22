// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class StripContextPipe implements PipeTransform {
  transform(value: any) {
    if (value.context) {
      return value.rest;
    }
    return value;
  }
}
