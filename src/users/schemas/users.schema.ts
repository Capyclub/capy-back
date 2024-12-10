import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  password: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
