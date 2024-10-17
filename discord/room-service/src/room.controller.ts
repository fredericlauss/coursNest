import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() body: { name: string; description: string }) {
    return this.roomService.createRoom(body.name, body.description);
  }

  @Get()
  async findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  async updateRoom(
    @Param('id') id: string,
    @Body() body: { name: string; description: string }
  ) {
    return this.roomService.updateRoom(id, body.name, body.description);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomService.deleteRoom(id);
  }

  @Post(':roomId/users')
  async addUserToRoom(
    @Param('roomId') roomId: string,
    @Body() body: { userId: string }
  ) {
    return this.roomService.addUserToRoom(roomId, body.userId);
  }
}
