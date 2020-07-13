import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

// Refactor this ina pipes folder and using classes and extension

type ExistanceInfo = {
  exists: boolean;
  isSoftDeleted: boolean;
}

const existanceInfo = async <E>(entity: any, id: string | number): Promise<ExistanceInfo> => {
  const repository = await getRepository<E>(entity);
  const queryRunner = repository.manager.connection.createQueryRunner();
  await queryRunner.startTransaction();
  const record: E = await queryRunner.manager.findOne(entity, id);
  const { raw } = await queryRunner.manager.restore(entity, id);
  await queryRunner.rollbackTransaction();
  await queryRunner.release();

  const exists = !!record || raw.affectedRows;
  const isSoftDeleted = !record && !!raw.affectedRows;

  return { exists, isSoftDeleted };
};

@Injectable()
export class ActiveRecordExists<E> implements PipeTransform<number | string, Promise<string | number>> {
  constructor (
    private entity: any
  ) {}

  async transform (id: number | string, { metatype }: ArgumentMetadata): Promise<string | number> {
    const { exists, isSoftDeleted } = await existanceInfo<E>(this.entity, id);
    if (!exists) {
      throw new BadRequestException('Validation failed. Record does not exist. Neither active nor inactive');
    } else if (isSoftDeleted) {
      throw new BadRequestException('Validation failed. Record is inactive');
    }

    return id;
  }
}

@Injectable()
export class RecordDoesNotExist<E> implements PipeTransform<number | string, Promise<string | number>> {
  constructor (
    private entity: any
  ) {}

  async transform (id: number | string, { metatype }: ArgumentMetadata): Promise<string | number> {
    const { exists, isSoftDeleted } = await existanceInfo<E>(this.entity, id);
    if (exists) {
      const message = 'Validation Failed. Record exists. ' +
        (isSoftDeleted ? 'Is inactive' : 'Is active');
      throw new BadRequestException(message);
    }
    return id;
  }
}

@Injectable()
export class InactiveRecordExists<E> implements PipeTransform<number | string, Promise<string | number>> {
  constructor (
    private entity: any
  ) {}

  async transform (id: number | string, { metatype }: ArgumentMetadata): Promise<string | number> {
    const { exists, isSoftDeleted } = await existanceInfo<E>(this.entity, id);
    if (!exists) {
      throw new BadRequestException('Validation Failed. Record doesn\'t exist ');
    } else if (!isSoftDeleted) {
      throw new BadRequestException('Validation Failed. Record is Active ');
    }

    return id;
  }
}

@Injectable()
export class UidSecurity implements PipeTransform<any, any> {
  async transform (identifiable : Record<string, unknown>, metadata: ArgumentMetadata): Promise<any> {
    if (
        identifiable?.uid ||
        (metadata.type !== 'custom' && metadata.data === 'uid')
    ) {
      throw new BadRequestException('Security issue: Do not take uid in body, as query parameter or as path parameter. Only in Header ');
    }
    return identifiable;
  }
}
