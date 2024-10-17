import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { JwtService } from '@nestjs/jwt';
  import { User, UserDocument } from '../models/user.model';
  import * as bcrypt from 'bcryptjs';

  
  @Injectable()
  export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
      ) {}
    
      async createUser(pseudo: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new this.userModel({ pseudo, password: hashedPassword });
        return newUser.save();
      }
    
      async login(pseudo: string, password: string): Promise<{ access_token: string }> {
        console.log('Tentative de connexion avec pseudo:', pseudo);
        
        const user = await this.userModel.findOne({ pseudo }).exec();
        
        if (!user) {
            console.error('Utilisateur non trouvé');
            throw new NotFoundException('Utilisateur non trouvé');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error('Mot de passe incorrect');
            throw new UnauthorizedException('Mot de passe incorrect');
        }
    
        const payload = { pseudo: user.pseudo };
        const access_token = this.jwtService.sign(payload);
        return { access_token };
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
  
    async updateUser(id: string, password: string): Promise<User> {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { password },
        { new: true },
      ).exec();
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
  
    async findByPseudo(pseudo: string): Promise<UserDocument> {
      return this.userModel.findOne({ pseudo }).exec();
    }
  
  }
  