import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { split } from 'ts-node';

@Injectable()
export class StringToNumbersArrayPipe implements PipeTransform {
  async transform (value: string):Promise<number[] | undefined> {
    return value ? split(value).map(Number) : undefined;
  }
}
