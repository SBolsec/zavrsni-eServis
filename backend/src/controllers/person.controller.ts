import { Get, Route, Tags, Post, Body, Path, Put } from 'tsoa';
import { getRepository } from 'typeorm';
import { Listing, Offer, Person, Review } from '../models';
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

  @Get('/data/:id')
  public async getDashboardData(@Path() id: number): Promise<any> {
    const offerRepo = getRepository(Offer);
    const receivedOffers = await offerRepo.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.listing', 'listing')
      .where('listing.personId = :id', { id: id })
      .getCount();
    const acceptedOffers = await offerRepo.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.listing', 'listing')
      .where('listing.personId = :id AND offer.statusId = 2', { id: id })
      .getCount();
    const declineOffers = await offerRepo.createQueryBuilder('offer')
      .leftJoinAndSelect('offer.listing', 'listing')
      .where('listing.personId = :id  AND offer.statusId = 3', { id: id })
      .getCount();

    const listingRepo = getRepository(Listing);
    const activeListings = await listingRepo.count({
      where: {
        personId: id,
        statusId: 1
      }
    });
    const finishedListings = await listingRepo.count({
      where: {
        personId: id,
        statusId: 2
      }
    });

    const reviewRepo = getRepository(Review);
    const numOfReviews = await reviewRepo.count({
      where: {
        authorId: id
      }
    });

    return {
      receivedOffers,
      acceptedOffers,
      declineOffers,
      activeListings,
      finishedListings,
      numOfReviews
    };
  }
}