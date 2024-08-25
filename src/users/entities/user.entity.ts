import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { listRoles } from 'src/lib/dataGlobal';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';
//import { IsStrongPassword } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @IsString()
  @Prop({ required: true })
  username: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Prop({ required: true })
  password: string;

  @IsString()
  @Prop({ default: 'guest', enum: [...listRoles] })
  role: string;

  @IsBoolean()
  @Prop({ default: false })
  active: boolean;

  @Prop()
  avatar: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
