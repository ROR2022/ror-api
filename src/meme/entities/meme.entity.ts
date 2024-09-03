import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type MemeDocument = HydratedDocument<Meme>;

@Schema({ timestamps: true })
export class Meme {
  @Prop({ required: true })
  topText: string;

  @Prop({ required: true })
  bottomText: string;

  @Prop({ required: true, type: mongo.ObjectId, ref: 'User' })
  author: string;

  @Prop()
  memeSVG: string;

  @Prop()
  memeURL: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MemeSchema = SchemaFactory.createForClass(Meme);

MemeSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
