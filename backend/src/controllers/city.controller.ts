import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { City } from '../models';
import { getCities, createCity, ICityPayload, getCity, getFormattedCities } from '../repositories/city.repository'; 

@Route('cities')
@Tags("City")
export default class CityController {
  @Get("/")
  public async getCities(): Promise<City[]> {
    return getCities();
  }

  @Post('/')
  public async createCity(@Body() body: ICityPayload): Promise<City> {
    return createCity(body);
  }

  @Get('/:id')
  public async getCity(@Path() id: string): Promise<City | null> {
    return getCity(Number(id));
  }

  @Get('/formatted')
  public async getFormattedCities(): Promise<{id: number, city: string}[]> {
    return getFormattedCities();
  }
}