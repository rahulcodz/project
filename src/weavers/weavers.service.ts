import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Weaver, WeaverDocument } from './schemas/weaver.schema';
import { Model } from 'mongoose';

@Injectable()
export class WeaverService {
  findAll() {
    throw new NotFoundException('Method not implemented.');
  }
  constructor(@InjectModel(Weaver.name) private readonly userModel: Model<WeaverDocument>) {}

  //   async findAll() {
  //     return 'asdasd';
  //   }
}
