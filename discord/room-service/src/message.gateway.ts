import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from 'src/message.service';
  import { UseGuards } from '@nestjs/common';
  
  @WebSocketGateway({
    cors: {
      origin: 'http://localhost:5252',
      credentials: true,
    },
  })
  export class MessageGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private messageService: MessageService) {}
  
    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string) {
      client.join(room);
      client.emit('message', `You have joined room ${room}`);
    }
  
    // @SubscribeMessage('message')
    // handleMessage(client: Socket, payload: CreateMessageDto) {
    //   this.messageService.createMessage(payload).then((res) => {
    //     this.server.to(payload.roomId).emit(payload.roomId, res);
    //   });
    // }
  
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: string) {
      client.leave(room);
      client.emit('message', `You have left room ${room}`);
    }
  }