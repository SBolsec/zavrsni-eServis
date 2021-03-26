import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne} from 'typeorm';
import { Role, Message, Picture } from '.';

@Entity({name: "korisnik"})
export class User {
  @PrimaryGeneratedColumn({name: "sif_korisnik"})
  id!: number;

  @Column({name: "email"})
  email!: string;

  @Column({name: "lozinka"})
  password!: string;

  @Column({name: "sif_uloga"})
  roleId!: number;

  @ManyToOne((_type) => Role, (role: Role) => role.users, {cascade: true})
  @JoinColumn({name: "sif_uloga"})
  role!: Role;

  @Column({name: "verzija_tokena", default: 0})
  tokenVersion!: number;

  @CreateDateColumn({name: "trenutak_stvaranja", type: 'timestamp without time zone'})
  createdAt?: Date;

  @UpdateDateColumn({name: "trenutak_promjene", type: 'timestamp without time zone'})
  updatedAt?: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messagesSent!: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  messagesReceived!: Message[];

  @Column({name: 'sif_slika_profila', nullable: true})
  profilePictureId?: number; 

  @OneToOne(() => Picture)
  @JoinColumn({name: 'sif_slika_profila'})
  profilePicture?: Picture;
}