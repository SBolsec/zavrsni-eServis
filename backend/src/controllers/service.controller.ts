import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Service } from '../models';
import { getServices, createService, IServicePayload, getService } from '../repositories/service.repository'; 

@Route('services')
@Tags("Service")
export default class PersonContorller {
  @Get("/")
  public async getServices(): Promise<Service[]> {
    return getServices();
  }

  @Post('/')
  public async createService(@Body() body: IServicePayload): Promise<Service> {
    return createService(body);
  }

  @Get('/:id')
  public async getService(@Path() id: string): Promise<Service | null> {
    return getService(Number(id));
  }
}