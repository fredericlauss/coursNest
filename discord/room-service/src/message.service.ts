import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(content: string, sender: string, roomId: string): Promise<Message> {
    const newMessage = new this.messageModel({ content, sender, roomId });
    return newMessage.save();
  }

  async getMessageById(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
    }
    return message;
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async updateMessage(id: string, content: string): Promise<Message> {
    const updatedMessage = await this.messageModel.findByIdAndUpdate(
      id,
      { content },
      { new: true },
    ).exec();
    if (!updatedMessage) {
      throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
    }
    return updatedMessage;
  }

  async deleteMessage(id: string): Promise<Message> {
    const deletedMessage = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deletedMessage) {
      throw new NotFoundException(`Message avec l'ID ${id} non trouvé`);
    }
    return deletedMessage;
  }
}
