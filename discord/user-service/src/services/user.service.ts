import { Injectable, NotFoundException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(pseudo: Types.ObjectId, password: number): Promise<User> {
    const newUser = new this.userModel({ pseudo, password });
    return newUser.save();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();  
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(id: string, password: number): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { password }, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return deletedUser;
  }
}
