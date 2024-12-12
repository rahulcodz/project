import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { WeaverService } from './weavers.service';
import { RegisterWeaverDto } from './dto/register-weaver.dto';
import { LoginWeaverDto } from './dto/login-weaver';

@Controller('weaver')
export class WeaverController {
  constructor(private readonly weaverService: WeaverService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  registerWeaver(@Body() weaver: RegisterWeaverDto) {
    return this.weaverService.registerWeaver(weaver);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginWeaver(@Body() login: LoginWeaverDto) {
    return this.weaverService.login(login);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getWeaver(@Param('id') id: string) {
    return this.weaverService.getWeaver(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteWeaver(@Param('id') id: string) {
    return this.weaverService.deleteWeaver(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getWeavers() {
    return this.weaverService.getWeavers();
  }
}
