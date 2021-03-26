import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Role } from '../models';
import { getRoles, createRole, IRolePayload, getRole } from '../repositories/role.repository'; 

@Route('roles')
@Tags("Role")
export default class RoleController {
  @Get("/")
  public async getRoles(): Promise<Role[]> {
    return getRoles();
  }

  @Post('/')
  public async createRole(@Body() body: IRolePayload): Promise<Role> {
    return createRole(body);
  }

  @Get('/:id')
  public async getRole(@Path() id: string): Promise<Role | null> {
    return getRole(Number(id));
  }
}