import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeaverController } from './weavers.controller';
import { WeaverService } from './weavers.service';
import { Weaver } from './schemas/weaver.schema';
import { UserSchema } from '@/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Weaver.name, schema: UserSchema }])],
  controllers: [WeaverController],
  providers: [WeaverService],
  exports: [WeaverService],
})

export class WeaverModule {}
