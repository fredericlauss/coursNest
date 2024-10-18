import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { JwtService } from '@nestjs/jwt';
  import { UnauthorizedException } from '@nestjs/common';
  
  @WebSocketGateway({ cors: true })
  export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private readonly jwtService: JwtService) {}
  
    // Gestion de la connexion WebSocket
    async handleConnection(client: Socket) {
      try {
        const token = client.handshake.auth.token;
  
        if (!token) {
          throw new UnauthorizedException('Token manquant');
        }
  
        // Validation du token JWT
        const payload = this.jwtService.verify(token);
  
        console.log('Connexion WebSocket valide:', payload);
  
        // Si la connexion est valide, on peut associer l'utilisateur au client.
        client.data.user = payload;
      } catch (error) {
        console.error('Connexion WebSocket invalide:', error.message);
        client.disconnect(true);
      }
    }
  
    // Gestion de la déconnexion WebSocket
    handleDisconnect(client: Socket) {
      console.log(`Client déconnecté: ${client.id}`);
    }
  
    // Exemples d'abonnement aux messages via WebSocket
    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: any): string {
      console.log('Message reçu via WebSocket:', message);
      return `Message reçu: ${message}`;
    }
  
    @SubscribeMessage('auth-message')
    handleAuthMessage(@MessageBody() data: any, client: Socket) {
      // Exemple d'accès aux données utilisateur après authentification JWT
      const user = client.data.user;
      return { message: `Bonjour, ${user.pseudo}`, data };
    }
  }
  