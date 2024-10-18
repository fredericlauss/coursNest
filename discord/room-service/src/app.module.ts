import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.schema';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { Message, MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/discord'),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    HttpModule, 
  ],
  controllers: [RoomController, AppController, MessageController],
  providers: [RoomService, AppService, MessageService],
})
export class AppModule {}
