import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type ResenaDocument = HydratedDocument<Resena>;

@Schema({ timestamps: true })
export class Resena {
  @Prop({ required: true, type: mongo.ObjectId, ref: 'User' })
  idUsuario: string;

  @Prop({ required: true })
  calificacion: number;

  @Prop({ required: true })
  resena: string;

  @Prop()
  siteResena: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ResenaSchema = SchemaFactory.createForClass(Resena);

ResenaSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
