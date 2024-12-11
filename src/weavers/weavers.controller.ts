import { All, Controller, Get, NotFoundException } from '@nestjs/common';
import { WeaverService } from './weavers.service';

@Controller('weaver')
export class WeaverController {
  constructor(private readonly weaverService: WeaverService) {}

  @Get()
  findAll() {
    return this.weaverService.findAll();
  }
}
