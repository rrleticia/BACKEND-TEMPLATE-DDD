import { Module } from '@nestjs/common';
import { PwnedService } from './pwned.service';

@Module({
  controllers: [],
  providers: [PwnedService],
  exports: [PwnedService],
})
export class PwnedModule {}
