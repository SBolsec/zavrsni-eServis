import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { User } from '../models';
import { getUsers, createUser, updateUser, IUserPayload, getUserById, getUserByEmail } from '../repositories/user.repository'; 

@Route('users')
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<User[]> {
    return getUsers();
  }

  @Post('/')
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body);
  }

  @Put('/:id')
  public async updateUser(@Path() id: number, @Body() body: IUserPayload): Promise<User | null> {
    return updateUser(id, body);
  }

  @Get('/:id')
  public async getUserById(@Path() id: string): Promise<User | null> {
    return getUserById(Number(id));
  }

  @Get('/email/:email')
  public async getUserByEmail(@Path() email: string): Promise<User | null> {
    return getUserByEmail(email);
  }
}