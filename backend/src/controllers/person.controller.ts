import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { Person } from '../models';
import { getPeople, createPerson, IPersonPayload, getPerson, getPersonByUserId } from '../repositories/person.repository'; 

@Route('people')
@Tags("Person")
export default class PersonContorller {
  @Get("/")
  public async getPeople(): Promise<Person[]> {
    return getPeople();
  }

  @Post('/')
  public async createPerson(@Body() body: IPersonPayload): Promise<Person> {
    return createPerson(body);
  }

  @Get('/:id')
  public async getPerson(@Path() id: string): Promise<Person | null> {
    return getPerson(Number(id));
  }

  @Get('/user/:id')
  public async getPersonByUserId(@Path() id: string): Promise<Person | null> {
    return getPersonByUserId(Number(id));
  }
}