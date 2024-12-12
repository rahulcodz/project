import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeaverController } from './weavers.controller';
import { WeaverService } from './weavers.service';
import { Weaver, WeaverSchema } from './schemas/weaver.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXP_TIME },
    }),
    MongooseModule.forFeature([{ name: Weaver.name, schema: WeaverSchema }]),
  ],
  controllers: [WeaverController],
  providers: [WeaverService],
  exports: [WeaverService],
})
export class WeaverModule {}
