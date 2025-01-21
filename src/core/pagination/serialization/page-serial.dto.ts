import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PageMetaDto } from '../dto';

export class PageSerialDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto, type?: new (...args: any[]) => T) {
    this.data = type ? plainToInstance(type, data) : data;
    this.meta = meta;
  }
}
