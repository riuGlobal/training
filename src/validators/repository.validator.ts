import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

@Injectable()
export class ExistsRecord<E> implements PipeTransform<number | string, Promise<string | number>> {
  constructor (
    private entity: any
  ) {}

  async transform (id: number | string, { metatype }: ArgumentMetadata): Promise<string | number> {
    const record: E = await getRepository<E>(this.entity).findOne(id);
    if (!record || !id) {
      throw new BadRequestException('Validation failed');
    }
    return id;
  }
}

@Injectable()
export class UidSecurity implements PipeTransform<any, any> {
  async transform (identifiable : Record<string, unknown>): Promise<any> {
    if (identifiable.uid) {
      throw new BadRequestException('Do not send uid in body');
    }
    return identifiable;
  }
}
