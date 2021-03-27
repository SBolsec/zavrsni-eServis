import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { Service } from '../models';
import { getServices, createService, updateService, IServicePayload, getService, getServiceByUserId } from '../repositories/service.repository'; 

@Route('services')
@Tags("Service")
export default class PersonController {
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

  @Put('/:id')
  public async updateService(@Path() id: string, @Body() body: IServicePayload): Promise<Service | null> {
    return updateService(Number(id), body);
  }

  @Get('/user/:id')
  public async getServiceByUserId(@Path() id: string): Promise<Service | null> {
    return getServiceByUserId(Number(id));
  }
}