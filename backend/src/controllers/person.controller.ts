import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { Person } from '../models';
import { getPeople, createPerson, updatePerson, IPersonPayload, getPerson, getPersonByUserId } from '../repositories/person.repository'; 

@Route('people')
@Tags("Person")
export default class PersonController {
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

  @Put('/:id')
  public async updatePerson(@Path() id: string, @Body() body: IPersonPayload): Promise<Person | null> {
    return updatePerson(Number(id), body);
  }

  @Get('/user/:id')
  public async getPersonByUserId(@Path() id: string): Promise<any | null> {
    let person: any = await getPersonByUserId(Number(id));
    if (!person) return null;

    // remove sensitive user info and add picture if needed
    person.profilePicture = person.user.profilePicture;
    if (!person.profilePicture) {
      person.profilePicture = {
        url:
          "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
      };
    }
    delete person.user;
    return person;
  }
}