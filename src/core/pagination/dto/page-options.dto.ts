import { IsInt, IsOptional, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOrder } from '@common/enums/pagination-order.enum';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: PaginationOrder, default: PaginationOrder.ASC })
  @IsEnum(PaginationOrder)
  @IsOptional()
  readonly order?: PaginationOrder = PaginationOrder.ASC;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  readonly page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  readonly limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

