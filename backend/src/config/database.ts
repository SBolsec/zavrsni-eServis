import { ConnectionOptions } from 'typeorm';
import { 
  User, 
  Role, 
  City, 
  Person, 
  Service, 
  Message, 
  Picture, 
  ListingStatus, 
  Listing, 
  Review, 
  FaultCategory,
  OfferStatus,
  Offer,
  SearchHistory
} from '../models';

const config: ConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    User, 
    Role, 
    City, 
    Person, 
    Service, 
    Message, 
    Picture, 
    ListingStatus, 
    Listing, 
    Review, 
    FaultCategory,
    OfferStatus,
    Offer,
    SearchHistory
  ],
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true
};

export default config;