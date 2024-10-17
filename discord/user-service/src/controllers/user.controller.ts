import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async createUser(
        @Body('pseudo') pseudo: string,
        @Body('password') password: string,
    ): Promise<User> {
        return this.userService.createUser(pseudo, password);
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body('password') password: string,
    ): Promise<User> {
        return this.userService.updateUser(id, password);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }

    @Post('login')
    async login(
        @Body() body: { pseudo: string; password: string },
        @Res() res: Response
    ) {
        const { pseudo, password } = body;
        const { access_token } = await this.userService.login(pseudo, password);

        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 3600000,
        });

        return res.status(HttpStatus.OK).send();
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        console.log('deco');
        
        res.cookie('access_token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        return res.status(HttpStatus.OK).send();
    }
}
