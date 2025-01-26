import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CompressController } from './compress.controller';
import { CompressService } from './compress.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [CompressController],
  providers: [CompressService],
})
export class CompressModule {}
