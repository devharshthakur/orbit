import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompressModule } from './compress/compress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CompressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
