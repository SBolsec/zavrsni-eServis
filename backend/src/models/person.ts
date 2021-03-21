import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { Listing, Review, User } from '.';

@Entity({name: "osoba"})
export class Person {
  @PrimaryGeneratedColumn({name: "sif_osoba"})
  id!: number;

  @Column({name: "ime"})
  firstName!: string;

  @Column({name: "prezime"})
  lastName!: string;

  @Column({name: "sif_korisnik"})
  userId!: number;

  @OneToOne(() => User)
  @JoinColumn({name: "sif_korisnik"})
  user!: User;

  @CreateDateColumn({name: "trenutak_stvaranja"})
  createdAt!: Date;

  @UpdateDateColumn({name: "trenutak_promjene"})
  updatedAt!: Date;

  @OneToMany(() => Review, (review) => review.author)
  reviews!: Review[];

  @OneToMany(() => Listing, (listing) => listing.person)
  listings!: Listing[];
}