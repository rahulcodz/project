import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WeaverDocument = Weaver & Document;

@Schema({
  timestamps: true,
})
export class Weaver {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const WeaverSchema = SchemaFactory.createForClass(Weaver);
