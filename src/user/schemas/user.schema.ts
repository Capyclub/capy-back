import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  first_name: string;

  @Prop({ required: true, unique: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postal_code: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Prop({ required: true })
  date_of_birth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
