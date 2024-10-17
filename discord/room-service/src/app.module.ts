import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './room.schema';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/discord'),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [RoomController, AppController],
  providers: [RoomService, AppService],
})
export class AppModule {}
