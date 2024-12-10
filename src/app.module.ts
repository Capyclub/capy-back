import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import {UserSchema} from "./user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@127.0.0.1:27017/?authSource=capyclub',
    ),
      MongooseModule.forFeature([ {name: 'User', schema: UserSchema}]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
