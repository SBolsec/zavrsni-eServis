import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Listing, Service } from '.';

@Entity({name: "mjesto"})
export class City {
  @PrimaryGeneratedColumn({name: "sif_mjesto"})
  id!: number;

  @Column({name: "naziv_mjesto"})
  name!: string;

  @Column({name: "postanski_broj"})
  postalCode!: number;

  @OneToMany((_type) => Service, (service: Service) => service.city)
  services!: Service[];

  @OneToMany((_type) => Listing, (listing: Listing) => listing.city)
  listings!: Listing[];
}