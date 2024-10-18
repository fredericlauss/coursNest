import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body('content') content: string,
    @Body('sender') sender: string,
    @Body('roomId') roomId: string,
  ): Promise<Message> {
    return this.messageService.createMessage(content, sender, roomId);
  }

  @Get(':id')
  async getMessage(@Param('id') id: string): Promise<Message> {
    return this.messageService.getMessageById(id);
  }

  @Get()
  async getAllMessages(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Put(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body('content') content: string,
  ): Promise<Message> {
    return this.messageService.updateMessage(id, content);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string): Promise<Message> {
    return this.messageService.deleteMessage(id);
  }
}
