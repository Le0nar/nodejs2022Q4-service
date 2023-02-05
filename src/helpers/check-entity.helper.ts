import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate as validateUUID } from 'uuid';

// TODO: rename it
export const checkEntity = (entity: any, entityName: string, id: string) => {
  const isIdValid = validateUUID(id);

  if (!isIdValid) {
    throw new BadRequestException(`${entityName} id is invalid (not uuid)`);
  }

  if (!entity) {
    throw new NotFoundException(`${entityName} doesn't exist`);
  }
};
