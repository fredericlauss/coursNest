import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/discord'),
    UserModule,
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, WsGateway],
})
export class AppModule {}
