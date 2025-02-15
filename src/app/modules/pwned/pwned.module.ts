import { Module } from '@nestjs/common';
import { PwnedService } from './pwned.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PwnedService],
})
export class PwnedModule {}
