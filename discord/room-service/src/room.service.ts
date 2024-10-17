import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  private httpService: HttpService
) {}

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
    const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
    if (!deletedRoom) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return deletedRoom;
  }

  async addUserToRoom(roomId: string, userId: string): Promise<Room> {
    const room = await this.roomModel.findById(roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    // Vérifier si l'utilisateur existe
    const userExists = await this.checkIfUserExists(userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Ajouter l'utilisateur à la room si ce n'est pas déjà le cas
    if (!room.members.includes(userId)) {
      room.members.push(userId);
    }

    return room.save();
  }

  private async checkIfUserExists(userId: string): Promise<boolean> {
    try {
      const response = await this.httpService.get(`http://user-service:5252/users/${userId}`).toPromise(); // Convertir l'observable en promesse
      console.log("response", response.data);
      return !!response.data;
    } catch (error) {
      console.error("Error checking user existence:", error.message);
      return false;
    }
  }
  
}
