import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WeaverDocument = Weaver & Document;

@Schema({
  timestamps: true,
})
export class Weaver {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  profile: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  description: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const WeaverSchema = SchemaFactory.createForClass(Weaver);
