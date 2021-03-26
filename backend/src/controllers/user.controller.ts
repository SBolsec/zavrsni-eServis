import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { User } from '../models';
import { getUsers, createUser, IUserPayload, getUserById, getUserByEmail } from '../repositories/user.repository'; 

@Route('users')
@Tags("User")
export default class UserContorller {
  @Get("/")
  public async getUsers(): Promise<User[]> {
    return getUsers();
  }

  @Post('/')
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body);
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