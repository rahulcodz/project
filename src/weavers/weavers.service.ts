import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Weaver, WeaverDocument } from './schemas/weaver.schema';
import { Model } from 'mongoose';
import { RegisterWeaverDto } from './dto/register-weaver.dto';
import { LoginWeaverDto } from './dto/login-weaver';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WeaverService {
  constructor(
    @InjectModel(Weaver.name) private readonly weaverModel: Model<WeaverDocument>,
    private readonly jwtService: JwtService,
  ) {}

  findAll() {
    throw new NotFoundException('Method not implemented.');
  }

  async registerWeaver(weaver: RegisterWeaverDto) {
    try {
      const hashedPassword = await bcrypt.hash(weaver.password, 10);
      const newWeaver = new this.weaverModel({
        ...weaver,
        password: hashedPassword,
        userName: weaver.userName,
      });
      await newWeaver.save();
      return newWeaver;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async login(login: LoginWeaverDto) {
    try {
      const { email, password } = login;
      const weaver = await this.weaverModel.findOne({ email, isDeleted: false }).exec();
      if (!weaver) {
        throw new NotFoundException('Invalid Email');
      }
      const isPasswordValid = await bcrypt.compare(password, weaver.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid Password');
      }
      const token_payload = { userId: weaver.id };
      const token = this.jwtService.sign(token_payload, { secret: process.env.JWT_SECRET_KEY });

      const payload = {
        access_token: token,
        userName: weaver.userName,
        userId: weaver.id,
        name: weaver.name,
      };
      return payload;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getWeaver(id: string) {
    try {
      const weaver = await this.weaverModel
        .findOne({ _id: id, isDeleted: false })
        .select('email userName name createdAt updatedAt')
        .exec();

      if (!weaver) {
        throw new NotFoundException('No Data Found!');
      }
      return weaver;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getWeavers() {
    try {
      const weaver = await this.weaverModel
        .find({ isDeleted: false })
        .select('email userName name')
        .exec();

      return weaver;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteWeaver(id: string) {
    try {
      const weaver = await this.weaverModel.findOne({ _id: id, isDeleted: false }).exec();

      if (!weaver) {
        throw new NotFoundException('Weaver not found or already deleted.');
      }

      // Soft delete by setting isDeleted to true
      weaver.isDeleted = true;
      await weaver.save(); // Save the updated document

      return { message: 'Weaver successfully deleted.' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
