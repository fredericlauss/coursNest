import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async createRoom(name: string, description: string): Promise<Room> {
    const newRoom = new this.roomModel({ name, description });
    return newRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async updateRoom(id: string, name: string, description: string): Promise<Room> {
    return this.roomModel.findByIdAndUpdate(id, { name, description }, { new: true }).exec();
  }

  async deleteRoom(id: string): Promise<any> {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
