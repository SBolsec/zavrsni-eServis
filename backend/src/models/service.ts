import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,  JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { City, FaultCategory, Offer, Review, User } from '.';

@Entity({name: "servis"})
export class Service {
  @PrimaryGeneratedColumn({name: "sif_servis"})
  id!: number;

  @Column({name: "naziv_servis"})
  name!: string;

  @Column({name: "oib", length: 11})
  oib!: string;

  @Column({name: "telefon"})
  phone!: string;

  @Column({name: "adresa"})
  address!: string;

  @Column({name: 'web_lokacija', nullable: true})
  website?: string;

  @Column({name: 'opis', nullable: true})
  description?: string;

  @Column({name: "sif_mjesto"})
  cityId!: number;

  @ManyToOne((_type) => City, (city: City) => city.services)
  @JoinColumn({name: "sif_mjesto"})
  city!: City;

  @Column({name: "sif_korisnik"})
  userId!: number;

  @OneToOne(() => User)
  @JoinColumn({name: "sif_korisnik"})
  user!: User;

  @CreateDateColumn({name: "trenutak_stvaranja"})
  createdAt!: Date;

  @UpdateDateColumn({name: "trenutak_promjene"})
  updatedAt!: Date;

  @OneToMany(() => Review, (review) => review.service)
  reviews!: Review[];

  @ManyToMany(() => FaultCategory)
  @JoinTable()
  faultCategories?: FaultCategory[];

  @OneToMany(() => Offer, (offer) => offer.service)
  offers!: Offer[];
}